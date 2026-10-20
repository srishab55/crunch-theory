export type Marketplace = {
  id: 'amazon' | 'blinkit' | 'zepto' | 'instamart' | 'bigbasket'
  name: string
  /** Replace with the real product/listing URLs once listings are live. */
  url: (query: string) => string
  delivery: string
}

const q = (s: string) => encodeURIComponent(`Crunch Theory ${s}`)

export const marketplaces: Marketplace[] = [
  {
    id: 'amazon',
    name: 'Amazon',
    url: (s) => `https://www.amazon.in/s?k=${q(s)}`,
    delivery: '1–3 days',
  },
  {
    id: 'blinkit',
    name: 'Blinkit',
    url: (s) => `https://blinkit.com/s/?q=${q(s)}`,
    delivery: '10 min',
  },
  {
    id: 'zepto',
    name: 'Zepto',
    url: (s) => `https://www.zeptonow.com/search?query=${q(s)}`,
    delivery: '10 min',
  },
  {
    id: 'instamart',
    name: 'Swiggy Instamart',
    url: (s) => `https://www.swiggy.com/instamart/search?query=${q(s)}`,
    delivery: '15 min',
  },
  {
    id: 'bigbasket',
    name: 'BigBasket',
    url: (s) => `https://www.bigbasket.com/ps/?q=${q(s)}`,
    delivery: 'Same day',
  },
]
