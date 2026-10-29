import type { Metadata } from 'next'
import type {
  AboutPage,
  BreadcrumbList,
  DefinedTermSet,
  FAQPage,
  ItemList,
  Organization,
  Product,
  WebSite,
  WithContext,
} from 'schema-dts'

import brandMark from '@/assets/brand/mark.png'
import type { Faq } from '@/data/faqs'
import type { Flavour } from '@/data/flavours'
import type { GlossaryTerm } from '@/data/glossary'
import type { ProductLine } from '@/data/products'
import { site } from '@/data/site'
import { absoluteUrl } from '@/lib/env'

type PageMetaInput = {
  title: string
  description: string
  path: string
  /** Overrides the route's file-based opengraph-image when provided. */
  image?: string
}

/** Per-page metadata with canonical URL and matching Open Graph / Twitter tags. */
export function buildMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const images = image ? [{ url: image, alt: title }] : undefined
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, ...(images && { images }) },
    twitter: { title, description, ...(images && { images }) },
  }
}

const ORG_ID = absoluteUrl('/#organization')
const SITE_ID = absoluteUrl('/#website')

export function organizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    alternateName: [...site.alternateNames],
    legalName: site.legalName,
    url: absoluteUrl('/'),
    logo: absoluteUrl(brandMark.src),
    slogan: site.tagline,
    description: site.description,
    ...(site.email && { email: site.email }),
    areaServed: { '@type': 'Country', name: 'India' },
    sameAs: Object.values(site.social),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: absoluteUrl('/contact'),
      ...(site.email && { email: site.email }),
      availableLanguage: ['English', 'Hindi'],
    },
  }
}

export function websiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: site.name,
    alternateName: [...site.alternateNames],
    url: absoluteUrl('/'),
    inLanguage: site.language,
    publisher: { '@id': ORG_ID },
  }
}

/**
 * Product markup for a flavour page. Google requires offers, review or aggregateRating, and we
 * won't invent reviews — so only render this when products are on sale (`isLive`). Pre-launch
 * the page carries breadcrumbs only, which keeps Search Console free of invalid Product items.
 */
export function productSchema(flavour: Flavour): WithContext<Product> {
  const url = absoluteUrl(`/flavours/${flavour.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: `${site.name} Roasted Makhana — ${flavour.name}`,
    description: flavour.description,
    url,
    image: absoluteUrl(flavour.image?.src ?? `/flavours/${flavour.slug}/opengraph-image`),
    brand: { '@type': 'Brand', name: site.name },
    category: 'Snacks > Roasted Makhana',
    sku: `CT-${flavour.slug}`,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Ingredients', value: flavour.ingredients.join(', ') },
      { '@type': 'PropertyValue', name: 'Allergens', value: flavour.allergens },
      { '@type': 'PropertyValue', name: 'Serving size', value: flavour.servingSize },
      { '@type': 'PropertyValue', name: 'Preparation', value: 'Roasted, not fried' },
      { '@type': 'PropertyValue', name: 'Gluten-free', value: 'Yes' },
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: Math.min(...flavour.packs.map((p) => p.priceInr)),
      highPrice: Math.max(...flavour.packs.map((p) => p.priceInr)),
      offerCount: flavour.packs.length,
      availability: 'https://schema.org/InStock',
    },
  }
}

export function productListSchema(flavours: Flavour[]): WithContext<ItemList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${site.name} flavours`,
    itemListElement: flavours.map((f, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/flavours/${f.slug}`),
      name: f.name,
    })),
  }
}

/** The product range; each line links to its own page (makhana's is /flavours). */
export function productRangeSchema(lines: ProductLine[]): WithContext<ItemList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${site.name} products`,
    itemListElement: lines.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(l.href),
      name: l.name,
    })),
  }
}

/** The glossary of Indian snack words on /faq, so search and AI answers can cite the definitions. */
export function glossarySchema(terms: GlossaryTerm[]): WithContext<DefinedTermSet> {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': absoluteUrl('/faq#glossary'),
    name: 'Indian snack words, explained',
    inLanguage: site.language,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.meaning,
      ...(t.alsoKnownAs && { alternateName: t.alsoKnownAs }),
    })),
  }
}

export function faqSchema(items: Faq[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function breadcrumbSchema(
  crumbs: { name: string; path: string }[],
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

export function aboutPageSchema(description: string): WithContext<AboutPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${site.name}`,
    description,
    url: absoluteUrl('/our-story'),
    about: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
  }
}
