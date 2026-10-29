'use client'

import { useEffect } from 'react'

import { CONSENT_CHANGE_EVENT, readConsent, type ConsentChoice } from '@/lib/analytics'

/**
 * Microsoft Clarity (heatmaps + session recordings). Its script is only added after the visitor
 * accepts cookies, so nothing reaches Clarity before then. Accepting sends Consent API v2 with
 * analytics granted and ads denied (Clarity isn't used for ads); declining later erases its
 * cookies and stops recording. Clarity masks typed text by default.
 */
export function MicrosoftClarity({ projectId }: { projectId: string }) {
  useEffect(() => {
    const apply = (choice: ConsentChoice | null) => {
      if (choice === 'granted') {
        loadClarity(projectId)
        window.clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' })
      } else if (choice === 'denied' && window.clarity) {
        window.clarity('consent', false)
      }
    }
    apply(readConsent())
    const onChange = (e: Event) => apply((e as CustomEvent<ConsentChoice>).detail)
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
  }, [projectId])

  return null
}

function loadClarity(projectId: string) {
  if (document.getElementById('ms-clarity')) return
  // Clarity's standard queue stub, so calls made before the script arrives aren't lost.
  const stub = ((...args: unknown[]) => {
    ;(stub.q ??= []).push(args)
  }) as NonNullable<Window['clarity']>
  window.clarity ??= stub
  const script = document.createElement('script')
  script.id = 'ms-clarity'
  script.async = true
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`
  document.head.appendChild(script)
}
