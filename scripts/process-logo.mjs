/**
 * Builds every logo asset the site uses from the two source files in content/logo/:
 *   logo.jpeg   full lockup (mark + "CRUNCH THEORY" wordmark + tagline)
 *   logo2.jpeg  mark only (higher resolution)
 *
 * The sources have a flat cream background. Only background *connected to the image edge* is
 * removed, so cream shapes enclosed by the mark (the "ct" letters) stay opaque. Edges get a
 * soft alpha ramp and are colour-decontaminated so they don't halo on dark backgrounds.
 *
 * Outputs:
 *   src/assets/brand/mark.png            transparent mark (header, footer, schema logo)
 *   src/assets/brand/wordmark.png        transparent "CRUNCH THEORY" (dark, for light backgrounds)
 *   src/assets/brand/wordmark-light.png  same wordmark in cream, for dark backgrounds
 *   src/app/icon.png                     512 px favicon (transparent)
 *   src/app/apple-icon.png               180 px home-screen icon (cream background)
 *
 * Usage: npm run logo
 */
import { join } from 'node:path'

import sharp from 'sharp'

const SRC = 'content/logo'
const OUT = 'src/assets/brand'
const PAPER = { r: 251, g: 248, b: 242 } // --color-paper
const ICON_BG = { r: 255, g: 248, b: 232, alpha: 1 } // the logo's own cream

/** Pixels closer than this (RGB distance) to the background can be flood-filled as background. */
const FLOOD_THRESHOLD = 18
/** Alpha ramps from 0 → 1 between these distances on the background/fringe pixels. */
const ALPHA_FROM = 6
const ALPHA_TO = 40

async function readRgb(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  return { data, width: info.width, height: info.height }
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

/** Returns an RGBA buffer with the edge-connected background made transparent. */
function cutBackground({ data, width, height }) {
  const n = width * height
  const at = (x, y) => y * width + x

  // Background colour = median of the outermost 4 px ring.
  const ring = { r: [], g: [], b: [] }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x > 3 && y > 3 && x < width - 4 && y < height - 4) continue
      const i = at(x, y) * 3
      ring.r.push(data[i])
      ring.g.push(data[i + 1])
      ring.b.push(data[i + 2])
    }
  }
  const bg = { r: median(ring.r), g: median(ring.g), b: median(ring.b) }

  const dist = new Float32Array(n)
  for (let p = 0; p < n; p++) {
    const i = p * 3
    dist[p] = Math.hypot(data[i] - bg.r, data[i + 1] - bg.g, data[i + 2] - bg.b)
  }

  // Flood fill (4-connected) from every edge pixel through near-background colours.
  const outside = new Uint8Array(n)
  const stack = []
  const push = (x, y) => {
    const p = at(x, y)
    if (!outside[p] && dist[p] < FLOOD_THRESHOLD) {
      outside[p] = 1
      stack.push(p)
    }
  }
  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }
  while (stack.length) {
    const p = stack.pop()
    const x = p % width
    const y = (p - x) / width
    if (x > 0) push(x - 1, y)
    if (x < width - 1) push(x + 1, y)
    if (y > 0) push(x, y - 1)
    if (y < height - 1) push(x, y + 1)
  }

  // Grow the region by 2 px so anti-aliased edge pixels get a soft alpha too.
  let region = outside
  for (let pass = 0; pass < 2; pass++) {
    const grown = region.slice()
    for (let p = 0; p < n; p++) {
      if (region[p]) continue
      const x = p % width
      if (
        (x > 0 && region[p - 1]) ||
        (x < width - 1 && region[p + 1]) ||
        region[p - width] ||
        region[p + width]
      ) {
        grown[p] = 1
      }
    }
    region = grown
  }

  const rgba = Buffer.alloc(n * 4)
  for (let p = 0; p < n; p++) {
    const i = p * 3
    const o = p * 4
    let a = 1
    if (region[p]) {
      const t = Math.min(1, Math.max(0, (dist[p] - ALPHA_FROM) / (ALPHA_TO - ALPHA_FROM)))
      a = t * t * (3 - 2 * t) // smoothstep
    }
    // Remove the background's contribution from semi-transparent edge pixels.
    const unmix = (c, b) => (a > 0 ? Math.min(255, Math.max(0, (c - (1 - a) * b) / a)) : 0)
    rgba[o] = unmix(data[i], bg.r)
    rgba[o + 1] = unmix(data[i + 1], bg.g)
    rgba[o + 2] = unmix(data[i + 2], bg.b)
    rgba[o + 3] = Math.round(a * 255)
  }
  return { data: rgba, width, height }
}

