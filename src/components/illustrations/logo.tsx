import { cn } from '@/lib/cn'

type Props = { className?: string; inverted?: boolean }

/** Stacked wordmark echoing the pouch typography. */
export function Logo({ className, inverted = false }: Props) {
  return (
    <span
      className={cn(
        'inline-flex flex-col font-display leading-[0.82] tracking-[0.08em] uppercase',
        className,
      )}
    >
      <span className={inverted ? 'text-paper' : 'text-forest'}>Crunch</span>
      <span className={inverted ? 'text-mustard' : 'text-olive'}>Theory</span>
    </span>
  )
}
