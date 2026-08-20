import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const logoData = await readFile(
    path.join(process.cwd(), 'public/images/logo-white.png')
  )
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111719',
        }}
      >
        <img src={logoSrc} width={420} height={317} alt="" />
        <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.7)', marginTop: 32 }}>
          Premiumfahrzeuge · Ankauf · Erstklassiger Service
        </div>
      </div>
    ),
    size
  )
}
