import { FlavourGrid } from '@/components/flavour/flavour-grid'
import { PageHero } from '@/components/layout/page-hero'
import { NewsletterBand } from '@/components/sections/newsletter-band'
import { JsonLd } from '@/components/seo/json-ld'
import { Reveal } from '@/components/ui/reveal'
import { flavours } from '@/data/flavours'
import { buildMetadata, productListSchema } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Roasted Makhana (Fox Nut) Flavours',
  description:
    'Compare all Crunch Theory roasted makhana flavours — Himalayan Pink Salt & Pepper, Peri Peri, Cheese & Herbs and Pudina. Ingredients, heat level, nutrition and pack prices.',
  path: '/flavours',
})

export default function FlavoursPage() {
  return (
    <>
      <PageHero
        eyebrow="Roasted makhana"
        title="Pick your *crunch.*"
        lede="Crunch Theory comes in four roasted makhana flavours, each in ₹49 trial packs, 75 g everyday pouches and family multipacks. All are roasted, never fried, and gluten-free."
        crumbs={[
          { name: 'Products', path: '/products' },
          { name: 'Roasted Makhana', path: '/flavours' },
        ]}
      />

      <section aria-label="All flavours" className="container-page pb-24">
        <FlavourGrid flavours={flavours} headingLevel="h2" />
      </section>

      <section aria-labelledby="compare-title" className="container-page pb-28">
        <Reveal>
          <h2 id="compare-title" className="text-3xl sm:text-4xl">
            Flavours at a glance
          </h2>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-forest/10 bg-paper">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Comparison of Crunch Theory flavours</caption>
              <thead className="bg-sand/50 text-forest">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Flavour
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Heat
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Best for
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Contains milk
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    From
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {flavours.map((f) => (
                  <tr key={f.slug}>
                    <th scope="row" className="px-6 py-4 font-semibold text-forest">
                      {f.name}
                    </th>
                    <td className="px-6 py-4">{['None', 'Mild', 'Medium', 'Hot'][f.heat]}</td>
                    <td className="px-6 py-4 text-muted">{f.pairsWith}</td>
                    <td className="px-6 py-4">
                      {f.allergens.startsWith('Contains milk') ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-4">₹{Math.min(...f.packs.map((p) => p.priceInr))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <NewsletterBand location="flavours" />
      <JsonLd data={productListSchema(flavours)} />
    </>
  )
}
