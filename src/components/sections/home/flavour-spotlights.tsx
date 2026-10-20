'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, useSyncExternalStore, type CSSProperties } from 'react'

import { FlavourVisual } from '@/components/flavour/flavour-visual'
import { Makhana } from '@/components/illustrations/makhana'
import { WatercolorBlob } from '@/components/illustrations/watercolor-blob'
import { ArrowIcon, ButtonLink } from '@/components/ui/button'
import { Reveal, RevealText } from '@/components/ui/reveal'
import { flavours, type Flavour } from '@/data/flavours'
import { cn } from '@/lib/cn'

const DESKTOP_QUERY = '(min-width: 1024px)'

/** Client-only media query; `false` during prerender so the server HTML is the mobile layout. */
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(DESKTOP_QUERY)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  )
}

/**
 * One full-screen spotlight per flavour. On desktop the panels are sticky, so each new flavour
 * slides up over the previous one like a deck of cards (the covered card shrinks and dims).
 * On smaller screens they simply stack. All copy stays in the DOM for search and AI crawlers.
 */
export function FlavourSpotlights() {
  const ref = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section aria-labelledby="spotlights-title" className="relative bg-forest-deep">
      <h2 id="spotlights-title" className="sr-only">
        Meet the flavours
      </h2>
      <div ref={ref} className="relative">
        {flavours.map((f, i) => (
          <SpotlightPanel
            key={f.slug}
            flavour={f}
            index={i}
            total={flavours.length}
            progress={scrollYProgress}
            animateStack={isDesktop && !reduceMotion}
          />
        ))}
      </div>
    </section>
  )
}

const badgeSpots = [
  'top-[10%] -left-2 sm:-left-4',
  'top-[46%] -right-2 sm:-right-4',
  'bottom-[10%] left-[6%]',
] as const

const floaterSpots = [
  'top-[12%] left-[6%] size-14',
  'top-[22%] right-[8%] size-20',
  'bottom-[16%] left-[14%] size-10',
  'bottom-[10%] right-[18%] size-16',
] as const

type PanelProps = {
  flavour: Flavour
  index: number
  total: number
  progress: MotionValue<number>
  animateStack: boolean
}

function SpotlightPanel({ flavour: f, index, total, progress, animateStack }: PanelProps) {
  // While the next panel slides over this one (one viewport of scroll), shrink and dim it.
  const span = Math.max(total - 1, 1)
  const range = [index / span, (index + 1) / span]
  const scale = useTransform(progress, range, [1, 0.92])
  const dim = useTransform(progress, range, [0, 0.5])
  const covered = animateStack && index < total - 1

  const flip = index % 2 === 1
  const badges = [...f.spotlight.badges, `${f.ingredients.length} ingredients`]
  const stats = f.nutrition.filter((n) => ['Energy', 'Protein', 'Dietary fibre'].includes(n.label))
  const titleId = `spotlight-${f.slug}`

  return (
    <motion.article
      aria-labelledby={titleId}
      style={
        {
          backgroundColor: f.spotlight.bg,
          '--panel-accent': f.spotlight.accent,
          ...(covered && { scale }),
        } as CSSProperties
      }
      className={cn(
        'grain relative isolate flex origin-top items-center overflow-hidden py-24 text-paper sm:py-28 lg:sticky lg:top-0 lg:h-[100svh] lg:py-0',
        index > 0 && 'lg:rounded-t-[2.5rem] lg:shadow-[0_-30px_60px_-30px_rgb(0_0_0/0.6)]',
      )}
    >
      {covered && (
        <motion.div
          aria-hidden="true"
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 z-20 bg-black"
        />
      )}

      {floaterSpots.map((spot, i) => (
        <Makhana
          key={spot}
          aria-hidden="true"
          className={cn('absolute -z-10 animate-float opacity-70', spot)}
          style={{ animationDelay: `${-(index * 2 + i * 1.3)}s` }}
        />
      ))}

      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Pack shot */}
        <div
          className={cn(
            'relative mx-auto w-full max-w-[min(26rem,80vw)] lg:max-w-[min(28rem,56svh)]',
            flip && 'lg:order-2',
          )}
        >
          <WatercolorBlob
            color={f.palette.primary}
            className="absolute -top-10 -left-10 w-3/4 opacity-60"
          />
          <WatercolorBlob
            color={f.palette.secondary}
            variant={1}
            className="absolute -right-8 -bottom-8 w-2/3 opacity-50"
          />
          <div
            className={cn('relative animate-float', flip ? 'rotate-3' : '-rotate-3')}
            style={{ animationDelay: `${-index * 1.5}s` }}
          >
            <FlavourVisual
              flavour={f}
              sizes="(min-width: 1024px) 28rem, 80vw"
              className="rounded-[2rem] shadow-[0_40px_80px_-20px_rgb(0_0_0/0.55)]"
            />
          </div>
          {badges.map((label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 260, damping: 18 }}
              className={cn(
                'absolute z-10 rounded-full bg-paper px-4 py-2 text-sm font-semibold whitespace-nowrap text-forest-deep shadow-lg',
                badgeSpots[i],
              )}
            >
              {label}
            </motion.span>
          ))}
        </div>

        {/* Copy */}
        <div className={cn(flip && 'lg:order-1')}>
          <p className="flex items-center gap-3 eyebrow !text-[var(--panel-accent)]">
            {f.spotlight.label}
            <span aria-hidden="true" className="text-paper/40">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </p>
          <RevealText
            as="h3"
            id={titleId}
            text={f.name}
            className="mt-4 text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] text-paper sm:text-6xl xl:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/75">{f.description}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-paper/15 overflow-hidden rounded-2xl border border-paper/15">
              {stats.map((n) => (
                <div key={n.label} className="px-4 py-4">
                  <dt className="text-xs tracking-wider text-paper/60 uppercase">{n.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-paper">
                    {n.perServing}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-paper/50">Per {f.servingSize} serving.</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={`/flavours/${f.slug}`}
              variant="light"
              size="lg"
              trackLabel={`Spotlight details: ${f.shortName}`}
              trackLocation="spotlight"
            >
              Ingredients & nutrition <ArrowIcon />
            </ButtonLink>
            <ButtonLink
              href={`/flavours/${f.slug}#buy`}
              variant="secondary"
              size="lg"
              className="border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-forest-deep"
              trackLabel={`Spotlight order: ${f.shortName}`}
              trackLocation="spotlight"
            >
              Order now
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </motion.article>
  )
}
