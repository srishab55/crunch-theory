'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

import { Makhana } from '@/components/illustrations/makhana'
import { WatercolorBlob } from '@/components/illustrations/watercolor-blob'
import { moments, toneColor, type Moment } from '@/data/home'
import { cn } from '@/lib/cn'

/**
 * Pinned horizontal-scroll gallery on desktop; native swipe carousel on touch/small screens.
 */
export function Moments() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const desktop = window.matchMedia('(min-width: 1024px)')
    // Pinning only applies on desktop; smaller screens use the native swipe carousel.
    const measure = () =>
      setDistance(desktop.matches ? Math.max(0, track.scrollWidth - window.innerWidth) : 0)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  return (
    <section
      data-track-section="moments"
      ref={sectionRef}
      aria-labelledby="moments-title"
      className="relative lg:h-[var(--pin-height)]"
      style={{ '--pin-height': `calc(100vh + ${distance}px)` } as CSSProperties}
    >
      <div className="overflow-hidden py-24 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
        <div className="container-page mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="eyebrow">Snack o’clock, any o’clock</p>
            <h2
              id="moments-title"
              className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            >
              Made for your <span className="accent text-terracotta">moments.</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-muted md:block">
            Desk, lunchbox, hostel or gym bag — there’s a pack size for every snack situation.
          </p>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-8 lg:w-max lg:snap-none lg:overflow-visible lg:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {moments.map((m, i) => (
            <MomentCard key={m.title} moment={m} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function MomentCard({ moment, index }: { moment: Moment; index: number }) {
  return (
    <article
      className={cn(
        'relative isolate flex h-[28rem] w-[80vw] max-w-[24rem] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[2rem] p-8 sm:h-[32rem]',
        moment.image ? 'text-paper' : 'bg-paper',
      )}
    >
      {moment.image ? (
        <>
          <Image src={moment.image} alt="" fill sizes="24rem" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/85 via-forest-deep/20 to-transparent" />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <WatercolorBlob
            color={toneColor[moment.tone]}
            variant={(index % 3) as 0 | 1 | 2}
            className="absolute -top-10 -right-12 w-72"
          />
          <Makhana className="absolute top-16 right-14 size-24 rotate-12" />
          <Makhana className="absolute top-40 right-36 size-14 -rotate-45" />
        </div>
      )}
      <p
        className={cn(
          'font-display text-5xl font-extrabold tracking-[-0.04em]',
          moment.image ? 'text-paper' : 'text-forest/80',
        )}
      >
        {moment.time}
      </p>
      <div>
        <p className={cn('eyebrow', moment.image && '!text-mustard')}>{moment.persona}</p>
        <h3 className={cn('mt-3 text-3xl', moment.image && 'text-paper')}>{moment.title}</h3>
        <p className={cn('mt-3 leading-relaxed', moment.image ? 'text-paper/85' : 'text-muted')}>
          {moment.body}
        </p>
      </div>
    </article>
  )
}
