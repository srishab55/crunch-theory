'use client'

import { useEffect } from 'react'

import { trackEvent } from '@/lib/analytics'

/** Fires `page_not_found` on the 404 page, with the referrer, so broken shared links surface. */
export function TrackNotFound() {
  useEffect(() => {
    trackEvent('page_not_found', {
      page_path: window.location.pathname,
      page_referrer: document.referrer,
    })
  }, [])
  return null
}
