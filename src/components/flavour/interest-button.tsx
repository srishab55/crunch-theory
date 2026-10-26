'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useSyncExternalStore } from 'react'

import { buttonStyles } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/cn'

/**
 * Pre-launch demand counter: "I'm interested" sends one GA4 `interest_click` per flavour per
 * browser (remembered in localStorage, with an in-memory fallback), so GA's event count and
 * "Total users" reflect real people rather than repeat taps.
 */
const STORAGE_KEY = 'ct-interest'
const memory = new Set<string>()
const listeners = new Set<() => void>()

function readSnapshot(): string {
  let stored: string[] = []
  try {
    stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    // Storage blocked (private mode) — fall back to this page view's memory.
  }
  return JSON.stringify([...new Set([...stored, ...memory])].sort())
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  window.addEventListener('storage', onChange)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener('storage', onChange)
  }
}

function remember(flavour: string) {
  memory.add(flavour)
  try {
    const current = JSON.parse(readSnapshot()) as string[]
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set([...current, flavour])]))
  } catch {
    // Memory fallback already holds it.
  }
  listeners.forEach((notify) => notify())
}

type Props = {
  /** Flavour slug, or 'any' for general interest in the brand. */
  flavour: string
  location: string
  tone?: 'light' | 'dark'
  size?: 'md' | 'lg'
  className?: string
}

export function InterestButton({
  flavour,
  location,
  tone = 'light',
  size = 'lg',
  className,
}: Props) {
  // Server and first client render agree on "not interested" (hydration-safe), then sync.
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => '[]')
  const interested = (JSON.parse(snapshot) as string[]).includes(flavour)

  const onClick = () => {
    if (interested) return
    trackEvent('interest_click', { flavour, location })
    remember(flavour)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={interested}
      className={buttonStyles(
        'secondary',
        size,
        cn(
          tone === 'dark' &&
            'border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-forest-deep',
          interested &&
            (tone === 'dark'
              ? 'border-transparent bg-mustard text-forest-deep hover:border-transparent hover:bg-mustard hover:text-forest-deep'
              : 'border-transparent bg-forest text-paper hover:bg-forest'),
          interested && 'cursor-default',
          className,
        ),
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {interested ? (
          <motion.span
            key="yes"
            className="inline-flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <CheckIcon /> You’re interested
          </motion.span>
        ) : (
          <motion.span
            key="no"
            className="inline-flex items-center gap-2"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
          >
            <HeartIcon /> I’m interested
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4" fill="none">
      <path
        d="M10 16.5s-6-3.6-6-8.1A3.4 3.4 0 0 1 10 6a3.4 3.4 0 0 1 6 2.4c0 4.5-6 8.1-6 8.1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4" fill="none">
      <path
        d="m4.5 10.5 3.5 3.5 7.5-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
