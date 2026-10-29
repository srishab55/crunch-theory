import type { Flavour } from '@/data/flavours'

import { FlavourCard } from './flavour-card'

type Props = { flavours: Flavour[]; listName: string; headingLevel?: 'h2' | 'h3' }

export function FlavourGrid({ flavours, listName, headingLevel }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {flavours.map((f, i) => (
        <FlavourCard
          key={f.slug}
          flavour={f}
          index={i}
          listName={listName}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  )
}
