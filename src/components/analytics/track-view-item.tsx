'use client'

import { useEffect } from 'react'

import { trackEvent } from '@/lib/analytics'

type Props = { id: string; name: string }

/** Fires GA4's `view_item` once per product page view. */
export function TrackViewItem({ id, name }: Props) {
  useEffect(() => {
    trackEvent('view_item', { item_id: id, item_name: name, item_category: 'Roasted Makhana' })
  }, [id, name])
  return null
}
