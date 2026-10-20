import type { MetadataRoute } from 'next'

import { flavours } from '@/data/flavours'
import { absoluteUrl } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: {
    path: string
    priority: number
    changeFrequency: 'weekly' | 'monthly' | 'yearly'
  }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/flavours', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/our-story', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  ]

  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...flavours.map((f) => ({
      url: absoluteUrl(`/flavours/${f.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      ...(f.image && { images: [absoluteUrl(f.image)] }),
    })),
  ]
}
