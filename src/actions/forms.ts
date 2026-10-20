'use server'

import { z } from 'zod'

import { sendNotification } from '@/lib/mailer'
import { contactSchema, newsletterSchema, type FormState } from '@/lib/validation'

/** Bots fill every field; humans never see this one. */
const isBot = (formData: FormData) => Boolean(formData.get('company_website'))

export async function subscribeToNewsletter(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isBot(formData)) return { status: 'success', message: 'You’re on the list!' }

  const parsed = newsletterSchema.safeParse({ email: formData.get('email') })
  if (!parsed.success) {
    return { status: 'error', fieldErrors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await sendNotification({
      subject: 'New newsletter subscriber',
      text: `Email: ${parsed.data.email}`,
    })
    return { status: 'success', message: 'You’re on the list! First crunch-worthy email soon.' }
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

  const { name, email, topic, message } = parsed.data
  try {
    await sendNotification({
      subject: `[${topic}] Message from ${name}`,
      text: `From: ${name} <${email}>\nTopic: ${topic}\n\n${message}`,
      replyTo: email,
    })
    return { status: 'success', message: 'Thanks — we reply within two working days.' }
  } catch (error) {
    console.error('[contact] delivery failed', error)
    return { status: 'error', message: 'Something went wrong. Please email us directly.' }
  }
}
