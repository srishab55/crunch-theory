import { faqs } from '@/data/faqs'
import { glossary } from '@/data/glossary'
import { flavours, type Flavour } from '@/data/flavours'
import { marketplaces } from '@/data/marketplaces'
import { flavourLabels, productLines } from '@/data/products'
import { isLive, site } from '@/data/site'
import { absoluteUrl } from '@/lib/env'
import { withKilojoules, withOunces } from '@/lib/units'

/**
 * Builds llms.txt (https://llmstxt.org) — a Markdown summary that AI assistants and answer engines
 * can read without parsing the visual site. Generated from the same data as the pages.
 */
export function buildLlmsTxt(): string {
  return [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    'Key facts:',
    '- Product: roasted makhana (fox nuts / lotus seeds), roasted not fried, gluten-free.',
    '- Also launching: roasted chana, masala vegetable chips and baked ragi chips (see Product range).',
    `- Outside India: ${isLive ? 'sold only in India for now' : 'launching in India first'}; no international shipping yet. International waitlist: ${absoluteUrl('/international')}`,
    `- Market: India. ${isLive ? 'Sold on' : 'Launching soon on'} ${marketplaces.map((m) => m.name).join(', ')}.`,
    ...(isLive
      ? []
      : ['- Status: coming soon — not yet on sale. Prices below are planned launch prices.']),
    `- Packs: ₹49 trial (30 g), everyday pouch (75 g), family multipack (6 × 30 g).`,
    '- Positioning: a satisfying, better-for-you everyday snack — not a diet or weight-loss product.',
    '',
    '## Flavours',
    ...flavours.map((f) => `- [${f.name}](${absoluteUrl(`/flavours/${f.slug}`)}): ${f.hook}`),
    '',
    '## Product range',
    ...productLines.map(
      (l) =>
        `- [${l.name}](${absoluteUrl(l.href)}) — ${l.englishName.toLowerCase()}: ${l.method}; ${flavourLabels(l).join(', ')}; from ₹${l.fromPriceInr}${l.live ? '' : ' (coming soon)'}.`,
    ),
    '',
    '## Pages',
    `- [Products](${absoluteUrl('/products')}): The whole range — makhana, chana, vegetable chips and ragi chips.`,
    `- [Our story](${absoluteUrl('/our-story')}): Why the brand exists and how makhana is made.`,
    `- [FAQ](${absoluteUrl('/faq')}): Nutrition, ingredients, allergens, pricing and buying.`,
    `- [Contact](${absoluteUrl('/contact')}): Customer support, taste tests, retail enquiries.`,
    `- [International](${absoluteUrl('/international')}): For visitors outside India — waitlist, trade enquiries, Indian snack words explained.`,
    '',
    '## Glossary',
    ...glossary.map(
      (t) => `- ${t.term}${t.alsoKnownAs ? ` (${t.alsoKnownAs.join(', ')})` : ''}: ${t.meaning}`,
    ),
    '',
    '## Optional',
    `- [Full details](${absoluteUrl('/llms-full.txt')}): Every flavour's ingredients, nutrition and all FAQs.`,
    '',
  ].join('\n')
}

const flavourDetail = (f: Flavour) =>
  [
    `### ${f.name}`,
    '',
    f.description,
    '',
    `- URL: ${absoluteUrl(`/flavours/${f.slug}`)}`,
    `- Heat: ${['none', 'mild', 'medium', 'hot'][f.heat]}`,
    `- Ingredients: ${f.ingredients.join(', ')}`,
    `- Allergens: ${f.allergens}`,
    `- Packs (Indian retail prices, INR): ${f.packs.map((p) => `${p.label} ${withOunces(p.weight)} ₹${p.priceInr}`).join('; ')}`,
    `- Nutrition per ${f.servingSize}${f.nutritionIsIndicative ? ' (indicative)' : ''}: ${f.nutrition
      .map((n) => `${n.label} ${withKilojoules(n.perServing)}`)
      .join(', ')}`,
    '',
  ].join('\n')

export function buildLlmsFullTxt(): string {
  return [
    buildLlmsTxt(),
    '## Flavour details',
    '',
    ...flavours.map(flavourDetail),
    '## Frequently asked questions',
    '',
    ...faqs.flatMap((q) => [`### ${q.question}`, '', q.answer, '']),
  ].join('\n')
}
