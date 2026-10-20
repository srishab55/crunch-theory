import Script from 'next/script'

import { CONSENT_STORAGE_KEY } from '@/lib/analytics'
import { env } from '@/lib/env'

/**
 * GA4 via gtag.js with Google Consent Mode v2. Analytics storage defaults to "denied" until the
 * visitor accepts in the consent banner; GA then sends cookieless pings only. Page views for
 * client-side navigations are captured by GA4 Enhanced Measurement (history events).
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
gtag('config', '${id}');
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
    </>
  )
}
