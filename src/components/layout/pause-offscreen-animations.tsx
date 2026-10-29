'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Looping decorative animations (see globals.css `--animate-*`). */
const LOOPING = '.animate-marquee, .animate-float, .animate-spin-slow, .animate-pulse'

/**
 * Pauses looping decorative animations while they're off-screen (`data-offscreen`, styled in
 * globals.css). Chrome otherwise restyles the page every frame for each one (measured on the
 * home page: ~60 style recalcs per second from the marquee, floats and spinning stickers alone).
 */
export function PauseOffscreenAnimations() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute('data-offscreen', !entry.isIntersecting)
        }
      },
      { rootMargin: '100px 0px' },
    )
    document.querySelectorAll(LOOPING).forEach((el) => {
      el.setAttribute('data-offscreen', '')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])

  return null
}
