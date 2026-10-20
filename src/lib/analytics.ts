/**
 * Typed wrapper around GA4's gtag. Event names follow GA4 recommended events where one exists
 * (https://support.google.com/analytics/answer/9267735) so they appear in standard reports.
 */
type AnalyticsEvents = {
  /** Outbound click to a marketplace listing. */
  buy_click: { marketplace: string; flavour: string; location: string }
  /** GA4 recommended: user views a product detail page. */
  view_item: { item_id: string; item_name: string; item_category: string }
  /** GA4 recommended: lead captured (newsletter or contact form). */
  generate_lead: { form: 'newsletter' | 'contact'; location: string }
  /** Primary call-to-action clicks across the site. */
  cta_click: { label: string; location: string }
  faq_open: { question: string }
}

export type AnalyticsEventName = keyof AnalyticsEvents

export function trackEvent<E extends AnalyticsEventName>(name: E, params: AnalyticsEvents[E]) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

export const CONSENT_STORAGE_KEY = 'ct-consent'
export type ConsentChoice = 'granted' | 'denied'

export function updateConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
  } catch {
    // Storage can be unavailable (private mode); consent then lasts for this page view only.
  }
  window.gtag?.('consent', 'update', {
    analytics_storage: choice,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}
