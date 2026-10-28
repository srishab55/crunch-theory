'use client'

import { motion } from 'motion/react'
import type { CSSProperties } from 'react'

import { marketplaces, type Marketplace } from '@/data/marketplaces'
import { isLive } from '@/data/site'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Variant = 'feature' | 'compact'

type Props = {
  /** Search term / flavour name sent to the store and to analytics. */
  flavour: string
  location: string
  variant?: Variant
  className?: string
}

/**
 * Marketplace tiles — each store's promise big, quick commerce first. When live, each is an outbound
 * link that fills with its store's colour on hover/focus; pre-launch (`site.availability`),
 * they're static "Coming soon" cards with no link.
 */
export function MarketplaceTiles({ flavour, location, variant = 'feature', className }: Props) {
  const feature = variant === 'feature'
  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-3 sm:gap-4',
        feature ? 'lg:grid-cols-6' : 'sm:grid-cols-6',
        className,
      )}
    >
      {marketplaces.map((m, i) => (
        <motion.li
          key={m.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          // 6-col grid: three quick-commerce tiles per row, then two wider online tiles.
          // On the 2-col mobile grid the odd last tile spans the full row.
          className={cn(
            m.kind === 'quick-commerce'
              ? feature
                ? 'lg:col-span-2'
                : 'sm:col-span-2'
              : feature
                ? 'lg:col-span-3'
                : 'sm:col-span-3',
            i === marketplaces.length - 1 && 'col-span-2',
          )}
        >
          <Tile marketplace={m} flavour={flavour} location={location} variant={variant} />
        </motion.li>
      ))}
    </ul>
  )
}

function Tile({
  marketplace: m,
  flavour,
  location,
  variant,
}: {
  marketplace: Marketplace
  flavour: string
  location: string
  variant: Variant
}) {
  const feature = variant === 'feature'
  const quick = m.kind === 'quick-commerce'

  const shell = cn(
    'relative isolate flex h-full flex-col overflow-hidden border',
    feature
      ? 'min-h-[12.5rem] rounded-[1.75rem] border-paper/12 bg-paper/[0.05] p-5 text-paper sm:min-h-[15rem] sm:rounded-[2rem] sm:p-7'
      : 'min-h-[9.5rem] rounded-3xl border-forest/12 bg-paper p-4 text-forest sm:p-5',
  )

  const content = (
    <>
      <span className="flex flex-wrap items-start justify-between gap-2">
        <span
          className={cn(
            'font-display leading-tight font-bold tracking-tight',
            feature ? 'text-lg sm:text-xl' : 'text-base',
          )}
        >
          {m.name}
        </span>
        {quick &&
          (feature ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-mustard px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-forest-deep uppercase transition-colors duration-500 group-hover:bg-[var(--brand-fg)] group-hover:text-[var(--brand-bg)]">
              <BoltIcon className="size-3" /> Quick
            </span>
          ) : (
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-mustard/50 text-forest-deep">
              <BoltIcon className="size-3" />
              <span className="sr-only">Quick delivery</span>
            </span>
          ))}
      </span>

      {/* Wraps onto two lines in narrow tiles; hyphenates rather than overflowing the card. */}
      <span
        className={cn(
          'mt-auto font-display font-extrabold text-balance hyphens-auto',
          feature
            ? 'pt-8 text-2xl leading-[0.9] tracking-[-0.045em] sm:text-5xl xl:text-6xl'
            : 'pt-4 text-xl leading-[0.95] tracking-[-0.03em] lg:text-base xl:text-xl',
        )}
      >
        {m.promise}
      </span>
    </>
  )

  // Pre-launch: same card, but not a link — a "Coming soon" label replaces the arrow.
  if (!isLive) {
    return (
      <div className={shell}>
        {content}
        <span className={cn('flex items-end justify-between gap-3', feature ? 'mt-4' : 'mt-3')}>
          {/* Compact and phone-width tiles are too narrow for the note and the label — keep the label. */}
          {feature && (
            <span className="text-sm opacity-75 max-sm:hidden">Launching here soon.</span>
          )}
          <span
            className={cn(
              'shrink-0 rounded-full font-semibold tracking-wide whitespace-nowrap uppercase',
              feature
                ? 'border border-paper/25 px-3 py-1.5 text-[0.65rem] text-paper/85'
                : 'bg-sand/70 px-2.5 py-1 text-[0.6rem] text-forest',
            )}
          >
            Coming soon
          </span>
        </span>
      </div>
    )
  }

  return (
    <a
      href={m.url(flavour)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('buy_click', { marketplace: m.id, flavour, location })}
      style={{ '--brand-bg': m.brand.bg, '--brand-fg': m.brand.fg } as CSSProperties}
      className={cn(
        shell,
        'group transition-[color,border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-transparent hover:text-[var(--brand-fg)] focus-visible:border-transparent focus-visible:text-[var(--brand-fg)]',
      )}
    >
      {/* Brand-colour fill that rises from the bottom on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--brand-bg)] transition-transform duration-500 ease-out-expo group-hover:scale-y-100 group-focus-visible:scale-y-100"
      />
      {content}
      <span className={cn('flex items-end justify-between gap-4', feature ? 'mt-4' : 'mt-2')}>
        <span className={cn('opacity-75', feature ? 'text-xs sm:text-sm' : 'text-xs')}>
          {feature ? (
            <>
              <span className="sm:hidden">Order now</span>
              <span className="max-sm:hidden">{m.pitch}</span>
            </>
          ) : (
            'Order now'
          )}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'grid shrink-0 place-items-center rounded-full border border-current transition-transform duration-500 ease-out-expo group-hover:-rotate-45',
            feature ? 'size-11' : 'size-8',
          )}
        >
          <svg viewBox="0 0 20 20" fill="none" className={feature ? 'size-4' : 'size-3.5'}>
            <path
              d="M4 10h12m0 0-5-5m5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      <span className="sr-only">— order Crunch Theory on {m.name} (opens in a new tab)</span>
    </a>
  )
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="currentColor">
      <path d="M9.5 1 3 9h4l-1 6 6.5-8h-4l1-6Z" />
    </svg>
  )
}
