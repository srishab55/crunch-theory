import { NOTIFY_HREF } from '@/data/site'
import { cn } from '@/lib/cn'
import type { InterestLocation } from '@/lib/interest'

import { InterestButton } from './interest-button'
import { MarketplaceTiles } from './marketplace-tiles'
import { OutsideIndiaNote } from './outside-india-note'

type Props = {
  /** Search term sent to the stores, e.g. the flavour or product name. */
  query: string
  /** Flavour or product slug for "I'm interested". */
  slug: string
  location: InterestLocation
  live: boolean
  className?: string
}

/**
 * The `#buy` panel on flavour and product pages: store tiles, then (pre-launch) "I'm interested"
 * and a notify link, then the "Outside India?" gateway.
 */
export function BuyBox({ query, slug, location, live, className }: Props) {
  return (
    <div
      id="buy"
      data-track-section="buy-box"
      className={cn('scroll-mt-28 rounded-[2rem] bg-sand/50 p-4 sm:p-5', className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 px-1 pb-4">
        <h2 className="text-2xl font-extrabold tracking-[-0.03em]">
          Get it <span className="accent text-terracotta">lightning fast</span>
        </h2>
        {live ? (
          <p className="text-sm text-muted">Pick your app ↓</p>
        ) : (
          <p className="rounded-full bg-mustard/40 px-3 py-1 text-xs font-semibold tracking-wide text-forest-deep uppercase">
            Coming soon
          </p>
        )}
      </div>
      <MarketplaceTiles flavour={query} location={location} variant="compact" />
      {!live && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-1 pt-5">
          <InterestButton flavour={slug} location={location} size="md" />
          <a
            href={NOTIFY_HREF}
            className="text-sm font-semibold text-forest underline underline-offset-4 hover:text-forest-deep"
          >
            Get notified at launch
          </a>
        </div>
      )}
      <OutsideIndiaNote className="px-1 pt-4" />
    </div>
  )
}
