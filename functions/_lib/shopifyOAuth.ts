import type { Env } from './types'
import { hmacSha256Hex, safeEqual } from './crypto'

export function isValidShopDomain(shop?: string | null) {
  if (!shop) return false
  return /^(?:[a-z0-9][a-z0-9-]*)\\.myshopify\\.com$/i.test(shop)
}

export function buildMessageFromQuery(url: URL) {
  return Array.from(url.searchParams.entries())
    .filter(([k]) => k !== 'hmac' && k !== 'signature')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
}

export async function verifyShopifyHmac(env: Env, url: URL) {
  const secret = env.SHOPIFY_API_SECRET || ''
  if (!secret) throw new Error('SHOPIFY_API_SECRET is not set')
  const hmac = url.searchParams.get('hmac') || ''
  if (!hmac) return false
  const message = buildMessageFromQuery(url)
  const expected = await hmacSha256Hex(secret, message)
  return safeEqual(hmac, expected)
}

