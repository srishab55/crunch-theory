'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

import { trackEvent } from '@/lib/analytics'

type Props = {
  href: string
  /** GA4 `select_item`: the list the card sits in and the item it represents. */
  listName: string
  item: { item_id: string; item_name: string; item_category: string; index: number }
  className?: string
  children: ReactNode
}

/** A card's main link; reports which item was picked from which list (GA4 `select_item`). */
export function SelectItemLink({ href, listName, item, className, children }: Props) {
  return (
    <Link
      href={href}
      onClick={() => trackEvent('select_item', { item_list_name: listName, items: [item] })}
      className={className}
    >
      {children}
    </Link>
  )
}
