import { FlavourGrid } from '@/components/flavour/flavour-grid'
import { CrunchTest } from '@/components/sections/home/crunch-test'
import { FlavourSpotlights } from '@/components/sections/home/flavour-spotlights'
import { Hero } from '@/components/sections/home/hero'
import { HomeFaq } from '@/components/sections/home/home-faq'
import { Moments } from '@/components/sections/home/moments'
import { Stats } from '@/components/sections/home/stats'
import { Theory } from '@/components/sections/home/theory'
import { WhereToBuy } from '@/components/sections/home/where-to-buy'
import { NewsletterBand } from '@/components/sections/newsletter-band'
import { JsonLd } from '@/components/seo/json-ld'
import { ArrowIcon, ButtonLink } from '@/components/ui/button'
import { Marquee } from '@/components/ui/marquee'
import { SectionHeading } from '@/components/ui/section-heading'
import { faqs } from '@/data/faqs'
import { flavours } from '@/data/flavours'
import { proofPoints } from '@/data/home'
import { productListSchema } from '@/lib/seo'

const homeFaqs = faqs.slice(0, 4)

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="border-y border-forest/10 bg-paper py-6 text-forest">
        <Marquee items={proofPoints} />
      </div>

      <Theory />
      <FlavourSpotlights />
      <Stats />

      <section aria-labelledby="flavours-title" className="bg-sand/40 py-28 sm:py-36">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="The lineup"
              title="Four flavours. *Zero* boring."
              lede="From clean pink salt to smoky peri peri — pick your crunch."
            />
            <ButtonLink
              href="/flavours"
              variant="secondary"
              trackLabel="All flavours"
              trackLocation="home-lineup"
            >
              Compare flavours <ArrowIcon />
            </ButtonLink>
          </div>
          <div className="mt-14">
            <FlavourGrid flavours={flavours} />
          </div>
        </div>
      </section>

      <Moments />
      <CrunchTest />
      <WhereToBuy />
      <HomeFaq items={homeFaqs} />
      <NewsletterBand location="home" />

      <JsonLd data={productListSchema(flavours)} />
    </>
  )
}
