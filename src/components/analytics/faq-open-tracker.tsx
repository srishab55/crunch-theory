'use client'

import { useEffect } from 'react'

import { trackEvent } from '@/lib/analytics'

/**
 * Sends `faq_open` when any FAQ (<details data-faq="question">) opens. One capture-phase listener
 * on the document (`toggle` doesn't bubble), so the FAQ lists themselves stay server components.
 */
export function FaqOpenTracker() {
  useEffect(() => {
    const onToggle = (e: Event) => {
      const el = e.target
      if (el instanceof HTMLDetailsElement && el.open && el.dataset.faq) {
        trackEvent('faq_open', { question: el.dataset.faq })
      }
    }
    document.addEventListener('toggle', onToggle, true)
    return () => document.removeEventListener('toggle', onToggle, true)
  }, [])
  return null
}
