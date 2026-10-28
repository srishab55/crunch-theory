'use server'

import { headers } from 'next/headers'

import { flavours } from '@/data/flavours'
import { productLines } from '@/data/products'
import { sendServerEvent } from '@/lib/ga-server'
import { interestLocations } from '@/lib/interest'

/** Makhana flavour slugs, product-line slugs (e.g. 'roasted-chana') or 'any'. */
const validFlavours = new Set<string>([
  ...flavours.map((f) => f.slug),
  ...productLines.map((p) => p.slug),
  'any',
])
const validLocations = new Set<string>(interestLocations)

/** Per-IP cap so a script can't inflate the counts. Per server instance — a speed bump. */
const CLICKS_PER_HOUR = 20
const clicksByIp = new Map<string, number[]>()

function withinLimit(ip: string): boolean {
  const now = Date.now()
  const recent = (clicksByIp.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000)
  if (recent.length >= CLICKS_PER_HOUR) return false
  clicksByIp.set(ip, [...recent, now])
  if (clicksByIp.size > 5000) clicksByIp.clear() // keep memory bounded
  return true
}

/**
 * Records an "I'm interested" tap as a GA4 `interest_click` event, server-side.
 * `handled: true` → the server took care of it (sent, or deliberately dropped as invalid/abusive);
 * `handled: false` → server tracking isn't configured, so the browser should send it via gtag.
 */
export async function recordInterest(
  flavour: string,
  location: string,
): Promise<{ handled: boolean }> {
  if (!validFlavours.has(flavour) || !validLocations.has(location)) return { handled: true }

  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!withinLimit(ip)) return { handled: true }

  const sent = await sendServerEvent('interest_click', { flavour, location, source: 'server' })
  return { handled: sent }
}
