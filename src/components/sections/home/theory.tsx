'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { RevealText } from '@/components/ui/reveal'
import { theorySteps } from '@/data/home'

/** Sticky storytelling section: the brand's four-step "theory", with a scroll-linked progress rail. */
export function Theory() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      data-track-section="theory"
      aria-labelledby="theory-title"
      className="relative py-28 sm:py-36"
    >
      <div ref={ref} className="container-page grid gap-16 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <p className="eyebrow">The Crunch Theory</p>
          <RevealText
            id="theory-title"
            text="Wanting to snack better is easy. Actually *doing it* is the hard part."
            className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-5xl"
          />
          <p className="mt-6 max-w-md text-lg text-muted">
            So we built a snack around four simple ideas — the theory behind every pouch.
          </p>
        </div>

        <ol className="relative lg:col-span-6 lg:col-start-7">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.15rem] w-px bg-forest/10"
          >
            <motion.div style={{ scaleY: progress }} className="size-full origin-top bg-forest" />
          </div>
          {theorySteps.map((s, i) => (
            <motion.li
              key={s.step}
              initial={{ opacity: 0.25 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: '-45% 0px -45% 0px' }}
              transition={{ duration: 0.5 }}
              className="relative grid grid-cols-[2.3rem_1fr] gap-6 pb-20 last:pb-0"
            >
              <span className="relative z-10 grid size-[2.3rem] place-items-center rounded-full border border-forest/20 bg-cream text-xs font-bold text-forest">
                {s.step}
              </span>
              <div>
                <h3 className="text-3xl leading-tight sm:text-4xl">{s.title}</h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{s.body}</p>
                {i === 0 && (
                  <p className="mt-4 text-sm text-olive">
                    94% of Indian snackers want nutrition without compromising on flavour (IBEF,
                    2025).
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
