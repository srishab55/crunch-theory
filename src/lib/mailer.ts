import 'server-only'

import { site } from '@/data/site'

/**
 * Default sender on our Resend-verified domain: the public support inbox when there is one (so
 * replies land somewhere real), otherwise noreply@. CONTACT_FROM_EMAIL overrides it.
 */
const DEFAULT_SENDER = `${site.name} <${site.email || `noreply@${site.sendingDomain}`}>`

/**
 * Resend's built-in sender, used only as a fallback if the domain sender is rejected (e.g.
 * verification lapsed). It can only deliver to the email address that owns the Resend account.
 */
const RESEND_TEST_SENDER = `${site.name} <onboarding@resend.dev>`

type Email = { to: string; subject: string; text: string; html?: string; replyTo?: string }

const config = () => ({
  apiKey: process.env.RESEND_API_KEY?.trim(),
  /** The site owner's inbox for form notifications. */
  inbox: process.env.CONTACT_TO_EMAIL?.trim(),
  from: process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_SENDER,
  /** Where visitors' replies to confirmation emails go: support inbox, else the owner's inbox. */
  visitorReplyTo:
    process.env.CONTACT_REPLY_TO?.trim() || site.email || process.env.CONTACT_TO_EMAIL?.trim(),
})

async function postToResend(apiKey: string, payload: Record<string, unknown>) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

/**
 * Sends one email via Resend. If Resend rejects the sender (403/422, e.g. the domain isn't
 * verified), it retries once from Resend's test sender so owner notifications still arrive.
 */
async function sendEmail(
  apiKey: string,
  from: string,
  { to, subject, text, html, replyTo }: Email,
) {
  const payload = {
    to,
    subject,
    text,
    ...(html && { html }),
    ...(replyTo && { reply_to: replyTo }),
  }
  let res = await postToResend(apiKey, { ...payload, from })

  if (!res.ok && from !== RESEND_TEST_SENDER && (res.status === 403 || res.status === 422)) {
    console.warn(`[mail] sender "${from}" rejected (${res.status}: ${await res.text()}); retrying`)
    res = await postToResend(apiKey, { ...payload, from: RESEND_TEST_SENDER })
  }

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`)
  }
}

/**
 * Notifies the site owner (CONTACT_TO_EMAIL). Without RESEND_API_KEY and CONTACT_TO_EMAIL it
 * only logs (visible in Vercel → Logs, kept ~1 hour on the free plan).
 */
export async function sendNotification(email: Omit<Email, 'to'>): Promise<void> {
  const { apiKey, inbox, from } = config()
  if (!apiKey || !inbox) {
    console.info(`[form] ${email.subject}\n${email.text}`)
    return
  }
  await sendEmail(apiKey, from, { ...email, to: inbox })
}

/**
 * Emails a visitor (e.g. a contact-form receipt). Replies go to the owner's inbox. Returns false
 * when email isn't configured. Throws on delivery failure so callers can treat it as best-effort.
 */
export async function sendToVisitor(email: Omit<Email, 'replyTo'>): Promise<boolean> {
  const { apiKey, from, visitorReplyTo } = config()
  if (!apiKey) return false
  await sendEmail(apiKey, from, { ...email, replyTo: visitorReplyTo })
  return true
}
