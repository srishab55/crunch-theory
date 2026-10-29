import type { Flavour } from '@/data/flavours'
import { cn } from '@/lib/cn'
import { withKilojoules, withOunces } from '@/lib/units'

export function NutritionTable({ flavour }: { flavour: Flavour }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-forest/10 bg-paper">
      <table className="w-full text-left text-sm">
        <caption className="border-b border-forest/10 px-6 py-4 text-left">
          <span className="font-display text-xl font-bold text-forest">Nutrition information</span>
          <span className="mt-1 block text-xs text-muted">
            Serving size {withOunces(flavour.servingSize)}
          </span>
        </caption>
        <thead className="text-xs tracking-wider text-muted uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 font-semibold">
              Nutrient
            </th>
            <th scope="col" className="px-6 py-3 text-right font-semibold">
              Per serving
            </th>
            <th scope="col" className="px-6 py-3 text-right font-semibold">
              Per 100 g
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-forest/5">
          {flavour.nutrition.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className={cn(
                  'px-6 py-3 font-medium text-ink',
                  row.sub && 'pl-10 font-normal text-muted',
                )}
              >
                {row.label}
              </th>
              <td className="px-6 py-3 text-right tabular-nums">
                {withKilojoules(row.perServing)}
              </td>
              <td className="px-6 py-3 text-right tabular-nums">{withKilojoules(row.per100g)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {flavour.nutritionIsIndicative && (
        <p className="border-t border-forest/10 bg-sand/30 px-6 py-3 text-xs text-muted">
          Indicative values. Always refer to the printed pack for exact figures.
        </p>
      )}
    </div>
  )
}
