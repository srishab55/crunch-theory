/**
 * Turns the full-size pack shots in content/pouches/ into the files the site serves:
 *   content/pouches/pouch-<slug>.png  →  src/assets/pouches/<slug>.jpg  (centre square crop)
 *                                     →  src/assets/og/<slug>.jpg         (portrait, for share images)
 *
 * The square crop also removes the generator watermark in the bottom-right corner. Site images are
 * imported (see src/data/flavours.ts), so Next.js serves them under content-hashed URLs and a
 * replaced picture can never be stuck in a CDN or browser cache.
 * Usage: npm run images
 */
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

import sharp from 'sharp'

const SOURCE_DIR = 'content/pouches'
const SITE_DIR = 'src/assets/pouches'
const OG_DIR = 'src/assets/og'
const PATTERN = /^pouch-([a-z0-9-]+)\.(png|jpe?g|webp)$/i

const files = (await readdir(SOURCE_DIR)).filter(
  (f) => PATTERN.test(f) && !f.includes('.original.'),
)
if (files.length === 0) {
  console.error(`No pouch-<slug>.png files found in ${SOURCE_DIR}/`)
  process.exit(1)
}

for (const file of files) {
  const slug = file.match(PATTERN)[1]
  const input = join(SOURCE_DIR, file)
  const { width, height } = await sharp(input).metadata()

  // Site image: largest centred square (pouches are framed in the middle of a 16:9 shot).
  const side = Math.min(width, height)
  await sharp(input)
    .extract({ left: Math.round((width - side) / 2), top: 0, width: side, height: side })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(SITE_DIR, `${slug}.jpg`))

  // Share-image crop: a portrait window around the pouch, 520 px wide.
  const ogW = Math.round(side * 0.716)
  const ogH = Math.round(side * 0.872)
  await sharp(input)
    .extract({
      left: Math.round((width - ogW) / 2),
      top: Math.round(side * 0.026),
      width: ogW,
      height: ogH,
    })
    .resize({ width: 520 })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(OG_DIR, `${slug}.jpg`))

  console.log(`✓ ${file} → ${SITE_DIR}/${slug}.jpg, ${OG_DIR}/${slug}.jpg`)
}

console.log(
  '\nNew flavour? Import src/assets/pouches/<slug>.jpg in src/data/flavours.ts and set it as `image`.',
)
