'use client'

import { useActionState, useEffect, type ReactNode } from 'react'

import { submitContactForm } from '@/actions/forms'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'
import { initialFormState } from '@/lib/validation'

import { Button } from '../ui/button'
import { Honeypot } from './honeypot'

const topics = [
  { value: 'general', label: 'General question' },
  { value: 'feedback', label: 'Product feedback' },
  { value: 'retail', label: 'Retail & wholesale' },
  { value: 'press', label: 'Press & collaborations' },
] as const

const fieldClass =
  'w-full rounded-2xl border border-forest/15 bg-paper px-5 py-4 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-forest aria-[invalid=true]:border-terracotta'

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initialFormState)
  const err = (field: string) => state.fieldErrors?.[field]?.[0]

  useEffect(() => {
    if (state.status === 'success')
      trackEvent('generate_lead', { form: 'contact', location: 'contact-page' })
  }, [state])

  if (state.status === 'success') {
    return (
      <div role="status" className="rounded-3xl bg-sage/25 p-10 text-center">
        <p className="font-display text-3xl font-bold text-forest">Message received.</p>
        <p className="mt-3 text-muted">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="relative grid gap-5" noValidate>
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={err('name')} id="contact-name">
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(err('name'))}
            className={fieldClass}
          />
        </Field>
        <Field label="Email" error={err('email')} id="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(err('email'))}
            className={fieldClass}
          />
        </Field>
      </div>
      <Field label="What’s it about?" error={err('topic')} id="contact-topic">
        <select
          id="contact-topic"
          name="topic"
          defaultValue="general"
          className={cn(fieldClass, 'appearance-none')}
        >
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message" error={err('message')} id="contact-message">
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(err('message'))}
          className={cn(fieldClass, 'resize-y')}
        />
      </Field>
      {state.status === 'error' && state.message && (
        <p role="alert" className="text-sm text-terracotta">
          {state.message}
        </p>
      )}
      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  error,
  id,
  children,
}: {
  label: string
  error?: string
  id: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-forest">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-sm text-terracotta">{error}</p>}
    </div>
  )
}
