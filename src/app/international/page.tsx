import Link from 'next/link'

import { NewsletterForm } from '@/components/forms/newsletter-form'
import { PageHero } from '@/components/layout/page-hero'
import { ProductGrid } from '@/components/product/product-grid'
import { ArrowIcon, ButtonLink } from '@/components/ui/button'
import { FaqList } from '@/components/ui/faq-list'
import { GlossaryList } from '@/components/ui/glossary-list'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { faqs } from '@/data/faqs'
import { essentialTerms } from '@/data/glossary'
import { productLines } from '@/data/products'
import { isLive } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Outside India? Join the International Waitlist',
  description:
    'Crunch Theory makes Indian snacks: roasted makhana (puffed lotus seeds), roasted chickpeas, veggie chips and baked millet chips. We sell in India first. Join the international waitlist to get them in your country.',
  path: '/international',
})

const internationalFaqs = faqs.filter((f) => f.category === 'International')

/** For visitors outside India: where we sell, a country waitlist, trade enquiries and a primer. */
export default function InternationalPage() {
  return (
    <>
      <PageHero
        eyebrow="Outside India"
        title="Snacking from *abroad?*"
        lede={`Crunch Theory ${isLive ? 'is sold only in India for now' : 'is launching in India first'}, so we don’t ship internationally yet. Join the international waitlist and we’ll email you the moment we reach your country.`}
        crumbs={[{ name: 'International', path: '/international' }]}
      />

      <section aria-labelledby="waitlist-title" className="container-page pb-24">
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="grain relative isolate overflow-hidden rounded-[2.5rem] bg-forest-deep p-8 text-paper sm:p-12 lg:col-span-7">
            <p className="eyebrow !text-mustard">International waitlist</p>
            <h2 id="waitlist-title" className="mt-4 text-4xl text-paper sm:text-5xl">
              Tell us where you are.
            </h2>
            <p className="mt-4 max-w-md text-paper/75">
              Every sign-up is a vote for your country. One email when we ship to you, plus the
              occasional snack news. No spam.
            </p>
            <NewsletterForm location="international" withCountry inverted className="mt-8" />
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2.5rem] bg-sand/60 p-8 sm:p-12 lg:col-span-5">
            <p className="eyebrow">For businesses</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Importers, distributors & retailers</h2>
            <p className="mt-4 text-muted">
              Want to stock Crunch Theory outside India? Write to us and choose “International &
              distribution” as the topic.
            </p>
            <ButtonLink
              href="/contact"
              variant="secondary"
              className="mt-8"
              trackLabel="International trade enquiry"
              trackLocation="international"
            >
              Get in touch <ArrowIcon />
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="primer-title" className="bg-sand/40 py-24 sm:py-28">
        <div className="container-page">
          <SectionHeading
            id="primer-title"
            eyebrow="What we make"
            title="Indian snacks, *explained.*"
            lede="Four snacks with big crunch and bold Indian spice. Here’s what the names on the packs mean."
          />
          <GlossaryList terms={essentialTerms} className="mt-12" />
          <p className="mt-6 text-sm text-muted">
            More words in our{' '}
            <Link
              href="/faq#glossary"
              className="font-semibold text-forest underline underline-offset-4"
            >
              full glossary
            </Link>
            .
          </p>
          <div className="mt-14">
            <ProductGrid lines={productLines} />
          </div>
        </div>
      </section>

      <section aria-labelledby="intl-faq-title" className="container-page py-24 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 id="intl-faq-title" className="text-3xl lg:col-span-3">
            Good to know
          </h2>
          <div className="lg:col-span-8 lg:col-start-5">
            <FaqList items={internationalFaqs} />
          </div>
        </div>
      </section>
    </>
  )
}
