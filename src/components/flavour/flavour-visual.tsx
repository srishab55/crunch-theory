import Image from 'next/image'

import { PouchArt } from '@/components/illustrations/pouch-art'
import type { Flavour } from '@/data/flavours'
import { cn } from '@/lib/cn'

type Props = { flavour: Flavour; sizes: string; priority?: boolean; className?: string }

/** Pack photo when available, otherwise the illustrated pouch in the flavour's palette. */
export function FlavourVisual({ flavour, sizes, priority, className }: Props) {
  if (flavour.image) {
    return (
      <Image
        src={flavour.image}
        alt={`Crunch Theory ${flavour.name} roasted makhana pouch`}
        width={1200}
        height={1200}
        sizes={sizes}
        priority={priority}
        className={cn('aspect-square w-full rounded-[1.75rem] object-cover', className)}
      />
    )
  }
  return (
    <div
      className={cn(
        'grid aspect-square w-full place-items-center rounded-[1.75rem] bg-sand/60 p-[7%]',
        className,
      )}
    >
      <PouchArt
        flavourName={flavour.name}
        primary={flavour.palette.primary}
        secondary={flavour.palette.secondary}
        className="h-full w-auto"
      />
    </div>
  )
}
