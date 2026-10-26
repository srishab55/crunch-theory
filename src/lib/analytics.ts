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
  /** Pre-launch demand signal: visitor tapped "I'm interested" (once per flavour per browser). */
  interest_click: { flavour: string; location: string }
  /** Flavour spotlight slider changed slide. */
  spotlight_view: { flavour: string; method: 'arrow' | 'tab' | 'swipe' | 'key' }
}

export type AnalyticsEventName = keyof AnalyticsEvents
export type AnalyticsEventParams<E extends AnalyticsEventName> = AnalyticsEvents[E]

/** Dispatched by the GA bootstrap script once consent defaults and config are in place. */
export const GA_READY_EVENT = 'ct:ga-ready'

type QueuedCall = [name: string, params: Record<string, unknown>]
const queue: QueuedCall[] = []
let listening = false

/**
 * Sends a GA4 event, queueing it until the bootstrap has run. This keeps every hit behind the
 * consent default and ensures effects that fire during hydration (e.g. the first page_view)
 * aren't lost.
 */
function send(name: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params)
    return
  }
  queue.push([name, params])
  if (listening) return
  listening = true
  window.addEventListener(
    GA_READY_EVENT,
    () => {
      for (const [n, p] of queue.splice(0)) window.gtag?.('event', n, p)
    },
    { once: true },
  )
}

export function trackEvent<E extends AnalyticsEventName>(name: E, params: AnalyticsEvents[E]) {
  send(name, params)
}

/** Manual page_view for every route, including client-side navigations. */
export function trackPageView() {
  send('page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  })
}

export const CONSENT_STORAGE_KEY = 'ct-consent'
/** Dispatch on window to reopen the cookie banner (footer "Cookie settings"). */
export const CONSENT_OPEN_EVENT = 'ct:consent-open'
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
