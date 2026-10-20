import type { Flavour } from '@/data/flavours'

import { FlavourCard } from './flavour-card'

type Props = { flavours: Flavour[]; headingLevel?: 'h2' | 'h3' }

export function FlavourGrid({ flavours, headingLevel }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {flavours.map((f, i) => (
        <FlavourCard key={f.slug} flavour={f} index={i} headingLevel={headingLevel} />
      ))}
    </div>
  )
}
