import type { VercelRequest, VercelResponse } from '@vercel/node'

import { ImageResponse } from '@vercel/og'
import { createElement } from 'react'

function getStringParam(url: URL, key: string, maxLen: number): string | null {
  const value = url.searchParams.get(key)
  if (!value) return null
  return value.slice(0, maxLen)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const host = req.headers.host || 'localhost'
    const url = new URL(req.url || '/', `https://${host}`)

    const title = getStringParam(url, 'title', 100) ?? 'Lumelle'
    const description =
      getStringParam(url, 'description', 200) ??
      'Satin-lined, waterproof shower caps for frizz-free hair.'

    const element = createElement(
      'div',
      {
        style: {
          backgroundColor: '#FDF8F6', // brand-blush/20
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '40px',
          border: '20px solid #E6D5D0', // brand-blush
        },
      },
      createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          },
        },
        createElement(
          'div',
          {
            style: {
              fontSize: 40,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#4A3B32', // brand-cocoa
              marginBottom: 20,
            },
          },
          'Lumelle',
        ),
        createElement(
          'div',
          {
            style: {
              fontSize: 60,
              fontWeight: 'bold',
              color: '#4A3B32', // brand-cocoa
              marginBottom: 20,
              lineHeight: 1.2,
            },
          },
          title,
        ),
        createElement(
          'div',
          {
            style: {
              fontSize: 30,
              color: '#4A3B32', // brand-cocoa
              opacity: 0.8,
              maxWidth: '800px',
            },
          },
          description,
        ),
      ),
    )

    const image = new ImageResponse(element, { width: 1200, height: 630 })
    const buffer = Buffer.from(await image.arrayBuffer())

    // Keep it cacheable, but not immutable since title/description are dynamic.
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400')
    return res.status(200).send(buffer)
  } catch (error) {
    console.error('Failed to generate OG image', error)
    return res.status(500).send('Failed to generate OG image')
  }
}

