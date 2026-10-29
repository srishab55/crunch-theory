import Script from 'next/script'

import { FaqOpenTracker } from './faq-open-tracker'
import { PageViewTracker } from './page-view-tracker'
import { SectionViewTracker } from './section-view-tracker'

import { CONSENT_STORAGE_KEY, consentState, GA_READY_EVENT } from '@/lib/analytics'
import { env } from '@/lib/env'

/**
 * One Google tag (gtag.js) for GA4 and Google Ads, with Consent Mode v2. Analytics and ad
 * measurement default to "denied" until the visitor accepts in the consent banner; until then
 * Google only receives cookieless pings. Ad personalisation is always denied.
 * Google Ads conversions are sent with `trackAdsConversion()` (src/lib/analytics.ts).
 *
 * Automatic page views are disabled (`send_page_view: false`): GA's history listener does not see
 * App Router navigations, so <PageViewTracker /> sends one page_view per route instead.
 */
export function GoogleAnalytics() {
  const gaId = env.gaMeasurementId
  const adsId = env.googleAdsId
  const loaderId = gaId || adsId
  if (!loaderId) return null
  const defaults = JSON.stringify(consentState('denied'))
  const granted = JSON.stringify(consentState('granted'))

  const bootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var stored = null;
try { stored = localStorage.getItem('${CONSENT_STORAGE_KEY}'); } catch (e) {}
var consent = stored === 'granted' ? ${granted} : ${defaults};
consent.wait_for_update = 500;
gtag('consent', 'default', consent);
gtag('js', new Date());
${gaId ? `gtag('config', '${gaId}', { send_page_view: false });` : ''}
${adsId ? `gtag('config', '${adsId}');` : ''}
window.ctAdsConversion = '${env.googleAdsConversion}';
window.dispatchEvent(new Event('${GA_READY_EVENT}'));
`

  return (
    <>
      <Script id="ga-bootstrap" strategy="afterInteractive">
        {bootstrap}
      </Script>
      <Script
        id="ga-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
      />
      <PageViewTracker />
      <SectionViewTracker />
      <FaqOpenTracker />
    </>
  )
}
