import { flavours, getFlavour } from '@/data/flavours'
import { ogSize, renderOgImage } from '@/lib/og'

export const alt = 'Crunch Theory roasted makhana flavour'
export const size = ogSize
export const contentType = 'image/png'

export function generateStaticParams() {
  return flavours.map((f) => ({ slug: f.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const flavour = getFlavour(slug)
  return renderOgImage({
    eyebrow: 'Roasted makhana',
    title: flavour?.name ?? 'Crunch Theory',
    pouchSlug: flavour?.slug,
  })
}
