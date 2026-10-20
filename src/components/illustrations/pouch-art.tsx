import { cn } from '@/lib/cn'

import { Makhana } from './makhana'
import { WatercolorBlob } from './watercolor-blob'

type Props = {
  flavourName: string
  primary: string
  secondary: string
  className?: string
}

/**
 * Illustrated stand-up pouch used until a real pack photo exists for a flavour.
 * Mirrors the real pack layout: wordmark, sub-line, watercolour cluster, flavour name.
 */
export function PouchArt({ flavourName, primary, secondary, className }: Props) {
  return (
    <div
      role="img"
      aria-label={`Crunch Theory ${flavourName} roasted makhana pouch`}
      className={cn(
        '@container relative isolate aspect-[3/4] w-full overflow-hidden rounded-t-[2.2rem] rounded-b-2xl bg-paper shadow-[0_30px_60px_-20px_rgb(36_35_30/0.35)]',
        className,
      )}
    >
      {/* zip seal */}
      <div className="absolute inset-x-0 top-[7%] h-px bg-sand" />
      <div className="absolute inset-x-0 top-[9%] h-px bg-sand/70" />

      <div className="flex h-full flex-col items-center px-[8%] pt-[16%] pb-[8%] text-center">
        <p className="font-display text-[clamp(1rem,4.2cqw,1.6rem)] leading-[0.9] tracking-[0.06em] uppercase">
          <span className="block text-forest">Crunch</span>
          <span className="block text-olive">Theory</span>
        </p>
        <p className="mt-2 text-[0.55rem] font-semibold tracking-[0.18em] text-ink/70 uppercase">
          Roasted Makhana
        </p>

        <div className="relative my-auto aspect-square w-[72%]">
          <WatercolorBlob
            color={primary}
            variant={0}
            className="absolute top-[4%] left-[2%] w-[55%]"
          />
          <WatercolorBlob
            color={secondary}
            variant={1}
            className="absolute right-0 bottom-[6%] w-[48%]"
          />
          <WatercolorBlob
            color="var(--color-sage)"
            variant={2}
            className="absolute bottom-0 left-[10%] w-[38%]"
          />
          <Makhana className="absolute top-[22%] left-[28%] w-[30%]" />
          <Makhana className="absolute top-[42%] left-[50%] w-[26%] rotate-45" />
          <Makhana className="absolute top-[52%] left-[18%] w-[24%] -rotate-12" />
          <Makhana className="absolute top-[12%] left-[56%] w-[18%] rotate-90" />
        </div>

        <p className="font-display text-[clamp(0.85rem,3.4cqw,1.25rem)] leading-tight text-olive uppercase">
          {flavourName}
        </p>
        <div className="mt-3 flex gap-1.5">
          {['Natural', 'Roasted', 'Gluten-free'].map((b) => (
            <span
              key={b}
              className="grid size-9 place-items-center rounded-full border border-olive/40 text-[0.42rem] leading-tight font-semibold text-ink/70"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
