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

/** GA4 web-stream ID. Public by design (it ships to every browser), so it is safe to commit. */
const GA_MEASUREMENT_ID = 'G-T0HTG7NX71'

/**
 * The env var wins when set. Otherwise only Vercel production builds track, so local dev and
 * preview deployments don't pollute analytics.
 */
function resolveGaId(): string {
  const explicit = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (explicit !== undefined) return explicit
  return process.env.VERCEL_ENV === 'production' ? GA_MEASUREMENT_ID : ''
}

export const env = {
  siteUrl: resolveSiteUrl(),
  gaMeasurementId: resolveGaId(),
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
} as const

export const absoluteUrl = (path = '/') => new URL(path, env.siteUrl).toString()
