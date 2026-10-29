import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { TrackViewItem } from '@/components/analytics/track-view-item'
import { BuyBox } from '@/components/flavour/buy-box'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ProductGrid } from '@/components/product/product-grid'
import { ProductPhoto } from '@/components/product/product-photo'
import { ComingSoonBadge } from '@/components/ui/coming-soon-badge'
import { HeroText } from '@/components/ui/hero-text'
import { getProductPageLine, productLines, productPageLines } from '@/data/products'
import { buildMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return productPageLines.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/products/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const line = getProductPageLine(slug)
  if (!line) return {}
  return buildMetadata({
    title: `${line.name}: ${line.englishName}`,
    description: line.description,
    path: line.href,
  })
}

/** A product line's own page: its story, flavours and (coming-soon) store tiles. */
export default async function ProductLinePage({ params }: PageProps<'/products/[slug]'>) {
  const { slug } = await params
  const line = getProductPageLine(slug)
  if (!line) notFound()

  const others = productLines.filter((l) => l.slug !== line.slug)

  return (
    <>
      <section className="container-page pt-32 pb-20 sm:pt-40">
        <Breadcrumbs
          crumbs={[
            { name: 'Products', path: '/products' },
            { name: line.name, path: line.href },
          ]}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="hero-fade lg:sticky lg:top-28 lg:self-start">
            <ProductPhoto line={line} sizes="(min-width: 1024px) 50vw, 100vw" priority="preload" />
          </div>

          <div>
            {!line.live && <ComingSoonBadge className="mb-5" />}
            <p className="eyebrow">{line.method}</p>
            <HeroText
              text={line.title}
              className="mt-4 text-5xl leading-[0.98] font-extrabold tracking-[-0.04em] sm:text-6xl"
            />
            <p className="mt-3 text-lg font-semibold text-olive">{line.englishName}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted">{line.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
              {line.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-forest/15 bg-paper px-3.5 py-1.5 text-sm font-semibold text-forest"
                >
                  {h}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-sans text-sm font-bold tracking-wider text-forest uppercase">
              Flavours
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {line.flavours.map((f) => (
                <li key={f.name} className="rounded-2xl border border-forest/10 bg-paper p-5">
                  <h3 className="text-xl leading-tight">{f.name}</h3>
                  {f.english && (
                    <p className="mt-1 text-sm font-semibold text-olive">{f.english}</p>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.hook}</p>
                  <p className="mt-3 text-sm font-semibold text-olive">from ₹{line.fromPriceInr}</p>
                </li>
              ))}
            </ul>

            <BuyBox
              query={line.name}
              slug={line.slug}
              location="product-page"
              live={line.live}
              className="mt-10"
            />

            <p className="mt-8 text-sm text-muted">
              Full ingredients, allergens and nutrition for each flavour will be listed here before
              launch.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="more-title" className="bg-sand/40 py-24">
        <div className="container-page">
          <h2 id="more-title" className="text-4xl sm:text-5xl">
            More from the range
          </h2>
          <div className="mt-12 [&>div]:lg:grid-cols-3">
            <ProductGrid lines={others} listName="more-from-range" />
          </div>
        </div>
      </section>

      <TrackViewItem id={line.slug} name={line.name} category={line.name} />
    </>
  )
}
