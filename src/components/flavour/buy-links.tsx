'use client'

import { marketplaces } from '@/data/marketplaces'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Props = {
  flavour: string
  location: string
  inverted?: boolean
  className?: string
}

/** Outbound marketplace links with `buy_click` tracking. */
export function BuyLinks({ flavour, location, inverted = false, className }: Props) {
  return (
    <ul className={cn('flex flex-wrap gap-3', className)}>
      {marketplaces.map((m) => (
        <li key={m.id}>
          <a
            href={m.url(flavour)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('buy_click', { marketplace: m.id, flavour, location })}
            className={cn(
              'group flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-300',
              inverted
                ? 'border-paper/20 text-paper hover:border-mustard hover:bg-mustard hover:text-forest-deep'
                : 'border-forest/15 bg-paper text-forest hover:border-forest hover:bg-forest hover:text-paper',
            )}
          >
            {m.name}
            <span className={cn('text-xs font-medium opacity-60 group-hover:opacity-90')}>
              {m.delivery}
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
