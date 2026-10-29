import Image from 'next/image'

import { ComingSoonPill } from '@/components/ui/coming-soon-pill'
import { SelectItemLink } from '@/components/ui/select-item-link'
import { TiltCard } from '@/components/ui/tilt-card'
import { flavourNames, type ProductLine } from '@/data/products'

type Props = {
  line: ProductLine
  index: number
  /** Which list the card sits in, for GA4 `select_item` (e.g. "home-range"). */
  listName: string
  headingLevel?: 'h2' | 'h3'
}

/** Product-line card (same shell as FlavourCard); the whole card opens the line's page. */
export function ProductCard({ line, index, listName, headingLevel = 'h3' }: Props) {
  const Heading = headingLevel
  return (
    <TiltCard index={index}>
      <div className="relative overflow-hidden rounded-[1.75rem]">
        {!line.live && <ComingSoonPill />}
        <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
          <Image
            src={line.image}
            alt={line.imageAlt}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>
      <div className="px-3 pt-5 pb-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold tracking-wide text-olive uppercase">
            {line.method}
          </span>
          <span className="shrink-0 text-sm font-semibold text-olive">
            from ₹{line.fromPriceInr}
          </span>
        </div>
        <Heading className="mt-3 text-2xl leading-tight">
          <SelectItemLink
            href={line.href}
            listName={listName}
            item={{
              item_id: line.slug,
              item_name: line.name,
              item_category: 'Product line',
              index,
            }}
            className="after:absolute after:inset-0 after:rounded-[2rem]"
          >
            {line.name}
          </SelectItemLink>
        </Heading>
        <p className="mt-1 text-sm font-semibold text-olive">{line.englishName}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {line.flavours.length} flavours: {flavourNames(line).join(', ')}
        </p>
      </div>
    </TiltCard>
  )
}
