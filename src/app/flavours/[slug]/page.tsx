import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { TrackViewItem } from '@/components/analytics/track-view-item'
import { BuyLinks } from '@/components/flavour/buy-links'
import { FlavourGrid } from '@/components/flavour/flavour-grid'
import { FlavourVisual } from '@/components/flavour/flavour-visual'
import { HeatMeter } from '@/components/flavour/heat-meter'
import { NutritionTable } from '@/components/flavour/nutrition-table'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { JsonLd } from '@/components/seo/json-ld'
import { Reveal, RevealText } from '@/components/ui/reveal'
import { flavours, getFlavour } from '@/data/flavours'
import { buildMetadata, productSchema } from '@/lib/seo'

export function generateStaticParams() {
  return flavours.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/flavours/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const flavour = getFlavour(slug)
  if (!flavour) return {}
  return buildMetadata({
    title: `${flavour.name} Roasted Makhana`,
    description: flavour.description,
    path: `/flavours/${flavour.slug}`,
  })
}

export default async function FlavourPage({ params }: PageProps<'/flavours/[slug]'>) {
  const { slug } = await params
  const flavour = getFlavour(slug)
  if (!flavour) notFound()

  const others = flavours.filter((f) => f.slug !== flavour.slug).slice(0, 3)

  return (
    <>
      <section className="container-page pt-32 pb-20 sm:pt-40">
        <Breadcrumbs
          crumbs={[
            { name: 'Flavours', path: '/flavours' },
            { name: flavour.name, path: `/flavours/${flavour.slug}` },
          ]}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <FlavourVisual flavour={flavour} sizes="(min-width: 1024px) 50vw, 100vw" priority />
          </Reveal>

          <div>
            <HeatMeter level={flavour.heat} />
            <RevealText
              as="h1"
              text={flavour.name}
              className="mt-4 text-5xl leading-[0.98] font-medium tracking-tight sm:text-6xl"
            />
            <p className="mt-6 text-lg leading-relaxed text-muted">{flavour.description}</p>

            <h2 className="mt-10 font-sans text-sm font-bold tracking-wider text-forest uppercase">
              Pack sizes
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {flavour.packs.map((p) => (
                <li key={p.label} className="rounded-2xl border border-forest/10 bg-paper p-4">
                  <p className="text-sm text-muted">{p.label}</p>
                  <p className="mt-1 font-display text-2xl text-forest">₹{p.priceInr}</p>
                  <p className="text-xs text-muted">{p.weight}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-sans text-sm font-bold tracking-wider text-forest uppercase">
              Buy now
            </h2>
            <BuyLinks flavour={flavour.name} location="flavour-page" className="mt-4" />

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="font-sans text-sm font-bold tracking-wider text-forest uppercase">
                  Ingredients
                </h2>
                <ul className="mt-4 space-y-2 text-muted">
                  {flavour.ingredients.map((ing) => (
                    <li key={ing} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-mustard"
                      />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-sans text-sm font-bold tracking-wider text-forest uppercase">
                  Allergens
                </h2>
                <p className="mt-4 text-muted">{flavour.allergens}</p>
                <h2 className="mt-8 font-sans text-sm font-bold tracking-wider text-forest uppercase">
                  Pairs with
                </h2>
                <p className="mt-4 text-muted">{flavour.pairsWith}</p>
              </div>
            </div>

            <div className="mt-12">
              <NutritionTable flavour={flavour} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="more-title" className="bg-sand/40 py-24">
        <div className="container-page">
          <h2 id="more-title" className="text-4xl sm:text-5xl">
            Try another crunch
          </h2>
          <div className="mt-12 [&>div]:lg:grid-cols-3">
            <FlavourGrid flavours={others} />
          </div>
        </div>
      </section>

      <JsonLd data={productSchema(flavour)} />
      <TrackViewItem id={flavour.slug} name={flavour.name} />
    </>
  )
}
