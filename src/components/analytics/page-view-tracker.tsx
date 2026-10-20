'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { trackPageView } from '@/lib/analytics'

/**
 * Sends a GA4 page_view on first load and on every client-side route change. Runs after the
 * new route has rendered, so `document.title` already reflects the new page's metadata.
 */
export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    trackPageView()
  }, [pathname])

  return null
}
