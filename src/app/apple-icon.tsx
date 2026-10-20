import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
        color: '#f4eee3',
        fontFamily: 'Georgia, serif',
        fontSize: 34,
        letterSpacing: 3,
        lineHeight: 1,
      }}
    >
      <div>CRUNCH</div>
      <div style={{ color: '#d7a44f', marginTop: 6 }}>THEORY</div>
    </div>,
    size,
  )
}
