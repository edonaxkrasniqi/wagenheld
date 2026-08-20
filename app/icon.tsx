import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
  const logoData = await readFile(
    path.join(process.cwd(), 'public/images/logo-mark-white.png')
  )
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111719',
        }}
      >
        <img src={logoSrc} width={26} height={17} alt="" />
      </div>
    ),
    size
  )
}