/** Bounding box of pixels with visible alpha inside [x0, x1) × [y0, y1). */
function bbox({ data, width }, x0, y0, x1, y1, minAlpha = 10) {
  let left = x1
  let top = y1
  let right = x0 - 1
  let bottom = y0 - 1
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      if (data[(y * width + x) * 4 + 3] > minAlpha) {
        if (x < left) left = x
        if (x > right) right = x
        if (y < top) top = y
        if (y > bottom) bottom = y
      }
    }
  }
  return { left, top, width: right - left + 1, height: bottom - top + 1 }
}

/** Longest run of empty columns (or rows) inside a range — the gap between logo parts. */
function widestGap(img, axis, from, to, crossFrom, crossTo) {
  const empty = (k) => {
    for (let c = crossFrom; c < crossTo; c++) {
      const [x, y] = axis === 'x' ? [k, c] : [c, k]
      if (img.data[(y * img.width + x) * 4 + 3] > 10) return false
    }
    return true
  }
  let best = { start: from, length: 0 }
  let runStart = -1
  for (let k = from; k <= to; k++) {
    if (k < to && empty(k)) {
      if (runStart < 0) runStart = k
    } else if (runStart >= 0) {
      if (k - runStart > best.length) best = { start: runStart, length: k - runStart }
      runStart = -1
    }
  }
  return best
}

const toSharp = ({ data, width, height }) => sharp(data, { raw: { width, height, channels: 4 } })

/** Median colour of the fully opaque pixels — the wordmark's ink colour without JPEG noise. */
async function inkColour(pipeline) {
  const { data } = await pipeline.clone().raw().toBuffer({ resolveWithObject: true })
  const ch = { r: [], g: [], b: [] }
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 240) continue
    ch.r.push(data[i])
    ch.g.push(data[i + 1])
    ch.b.push(data[i + 2])
  }
  return { r: median(ch.r), g: median(ch.g), b: median(ch.b) }
}

/**
 * Crops, optionally recolours every pixel to one flat colour (keeping the alpha edge), pads and
 * writes a PNG. `recolor: 'ink'` flattens single-colour artwork to its own median colour.
 */
async function save(img, region, file, { pad = 6, recolor } = {}) {
  let pipeline = toSharp(img).extract(region)
  if (recolor) {
    const colour = recolor === 'ink' ? await inkColour(pipeline) : recolor
    const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true })
    for (let i = 0; i < data.length; i += 4) {
      data[i] = colour.r
      data[i + 1] = colour.g
      data[i + 2] = colour.b
    }
    pipeline = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  }
  await pipeline
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(file)
  console.log(`✓ ${file}`)
}

// --- Mark (from the dedicated, higher-resolution source) ---------------------------------
const mark = cutBackground(await readRgb(join(SRC, 'logo2.jpeg')))
const markBox = bbox(mark, 0, 0, mark.width, mark.height)
await save(mark, markBox, join(OUT, 'mark.png'))

// --- Lockup: split into mark | wordmark, and wordmark / tagline ---------------------------
const lockup = cutBackground(await readRgb(join(SRC, 'logo.jpeg')))
const full = bbox(lockup, 0, 0, lockup.width, lockup.height)

const colGap = widestGap(
  lockup,
  'x',
  full.left,
  full.left + full.width,
  full.top,
  full.top + full.height,
)
const textLeft = colGap.start + colGap.length
const textBox = bbox(lockup, textLeft, full.top, full.left + full.width, full.top + full.height)
const rowGap = widestGap(
  lockup,
  'y',
  textBox.top,
  textBox.top + textBox.height,
  textBox.left,
  textBox.left + textBox.width,
)
const wordmarkBox = bbox(
  lockup,
  textBox.left,
  textBox.top,
  textBox.left + textBox.width,
  rowGap.start,
)
await save(lockup, wordmarkBox, join(OUT, 'wordmark.png'), { recolor: 'ink' })
await save(lockup, wordmarkBox, join(OUT, 'wordmark-light.png'), { recolor: PAPER })

// --- App icons -----------------------------------------------------------------------------
const markPng = join(OUT, 'mark.png')
await sharp(markPng)
  .resize(460, 460, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 26, bottom: 26, left: 26, right: 26, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile('src/app/icon.png')
console.log('✓ src/app/icon.png')
await sharp(markPng)
  .resize(144, 144, { fit: 'contain', background: ICON_BG })
  .extend({ top: 18, bottom: 18, left: 18, right: 18, background: ICON_BG })
  .flatten({ background: ICON_BG })
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile('src/app/apple-icon.png')
console.log('✓ src/app/apple-icon.png')
