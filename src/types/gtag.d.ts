type GtagCommand = 'config' | 'event' | 'consent' | 'set' | 'js'

interface Window {
  dataLayer: unknown[]
  gtag?: (command: GtagCommand, ...args: unknown[]) => void
}
