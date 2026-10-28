import type { StaticImageData } from 'next/image'

import pinkSaltPepper from '@/assets/pouches/himalayan-pink-salt-pepper.jpg'
import bakedRagiChips from '@/assets/products/baked-ragi-chips.jpg'
import masalaVegetableChips from '@/assets/products/masala-vegetable-chips.jpg'
import roastedChana from '@/assets/products/roasted-chana.jpg'

import { flavours } from './flavours'
import type { Tone } from './home'
import { isLive } from './site'

export type ProductLine = {
  slug: string
  name: string
  /** Heading with one *accent* word. */
  title: string
  /** Short, playful callout shown as a sticker on the photo. */
  sticker: string
  /** Answer-first: the first sentence should describe the product on its own. */
  description: string
  /** How it's made, in a few words (comparison table + llms.txt). */
  method: string
  /** Pill callouts. Only claims we can stand behind before lab values exist. */
  highlights: string[]
  flavours: string[]
  fromPriceInr: number
  /** 4:5 photo, imported so it gets a content-hashed URL (regenerate with `npm run images`). */
  image: StaticImageData
  imageAlt: string
  /** Accent from the pack art: the watercolour behind the photo and the sticker. */
  tone: Tone
  /** On sale now. The new lines stay "coming soon" until they get their own flavour pages. */
  live: boolean
  /** Where the full range lives, for lines that have one. */
  href?: string
}

/**
 * The Crunch Theory range. Makhana is the original line (details on /flavours); the rest are
 * upcoming, so their claims stay qualitative: no "high protein / fibre / calcium" until the
 * packs carry lab-tested nutrition that meets FSSAI's thresholds.
 */
export const productLines: ProductLine[] = [
  {
    slug: 'roasted-makhana',
    name: 'Roasted Makhana',
    title: 'Roasted *makhana*',
    sticker: 'The original',
    description:
      'Popped fox nuts slow-roasted in a little rice bran oil, then seasoned in four bold flavours. Light, crisp and naturally gluten-free.',
    method: 'Slow-roasted, never fried',
    highlights: ['Roasted, never fried', 'Gluten-free', `${flavours.length} flavours`],
    flavours: flavours.map((f) => f.shortName),
    fromPriceInr: Math.min(...flavours.flatMap((f) => f.packs.map((p) => p.priceInr))),
    image: pinkSaltPepper,
    imageAlt: 'Crunch Theory Himalayan Pink Salt & Pepper roasted makhana pouch',
    tone: 'sage',
    live: isLive,
    href: '/flavours',
  },
  {
    slug: 'roasted-chana',
    name: 'Roasted Chana',
    title: 'Roasted *chana*',
    sticker: 'Teatime hero',
    description:
      'Whole chickpeas slow-roasted until they crack, then tossed in bold Indian spice. Chickpeas are naturally rich in plant protein and fibre, which makes this a snack that actually fills you up.',
    method: 'Slow-roasted',
    highlights: ['Slow-roasted', 'No palm oil', 'Plant protein'],
    flavours: ['Hing-Jeera', 'Tandoori BBQ'],
    fromPriceInr: 49,
    image: roastedChana,
    imageAlt: 'Crunch Theory Roasted Chana pouch overflowing with roasted chickpeas',
    tone: 'mustard',
    live: false,
  },
  {
    slug: 'masala-vegetable-chips',
    name: 'Masala Vegetable Chips',
    title: 'Masala *veggie* chips',
    sticker: 'Real veg, real crunch',
    description:
      'Thin slices of sweet potato, beetroot, okra and taro, vacuum-cooked for a light, crisp chip and dusted with masala. Colourful, crunchy and made from real vegetables.',
    method: 'Vacuum-cooked',
    highlights: ['Vacuum-cooked', 'Real vegetables', 'No palm oil'],
    flavours: ['Chatpata Chaat', 'Smoked Paprika'],
    fromPriceInr: 49,
    image: masalaVegetableChips,
    imageAlt:
      'Crunch Theory Masala Vegetable Chips pouch with sweet potato, beetroot and okra chips',
    tone: 'terracotta',
    live: false,
  },
  {
    slug: 'baked-ragi-chips',
    name: 'Baked Ragi Chips',
    title: 'Baked *ragi* chips',
    sticker: 'Millet magic',
    description:
      'Ridged chips made with ragi (finger millet), baked instead of fried for a hearty, wholesome crunch. An ancient grain in a very modern snack.',
    method: 'Baked, not fried',
    highlights: ['Baked, not fried', 'Made with ragi', 'No palm oil'],
    flavours: ['Aged Cheddar & Onion', 'Zesty Pudina'],
    fromPriceInr: 49,
    image: bakedRagiChips,
    imageAlt: 'Crunch Theory Baked Ragi Chips pouch with ridged ragi chips, mint and cheese',
    tone: 'sage',
    live: false,
  },
]
