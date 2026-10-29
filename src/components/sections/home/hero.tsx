'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { ArrowIcon, ButtonLink } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/magnetic'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/lib/use-media-query'

const headline = ['The', 'smart', 'way', 'to', 'snack.']

/**
 * Full-bleed video hero. The poster is rendered with next/image (preload) so it is the LCP
 * element. The video (~1 MB) is only mounted once the page has finished loading, so it never
 * competes with critical resources, and never for reduced-motion or Save-Data visitors; it fades
 * in over the poster once it can play. Headline animation is pure CSS so text is visible before
 * hydration.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = usePrefersReducedMotion()
  const [loadVideo, setLoadVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (connection?.saveData) return
    const start = () => window.setTimeout(() => setLoadVideo(true), 0)
    if (document.readyState === 'complete') {
      start()
      return
    }
    window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const mediaRadius = useTransform(scrollYProgress, [0, 1], ['0rem', '3rem'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative h-[100svh] min-h-[640px] overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={reduceMotion ? undefined : { scale: mediaScale, borderRadius: mediaRadius }}
      >
        <Image
          src="/media/hero-poster.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-[65%_center]"
        />
        {loadVideo && !reduceMotion && (
          <video
            className="absolute inset-0 size-full object-cover object-[65%_center] transition-opacity duration-1000"
            style={{ opacity: videoReady ? 1 : 0 }}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoReady(true)}
            aria-hidden="true"
          >
            <source src="/media/hero.webm" type="video/webm" />
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
        )}
        {/* Readability wash — matches the pouch's paper tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-cream from-35% via-cream/85 via-60% to-cream/20 md:bg-gradient-to-r md:from-cream md:from-0% md:via-cream/70 md:via-50% md:to-transparent" />
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative container-page flex h-full flex-col justify-end pb-24 md:justify-center md:pb-0"
      >
        <h1
          id="hero-title"
          className="max-w-3xl text-[clamp(3.4rem,9.5vw,8rem)] leading-[0.9] font-extrabold tracking-[-0.045em]"
        >
          {/* Brand name inside the H1 (styled as the eyebrow) — the strongest on-page signal for
              ranking on the brand query "crunch theory". */}
          <span
            className="hero-fade mb-5 block font-sans eyebrow leading-normal"
            style={{ animationDelay: '0.1s' }}
          >
            Crunch Theory · Healthy Indian snacks · Made in India
          </span>
          {headline.map((word, i) => (
            <span
              key={word}
              className={cn(
                'inline-block overflow-hidden pb-[0.1em] align-bottom',
                word === 'smart' && '-mr-[0.08em] pr-[0.08em]',
              )}
            >
              <span
                className={cn(
                  'hero-word inline-block',
                  word === 'smart' && 'accent text-terracotta',
                )}
                style={{ animationDelay: `${0.2 + i * 0.08}s` }}
              >
                {word}
                {i < headline.length - 1 && ' '}
              </span>
            </span>
          ))}
        </h1>
        <p
          className="hero-fade mt-6 max-w-md text-lg leading-relaxed text-ink/75 sm:text-xl"
          style={{ animationDelay: '0.75s' }}
        >
          Big crunch, honest labels. Roasted makhana (puffed lotus seeds), crunchy chickpeas, veggie
          chips and baked millet chips, all in bold Indian flavours.
        </p>
        <div
          className="hero-fade mt-9 flex flex-wrap items-center gap-4"
          style={{ animationDelay: '0.9s' }}
        >
          <Magnetic>
            <ButtonLink
              href="/products"
              size="lg"
              trackLabel="Explore the range"
              trackLocation="hero"
            >
              Explore the range <ArrowIcon />
            </ButtonLink>
          </Magnetic>
          <ButtonLink
            href="#where-to-buy"
            size="lg"
            variant="secondary"
            trackLabel="Where to buy"
            trackLocation="hero"
          >
            Where to buy
          </ButtonLink>
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="hero-fade absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.3em] text-forest/60 uppercase md:flex"
        style={{ animationDelay: '1.3s' }}
      >
        Scroll
        <span className="h-10 w-px origin-top animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-forest/50" />
      </div>
    </section>
  )
}
