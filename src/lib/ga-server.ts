import 'server-only'

import { randomInt } from 'node:crypto'

import { env } from '@/lib/env'

/**
 * Sends one event to GA4 from the server via the Measurement Protocol
 * (https://developers.google.com/analytics/devguides/collection/protocol/ga4).
 *
 * Server-side events reach GA4 even when the visitor runs an ad-blocker or declined analytics
 * cookies. To stay consent-free they are fully anonymous: a fresh random client ID per event, no
 * cookie, no user ID, and the visitor's IP is never forwarded (the request comes from Vercel).
 *
 * Needs GA_API_SECRET (GA4 → Admin → Data streams → your stream → Measurement Protocol API
 * secrets). Returns false when it isn't configured or the request fails, so callers can fall back.
 */
export async function sendServerEvent(
  name: string,
  params: Record<string, string | number>,
): Promise<boolean> {
  const measurementId = env.gaMeasurementId
  const apiSecret = process.env.GA_API_SECRET?.trim()
  if (!measurementId || !apiSecret) return false

  const nowSeconds = Math.floor(Date.now() / 1000)
  const body = {
    client_id: `${randomInt(1e9)}.${nowSeconds}`,
    non_personalized_ads: true,
    events: [
      {
        name,
        // session_id + engagement_time_msec make the event show up in Realtime reports.
        params: { ...params, session_id: String(nowSeconds), engagement_time_msec: 100 },
      },
    ],
  }

  try {
    const res = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      { method: 'POST', body: JSON.stringify(body) },
    )
    return res.ok
  } catch (error) {
    console.error('[ga] measurement protocol request failed', error)
    return false
  }
}
