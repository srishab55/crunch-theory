import { PageHero } from '@/components/layout/page-hero'
import { ProductLineRow } from '@/components/sections/products/product-line'
import { NewsletterBand } from '@/components/sections/newsletter-band'
import { JsonLd } from '@/components/seo/json-ld'
import { Reveal } from '@/components/ui/reveal'
import { productLines } from '@/data/products'
import { buildMetadata, productRangeSchema } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Our Products: Makhana, Chana, Veggie & Ragi Chips',
  description:
    'The full Crunch Theory range: roasted makhana, roasted chana, masala vegetable chips and baked ragi chips. Roasted, baked or vacuum-cooked, with no palm oil, from ₹49.',
  path: '/products',
})

const lowestPrice = Math.min(...productLines.map((l) => l.fromPriceInr))

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="The range"
        title="One theory. *Four* crunches."
        lede={`Crunch Theory makes better-for-you Indian snacks: roasted makhana, roasted chana, masala vegetable chips and baked ragi chips. Each one is roasted, baked or vacuum-cooked, and every pack starts at ₹${lowestPrice}.`}
        crumbs={[{ name: 'Products', path: '/products' }]}
      />

      <nav aria-label="Product lines" className="relative container-page -mt-4 sm:-mt-10">
        <ul className="flex flex-wrap gap-2">
          {productLines.map((l) => (
            <li key={l.slug}>
              <a
                href={`#${l.slug}`}
                className="inline-flex h-11 items-center rounded-full border border-forest/15 bg-paper px-5 text-sm font-semibold text-forest transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-paper"
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="pt-6 pb-10">
        {productLines.map((line, i) => (
          <ProductLineRow key={line.slug} line={line} index={i} eager={i === 0} />
        ))}
      </div>

      <section aria-labelledby="range-title" className="container-page pb-28">
        <Reveal>
          <h2 id="range-title" className="text-3xl sm:text-4xl">
            The range at a glance
          </h2>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-forest/10 bg-paper">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Comparison of Crunch Theory products</caption>
              <thead className="bg-sand/50 text-forest">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    How it’s made
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Flavours
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    From
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {productLines.map((l) => (
                  <tr key={l.slug}>
                    <th scope="row" className="px-6 py-4 font-semibold text-forest">
                      <a href={`#${l.slug}`} className="hover:underline">
                        {l.name}
                      </a>
                    </th>
                    <td className="px-6 py-4">{l.method}</td>
                    <td className="px-6 py-4 text-muted">{l.flavours.join(', ')}</td>
                    <td className="px-6 py-4">₹{l.fromPriceInr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <NewsletterBand location="products" />
      <JsonLd data={productRangeSchema(productLines)} />
    </>
  )
}
