import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { featuredFlavour } from '@/data/flavours'
import { site } from '@/data/site'

export const ogSize = { width: 1200, height: 630 }

const asset = (...parts: string[]) => readFile(join(process.cwd(), 'src/assets', ...parts))

/** Portrait pouch crops live in src/assets/og/<slug>.jpg (see docs/IMAGE_PROMPTS.md). */
const pouchDataUrl = async (slug: string) => {
  const buf = await asset('og', `${slug}.jpg`)
  return `data:image/jpeg;base64,${buf.toString('base64')}`
}

/** Transparent logo parts built by `npm run logo`. */
const brandDataUrl = async (file: string) => {
  const buf = await asset('brand', file)
  return `data:image/png;base64,${buf.toString('base64')}`
}

/** Static brand fonts — next/og can't read the variable/woff2 files next/font serves. */
export async function loadOgFonts() {
  const [display, displaySemi, accent] = await Promise.all([
    asset('fonts', 'bricolage-grotesque-latin-800-normal.woff'),
    asset('fonts', 'bricolage-grotesque-latin-600-normal.woff'),
    asset('fonts', 'fraunces-latin-600-italic.woff'),
  ])
  return [
    { name: 'Bricolage', data: display, weight: 800 as const, style: 'normal' as const },
    { name: 'Bricolage', data: displaySemi, weight: 600 as const, style: 'normal' as const },
    { name: 'Fraunces', data: accent, weight: 600 as const, style: 'italic' as const },
  ]
}

type OgInput = { eyebrow: string; title: string; pouchSlug?: string }

/** Branded Open Graph card shared by every route's opengraph-image. */
export async function renderOgImage({ eyebrow, title, pouchSlug = featuredFlavour.slug }: OgInput) {
  const [pouch, mark, wordmark, fonts] = await Promise.all([
    pouchDataUrl(pouchSlug),
    brandDataUrl('mark.png'),
    brandDataUrl('wordmark.png'),
    loadOgFonts(),
  ])

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#f4eee3',
        fontFamily: 'Bricolage',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 72px',
          width: 720,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
            color: '#8a7a48',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            lineHeight: 0.98,
            letterSpacing: -2,
            color: '#1d301c',
            marginTop: 24,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires <img> */}
          <img src={mark} height={92} width={99} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires <img> */}
          <img src={wordmark} height={58} width={108} alt="" style={{ marginLeft: 14 }} />
        </div>
        <div style={{ fontSize: 24, fontWeight: 600, color: '#69655a', marginTop: 12 }}>
          {site.tagline}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 480,
          background: '#e6dccb',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires <img> */}
        <img src={pouch} width={400} height={487} alt="" style={{ borderRadius: 28 }} />
      </div>
    </div>,
    { ...ogSize, fonts },
  )
}
