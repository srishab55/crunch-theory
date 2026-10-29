'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { trackEvent } from '@/lib/analytics'

/**
 * Sends `section_view` once per page view for each element with `data-track-section="name"`,
 * when its top passes 60% of the viewport height. Shows how far down each page people get, and
 * which sections they actually see. Hidden elements (e.g. a kept-alive previous route) never fire.
 */
export function SectionViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const seen = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const section = (entry.target as HTMLElement).dataset.trackSection
          observer.unobserve(entry.target)
          if (!section || seen.has(section)) continue
          seen.add(section)
          trackEvent('section_view', { section, page_path: pathname })
        }
      },
      { rootMargin: '0px 0px -40% 0px' },
    )
    document.querySelectorAll('[data-track-section]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
