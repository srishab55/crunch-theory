import type { StaticImageData } from 'next/image'

import cheeseHerbs from '@/assets/pouches/cheese-herbs.jpg'
import pinkSaltPepper from '@/assets/pouches/himalayan-pink-salt-pepper.jpg'
import periPeriKick from '@/assets/pouches/peri-peri-kick.jpg'
import pudinaChatpata from '@/assets/pouches/pudina-chatpata.jpg'

export type NutritionRow = {
  label: string
  perServing: string
  per100g: string
  /** Indented sub-row, e.g. "of which sugars". */
  sub?: boolean
}

export type Flavour = {
  slug: string
  name: string
  shortName: string
  /** One-line hook used on cards. */
  hook: string
  /** Answer-first description; also used for meta description and structured data. */
  description: string
  heat: 0 | 1 | 2 | 3
  /** Tailwind-safe CSS colour tokens for the illustrated pouch and accents. */
  palette: { primary: string; secondary: string }
  /**
   * Pack photo, imported so it gets a content-hashed URL (regenerate with `npm run images`).
   * When absent, an illustrated pouch is rendered instead.
   */
  image?: StaticImageData
  ingredients: string[]
  allergens: string
  servingSize: string
  nutrition: NutritionRow[]
  /** Set to false once values are replaced with lab-tested figures from the printed pack. */
  nutritionIsIndicative: boolean
  packs: { label: string; weight: string; priceInr: number }[]
  pairsWith: string
  featured?: boolean
}

/**
 * Nutrition values are indicative figures for roasted makhana and MUST be replaced with
 * lab-tested values from the printed pack before launch (see README → Content checklist).
 */
const baseNutrition = (sodiumServing: string, sodium100: string): NutritionRow[] => [
  { label: 'Energy', perServing: '118 kcal', per100g: '394 kcal' },
  { label: 'Protein', perServing: '3.0 g', per100g: '10.1 g' },
  { label: 'Carbohydrate', perServing: '19.8 g', per100g: '66.0 g' },
  { label: 'of which sugars', perServing: '0.6 g', per100g: '2.0 g', sub: true },
  { label: 'Dietary fibre', perServing: '2.7 g', per100g: '9.0 g' },
  { label: 'Total fat', perServing: '3.0 g', per100g: '10.0 g' },
  { label: 'of which saturated fat', perServing: '0.5 g', per100g: '1.6 g', sub: true },
  { label: 'Trans fat', perServing: '0 g', per100g: '0 g', sub: true },
  { label: 'Sodium', perServing: sodiumServing, per100g: sodium100 },
]

const standardPacks = [
  { label: 'Trial pack', weight: '30 g', priceInr: 49 },
  { label: 'Everyday pouch', weight: '75 g', priceInr: 129 },
  { label: 'Family multipack', weight: '6 × 30 g', priceInr: 279 },
]

export const flavours: Flavour[] = [
  {
    slug: 'himalayan-pink-salt-pepper',
    name: 'Himalayan Pink Salt & Pepper',
    shortName: 'Pink Salt & Pepper',
    hook: 'The clean classic. Light salt, cracked pepper, serious crunch.',
    description:
      'Roasted makhana seasoned with Himalayan pink salt and freshly cracked black pepper. Roasted, not fried, gluten-free and made with six simple ingredients — the everyday swap for chips at your desk.',
    heat: 1,
    palette: { primary: 'var(--color-sage)', secondary: 'var(--color-terracotta)' },
    image: pinkSaltPepper,
    ingredients: [
      'Makhana (fox nuts)',
      'Rice bran oil',
      'Himalayan pink salt',
      'Black pepper',
      'Dried herbs',
      'Rosemary extract',
    ],
    allergens: 'Packed in a facility that also handles nuts, sesame and milk.',
    servingSize: '30 g',
    nutrition: baseNutrition('165 mg', '550 mg'),
    nutritionIsIndicative: true,
    packs: standardPacks,
    pairsWith: 'Afternoon chai, a long spreadsheet, the 4 pm slump.',
    featured: true,
  },
  {
    slug: 'peri-peri-kick',
    name: 'Peri Peri Kick',
    shortName: 'Peri Peri',
    hook: 'Smoky chilli heat that builds — made for sharing (or not).',
    description:
      'Roasted makhana tossed in a smoky peri peri blend of chilli, garlic and paprika. Bold, shareable heat without the deep-fryer — roasted, gluten-free and portion-friendly.',
    heat: 3,
    palette: { primary: 'var(--color-terracotta)', secondary: 'var(--color-mustard)' },
    image: periPeriKick,
    ingredients: [
      'Makhana (fox nuts)',
      'Rice bran oil',
      'Peri peri seasoning (chilli, paprika, garlic, onion, lemon)',
      'Himalayan pink salt',
      'Rosemary extract',
    ],
    allergens: 'Packed in a facility that also handles nuts, sesame and milk.',
    servingSize: '30 g',
    nutrition: baseNutrition('180 mg', '600 mg'),
    nutritionIsIndicative: true,
    packs: standardPacks,
    pairsWith: 'Match nights, group study, the friend who says “just one”.',
  },
  {
    slug: 'cheese-herbs',
    name: 'Cheese & Herbs',
    shortName: 'Cheese & Herbs',
    hook: 'Creamy, herby, gone in minutes. A family favourite.',
    description:
      'Roasted makhana with a real cheese seasoning and Italian herbs. A familiar, kid-approved flavour for lunchboxes and evening snacking — roasted, never fried.',
    heat: 0,
    palette: { primary: 'var(--color-mustard)', secondary: 'var(--color-sage)' },
    image: cheeseHerbs,
    ingredients: [
      'Makhana (fox nuts)',
      'Rice bran oil',
      'Cheese powder (milk)',
      'Oregano',
      'Basil',
      'Himalayan pink salt',
    ],
    allergens: 'Contains milk. Packed in a facility that also handles nuts and sesame.',
    servingSize: '30 g',
    nutrition: baseNutrition('170 mg', '565 mg'),
    nutritionIsIndicative: true,
    packs: standardPacks,
    pairsWith: 'School lunchboxes, road trips, family movie night.',
  },
  {
    slug: 'pudina-chatpata',
    name: 'Pudina Chatpata',
    shortName: 'Pudina',
    hook: 'Cool mint, tangy chaat masala. Desi and dangerously moreish.',
    description:
      'Roasted makhana with fresh pudina (mint), amchur and chaat masala. A tangy, cooling desi flavour that tastes like a street-side snack — without the frying.',
    heat: 1,
    palette: { primary: 'var(--color-sage)', secondary: 'var(--color-mustard)' },
    image: pudinaChatpata,
    ingredients: [
      'Makhana (fox nuts)',
      'Rice bran oil',
      'Mint powder',
      'Amchur (dry mango)',
      'Chaat masala',
      'Black salt',
    ],
    allergens: 'Packed in a facility that also handles nuts, sesame and milk.',
    servingSize: '30 g',
    nutrition: baseNutrition('190 mg', '630 mg'),
    nutritionIsIndicative: true,
    packs: standardPacks,
    pairsWith: 'Monsoon evenings, post-workout cravings, travel bags.',
  },
]

export const getFlavour = (slug: string) => flavours.find((f) => f.slug === slug)

export const featuredFlavour = flavours.find((f) => f.featured) ?? flavours[0]
