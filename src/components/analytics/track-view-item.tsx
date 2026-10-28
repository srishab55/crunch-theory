'use client'

import { useEffect } from 'react'

import { trackAdsConversion, trackEvent } from '@/lib/analytics'

type Props = { id: string; name: string; category?: string }

/** Fires GA4's `view_item` and the Google Ads conversion once per flavour or product page view. */
export function TrackViewItem({ id, name, category = 'Roasted Makhana' }: Props) {
  useEffect(() => {
    trackEvent('view_item', { item_id: id, item_name: name, item_category: category })
    trackAdsConversion()
  }, [id, name, category])
  return null
}
