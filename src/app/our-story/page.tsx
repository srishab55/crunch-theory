import Image from 'next/image'

import { PageHero } from '@/components/layout/page-hero'
import { NewsletterBand } from '@/components/sections/newsletter-band'
import { JsonLd } from '@/components/seo/json-ld'
import { ArrowIcon, ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { aboutPageSchema, buildMetadata } from '@/lib/seo'

const summary =
  'Crunch Theory is an Indian snack brand that makes roasted, never-fried makhana (puffed lotus seeds) in bold flavours. We started with one question: why should a better snack feel like a compromise?'

export const metadata = buildMetadata({
  title: 'Our Story',
  description: summary,
  path: '/our-story',
})

const journey = [
  {
    title: 'Harvested',
    body: 'Fox-lotus seeds are hand-gathered from the ponds of Mithila, in the eastern Indian state of Bihar.',
  },
  {
    title: 'Sun-dried & popped',
    body: 'Seeds are dried, then popped over heat into light, airy makhana.',
  },
  {
    title: 'Slow-roasted',
    body: 'We roast in small batches with a little rice bran oil. No deep-frying, ever.',
  },
  {
    title: 'Seasoned & sealed',
    body: 'Tossed in real spices, then packed in resealable pouches to stay crisp.',
  },
]

const promises = [
  {
    title: 'Taste first',
    body: 'If it doesn’t beat your current snack in a blind test, it doesn’t ship.',
  },
  {
    title: 'Claims we can prove',
    body: 'No miracle weight-loss talk. Just real ingredients and real numbers.',
  },
  {
    title: 'Labels in five seconds',
    body: 'Ingredients, serving size and allergens, front and centre.',
  },
  {
    title: 'Fair pricing',
    body: '₹49 trial packs and multipacks that keep everyday snacking affordable.',
  },
]

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="We love snacks. We just wanted *better* ones."
        lede={summary}
        crumbs={[{ name: 'Our Story', path: '/our-story' }]}
      />

      <section className="container-page grid gap-12 pb-28 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <Image
            src="/images/makhana-burst.jpg"
            alt="Roasted makhana bursting around a Crunch Theory pouch"
            width={1280}
            height={720}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover"
          />
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-muted">
          <p>
            It’s 4 pm. You’re hungry, a little stressed, and the office pantry has chips, biscuits
            and namkeen (fried savoury snack mixes). You know the “healthy” options exist — but they
            taste like cardboard, cost too much and make big promises nobody believes.
          </p>
          <p>
            Crunch Theory exists to close that gap between{' '}
            <strong className="text-forest">wanting</strong> to snack better and{' '}
            <strong className="text-forest">actually doing it</strong>. We chose makhana because it
            has a crunch that rivals any chip, and we roast it instead of frying.
          </p>
          <p>
            Our theory is simple: taste earns the first bite, trust earns the purchase, convenience
            builds the habit and satisfaction brings you back.
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="process-title" className="bg-forest-deep py-28 text-paper">
        <div className="container-page">
          <SectionHeading
            id="process-title"
            eyebrow="From pond to pouch"
            title="How makhana becomes *Crunch Theory.*"
            inverted
          />
          <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((p, i) => (
              <li key={p.title}>
                <Reveal
                  delay={i * 0.08}
                  className="h-full rounded-[2rem] border border-paper/10 p-8"
                >
                  <span className="font-display text-5xl font-extrabold text-mustard">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 text-2xl text-paper">{p.title}</h3>
                  <p className="mt-3 text-paper/70">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="promises-title" className="container-page py-28">
        <SectionHeading
          id="promises-title"
          eyebrow="Our promises"
          title="Four things we’ll *never* compromise on."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {promises.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="rounded-[2rem] bg-paper p-8 sm:p-10">
              <h3 className="text-3xl">{p.title}</h3>
              <p className="mt-3 text-lg text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <ButtonLink
            href="/flavours"
            size="lg"
            trackLabel="Story to flavours"
            trackLocation="our-story"
          >
            Taste the theory <ArrowIcon />
          </ButtonLink>
        </Reveal>
      </section>

      <NewsletterBand location="our-story" />
      <JsonLd data={aboutPageSchema(summary)} />
    </>
  )
}
