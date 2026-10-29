'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Link from 'next/link'
import type { PointerEvent } from 'react'

import type { Flavour } from '@/data/flavours'
import { isLive } from '@/data/site'
import { trackEvent } from '@/lib/analytics'

import { FlavourVisual } from './flavour-visual'
import { HeatMeter } from './heat-meter'

type Props = {
  flavour: Flavour
  index: number
  /** Which list the card sits in, for GA4 `select_item` (e.g. "makhana-flavours"). */
  listName: string
  headingLevel?: 'h2' | 'h3'
}

/** Product card with a subtle 3D tilt that follows the pointer. */
export function FlavourCard({ flavour, index, listName, headingLevel = 'h3' }: Props) {
  const Heading = headingLevel
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  const minPrice = Math.min(...flavour.packs.map((p) => p.priceInr))

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="group relative rounded-[2rem] bg-paper p-3 shadow-[0_20px_50px_-30px_rgb(36_35_30/0.4)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgb(36_35_30/0.45)]"
    >
      <div className="relative overflow-hidden rounded-[1.75rem]">
        {!isLive && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-paper/90 px-3 py-1 text-[0.65rem] font-semibold tracking-wide text-forest uppercase shadow-sm backdrop-blur">
            Coming soon
          </span>
        )}
        <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
          <FlavourVisual
            flavour={flavour}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      </div>
      <div className="px-3 pt-5 pb-3">
        <div className="flex items-center justify-between gap-3">
          <HeatMeter level={flavour.heat} />
          <span className="text-sm font-semibold text-olive">from ₹{minPrice}</span>
        </div>
        <Heading className="mt-3 text-2xl leading-tight">
          <Link
            href={`/flavours/${flavour.slug}`}
            onClick={() =>
              trackEvent('select_item', {
                item_list_name: listName,
                items: [
                  {
                    item_id: flavour.slug,
                    item_name: flavour.name,
                    item_category: 'Roasted Makhana',
                    index,
                  },
                ],
              })
            }
            className="after:absolute after:inset-0 after:rounded-[2rem]"
          >
            {flavour.name}
          </Link>
        </Heading>
        <p className="mt-2 text-sm leading-relaxed text-muted">{flavour.hook}</p>
      </div>
    </motion.article>
  )
}
