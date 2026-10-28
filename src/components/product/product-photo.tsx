import Image from 'next/image'

import { WatercolorBlob } from '@/components/illustrations/watercolor-blob'
import type { Tone } from '@/data/home'
import type { ProductLine } from '@/data/products'
import { cn } from '@/lib/cn'

const blobColor: Record<Tone, string> = {
  sage: 'var(--color-sage)',
  mustard: 'var(--color-mustard)',
  terracotta: 'var(--color-terracotta)',
}

const stickerColor: Record<Tone, string> = {
  sage: 'bg-sage text-forest-deep',
  mustard: 'bg-mustard text-forest-deep',
  terracotta: 'bg-terracotta text-paper',
}

type Props = {
  line: ProductLine
  sizes: string
  /** `preload` for the page's main image (LCP), `eager` for others near the fold. */
  priority?: 'preload' | 'eager'
  blobVariant?: 0 | 1 | 2
  className?: string
}

/** A line's 4:5 pack shot on a watercolour wash, with its sticker and a "Coming soon" pill. */
export function ProductPhoto({ line, sizes, priority, blobVariant = 0, className }: Props) {
  return (
    <div className={cn('relative isolate', className)}>
      <WatercolorBlob
        color={blobColor[line.tone]}
        variant={blobVariant}
        className="absolute -top-12 -left-12 -z-10 w-[115%] opacity-50"
      />
      <div className="overflow-hidden rounded-[2rem] shadow-[0_20px_50px_-30px_rgb(36_35_30/0.4)]">
        <Image
          src={line.image}
          alt={line.imageAlt}
          sizes={sizes}
          placeholder="blur"
          preload={priority === 'preload'}
          loading={priority === 'eager' ? 'eager' : undefined}
          className="aspect-[4/5] w-full object-cover"
        />
      </div>
      {!line.live && (
        <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-[0.65rem] font-semibold tracking-wide text-forest uppercase shadow-sm backdrop-blur">
          Coming soon
        </span>
      )}
      <span
        className={cn(
          'absolute -top-4 right-5 -rotate-6 rounded-full px-4 py-2 font-display text-sm font-bold tracking-tight shadow-[0_10px_30px_-12px_rgb(36_35_30/0.45)] sm:text-base',
          stickerColor[line.tone],
        )}
      >
        {line.sticker}
      </span>
    </div>
  )
}
