'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import type { PointerEvent } from 'react'

import { flavourNames, type ProductLine } from '@/data/products'

type Props = { line: ProductLine; index: number; headingLevel?: 'h2' | 'h3' }

/** Product-line card (same tilt and hover as FlavourCard); the whole card opens the line's page. */
export function ProductCard({ line, index, headingLevel = 'h3' }: Props) {
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
        {!line.live && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-paper/90 px-3 py-1 text-[0.65rem] font-semibold tracking-wide text-forest uppercase shadow-sm backdrop-blur">
            Coming soon
          </span>
        )}
        <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
          <Image
            src={line.image}
            alt={line.imageAlt}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>
      <div className="px-3 pt-5 pb-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold tracking-wide text-olive uppercase">
            {line.method}
          </span>
          <span className="shrink-0 text-sm font-semibold text-olive">
            from ₹{line.fromPriceInr}
          </span>
        </div>
        <Heading className="mt-3 text-2xl leading-tight">
          <Link href={line.href} className="after:absolute after:inset-0 after:rounded-[2rem]">
            {line.name}
          </Link>
        </Heading>
        <p className="mt-1 text-sm font-semibold text-olive">{line.englishName}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {line.flavours.length} flavours: {flavourNames(line).join(', ')}
        </p>
      </div>
    </motion.article>
  )
}
