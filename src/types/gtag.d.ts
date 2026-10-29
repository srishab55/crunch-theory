type GtagCommand = 'config' | 'event' | 'consent' | 'set' | 'js'

interface Window {
  dataLayer: unknown[]
  gtag?: (command: GtagCommand, ...args: unknown[]) => void
  /** Google Ads conversion `send_to`, set by the tag bootstrap in production. */
  ctAdsConversion?: string
  /** Microsoft Clarity command queue / API (loaded only after cookie consent). */
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] }
}
