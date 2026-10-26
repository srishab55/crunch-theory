'use client'

import { CONSENT_OPEN_EVENT } from '@/lib/analytics'

/** Reopens the cookie banner so visitors can change their analytics choice at any time. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
    >
      Cookie settings
    </button>
  )
}
