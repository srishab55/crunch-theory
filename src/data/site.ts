/**
 * Brand-level constants. Everything user-facing about the brand identity lives here so that
 * pages, metadata, structured data and llms.txt stay in sync.
 */
export const site = {
  name: 'Crunch Theory',
  legalName: 'Crunch Theory Foods',
  tagline: 'The Smart Way to Snack',
  description:
    'Crunch Theory makes roasted, never-fried makhana (fox nuts) for people who love to snack but want better everyday choices. Bold flavour, honest labels, made in India.',
  shortDescription: 'Roasted makhana snacks — big crunch, honest labels.',
  locale: 'en_IN',
  language: 'en-IN',
  country: 'IN',
  email: 'hello@crunchtheory.in',
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
    'gluten-free snacks',
    'office snacks',
    'better-for-you snacks',
    'Crunch Theory',
  ],
} as const

export const navigation = [
  { label: 'Flavours', href: '/flavours' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const
