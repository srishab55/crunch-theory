import { getProductPageLine, productPageLines } from '@/data/products'
import { ogSize, renderOgImage } from '@/lib/og'

export const alt = 'Crunch Theory product'
export const size = ogSize
export const contentType = 'image/png'

export function generateStaticParams() {
  return productPageLines.map((l) => ({ slug: l.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const line = getProductPageLine(slug)
  return renderOgImage({
    eyebrow: line?.live ? 'Crunch Theory' : 'Coming soon',
    title: line?.name ?? 'Crunch Theory',
    pouchSlug: line?.slug,
  })
}
