import { FaqList } from '@/components/ui/faq-list'
import { ButtonLink } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Faq } from '@/data/faqs'

export function HomeFaq({ items }: { items: Faq[] }) {
  return (
    <section
      data-track-section="home-faq"
      aria-labelledby="home-faq-title"
      className="py-28 sm:py-36"
    >
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Good questions" title="Snack facts, *straight up.*" />
          <ButtonLink
            href="/faq"
            variant="secondary"
            className="mt-8"
            trackLabel="All FAQs"
            trackLocation="home-faq"
          >
            All questions
          </ButtonLink>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  )
}
