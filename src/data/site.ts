/**
 * Brand-level constants. Everything user-facing about the brand identity lives here so that
 * pages, metadata, structured data and llms.txt stay in sync.
 */
export const site = {
  name: 'Crunch Theory',
  /** Canonical origin for every page, sitemap, OG and schema URL (also see next.config redirects). */
  url: 'https://www.crunchtheory.store',
  /** Other ways people search for or write the brand; used as schema.org alternateName. */
  alternateNames: ['CrunchTheory', 'Crunch Theory Makhana', 'Crunch Theory Snacks'],
  legalName: 'Crunch Theory Foods',
  tagline: 'The Smart Way to Snack',
  description:
    'Crunch Theory makes better-for-you Indian snacks: roasted, never-fried makhana (puffed lotus seeds), roasted chana, vegetable chips and baked ragi chips. Bold flavour, honest labels, made in India.',
  shortDescription: 'Roasted makhana and better-for-you Indian snacks — big crunch, honest labels.',
  locale: 'en_IN',
  /** Plain English for every reader (Google ignores `lang` for targeting; screen readers use it). */
  language: 'en',
  country: 'IN',
  /**
   * Public support inbox (receives via Resend inbound — MX on crunchtheory.store). Shown on the
   * contact page, footer, privacy page and in structured data; also the sender and reply-to of
   * form emails. Set to '' to hide it everywhere.
   */
  email: 'support@crunchtheory.store' as string,
  /**
   * Sales status. 'coming-soon' (pre-launch): store tiles are non-clickable "Coming soon" cards,
   * buy CTAs become "Get notified" (→ newsletter), copy says "launching soon" and product schema
   * omits offers. Flip to 'live' at launch and everything switches back.
   */
  availability: 'coming-soon' as 'coming-soon' | 'live',
  /** Domain verified in Resend (DKIM + SPF) for sending form notifications. */
  sendingDomain: 'crunchtheory.store',
  social: {
    instagram: 'https://www.instagram.com/crunchtheory',
    youtube: 'https://www.youtube.com/@crunchtheory',
    linkedin: 'https://www.linkedin.com/company/crunchtheory',
  },
  keywords: [
    'roasted makhana',
    'healthy snacks India',
    'fox nuts',
    'lotus seeds snack',
    'puffed lotus seeds',
    'phool makhana',
    'roasted chickpeas',
    'roasted chana',
    'finger millet chips',
    'ragi chips',
    'vegetable chips',
    'Indian snacks',
    'gluten-free snacks',
    'office snacks',
    'better-for-you snacks',
    'Crunch Theory',
  ],
} as const

export const navigation = [
  { label: 'Products', href: '/products' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const

/** True once products are on sale (see `site.availability`). */
export const isLive = site.availability === 'live'

/** Where "Get notified" CTAs point: the footer newsletter form, present on every page. */
export const NOTIFY_HREF = '#newsletter'
