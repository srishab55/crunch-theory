import type { CSSProperties } from 'react'

import { cn } from '@/lib/cn'

type Props = { className?: string; inverted?: boolean }

const letters = 'crunch'.split('')

/**
 * Wordmark: a makhana badge + bold "crunch" and serif-italic "theory". On hover (or when its
 * link is keyboard-focused) the badge tilts and the letters bounce like a bite — see globals.css.
 * Scales with `font-size`, so size it with a text-* class.
 */
export function Logo({ className, inverted = false }: Props) {
  return (
    <span className={cn('logo inline-flex items-center gap-[0.35em] leading-none', className)}>
      <LogoMark inverted={inverted} className="logo-mark size-[1.45em] shrink-0" />
      <span aria-hidden="true" className="flex items-baseline whitespace-nowrap">
        <span
          className={cn(
            'font-display font-extrabold tracking-[-0.05em]',
            inverted ? 'text-paper' : 'text-forest',
          )}
        >
          {letters.map((ch, i) => (
            <span key={i} className="logo-letter" style={{ '--i': i } as CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
        <span className={cn('ml-[0.1em] accent', inverted ? 'text-mustard' : 'text-terracotta')}>
          theory
        </span>
      </span>
      <span className="sr-only">Crunch Theory</span>
    </span>
  )
}

/** Circular badge with a popped makhana — also the favicon motif. */
export function LogoMark({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn('transition-transform duration-500 ease-out-expo', className)}
    >
      <circle cx="32" cy="32" r="32" fill={inverted ? '#d7a44f' : '#2f4a2c'} />
      <path
        d="M32 12c7-1 11.5 3 15 5.5 4.5 3 8 7 9 12.5 1.5 6.5.5 12-2 17-3 5.5-7 9.5-12 12-5.5 2.5-12 3.5-17.5 1.5-5.5-2-10-6-12.5-11.5-2.5-5-3.5-11-2.5-16.5 1.5-5.5 4.5-10.5 9-14 4-3.5 8-6 13.5-6.5Z"
        fill="#f4eee3"
        transform="translate(32 32) scale(.78) translate(-32 -32)"
      />
      <path
        d="M24 25c4 5 9.5 7 14 5.5M23 40c5.5-1 10.5 1.5 13.5 5.5"
        fill="none"
        stroke="#d9c3a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g fill="#7a4e2e">
        <ellipse cx="28" cy="33" rx="2.4" ry="1.7" transform="rotate(-20 28 33)" />
        <ellipse cx="39" cy="25.5" rx="1.8" ry="1.3" />
        <ellipse cx="40" cy="40" rx="2.2" ry="1.5" />
        <ellipse cx="25.5" cy="43" rx="1.4" ry="1" />
      </g>
    </svg>
  )
}
