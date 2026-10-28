import { ProductGrid } from '@/components/product/product-grid'
import { CrunchTest } from '@/components/sections/home/crunch-test'
import { Hero } from '@/components/sections/home/hero'
import { HomeFaq } from '@/components/sections/home/home-faq'
import { Moments } from '@/components/sections/home/moments'
import { ProductSpotlights } from '@/components/sections/home/product-spotlights'
import { Stats } from '@/components/sections/home/stats'
import { Theory } from '@/components/sections/home/theory'
import { WhereToBuy } from '@/components/sections/home/where-to-buy'
import { NewsletterBand } from '@/components/sections/newsletter-band'
import { JsonLd } from '@/components/seo/json-ld'
import { ArrowIcon, ButtonLink } from '@/components/ui/button'
import { Marquee } from '@/components/ui/marquee'
import { SectionHeading } from '@/components/ui/section-heading'
import { faqs } from '@/data/faqs'
import { proofPoints } from '@/data/home'
import { productLines } from '@/data/products'
import { productRangeSchema } from '@/lib/seo'

const homeFaqs = faqs.slice(0, 4)

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="border-y border-forest/10 bg-paper py-6 text-forest">
        <Marquee items={proofPoints} />
      </div>

      <Theory />
      <ProductSpotlights />
      <Stats />

      <section aria-labelledby="range-title" className="bg-sand/40 py-28 sm:py-36">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              id="range-title"
              eyebrow="The range"
              title="Four snacks. *Zero* boring."
              lede="Roasted makhana, roasted chana, veggie chips and baked ragi chips. Tap one to see its flavours."
            />
            <ButtonLink
              href="/products"
              variant="secondary"
              trackLabel="All products"
              trackLocation="home-range"
            >
              See the full range <ArrowIcon />
            </ButtonLink>
          </div>
          <div className="mt-14">
            <ProductGrid lines={productLines} />
          </div>
        </div>
      </section>

      <Moments />
      <CrunchTest />
      <WhereToBuy />
      <HomeFaq items={homeFaqs} />
      <NewsletterBand location="home" />

      <JsonLd data={productRangeSchema(productLines)} />
    </>
  )
}
