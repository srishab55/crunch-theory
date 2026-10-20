'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

type Props = { to: number; suffix?: string; className?: string }

/** Counts up to `to` when scrolled into view. Server HTML already contains the final value. */
export function Counter({ to, suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView || reduceMotion || to === 0) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, to, suffix])

  return (
    <span ref={ref} className={className}>
      {to}
      {suffix}
    </span>
  )
}
