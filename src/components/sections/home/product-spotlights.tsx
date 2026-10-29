'use client'

import { motion, useDragControls, useInView, type PanInfo, type Variants } from 'motion/react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'

import { InterestButton } from '@/components/flavour/interest-button'
import { Makhana } from '@/components/illustrations/makhana'
import { WatercolorBlob } from '@/components/illustrations/watercolor-blob'
import { ArrowIcon, ButtonLink } from '@/components/ui/button'
import { flavourNames, productLines, type ProductLine } from '@/data/products'
import { trackEvent, type AnalyticsEventParams } from '@/lib/analytics'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/lib/use-media-query'

/** Time each product stays on screen while autoplaying. */
const AUTOPLAY_MS = 4000
const SWIPE_THRESHOLD_PX = 60
const lines = productLines

type Method = AnalyticsEventParams<'spotlight_view'>['method']
type SlideState = 'active' | 'before' | 'after'

const ease = [0.16, 1, 0.3, 1] as const

/** Slides left of the active one wait off to the left, later ones to the right. */
const slideVariants: Variants = {
  active: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.08, delayChildren: 0.1 } },
  before: { opacity: 0, transition: { duration: 0.35 } },
  after: { opacity: 0, transition: { duration: 0.35 } },
}
const packVariants: Variants = {
  active: { x: 0, rotate: -3, scale: 1, transition: { duration: 0.8, ease } },
  before: { x: -140, rotate: -14, scale: 0.92, transition: { duration: 0.5, ease } },
  after: { x: 140, rotate: 10, scale: 0.92, transition: { duration: 0.5, ease } },
}
const copyVariants: Variants = {
  active: { x: 0, opacity: 1, transition: { duration: 0.7, ease } },
  before: { x: -40, opacity: 0, transition: { duration: 0.35 } },
  after: { x: 40, opacity: 0, transition: { duration: 0.35 } },
}
const badgeVariants: Variants = {
  active: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 18 } },
  before: { opacity: 0, scale: 0.6 },
  after: { opacity: 0, scale: 0.6 },
}

/**
 * Auto-playing product-range slider with arrows, pills, swipe and ←/→ keys. Each slide links to
 * the line's page, where its flavours live. Autoplay pauses on hover, focus, when off-screen or
 * in a hidden tab, via the pause button, and is off entirely for reduced-motion users
 * (WCAG 2.2.2). Every slide stays in the DOM (inactive ones are inert), so the height never jumps
 * and crawlers see every product.
 */
