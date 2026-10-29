import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

/**
 * Short, shareable links that land on the home page with UTM tags, so GA4 attributes visits and
 * sign-ups to each channel (Reports → Acquisition → Traffic acquisition). Temporary redirects,
 * so a channel's tags can change later without browsers caching the old ones.
 */
const campaignLinks = [
  { slug: 'whatsapp', source: 'whatsapp', medium: 'social' },
  { slug: 'instagram', source: 'instagram', medium: 'social' },
  { slug: 'youtube', source: 'youtube', medium: 'social' },
  { slug: 'linkedin', source: 'linkedin', medium: 'social' },
  { slug: 'email', source: 'newsletter', medium: 'email' },
  { slug: 'qr', source: 'qr', medium: 'print' },
]
const CAMPAIGN = 'prelaunch'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {
    root: import.meta.dirname,
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  async redirects() {
    return [
      // Forgiving sitemap URLs: common Search Console slips would otherwise hit the HTML 404 page
      // ("Your Sitemap appears to be an HTML page").
      { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
      // Full URL pasted into a URL-prefix property: /https:/www.crunchtheory.store/sitemap.xml
      { source: '/:prefix(https?:.*)/sitemap.xml', destination: '/sitemap.xml', permanent: true },
      ...campaignLinks.map((c) => ({
        source: `/go/${c.slug}`,
        destination: `/?utm_source=${c.source}&utm_medium=${c.medium}&utm_campaign=${CAMPAIGN}`,
        permanent: false,
      })),
      // Makhana's product page is /flavours (its flavours have long-standing URLs there).
      { source: '/products/roasted-makhana', destination: '/flavours', permanent: true },
      {
        // One canonical host for SEO: send the vercel.app copy to the real domain (keeps the path).
        // The Search Console verification file stays reachable for the old property.
        // Keep in sync with `site.url` in src/data/site.ts.
        source: '/:path((?!googlecb2cce3dd9aa96c6\\.html$).*)',
        has: [{ type: 'host', value: 'crunch-theory.vercel.app' }],
        destination: 'https://www.crunchtheory.store/:path',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default nextConfig
