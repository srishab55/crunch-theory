import Link from 'next/link'

import { cn } from '@/lib/cn'

type Props = { tone?: 'light' | 'dark'; className?: string }

/**
 * Permanent "global gateway" next to store links: the apps are India-only, and everyone else gets
 * a path. Shown to every visitor (no geo-detection or redirects, per Google's guidance).
 */
export function OutsideIndiaNote({ tone = 'light', className }: Props) {
  return (
    <p className={cn('text-sm', tone === 'dark' ? 'text-paper/50' : 'text-muted', className)}>
      These stores deliver within India.{' '}
      <Link
        href="/international"
        className={cn(
          'font-semibold underline underline-offset-4',
          tone === 'dark'
            ? 'text-paper/80 hover:text-mustard'
            : 'text-forest hover:text-forest-deep',
        )}
      >
        Outside India? Join the international waitlist
      </Link>
    </p>
  )
}
