import 'server-only'

import { site } from '@/data/site'
import { absoluteUrl } from '@/lib/env'

/**
 * Contact-form emails. Email clients only reliably support inline styles and table layouts,
 * so these use the brand colours as literals (from globals.css) and a system font stack.
 */

const C = {
  cream: '#f4eee3',
  paper: '#fbf8f2',
  forest: '#2f4a2c',
  ink: '#24231e',
  muted: '#69655a',
  terracotta: '#a85b40',
  border: '#e6dccb',
}
const FONT = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"

export type EmailContent = { subject: string; text: string; html: string }

/** Everything a visitor types is untrusted: escape it before it goes into HTML. */
function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/**
 * First name for the greeting. Anything that looks like a link or address falls back to
 * "there", so the confirmation can't be used to deliver someone else's URL to a stranger.
 */
export function greetingName(name: string) {
  const first = name.trim().split(/\s+/)[0] ?? ''
  const looksLikeLink = /https?:|www\.|[@/\\:]|\.[a-z]{2,}/i.test(name)
  if (looksLikeLink || first.length < 2 || first.length > 30) return 'there'
  return first
}

function layout({ preheader, body }: { preheader: string; body: string }) {
  // /icon.png has a permanent URL (hashed asset URLs change with each logo update; emails live forever).
  const logo = absoluteUrl('/icon.png')
  const home = absoluteUrl('/')
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(site.name)}</title></head>
<body style="margin:0;padding:0;background:${C.cream};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${C.paper};border-radius:24px;">
      <tr><td style="padding:32px 32px 0;">
        <a href="${home}" style="text-decoration:none;">
          <img src="${logo}" width="56" height="56" alt="${escapeHtml(site.name)}" style="display:block;border:0;">
        </a>
      </td></tr>
      ${body}
      <tr><td style="padding:24px 32px 32px;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted};border-top:1px solid ${C.border};">
        ${escapeHtml(site.name)} · ${escapeHtml(site.tagline)} · <a href="${home}" style="color:${C.muted};">${escapeHtml(home.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</a>${site.email ? ` · <a href="mailto:${site.email}" style="color:${C.muted};">${site.email}</a>` : ''}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

const heading = (text: string) =>
  `<tr><td style="padding:24px 32px 0;font-family:${FONT};font-size:26px;line-height:1.2;font-weight:800;letter-spacing:-0.5px;color:${C.forest};">${text}</td></tr>`

const paragraph = (html: string) =>
  `<tr><td style="padding:16px 32px 0;font-family:${FONT};font-size:16px;line-height:1.6;color:${C.ink};">${html}</td></tr>`

const button = (label: string, href: string) =>
  `<tr><td style="padding:24px 32px;"><a href="${href}" style="display:inline-block;background:${C.forest};color:${C.paper};font-family:${FONT};font-size:15px;font-weight:700;text-decoration:none;padding:14px 26px;border-radius:999px;">${label}</a></td></tr>`

type ContactDetails = { name: string; email: string; topic: string; message: string }

/** To the site owner: the full message, with reply-to set to the visitor. */
export function contactNotificationEmail({
  name,
  email,
  topic,
  message,
}: ContactDetails): EmailContent {
  const subject = `[${topic}] New message from ${name}`
  const text = `New message from the Crunch Theory contact form

From: ${name} <${email}>
Topic: ${topic}

${message}

— Reply to this email to answer ${name} directly.`

  const quoted = escapeHtml(message).replaceAll('\n', '<br>')
  const html = layout({
    preheader: `${topic} — ${message.slice(0, 90)}`,
    body: [
      heading('New contact form message'),
      paragraph(
        `<strong>From:</strong> ${escapeHtml(name)} &lt;<a href="mailto:${escapeHtml(email)}" style="color:${C.forest};">${escapeHtml(email)}</a>&gt;<br><strong>Topic:</strong> ${escapeHtml(topic)}`,
      ),
      `<tr><td style="padding:16px 32px 0;"><div style="font-family:${FONT};font-size:16px;line-height:1.6;color:${C.ink};background:${C.cream};border-left:4px solid ${C.terracotta};border-radius:12px;padding:16px 18px;">${quoted}</div></td></tr>`,
      paragraph(
        `<span style="color:${C.muted};">Hit <strong>Reply</strong> to answer ${escapeHtml(name)} directly.</span>`,
      ),
      `<tr><td style="padding:0 0 8px;"></td></tr>`,
    ].join(''),
  })
  return { subject, text, html }
}

/**
 * To the visitor: a short receipt. It deliberately does not repeat their message, so the form
 * can't be used to send arbitrary text to strangers from our domain.
 */
export function contactConfirmationEmail({
  name,
  topic,
}: Pick<ContactDetails, 'name' | 'topic'>): EmailContent {
  const hi = greetingName(name)
  const flavours = absoluteUrl('/flavours')
  const subject = `We got your message — ${site.name}`
  const text = `Hi ${hi},

Thanks for getting in touch with ${site.name}. We've received your message about "${topic}" and a real person on our team will reply within two working days.

While you wait, take a look at our flavours: ${flavours}

If there's anything to add, just reply to this email.

— The ${site.name} team
${absoluteUrl('/')}${site.email ? `\n${site.email}` : ''}`

  const html = layout({
    preheader: 'Thanks — a real person will reply within two working days.',
    body: [
      heading(`Thanks, ${escapeHtml(hi)} — message received.`),
      paragraph(
        `We've got your message about <strong>${escapeHtml(topic)}</strong>. A real person on our team will reply within <strong>two working days</strong>.`,
      ),
      paragraph('If there’s anything to add, just reply to this email.'),
      button('Explore our flavours', flavours),
    ].join(''),
  })
  return { subject, text, html }
}
