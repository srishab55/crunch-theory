'use client'

import { useSyncExternalStore } from 'react'

/**
 * Hydration-safe media query: returns `serverValue` during prerender and hydration, then the
 * live value. Prevents server/client markup mismatches for things like reduced motion.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
