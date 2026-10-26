import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Props = { className?: string; children?: ReactNode }

/** Pre-launch status pill (pulsing mustard dot). Render only when `!isLive`. */
export function ComingSoonBadge({
  className,
  children = 'Coming soon to Blinkit, Zepto & more',
}: Props) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-paper/80 px-4 py-2 text-sm font-semibold text-forest shadow-[0_8px_30px_-12px_rgb(36_35_30/0.25)] backdrop-blur',
        className,
      )}
    >
      <span aria-hidden="true" className="size-2.5 animate-pulse rounded-full bg-mustard" />
      {children}
    </p>
  )
}
