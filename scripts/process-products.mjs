/**
 * Turns the product-line shots in content/products/ into the files the site serves:
 *   content/products/<slug>.png  →  src/assets/products/<slug>.jpg  (4:5, 960 × 1200)
 *                                →  src/assets/og/<slug>.jpg        (portrait, for share images)
 *
 * Sources are already cropped to the pack and cleaned of the generator's text callouts and
 * watermark; the uncropped originals live in content/generic/. Images are imported (see
 * src/data/products.ts), so a replaced picture gets a new content-hashed URL.
 * Usage: npm run images
 */
import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'

import sharp from 'sharp'

const SOURCE_DIR = 'content/products'
const SITE_DIR = 'src/assets/products'
const OG_DIR = 'src/assets/og'
const PATTERN = /^([a-z0-9-]+)\.(png|jpe?g|webp)$/i

const files = (await readdir(SOURCE_DIR)).filter((f) => PATTERN.test(f))
if (files.length === 0) {
  console.error(`No <slug>.png files found in ${SOURCE_DIR}/`)
  process.exit(1)
}
await mkdir(SITE_DIR, { recursive: true })

for (const file of files) {
  const slug = file.match(PATTERN)[1]
  await sharp(join(SOURCE_DIR, file))
    .resize({ width: 960, height: 1200, fit: 'cover' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(SITE_DIR, `${slug}.jpg`))
  // Same frame as the pouch share crops (400 × 487 in src/lib/og.tsx).
  await sharp(join(SOURCE_DIR, file))
    .resize({ width: 520, height: 633, fit: 'cover' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(OG_DIR, `${slug}.jpg`))
  console.log(`✓ ${file} → ${SITE_DIR}/${slug}.jpg, ${OG_DIR}/${slug}.jpg`)
}

console.log('\nNew product line? Import src/assets/products/<slug>.jpg in src/data/products.ts.')
