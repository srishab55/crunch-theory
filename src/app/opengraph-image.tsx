import { site } from '@/data/site'
import { ogSize, renderOgImage } from '@/lib/og'

export const alt = `${site.name} — ${site.tagline}`
export const size = ogSize
export const contentType = 'image/png'

export default async function Image() {
  return renderOgImage({
    eyebrow: 'Roasted makhana · Made in India',
    title: 'The smart way to snack.',
  })
}
