import { ImageResponse } from 'next/og'

import { loadOgFonts } from '@/lib/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const fonts = await loadOgFonts()
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#2f4a2c',
        lineHeight: 0.9,
      }}
    >
      <div style={{ fontFamily: 'Bricolage', fontWeight: 800, fontSize: 46, color: '#f4eee3' }}>
        crunch
      </div>
      <div style={{ fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: 40, color: '#d7a44f' }}>
        theory
      </div>
    </div>,
    { ...size, fonts },
  )
}
