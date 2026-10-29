import Image from 'next/image'

import type { Flavour } from '@/data/flavours'
import { cn } from '@/lib/cn'

type Props = { flavour: Flavour; sizes: string; preload?: boolean; className?: string }

/** A flavour's square pack photo. */
export function FlavourVisual({ flavour, sizes, preload, className }: Props) {
  return (
    <Image
      src={flavour.image}
      alt={`Crunch Theory ${flavour.name} roasted makhana pouch`}
      sizes={sizes}
      placeholder="blur"
      preload={preload}
      className={cn('aspect-square w-full rounded-[1.75rem] object-cover', className)}
    />
  )
}
