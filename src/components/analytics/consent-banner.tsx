'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { CONSENT_OPEN_EVENT, readConsent, updateConsent, type ConsentChoice } from '@/lib/analytics'

import { Button } from '../ui/button'

/** Lightweight analytics-consent prompt (DPDP Act 2023 / GDPR friendly). */
export function ConsentBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Read after mount: localStorage is unavailable during prerendering.
    const id = window.setTimeout(() => setOpen(readConsent() === null), 1200)
    // "Cookie settings" in the footer reopens the banner so a choice can be changed later.
    const reopen = () => setOpen(true)
    window.addEventListener(CONSENT_OPEN_EVENT, reopen)
    return () => {
      window.clearTimeout(id)
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen)
    }
  }, [])

  const choose = (choice: ConsentChoice) => {
    updateConsent(choice)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-3xl border border-forest/10 bg-paper/95 p-5 shadow-2xl backdrop-blur sm:inset-x-6 sm:p-6"
        >
          <p className="text-sm leading-relaxed text-ink/80">
            We use cookies to see which snacks and pages people love and to measure how our Google
            ads perform, so we can make better ones. No ad personalisation, no selling data.{' '}
            <Link
              href="/privacy"
              className="font-semibold text-forest underline underline-offset-4"
            >
              Privacy
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <Button onClick={() => choose('granted')}>Sounds good</Button>
            <Button variant="secondary" onClick={() => choose('denied')}>
              No thanks
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
