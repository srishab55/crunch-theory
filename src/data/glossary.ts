/**
 * Indian food words used on the site and packs, explained for visitors outside India. Shown on
 * /faq#glossary (with DefinedTermSet markup), teased on /international and listed in llms.txt.
 */
export type GlossaryTerm = {
  term: string
  /** Rough English pronunciation; stressed syllable in capitals. */
  say?: string
  meaning: string
  /** Other names people search for; used as schema.org alternateName. */
  alsoKnownAs?: string[]
}

export const glossary: GlossaryTerm[] = [
  {
    term: 'Makhana',
    say: 'muh-KHAA-naa',
    meaning:
      'Puffed lotus seeds: the seeds of the Euryale fox lotus, popped like popcorn. Light, airy and crunchy, with a gentle nutty taste that takes on any seasoning.',
    alsoKnownAs: ['fox nuts', 'puffed lotus seeds', 'popped lotus seeds', 'phool makhana'],
  },
  {
    term: 'Chana',
    say: 'CHUH-naa',
    meaning:
      'Chickpeas (garbanzo beans). Roasted chana is a classic Indian teatime snack: crunchy, savoury and filling.',
    alsoKnownAs: ['chickpeas', 'garbanzo beans'],
  },
  {
    term: 'Ragi',
    say: 'RAA-gee',
    meaning:
      'Finger millet, an ancient whole grain grown across India and East Africa, with an earthy, slightly nutty flavour.',
    alsoKnownAs: ['finger millet'],
  },
  {
    term: 'Masala',
    say: 'muh-SAA-laa',
    meaning:
      'A blend of ground spices. On a snack, "masala" means it is seasoned with a savoury Indian spice mix.',
  },
  {
    term: 'Chaat masala',
    say: 'CHAAT muh-SAA-laa',
    meaning:
      'A tangy, salty spice blend (usually with dried mango powder and black salt) that gives Indian street food its zing.',
  },
  {
    term: 'Chatpata',
    say: 'chut-puh-TAA',
    meaning: 'Hindi for tangy, spicy and mouth-watering.',
  },
  {
    term: 'Pudina',
    say: 'poo-DEE-naa',
    meaning: 'Mint.',
    alsoKnownAs: ['mint'],
  },
  {
    term: 'Hing',
    say: 'hing',
    meaning:
      'Asafoetida, a savoury spice with an onion-and-garlic aroma, used in tiny pinches in Indian cooking.',
    alsoKnownAs: ['asafoetida'],
  },
  {
    term: 'Jeera',
    say: 'JEE-raa',
    meaning: 'Cumin.',
    alsoKnownAs: ['cumin'],
  },
  {
    term: 'Tadka',
    say: 'TUD-kaa',
    meaning:
      'Whole spices sizzled in hot oil or ghee and poured over a dish: the flavour base of everyday Indian home cooking.',
    alsoKnownAs: ['tempering'],
  },
  {
    term: 'Namkeen',
    say: 'nuhm-KEEN',
    meaning:
      'Savoury Indian snacks, usually fried mixes of lentils, nuts and gram-flour noodles. Crunch Theory roasts instead of frying.',
  },
  {
    term: 'Chai',
    say: 'chaai',
    meaning: 'Spiced milky tea, and India’s everyday tea break.',
  },
  {
    term: 'Tiffin',
    meaning: 'A lunchbox, often a stacked steel one carried to school or work.',
  },
  {
    term: 'Blinkit, Zepto & Swiggy Instamart',
    meaning:
      'Indian quick-commerce apps that deliver groceries very fast within Indian cities. They don’t deliver outside India.',
  },
  {
    term: 'MRP',
    meaning:
      'Maximum Retail Price: the tax-inclusive price printed on every pack sold in India. Our prices are shown in Indian rupees (₹ / INR).',
  },
]

/** The few terms worth surfacing first to someone new to Indian snacks. */
export const essentialTerms = glossary.filter((t) =>
  ['Makhana', 'Chana', 'Ragi', 'Masala'].includes(t.term),
)
