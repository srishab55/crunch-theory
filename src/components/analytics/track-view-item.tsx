'use client'

import { useEffect } from 'react'

import { trackAdsConversion, trackEvent } from '@/lib/analytics'

type Props = { id: string; name: string }

/** Fires GA4's `view_item` and the Google Ads conversion once per flavour page view. */
export function TrackViewItem({ id, name }: Props) {
  useEffect(() => {
    trackEvent('view_item', { item_id: id, item_name: name, item_category: 'Roasted Makhana' })
    trackAdsConversion()
  }, [id, name])
  return null
}
