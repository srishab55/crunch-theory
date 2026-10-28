import type { ProductLine } from '@/data/products'

import { ProductCard } from './product-card'

type Props = { lines: ProductLine[]; headingLevel?: 'h2' | 'h3' }

export function ProductGrid({ lines, headingLevel }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {lines.map((line, i) => (
        <ProductCard key={line.slug} line={line} index={i} headingLevel={headingLevel} />
      ))}
    </div>
  )
}
