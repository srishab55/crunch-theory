'use client'

import { useActionState, useEffect, useId } from 'react'

import { subscribeToNewsletter } from '@/actions/forms'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'
import { initialFormState } from '@/lib/validation'

import { Honeypot } from './honeypot'

type Props = { location: string; inverted?: boolean; className?: string }

export function NewsletterForm({ location, inverted = false, className }: Props) {
  const [state, action, pending] = useActionState(subscribeToNewsletter, initialFormState)
  const id = useId()
  const error =
    state.fieldErrors?.email?.[0] ?? (state.status === 'error' ? state.message : undefined)

  useEffect(() => {
    if (state.status === 'success') trackEvent('generate_lead', { form: 'newsletter', location })
  }, [state, location])

  if (state.status === 'success') {
    return (
      <p
        role="status"
        className={cn(
          'text-lg font-semibold',
          inverted ? 'text-mustard' : 'text-forest',
          className,
        )}
      >
        {state.message}
      </p>
    )
  }

  return (
    <form action={action} className={cn('relative w-full max-w-md', className)} noValidate>
      <Honeypot />
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          'flex items-center gap-2 rounded-full border p-1.5 pl-5 transition-colors focus-within:border-mustard',
          inverted ? 'border-paper/25 bg-paper/5' : 'border-forest/20 bg-paper',
        )}
      >
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-base outline-none placeholder:opacity-50',
            inverted ? 'text-paper' : 'text-ink',
          )}
        />
        <button
          type="submit"
          disabled={pending}
          className={cn(
            'h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors disabled:opacity-60',
            inverted
              ? 'bg-mustard text-forest-deep hover:bg-paper'
              : 'bg-forest text-paper hover:bg-forest-deep',
          )}
        >
          {pending ? 'Joining…' : 'Join'}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 pl-5 text-sm text-terracotta">
          {error}
        </p>
      )}
    </form>
  )
}
