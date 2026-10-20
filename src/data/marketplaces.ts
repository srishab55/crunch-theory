export type Marketplace = {
  id: 'amazon' | 'blinkit' | 'zepto' | 'instamart' | 'bigbasket'
  name: string
  kind: 'quick-commerce' | 'online'
  /** Replace with the real product/listing URLs once listings are live. */
  url: (query: string) => string
  /** Displayed large on the tile, e.g. { value: '10', unit: 'min' }. */
  speed: { value: string; unit: string }
  /** Plain-text delivery estimate for compact labels and llms.txt. */
  delivery: string
  pitch: string
  /** Approximate store colours, used for the tile's hover fill so each store is recognisable. */
  brand: { bg: string; fg: string }
}

const q = (s: string) => encodeURIComponent(`Crunch Theory ${s}`)

/** Ordered fastest first — quick commerce is where impulse snacking happens. */
export const marketplaces: Marketplace[] = [
  {
    id: 'blinkit',
    name: 'Blinkit',
    kind: 'quick-commerce',
    url: (s) => `https://blinkit.com/s/?q=${q(s)}`,
    speed: { value: '10', unit: 'min' },
    delivery: '10 min',
    pitch: 'Craving now? It’s on the way.',
    brand: { bg: '#f8cb46', fg: '#0c831f' },
  },
  {
    id: 'zepto',
    name: 'Zepto',
    kind: 'quick-commerce',
    url: (s) => `https://www.zeptonow.com/search?query=${q(s)}`,
    speed: { value: '10', unit: 'min' },
    delivery: '10 min',
    pitch: 'Before your chai gets cold.',
    brand: { bg: '#5a1e96', fg: '#ffffff' },
  },
  {
    id: 'instamart',
    name: 'Swiggy Instamart',
    kind: 'quick-commerce',
    url: (s) => `https://www.swiggy.com/instamart/search?query=${q(s)}`,
    speed: { value: '15', unit: 'min' },
    delivery: '15 min',
    pitch: 'Add it to tonight’s order.',
    brand: { bg: '#fc8019', fg: '#ffffff' },
  },
  {
    id: 'amazon',
    name: 'Amazon',
    kind: 'online',
    url: (s) => `https://www.amazon.in/s?k=${q(s)}`,
    speed: { value: '1–3', unit: 'days' },
    delivery: '1–3 days',
    pitch: 'Stock up on multipacks.',
    brand: { bg: '#232f3e', fg: '#ff9900' },
  },
  {
    id: 'bigbasket',
    name: 'BigBasket',
    kind: 'online',
    url: (s) => `https://www.bigbasket.com/ps/?q=${q(s)}`,
    speed: { value: 'Same', unit: 'day' },
    delivery: 'Same day',
    pitch: 'Pop it in the monthly basket.',
    brand: { bg: '#84c225', fg: '#1d301c' },
  },
]
