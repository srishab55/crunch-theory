import 'server-only'

type Mail = { subject: string; text: string; replyTo?: string }

/**
 * Resend's built-in sender. It works without verifying a domain, but can only deliver to the
 * email address that owns the Resend account — which is exactly the contact-form use case.
 */
const RESEND_TEST_SENDER = 'Crunch Theory <onboarding@resend.dev>'

async function postToResend(apiKey: string, payload: Record<string, unknown>) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

/**
 * Delivers a form notification to CONTACT_TO_EMAIL via Resend. Without RESEND_API_KEY and
 * CONTACT_TO_EMAIL it only logs (visible in Vercel → Logs, kept ~1 hour on the free plan).
 *
 * CONTACT_FROM_EMAIL is optional: it needs a domain verified in Resend. If Resend rejects it
 * (e.g. the domain isn't verified yet) the message is retried from Resend's test sender, so a
 * misconfigured sender never silently drops enquiries.
 */
export async function sendNotification({ subject, text, replyTo }: Mail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.CONTACT_TO_EMAIL?.trim()
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || RESEND_TEST_SENDER

  if (!apiKey || !to) {
    console.info(`[form] ${subject}\n${text}`)
    return
  }

  const payload = { to, subject, text, reply_to: replyTo }
  let res = await postToResend(apiKey, { ...payload, from })

  // 403/422 = sender not allowed (unverified domain or malformed address): retry once.
  if (!res.ok && from !== RESEND_TEST_SENDER && (res.status === 403 || res.status === 422)) {
    console.warn(`[mail] sender "${from}" rejected (${res.status}: ${await res.text()}); retrying`)
    res = await postToResend(apiKey, { ...payload, from: RESEND_TEST_SENDER })
  }

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`)
  }
}
