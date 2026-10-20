'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'

import { Makhana } from '@/components/illustrations/makhana'
import { WatercolorBlob } from '@/components/illustrations/watercolor-blob'
import { ArrowIcon, ButtonLink } from '@/components/ui/button'
import { Reveal, RevealText } from '@/components/ui/reveal'
import { featuredFlavour } from '@/data/flavours'

const badges = [
  { label: 'Roasted, not fried', className: 'top-[12%] -left-2 sm:left-0' },
  { label: 'Gluten-free', className: 'top-[46%] -right-2 sm:right-0' },
  { label: '6 ingredients', className: 'bottom-[14%] left-[4%]' },
]

const floaters = [
  { className: 'top-[8%] left-[8%] size-14', speed: -160 },
  { className: 'top-[30%] right-[6%] size-20', speed: -260 },
  { className: 'bottom-[18%] left-[16%] size-10', speed: -90 },
  { className: 'bottom-[6%] right-[22%] size-16', speed: -200 },
  { className: 'top-[60%] left-[2%] size-8', speed: -320 },
]

export function ProductSpotlight() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8])
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section
      ref={ref}
      aria-labelledby="spotlight-title"
      className="grain relative isolate overflow-hidden bg-forest py-28 text-paper sm:py-36"
    >
      {floaters.map((f, i) => (
        <Floater key={i} progress={scrollYProgress} {...f} />
      ))}

      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md">
          <WatercolorBlob
            color="var(--color-mustard)"
            className="absolute -top-10 -left-10 w-3/4 opacity-60"
          />
          <WatercolorBlob
            color="var(--color-terracotta)"
            variant={1}
            className="absolute -right-8 -bottom-8 w-2/3 opacity-50"
          />
          <motion.div style={{ rotate, y }} className="relative">
            <div className="animate-float">
              <Image
                src={featuredFlavour.image ?? '/images/pouch-pink-salt-pepper.jpg'}
                alt={`Crunch Theory ${featuredFlavour.name} roasted makhana pouch`}
                width={900}
                height={900}
                sizes="(min-width: 1024px) 28rem, 80vw"
                className="aspect-square rounded-[2rem] object-cover shadow-[0_40px_80px_-20px_rgb(0_0_0/0.5)]"
              />
            </div>
          </motion.div>
          {badges.map((b, i) => (
            <motion.span
              key={b.label}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 260, damping: 18 }}
              className={`absolute z-10 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-forest shadow-lg ${b.className}`}
            >
              {b.label}
            </motion.span>
          ))}
        </div>

        <div>
          <p className="eyebrow !text-mustard">Bestseller</p>
          <RevealText
            id="spotlight-title"
            text={featuredFlavour.name}
            className="mt-4 text-5xl leading-[0.98] font-extrabold tracking-[-0.035em] text-paper sm:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/75">
              {featuredFlavour.description}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl bg-paper/10">
              {featuredFlavour.nutrition
                .filter((n) => ['Energy', 'Protein', 'Dietary fibre'].includes(n.label))
                .map((n) => (
                  <div key={n.label} className="bg-forest px-4 py-5">
                    <dt className="text-xs tracking-wider text-paper/60 uppercase">{n.label}</dt>
                    <dd className="mt-1 font-display text-2xl font-bold text-paper">
                      {n.perServing}
                    </dd>
                  </div>
                ))}
            </dl>
            <p className="mt-3 text-xs text-paper/50">Per {featuredFlavour.servingSize} serving.</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <ButtonLink
              href={`/flavours/${featuredFlavour.slug}`}
              variant="light"
              size="lg"
              trackLabel="Spotlight view flavour"
              trackLocation="spotlight"
            >
              See ingredients & nutrition <ArrowIcon />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Floater({
  progress,
  speed,
  className,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  speed: number
  className: string
}) {
  const y = useTransform(progress, [0, 1], [0, speed])
  const rotate = useTransform(progress, [0, 1], [0, speed / 2])
  return (
    <motion.div
      aria-hidden="true"
      style={{ y, rotate }}
      className={`absolute -z-10 opacity-80 ${className}`}
    >
      <Makhana className="size-full" />
    </motion.div>
  )
}
