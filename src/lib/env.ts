/**
 * Resolves the canonical site URL. Order: explicit env → Vercel production domain → localhost.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercelProduction) return `https://${vercelProduction}`

  return 'http://localhost:3000'
}

export const env = {
  siteUrl: resolveSiteUrl(),
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
} as const

export const absoluteUrl = (path = '/') => new URL(path, env.siteUrl).toString()
