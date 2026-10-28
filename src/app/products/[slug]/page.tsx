import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { TrackViewItem } from '@/components/analytics/track-view-item'
import { InterestButton } from '@/components/flavour/interest-button'
import { MarketplaceTiles } from '@/components/flavour/marketplace-tiles'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ProductGrid } from '@/components/product/product-grid'
import { ProductPhoto } from '@/components/product/product-photo'
import { ComingSoonBadge } from '@/components/ui/coming-soon-badge'
import { Reveal, RevealText } from '@/components/ui/reveal'
import { flavourNames, getProductPageLine, productLines, productPageLines } from '@/data/products'
import { NOTIFY_HREF } from '@/data/site'
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
    title: `${line.name}: ${flavourNames(line).join(' & ')}`,
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
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <ProductPhoto line={line} sizes="(min-width: 1024px) 50vw, 100vw" priority="preload" />
          </Reveal>

          <div>
            {!line.live && <ComingSoonBadge className="mb-5" />}
            <p className="eyebrow">{line.method}</p>
            <RevealText
              as="h1"
              text={line.title}
              className="mt-4 text-5xl leading-[0.98] font-extrabold tracking-[-0.04em] sm:text-6xl"
            />
            <p className="mt-6 text-lg leading-relaxed text-muted">{line.description}</p>
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
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.hook}</p>
                  <p className="mt-3 text-sm font-semibold text-olive">from ₹{line.fromPriceInr}</p>
                </li>
              ))}
            </ul>

            <div id="buy" className="mt-10 scroll-mt-28 rounded-[2rem] bg-sand/50 p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 px-1 pb-4">
                <h2 className="text-2xl font-extrabold tracking-[-0.03em]">
                  Get it <span className="accent text-terracotta">lightning fast</span>
                </h2>
                {line.live ? (
                  <p className="text-sm text-muted">Pick your app ↓</p>
                ) : (
                  <p className="rounded-full bg-mustard/40 px-3 py-1 text-xs font-semibold tracking-wide text-forest-deep uppercase">
                    Coming soon
                  </p>
                )}
              </div>
              <MarketplaceTiles flavour={line.name} location="product-page" variant="compact" />
              {!line.live && (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-1 pt-5">
                  <InterestButton flavour={line.slug} location="product-page" size="md" />
                  <a
                    href={NOTIFY_HREF}
                    className="text-sm font-semibold text-forest underline underline-offset-4 hover:text-forest-deep"
                  >
                    Get notified at launch
                  </a>
                </div>
              )}
            </div>

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
            <ProductGrid lines={others} />
          </div>
        </div>
      </section>

      <TrackViewItem id={line.slug} name={line.name} category={line.name} />
    </>
  )
}
