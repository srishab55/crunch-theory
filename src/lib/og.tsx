import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { site } from '@/data/site'

export const ogSize = { width: 1200, height: 630 }

const pouchDataUrl = async () => {
  const buf = await readFile(join(process.cwd(), 'src/assets/og/pouch.jpg'))
  return `data:image/jpeg;base64,${buf.toString('base64')}`
}

/** Branded Open Graph card shared by every route's opengraph-image. */
export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const pouch = await pouchDataUrl()
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#f4eee3',
        fontFamily: 'Georgia, serif',
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
          style={{ fontSize: 22, letterSpacing: 4, color: '#8a7a48', textTransform: 'uppercase' }}
        >
          {eyebrow}
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.02, color: '#2f4a2c', marginTop: 24 }}>
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 30,
            color: '#2f4a2c',
            letterSpacing: 4,
          }}
        >
          CRUNCH <span style={{ color: '#8a7a48', marginLeft: 12 }}>THEORY</span>
        </div>
        <div style={{ fontSize: 24, color: '#69655a', marginTop: 8 }}>{site.tagline}</div>
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
        <img src={pouch} width={400} height={523} alt="" style={{ borderRadius: 28 }} />
      </div>
    </div>,
    ogSize,
  )
}
