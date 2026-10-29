'use server'

import { z } from 'zod'

import { contactConfirmationEmail, contactNotificationEmail } from '@/lib/emails/contact'
import { sendNotification, sendToVisitor } from '@/lib/mailer'
import { topicLabel, type FormState } from '@/lib/forms'
import { contactSchema, newsletterSchema } from '@/lib/validation'

/** Bots fill every field; humans never see this one. */
const isBot = (formData: FormData) => Boolean(formData.get('company_website'))

/**
 * Caps confirmation emails per recipient so the form can't be used to flood someone's inbox.
 * In-memory, so it's per server instance — a speed bump, not a guarantee (use Vercel Firewall
 * rate limiting if abuse ever appears).
 */
const CONFIRMATIONS_PER_HOUR = 2
const confirmationLog = new Map<string, number[]>()

function mayConfirm(email: string): boolean {
  const now = Date.now()
  const key = email.toLowerCase()
  const recent = (confirmationLog.get(key) ?? []).filter((t) => now - t < 60 * 60 * 1000)
  if (recent.length >= CONFIRMATIONS_PER_HOUR) return false
  confirmationLog.set(key, [...recent, now])
  if (confirmationLog.size > 1000) confirmationLog.clear() // keep memory bounded
  return true
}

export async function subscribeToNewsletter(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isBot(formData)) return { status: 'success', message: 'You’re on the list!' }

  const parsed = newsletterSchema.safeParse({
    email: formData.get('email'),
    country: formData.get('country') ?? undefined,
  })
  if (!parsed.success) {
    return { status: 'error', fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }
  const { email, country } = parsed.data
  // The country field only exists on the international waitlist form.
  const international = formData.has('country')

  try {
    await sendNotification({
      subject: international
        ? `New international waitlist sign-up${country ? ` (${country})` : ''}`
        : 'New newsletter subscriber',
      text: `Email: ${email}${international ? `\nCountry: ${country || 'not given'}` : ''}`,
    })
    return {
      status: 'success',
      message: international
        ? 'You’re on the international waitlist! We’ll email you when we ship to you.'
        : 'You’re on the list! First crunch-worthy email soon.',
    }
  } catch (error) {
    console.error('[newsletter] delivery failed', error)
    return { status: 'error', message: 'Something went wrong. Please try again in a minute.' }
  }
}

export async function submitContactForm(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: 'success', message: 'Thanks — we’ll be in touch.' }

  const parsed = contactSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  const { name, email, message } = parsed.data
  const topic = topicLabel(parsed.data.topic)

  // 1. The owner's copy is the critical email: if it fails, tell the visitor to retry.
  try {
    await sendNotification({
      ...contactNotificationEmail({ name, email, topic, message }),
      replyTo: email,
    })
  } catch (error) {
    console.error('[contact] delivery failed', error)
    return { status: 'error', message: 'Something went wrong. Please try again in a minute.' }
  }

  // 2. The visitor's receipt is best-effort: a failure here must not lose the enquiry.
  let confirmed = false
  if (mayConfirm(email)) {
    try {
      confirmed = await sendToVisitor({ to: email, ...contactConfirmationEmail({ name, topic }) })
    } catch (error) {
      console.error('[contact] confirmation email failed', error)
    }
  }

  return {
    status: 'success',
    message: confirmed
      ? 'We’ve emailed you a confirmation — a real person replies within two working days.'
      : 'Thanks — we reply within two working days.',
  }
}
