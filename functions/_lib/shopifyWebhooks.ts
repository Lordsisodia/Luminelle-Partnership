import type { Env } from './types'
import { hmacSha256Base64, safeEqual } from './crypto'

export async function verifyShopifyWebhook(
  request: Request,
  env: Env,
): Promise<{ valid: boolean; body: any | null; rawBody: string | null; hmacHeader: string | null }> {
  const hmacHeader = request.headers.get('x-shopify-hmac-sha256') || request.headers.get('X-Shopify-Hmac-Sha256')
  if (!hmacHeader) return { valid: false, body: null, rawBody: null, hmacHeader: null }

  const secret = env.SHOPIFY_WEBHOOK_SECRET || env.SHOPIFY_API_SECRET || ''
  if (!secret) return { valid: false, body: null, rawBody: null, hmacHeader }

  const rawBody = await request.text()
  const expected = await hmacSha256Base64(secret, rawBody)
  const valid = safeEqual(expected, hmacHeader)

  if (!valid) return { valid: false, body: null, rawBody, hmacHeader }
  try {
    const body = JSON.parse(rawBody)
    return { valid: true, body, rawBody, hmacHeader }
  } catch {
    return { valid: true, body: null, rawBody, hmacHeader }
  }
}

