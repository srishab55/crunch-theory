import { Makhana } from '@/components/illustrations/makhana'
import { ArrowIcon, ButtonLink } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'
import { Reveal, RevealText } from '@/components/ui/reveal'

/** Invites visitors to a blind taste test — the deck's #1 action against the "healthy = bland" myth. */
export function CrunchTest() {
  return (
    <section
      aria-labelledby="crunch-test-title"
      className="relative overflow-hidden bg-mustard/30 py-28 sm:py-36"
    >
      <Makhana
        aria-hidden="true"
        className="absolute top-10 -left-16 size-56 animate-spin-slow opacity-60"
      />
      <Makhana
        aria-hidden="true"
        className="absolute -right-10 bottom-0 size-72 animate-spin-slow opacity-60 [animation-direction:reverse]"
      />
      <div className="relative container-page text-center">
        <p className="eyebrow">The blind crunch test</p>
        <RevealText
          id="crunch-test-title"
          text="Think healthy snacks taste bland? Prove us wrong."
          className="mx-auto mt-4 max-w-4xl text-5xl leading-[1] font-medium tracking-tight sm:text-7xl"
        />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70">
            We’re running blind taste tests against India’s favourite chips and namkeen in offices
            and campuses. Sign your team up — we bring the snacks, you bring the honest opinions.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="mt-10">
          <Magnetic>
            <ButtonLink
              href="/contact"
              size="lg"
              trackLabel="Book crunch test"
              trackLocation="crunch-test"
            >
              Book a taste test <ArrowIcon />
            </ButtonLink>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
