import { Makhana } from '@/components/illustrations/makhana'
import { Counter } from '@/components/ui/counter'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { stats } from '@/data/home'
import { cn } from '@/lib/cn'

/** "Why makhana" bento grid. Includes an answer-first definition block for search & AI engines. */
export function Stats() {
  return (
    <section aria-labelledby="why-title" className="py-28 sm:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why makhana?"
          title="A tiny lotus seed with a *big crunch.*"
          lede="Makhana — also called fox nut or lotus seed — is the popped seed of the Euryale fox lotus, grown in the ponds of Bihar. Roasted, it turns light and crisp: the perfect base for a snack that tastes indulgent without the deep-fryer."
        />
        <div className="mt-16 grid auto-rows-[minmax(13rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={cn(
                'relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-8',
                i === 0 && 'bg-forest text-paper lg:col-span-2 lg:row-span-2',
                i === 1 && 'bg-mustard/35',
                i === 2 && 'bg-sage/40',
                i === 3 && 'bg-terracotta/25 lg:col-span-2',
              )}
            >
              {i === 0 && <Makhana className="absolute -right-10 -bottom-10 size-72 opacity-90" />}
              <p
                className={cn(
                  'relative font-display leading-none font-extrabold tracking-[-0.05em]',
                  i === 0 ? 'text-[7rem] text-mustard sm:text-[10rem]' : 'text-6xl text-forest',
                )}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <div className="relative mt-6">
                <h3 className={cn('font-sans text-lg font-bold', i === 0 && 'text-paper')}>
                  {s.label}
                </h3>
                <p className={cn('mt-1 text-sm', i === 0 ? 'text-paper/65' : 'text-muted')}>
                  {s.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
