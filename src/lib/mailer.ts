import 'server-only'

import { site } from '@/data/site'

type Mail = { subject: string; text: string; replyTo?: string }

/** Default sender on our Resend-verified domain; CONTACT_FROM_EMAIL overrides it. */
const DEFAULT_SENDER = `${site.name} <noreply@${site.sendingDomain}>`

/**
 * Resend's built-in sender, used only as a fallback if the domain sender is rejected (e.g.
 * verification lapsed). It can only deliver to the email address that owns the Resend account.
 */
const RESEND_TEST_SENDER = `${site.name} <onboarding@resend.dev>`

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
 * Mail is sent from noreply@<sendingDomain> (or CONTACT_FROM_EMAIL). If Resend rejects that sender
 * (e.g. domain verification lapsed) the message is retried from Resend's test sender, so a
 * misconfigured sender never silently drops enquiries. Replies go to the visitor (reply_to).
 */
export async function sendNotification({ subject, text, replyTo }: Mail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.CONTACT_TO_EMAIL?.trim()
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_SENDER

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
