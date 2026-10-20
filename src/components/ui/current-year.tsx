'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * Reads the year on the client only, so prerendered HTML never bakes in a stale value
 * (and Cache Components doesn't treat the shell as time-dependent).
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  )
  return <span>{year}</span>
}
