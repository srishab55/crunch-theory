import Script from 'next/script'

import { PageViewTracker } from './page-view-tracker'

import { CONSENT_STORAGE_KEY, GA_READY_EVENT } from '@/lib/analytics'
import { env } from '@/lib/env'

/**
 * GA4 via gtag.js with Google Consent Mode v2. Analytics storage defaults to "denied" until the
 * visitor accepts in the consent banner; GA then sends cookieless pings only.
 *
 * Automatic page views are disabled (`send_page_view: false`): GA's history listener does not see
 * App Router navigations, so <PageViewTracker /> sends one page_view per route instead.
 */
export function GoogleAnalytics() {
  const id = env.gaMeasurementId
  if (!id) return null

  const bootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var stored = null;
try { stored = localStorage.getItem('${CONSENT_STORAGE_KEY}'); } catch (e) {}
gtag('consent', 'default', {
  analytics_storage: stored === 'granted' ? 'granted' : 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', '${id}', { send_page_view: false });
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
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <PageViewTracker />
    </>
  )
}
