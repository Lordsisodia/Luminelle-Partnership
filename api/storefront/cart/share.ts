import { CART_RECOVERY_ENABLED, CART_RECOVERY_SECRET } from '@/domains/shop/cart/recovery/env'
import { signRestoreToken } from '@/domains/shop/cart/recovery/token'
import { toSnapshot } from '@/domains/shop/cart/recovery/snapshot'

export default async function handler(req: Request) {
  if (!CART_RECOVERY_ENABLED) return new Response('disabled', { status: 404 })
  if (!CART_RECOVERY_SECRET) return new Response('missing secret', { status: 500 })

  const body = await req.json().catch(() => ({} as any))
  const { cartId, snapshot, restoreBaseUrl } = body
  if (!cartId && !snapshot) return new Response('missing cartId or snapshot', { status: 400 })

  // TODO: store snapshot or cartId ref in Supabase/R2 and use snapshotRef instead of inline snapshot.
  const payload = {
    cartId,
    snapshotRef: snapshot ? 'inline' : undefined,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
    nonce: crypto.randomUUID(),
    v: 1,
  }

  const token = signRestoreToken(payload, CART_RECOVERY_SECRET)
  const base = restoreBaseUrl || 'https://example.com/cart'
  const url = `${base}?restore=${encodeURIComponent(token)}`

  return new Response(JSON.stringify({ restoreUrl: url, token }), { headers: { 'content-type': 'application/json' } })
}
