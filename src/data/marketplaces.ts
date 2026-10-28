export type Marketplace = {
  id: 'amazon' | 'blinkit' | 'zepto' | 'instamart' | 'bigbasket'
  name: string
  kind: 'quick-commerce' | 'online'
  /** Replace with the real product/listing URLs once listings are live. */
  url: (query: string) => string
  /**
   * Displayed large on the tile. Deliberately not a delivery time: those vary by city, store and
   * hour, so we never promise an exact one.
   */
  promise: string
  pitch: string
  /** Approximate store colours, used for the tile's hover fill so each store is recognisable. */
  brand: { bg: string; fg: string }
}

const q = (s: string) => encodeURIComponent(`Crunch Theory ${s}`)

/** Quick commerce first — that's where impulse snacking happens. */
export const marketplaces: Marketplace[] = [
  {
    id: 'blinkit',
    name: 'Blinkit',
    kind: 'quick-commerce',
    url: (s) => `https://blinkit.com/s/?q=${q(s)}`,
    promise: 'Lightning fast',
    pitch: 'Craving now? It’s on the way.',
    brand: { bg: '#f8cb46', fg: '#0c831f' },
  },
  {
    id: 'zepto',
    name: 'Zepto',
    kind: 'quick-commerce',
    url: (s) => `https://www.zeptonow.com/search?query=${q(s)}`,
    promise: 'Lightning fast',
    pitch: 'Before your chai gets cold.',
    brand: { bg: '#5a1e96', fg: '#ffffff' },
  },
  {
    id: 'instamart',
    name: 'Swiggy Instamart',
    kind: 'quick-commerce',
    url: (s) => `https://www.swiggy.com/instamart/search?query=${q(s)}`,
    promise: 'Lightning fast',
    pitch: 'Add it to tonight’s order.',
    brand: { bg: '#fc8019', fg: '#ffffff' },
  },
  {
    id: 'amazon',
    name: 'Amazon',
    kind: 'online',
    url: (s) => `https://www.amazon.in/s?k=${q(s)}`,
    promise: 'Stock up',
    pitch: 'Multipacks, delivered to your door.',
    brand: { bg: '#232f3e', fg: '#ff9900' },
  },
  {
    id: 'bigbasket',
    name: 'BigBasket',
    kind: 'online',
    url: (s) => `https://www.bigbasket.com/ps/?q=${q(s)}`,
    promise: 'Monthly shop',
    pitch: 'Pop it in the monthly basket.',
    brand: { bg: '#84c225', fg: '#1d301c' },
  },
]
