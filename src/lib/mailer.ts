import 'server-only'

type Mail = { subject: string; text: string; replyTo?: string }

/**
 * Delivers a notification via Resend's REST API when configured; otherwise logs it so
 * submissions are still visible in Vercel → Logs during early development.
 */
export async function sendNotification({ subject, text, replyTo }: Mail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Crunch Theory <onboarding@resend.dev>'

  if (!apiKey || !to) {
    console.info(`[form] ${subject}\n${text}`)
    return
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, text, reply_to: replyTo }),
  })

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`)
  }
}
