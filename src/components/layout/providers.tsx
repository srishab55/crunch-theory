'use client'

import Lenis from 'lenis'
import { MotionConfig } from 'motion/react'
import { useEffect, type ReactNode } from 'react'

import { PauseOffscreenAnimations } from './pause-offscreen-animations'

/** App-wide client providers: smooth scrolling (disabled for reduced motion) and motion config. */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.12 })
    return () => lenis.destroy()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      {children}
      <PauseOffscreenAnimations />
    </MotionConfig>
  )
}
