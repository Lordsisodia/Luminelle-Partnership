import { createHmac, timingSafeEqual } from 'crypto'

export async function verifySessionToken(token: string) {
  const secret = process.env.SHOPIFY_API_SECRET
  if (!secret) {
    throw new Error('SHOPIFY_API_SECRET is not set')
  }

  try {
    const [header, payload, sig] = token.split('.')
    if (!header || !payload || !sig) return null

    const expected = createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url')
    try {
      if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
    } catch {
      return null
    }

    const json = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as Record<string, unknown>
    return json
  } catch (error) {
    console.error('Session token verification failed:', error)
    return null
  }
}
