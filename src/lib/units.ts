/**
 * Unit helpers for visitors outside India. Data stays metric (as printed on the pack); these add
 * the units other markets expect: ounces (US) and kilojoules (EU/UK/AU labels list kJ and kcal).
 */

const GRAMS_PER_OUNCE = 28.3495
const KJ_PER_KCAL = 4.184

const grams = /(\d+(?:\.\d+)?)\s*g\b/g

/** "30 g" → "30 g (1.1 oz)"; "6 × 30 g" → "6 × 30 g (6 × 1.1 oz)". Strings without grams pass through. */
export function withOunces(weight: string): string {
  if (!weight.match(grams)) return weight
  const ounces = weight.replace(
    grams,
    (_, g: string) => `${(Number(g) / GRAMS_PER_OUNCE).toFixed(1)} oz`,
  )
  return `${weight} (${ounces})`
}

/** "118 kcal" → "118 kcal / 494 kJ". Values without kcal pass through. */
export function withKilojoules(energy: string): string {
  const kcal = energy.match(/(\d+(?:\.\d+)?)\s*kcal\b/)
  if (!kcal) return energy
  return `${energy} / ${Math.round(Number(kcal[1]) * KJ_PER_KCAL)} kJ`
}
