import { ComingSoonPill } from '@/components/ui/coming-soon-pill'
import { SelectItemLink } from '@/components/ui/select-item-link'
import { TiltCard } from '@/components/ui/tilt-card'
import { minPrice, type Flavour } from '@/data/flavours'
import { isLive } from '@/data/site'

import { FlavourVisual } from './flavour-visual'
import { HeatMeter } from './heat-meter'

type Props = {
  flavour: Flavour
  index: number
  /** Which list the card sits in, for GA4 `select_item` (e.g. "makhana-flavours"). */
  listName: string
  headingLevel?: 'h2' | 'h3'
}

/** Makhana flavour card; the whole card links to the flavour page. */
export function FlavourCard({ flavour, index, listName, headingLevel = 'h3' }: Props) {
  const Heading = headingLevel
  return (
    <TiltCard index={index}>
      <div className="relative overflow-hidden rounded-[1.75rem]">
        {!isLive && <ComingSoonPill />}
        <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
          <FlavourVisual
            flavour={flavour}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      </div>
      <div className="px-3 pt-5 pb-3">
        <div className="flex items-center justify-between gap-3">
          <HeatMeter level={flavour.heat} />
          <span className="text-sm font-semibold text-olive">from ₹{minPrice(flavour)}</span>
        </div>
        <Heading className="mt-3 text-2xl leading-tight">
          <SelectItemLink
            href={`/flavours/${flavour.slug}`}
            listName={listName}
            item={{
              item_id: flavour.slug,
              item_name: flavour.name,
              item_category: 'Roasted Makhana',
              index,
            }}
            className="after:absolute after:inset-0 after:rounded-[2rem]"
          >
            {flavour.name}
          </SelectItemLink>
        </Heading>
        <p className="mt-2 text-sm leading-relaxed text-muted">{flavour.hook}</p>
      </div>
    </TiltCard>
  )
}