export function ProductSpotlights() {
  const rootRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [tabHidden, setTabHidden] = useState(false)
  const inView = useInView(rootRef, { amount: 0.35 })
  const reduceMotion = usePrefersReducedMotion()
  const dragControls = useDragControls()
  // Set while a swipe is in progress so the release doesn't also "click" a link under the finger.
  const swiping = useRef(false)

  const total = lines.length
  const current = lines[active]
  const autoplay = !reduceMotion
  const running = autoplay && !userPaused && !hovered && !focused && !tabHidden && inView

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const goTo = useCallback(
    (index: number, method?: Method) => {
      const next = (index + total) % total
      setActive(next)
      if (method) trackEvent('spotlight_view', { flavour: lines[next].slug, method })
    },
    [total],
  )

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD_PX) goTo(active + 1, 'swipe')
    else if (info.offset.x > SWIPE_THRESHOLD_PX) goTo(active - 1, 'swipe')
    window.setTimeout(() => (swiping.current = false), 0)
  }

  return (
    <motion.section
      data-track-section="product-slider"
      ref={rootRef}
      aria-roledescription="carousel"
      aria-labelledby="spotlights-title"
      animate={{ backgroundColor: current.spotlight.bg }}
      initial={false}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{ '--panel-accent': current.spotlight.accent } as CSSProperties}
      className="grain relative isolate overflow-hidden py-24 text-paper sm:py-28"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      // Pause for keyboard focus only; a mouse click on an arrow shouldn't stop autoplay.
      onFocus={(e) => e.target.matches(':focus-visible') && setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') goTo(active + 1, 'key')
        if (e.key === 'ArrowLeft') goTo(active - 1, 'key')
      }}
    >
      <h2 id="spotlights-title" className="sr-only">
        Meet the range
      </h2>

      {/* Ambient makhana */}
      {[
        'top-[8%] left-[3%] size-12',
        'top-[12%] right-[4%] size-16',
        'top-[58%] left-[47%] size-10',
      ].map((spot, i) => (
        <Makhana
          key={spot}
          aria-hidden="true"
          className={cn('absolute -z-10 hidden animate-float opacity-60 lg:block', spot)}
          style={{ animationDelay: `${-i * 1.4}s` }}
        />
      ))}

      <div className="container-page">
        {/* Stage: every slide shares one grid cell, so the tallest sets the height. */}
        {/* Swipe is touch-only, so desktop users can still select text. */}
        <motion.div
          className="grid touch-pan-y"
          drag="x"
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          dragSnapToOrigin
          onPointerDown={(e) => e.pointerType !== 'mouse' && dragControls.start(e)}
          onDragStart={() => (swiping.current = true)}
          onDragEnd={onDragEnd}
          onClickCapture={(e) => {
            if (swiping.current) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          {lines.map((line, i) => (
            <Slide
              key={line.slug}
              line={line}
              index={i}
              total={total}
              state={i === active ? 'active' : i < active ? 'before' : 'after'}
            />
          ))}
        </motion.div>

        {/* Controls */}
        <div className="mt-12 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Choose a product"
          >
            {lines.map((line, i) => {
              const isActive = i === active
              return (
                <button
                  key={line.slug}
                  type="button"
                  onClick={() => goTo(i, 'tab')}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Show ${line.name}`}
                  className={cn(
                    'relative shrink-0 overflow-hidden rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300',
                    isActive
                      ? 'border-transparent bg-paper text-forest-deep'
                      : 'border-paper/25 text-paper/75 hover:border-paper/60 hover:text-paper',
                  )}
                >
                  <span className="relative z-10">{line.name}</span>
                  {/* Autoplay progress — its animation end advances the slider */}
                  {isActive && autoplay && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 bg-[var(--panel-accent)]/45"
                      style={{
                        animation: `spotlight-progress ${AUTOPLAY_MS}ms linear forwards`,
                        animationPlayState: running ? 'running' : 'paused',
                      }}
                      onAnimationEnd={() => goTo(active + 1)}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <p
              className="mr-2 font-display text-sm font-bold text-paper/60 tabular-nums"
              aria-hidden="true"
            >
              {String(active + 1).padStart(2, '0')}
              <span className="text-paper/30"> / {String(total).padStart(2, '0')}</span>
            </p>
            {autoplay && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
                className="grid size-11 place-items-center rounded-full border border-paper/25 text-paper/80 transition-colors hover:border-paper hover:text-paper"
              >
                {userPaused ? <PlayIcon /> : <PauseIcon />}
              </button>
            )}
            <ArrowButton
              direction="prev"
              label={`Previous product: ${lines[(active - 1 + total) % total].name}`}
              onClick={() => goTo(active - 1, 'arrow')}
            />
            <ArrowButton
              direction="next"
              label={`Next product: ${lines[(active + 1) % total].name}`}
              onClick={() => goTo(active + 1, 'arrow')}
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Showing {active + 1} of {total}: {current.name}
        </p>
      </div>
    </motion.section>
  )
}

const badgeSpots = [
  'top-[10%] -left-2 sm:-left-4',
  'top-[46%] -right-2 sm:-right-4',
  'bottom-[10%] left-[6%]',
] as const

type SlideProps = { line: ProductLine; index: number; total: number; state: SlideState }

function Slide({ line, index, total, state }: SlideProps) {
  const isActive = state === 'active'
  const titleId = `spotlight-${line.slug}`

  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-labelledby={titleId}
      aria-hidden={!isActive || undefined}
      inert={!isActive}
      variants={slideVariants}
      initial={false}
      animate={state}
      className={cn(
        'col-start-1 row-start-1 grid items-center gap-12 lg:grid-cols-2 lg:gap-20',
        !isActive && 'pointer-events-none',
      )}
    >
      {/* Pack shot */}
      <div className="relative mx-auto w-full max-w-[min(24rem,78vw)]">
        <WatercolorBlob
          color={line.spotlight.accent}
          className="absolute -top-10 -left-10 w-3/4 opacity-40"
        />
        <WatercolorBlob
          color={line.spotlight.accent}
          variant={1}
          className="absolute -right-8 -bottom-8 w-2/3 opacity-30"
        />
        <motion.div variants={packVariants} className="relative">
          <div className={cn('animate-float', !isActive && '[animation-play-state:paused]')}>
            <Image
              src={line.image}
              alt={line.imageAlt}
              sizes="(min-width: 1024px) 24rem, 78vw"
              placeholder="blur"
              draggable={false}
              className="pointer-events-none aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_40px_80px_-20px_rgb(0_0_0/0.55)] select-none"
            />
          </div>
        </motion.div>
        {line.highlights.map((label, i) => (
          <motion.span
            key={label}
            variants={badgeVariants}
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
      <motion.div variants={copyVariants}>
        <p className="flex items-center gap-3 eyebrow" style={{ color: line.spotlight.accent }}>
          {line.sticker}
          <span aria-hidden="true" className="text-paper/40">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </p>
        <h3
          id={titleId}
          className="mt-4 text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] text-paper sm:text-6xl xl:text-7xl"
        >
          {line.name}
        </h3>
        <p className="mt-3 text-lg font-semibold text-paper/80">{line.englishName}</p>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-paper/75">{line.description}</p>
        <dl className="mt-8 grid max-w-lg grid-cols-[1fr_auto] divide-x divide-paper/15 overflow-hidden rounded-2xl border border-paper/15">
          <div className="px-4 py-4">
            <dt className="text-[0.65rem] tracking-wider text-paper/60 uppercase sm:text-xs">
              {line.flavours.length} flavours
            </dt>
            <dd className="mt-1 font-semibold text-paper">{flavourNames(line).join(' · ')}</dd>
          </div>
          <div className="px-4 py-4 sm:px-6">
            <dt className="text-[0.65rem] tracking-wider text-paper/60 uppercase sm:text-xs">
              From
            </dt>
            <dd className="mt-1 font-display text-2xl font-bold whitespace-nowrap text-paper">
              ₹{line.fromPriceInr}
            </dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink
            href={line.href}
            variant="light"
            size="lg"
            draggable={false}
            trackLabel={`Spotlight explore: ${line.name}`}
            trackLocation="spotlight"
          >
            Explore the flavours <ArrowIcon />
          </ButtonLink>
          {!line.live && <InterestButton flavour={line.slug} location="spotlight" tone="dark" />}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ArrowButton({
  direction,
  label,
  onClick,
}: {
  direction: 'prev' | 'next'
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group grid size-14 place-items-center rounded-full bg-paper text-forest-deep shadow-lg transition-[transform,background-color] duration-300 ease-out-expo hover:scale-105 hover:bg-[var(--panel-accent)] active:scale-95"
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className={cn(
          'size-5 transition-transform duration-300',
          direction === 'prev'
            ? 'rotate-180 group-hover:-translate-x-0.5'
            : 'group-hover:translate-x-0.5',
        )}
      >
        <path
          d="M4 10h12m0 0-5-5m5 5-5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="currentColor">
      <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
      <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="currentColor">
      <path d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.3-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7Z" />
    </svg>
  )
}
