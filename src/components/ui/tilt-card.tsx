'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

type Props = {
  /** Position in its grid, for the staggered entrance. */
  index: number
  children: ReactNode
}

/**
 * Card shell shared by flavour and product cards: rises into view, then tilts gently towards the
 * mouse pointer (touch is ignored). Children render on the server.
 */
export function TiltCard({ index, children }: Props) {
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
      {children}
    </motion.article>
  )
}
