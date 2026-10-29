import type { MetadataRoute } from 'next'

import { flavours } from '@/data/flavours'
import { productLines, productPageLines } from '@/data/products'
import { absoluteUrl } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: {
    path: string
    priority: number
    changeFrequency: 'weekly' | 'monthly' | 'yearly'
  }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/flavours', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/our-story', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/international', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  ]

  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      ...(r.path === '/products' && {
        images: productLines.map((l) => absoluteUrl(l.image.src)),
      }),
    })),
    ...productPageLines.map((l) => ({
      url: absoluteUrl(l.href),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [absoluteUrl(l.image.src)],
    })),
    ...flavours.map((f) => ({
      url: absoluteUrl(`/flavours/${f.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [absoluteUrl(f.image.src)],
    })),
  ]
}
