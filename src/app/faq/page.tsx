import { PageHero } from '@/components/layout/page-hero'
import { JsonLd } from '@/components/seo/json-ld'
import { ButtonLink } from '@/components/ui/button'
import { FaqList } from '@/components/ui/faq-list'
import { GlossaryList } from '@/components/ui/glossary-list'
import { faqs, type Faq } from '@/data/faqs'
import { glossary } from '@/data/glossary'
import { buildMetadata, faqSchema, glossarySchema } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'FAQ — Makhana, Nutrition & Buying',
  description:
    'Answers about Crunch Theory roasted makhana (puffed lotus seeds): what it is and tastes like, whether it is fried, nutrition, pricing, buying in India and outside it, plus a glossary of Indian snack words.',
  path: '/faq',
})

const categories: Faq['category'][] = ['Product', 'Nutrition', 'Buying', 'International', 'Brand']

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered *honestly.*"
        lede="Everything you might want to know about makhana, our ingredients, nutrition and where to buy Crunch Theory. Can’t find your answer? Write to us — a real person replies."
        crumbs={[{ name: 'FAQ', path: '/faq' }]}
      />
      <div className="container-page space-y-20 pb-28">
        {categories.map((cat) => (
          <section key={cat} aria-labelledby={`faq-${cat}`} className="grid gap-8 lg:grid-cols-12">
            <h2 id={`faq-${cat}`} className="text-3xl lg:col-span-3">
              {cat}
            </h2>
            <div className="lg:col-span-8 lg:col-start-5">
              <FaqList items={faqs.filter((f) => f.category === cat)} />
            </div>
          </section>
        ))}
        <section
          id="glossary"
          aria-labelledby="glossary-title"
          className="grid scroll-mt-28 gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-3">
            <h2 id="glossary-title" className="text-3xl">
              Glossary
            </h2>
            <p className="mt-3 text-muted">
              New to Indian snacks? Here’s what the words on our packs mean.
            </p>
          </div>
          <GlossaryList terms={glossary} className="lg:col-span-8 lg:col-start-5" />
        </section>
        <div className="rounded-[2rem] bg-sand/60 p-10 text-center">
          <p className="font-display text-3xl font-bold text-forest">Still curious?</p>
          <ButtonLink href="/contact" className="mt-6" trackLabel="FAQ contact" trackLocation="faq">
            Ask us anything
          </ButtonLink>
        </div>
      </div>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={glossarySchema(glossary)} />
    </>
  )
}
