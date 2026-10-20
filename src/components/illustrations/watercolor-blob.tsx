import { useId, type CSSProperties } from 'react'

import { cn } from '@/lib/cn'

const shapes = [
  'M44 6c18-4 38 4 46 20s4 38-10 52-36 18-52 10S2 62 4 44 26 10 44 6Z',
  'M52 4c20 2 40 16 42 36s-12 44-34 52S10 86 5 64 8 18 24 9 40 3 52 4Z',
  'M30 10c16-10 44-8 58 8s10 46-6 60-40 18-58 6S-2 52 6 34 18 17 30 10Z',
] as const

type Props = {
  color: string
  variant?: 0 | 1 | 2
  className?: string
  style?: CSSProperties
}

/** Soft, translucent watercolour wash used behind products and in section backgrounds. */
export function WatercolorBlob({ color, variant = 0, className, style }: Props) {
  const id = useId()
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
      style={style}
    >
      <defs>
        <filter id={`${id}-wash`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            seed={variant + 2}
          />
          <feDisplacementMap in="SourceGraphic" scale="6" />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      <path d={shapes[variant]} fill={color} opacity="0.55" filter={`url(#${id}-wash)`} />
      <path d={shapes[variant]} fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
    </svg>
  )
}
