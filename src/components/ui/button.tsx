'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'

import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light'
type Size = 'md' | 'lg'

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide transition-[color,background-color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-paper hover:bg-forest-deep shadow-[0_10px_30px_-10px_rgb(47_74_44/0.6)]',
  secondary:
    'border border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-paper',
  ghost: 'text-forest underline-offset-4 hover:underline',
  light: 'bg-paper text-forest hover:bg-mustard',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
}

export const buttonStyles = (variant: Variant = 'primary', size: Size = 'md', className?: string) =>
  cn(base, variants[variant], sizes[size], className)

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant
  size?: Size
  /** Sends a `cta_click` analytics event with this label. */
  trackLabel?: string
  trackLocation?: string
}

export function ButtonLink({
  variant,
  size,
  className,
  trackLabel,
  trackLocation = 'unknown',
  onClick,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonStyles(variant, size, className)}
      onClick={(e) => {
        if (trackLabel) trackEvent('cta_click', { label: trackLabel, location: trackLocation })
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

type ButtonProps = ComponentProps<'button'> & { variant?: Variant; size?: Size }

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonStyles(variant, size, className)} {...props} />
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn(
        'size-4 transition-transform duration-300 group-hover/btn:translate-x-1',
        className,
      )}
    >
      <path
        d="M4 10h12m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
