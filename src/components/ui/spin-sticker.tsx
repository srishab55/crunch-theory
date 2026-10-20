import { cn } from '@/lib/cn'

type Props = { text: string; center: string; className?: string }

/** Circular rotating sticker with text on a path — a classic packaging callout. */
export function SpinSticker({ text, center, className }: Props) {
  return (
    <div className={cn('relative grid size-32 place-items-center', className)}>
      <svg viewBox="0 0 120 120" aria-hidden="true" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="sticker-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <circle cx="60" cy="60" r="60" fill="var(--color-mustard)" />
        <text className="fill-forest-deep text-[11.5px] font-bold tracking-[0.18em] uppercase">
          {/* textLength stretches any copy to exactly one loop of the circle */}
          <textPath href="#sticker-circle" textLength="286" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="relative font-display text-3xl leading-none font-extrabold tracking-[-0.04em] text-forest-deep">
        {center}
      </span>
    </div>
  )
}
