import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Fraunces, Manrope } from 'next/font/google'

import { ConsentBanner } from '@/components/analytics/consent-banner'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import { Providers } from '@/components/layout/providers'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { JsonLd } from '@/components/seo/json-ld'
import { site } from '@/data/site'
import { env } from '@/lib/env'
import { organizationSchema, websiteSchema } from '@/lib/seo'

import './globals.css'

/** Display + logo: a characterful grotesque with optical sizing for punchy headlines. */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  axes: ['opsz', 'wdth'],
  display: 'swap',
})

/** Accent: serif italic for single highlighted words (e.g. "the *smart* way"). */
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  style: 'italic',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${site.name} — Roasted Makhana | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: env.siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: 'food',
  alternates: {
    canonical: '/',
    types: { 'text/plain': [{ url: '/llms.txt', title: 'LLM-readable site summary' }] },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: '/',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  ...(env.googleSiteVerification && {
    verification: { google: env.googleSiteVerification },
  }),
}

export const viewport: Viewport = {
  themeColor: '#f4eee3',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang={site.language}
      className={`${bricolage.variable} ${fraunces.variable} ${manrope.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-forest px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <ConsentBanner />
        </Providers>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
