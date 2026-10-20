import { NewsletterForm } from '@/components/forms/newsletter-form'
import { WatercolorBlob } from '@/components/illustrations/watercolor-blob'
import { Reveal, RevealText } from '@/components/ui/reveal'

export function NewsletterBand({ location }: { location: string }) {
  return (
    <section aria-labelledby="newsletter-title" className="container-page pb-28 sm:pb-36">
      <div className="grain relative isolate overflow-hidden rounded-[2.5rem] bg-terracotta px-6 py-16 text-paper sm:px-14 sm:py-20">
        <WatercolorBlob
          color="var(--color-mustard)"
          className="absolute -top-20 -right-16 -z-10 w-96 opacity-70"
        />
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow !text-paper/80">The Crunch Club</p>
            <RevealText
              id="newsletter-title"
              text="New flavours drop here *first.*"
              accentClassName="text-forest-deep"
              className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.035em] text-paper sm:text-5xl"
            />
            <p className="mt-4 max-w-md text-paper/80">
              One email a month: flavour launches, member-only trial offers and the occasional snack
              hack.
            </p>
          </div>
          <Reveal delay={0.15}>
            <NewsletterForm location={location} inverted />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
