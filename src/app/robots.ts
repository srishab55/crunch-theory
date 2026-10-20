import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/env'

/**
 * Search engines and AI answer engines are explicitly welcome: being cited by ChatGPT,
 * Perplexity, Claude, Gemini and Copilot is a discovery channel for the brand.
 */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'meta-externalagent',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: aiCrawlers, allow: '/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
