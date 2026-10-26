type GtagCommand = 'config' | 'event' | 'consent' | 'set' | 'js'

interface Window {
  dataLayer: unknown[]
  gtag?: (command: GtagCommand, ...args: unknown[]) => void
  /** Google Ads conversion `send_to`, set by the tag bootstrap in production. */
  ctAdsConversion?: string
}
