import type { StaticImageData } from 'next/image'

import pinkSaltPepper from '@/assets/pouches/himalayan-pink-salt-pepper.jpg'
import bakedRagiChips from '@/assets/products/baked-ragi-chips.jpg'
import masalaVegetableChips from '@/assets/products/masala-vegetable-chips.jpg'
import roastedChana from '@/assets/products/roasted-chana.jpg'

import { flavours } from './flavours'
import type { Tone } from './home'
import { isLive } from './site'

export type ProductFlavour = {
  name: string
  /** Plain-English meaning, for names that aren't English (e.g. Hing-Jeera → Asafoetida & cumin). */
  english?: string
  /** One taste-first line for the flavour card. */
  hook: string
  /** The flavour's own page, for lines that have them (makhana). */
  href?: string
}

export type ProductLine = {
  slug: string
  name: string
  /** What it is in plain English, for visitors who don't know the Indian name. */
  englishName: string
  /** Heading with one *accent* word. */
  title: string
  /** Short, playful callout: the sticker on the photo and the slider eyebrow. */
  sticker: string
  /** Answer-first: the first sentence should describe the product on its own. */
  description: string
  /** How it's made, in a few words (comparison table + llms.txt). */
  method: string
  /** Pill callouts. Only claims we can stand behind before lab values exist. */
  highlights: string[]
  flavours: ProductFlavour[]
  fromPriceInr: number
  /** 4:5 photo, imported so it gets a content-hashed URL (regenerate with `npm run images`). */
  image: StaticImageData
  imageAlt: string
  /** Accent from the pack art: the watercolour behind the photo and the sticker. */
  tone: Tone
  /** Home-page slider panel: a deep colour from the pack shot and an accent that reads on it. */
  spotlight: { bg: string; accent: string }
  /** On sale now. The new lines stay "coming soon" until they launch. */
  live: boolean
  /** The line's page, where its flavours live: /flavours for makhana, /products/<slug> otherwise. */
  href: string
}

/**
 * The Crunch Theory range. Makhana is the original line (its flavours live under /flavours); the
 * rest are upcoming, so their claims stay qualitative: no "high protein / fibre / calcium" until
 * the packs carry lab-tested nutrition that meets FSSAI's thresholds.
 */
export const productLines: ProductLine[] = [
  {
    slug: 'roasted-makhana',
    name: 'Roasted Makhana',
    englishName: 'Puffed lotus seeds (fox nuts)',
    title: 'Roasted *makhana*',
    sticker: 'The original',
    description:
      'Popped fox nuts slow-roasted in a little rice bran oil, then seasoned in four bold flavours. Light, crisp and naturally gluten-free.',
    method: 'Roasted, never fried',
    highlights: ['Roasted, never fried', 'Gluten-free', `${flavours.length} flavours`],
    flavours: flavours.map((f) => ({
      name: f.shortName,
      english: f.english,
      hook: f.hook,
      href: `/flavours/${f.slug}`,
    })),
    fromPriceInr: Math.min(...flavours.flatMap((f) => f.packs.map((p) => p.priceInr))),
    image: pinkSaltPepper,
    imageAlt: 'Crunch Theory Himalayan Pink Salt & Pepper roasted makhana pouch',
    tone: 'sage',
    spotlight: { bg: '#2f4a2c', accent: '#d7a44f' },
    live: isLive,
    href: '/flavours',
  },
  {
    slug: 'roasted-chana',
    name: 'Roasted Chana',
    englishName: 'Crunchy roasted chickpeas',
    title: 'Roasted *chana*',
    sticker: 'Teatime hero',
    description:
      'Whole chickpeas slow-roasted until they crack, then tossed in bold Indian spice. Chickpeas are naturally rich in plant protein and fibre, which makes this a snack that actually fills you up.',
    method: 'Slow-roasted',
    highlights: ['Slow-roasted', 'No palm oil', 'Plant protein'],
    flavours: [
      {
        name: 'Hing-Jeera',
        english: 'Asafoetida & cumin',
        hook: 'Roasted cumin and a pinch of hing (asafoetida): the tadka, or tempered-spice, flavour every Indian kitchen knows.',
      },
      { name: 'Tandoori BBQ', hook: 'Smoky, tangy tandoori spice with a barbecue finish.' },
    ],
    fromPriceInr: 49,
    image: roastedChana,
    imageAlt: 'Crunch Theory Roasted Chana pouch overflowing with roasted chickpeas',
    tone: 'mustard',
    spotlight: { bg: '#6b3d1c', accent: '#f0c36a' },
    live: false,
    href: '/products/roasted-chana',
  },
  {
    slug: 'masala-vegetable-chips',
    name: 'Masala Vegetable Chips',
    englishName: 'Spiced mixed-vegetable chips',
    title: 'Masala *veggie* chips',
    sticker: 'Real veg, real crunch',
    description:
      'Thin slices of sweet potato, beetroot, okra and taro, vacuum-cooked for a light, crisp chip and dusted with masala. Colourful, crunchy and made from real vegetables.',
    method: 'Vacuum-cooked',
    highlights: ['Vacuum-cooked', 'Real vegetables', 'No palm oil'],
    flavours: [
      {
        name: 'Chatpata Chaat',
        english: 'Tangy street-food spice',
        hook: 'Tangy, spicy chaat masala: the zing of Indian street food, in a chip.',
      },
      { name: 'Smoked Paprika', hook: 'Gently smoky, mildly sweet paprika with a warm finish.' },
    ],
    fromPriceInr: 49,
    image: masalaVegetableChips,
    imageAlt:
      'Crunch Theory Masala Vegetable Chips pouch with sweet potato, beetroot and okra chips',
    tone: 'terracotta',
    spotlight: { bg: '#22352c', accent: '#f0a066' },
    live: false,
    href: '/products/masala-vegetable-chips',
  },
  {
    slug: 'baked-ragi-chips',
    name: 'Baked Ragi Chips',
    englishName: 'Baked finger-millet chips',
    title: 'Baked *ragi* chips',
    sticker: 'Millet magic',
    description:
      'Ridged chips made with ragi (finger millet), baked instead of fried for a hearty, wholesome crunch. An ancient grain in a very modern snack.',
    method: 'Baked, not fried',
    highlights: ['Baked, not fried', 'Made with ragi', 'No palm oil'],
    flavours: [
      {
        name: 'Aged Cheddar & Onion',
        hook: 'Sharp, savoury cheddar with sweet onion: a cheesy classic.',
      },
      {
        name: 'Zesty Pudina',
        english: 'Zesty mint',
        hook: 'Cool mint with a zesty kick, fresh and moreish.',
      },
    ],
    fromPriceInr: 49,
    image: bakedRagiChips,
    imageAlt: 'Crunch Theory Baked Ragi Chips pouch with ridged ragi chips, mint and cheese',
    tone: 'sage',
    spotlight: { bg: '#7c3327', accent: '#c3d1ae' },
    live: false,
    href: '/products/baked-ragi-chips',
  },
]

/** Lines with their own page under /products (everything except makhana, which has /flavours). */
export const productPageLines = productLines.filter((l) => l.href === `/products/${l.slug}`)

export const getProductPageLine = (slug: string) => productPageLines.find((l) => l.slug === slug)

export const flavourNames = (line: ProductLine) => line.flavours.map((f) => f.name)

/** Flavour names with their English meaning where needed: "Hing-Jeera (asafoetida & cumin)". */
export const flavourLabels = (line: ProductLine) =>
  line.flavours.map((f) => (f.english ? `${f.name} (${f.english.toLowerCase()})` : f.name))
