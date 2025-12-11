// Flagged share endpoint prototype (server-side, not deployed).
import { CART_RECOVERY_ENABLED, CART_RECOVERY_SECRET } from './env.server'
import { signRestoreToken } from './token'
import { toSnapshot } from './snapshot'

export async function shareHandler(req: Request): Promise<Response> {
  if (!CART_RECOVERY_ENABLED) return new Response('disabled', { status: 404 })
  if (!CART_RECOVERY_SECRET) return new Response('missing secret', { status: 500 })

  const body = await req.json().catch(() => ({} as any))
  const { cartId, snapshot, restoreBaseUrl } = body
  if (!cartId && !snapshot) return new Response('missing cartId or snapshot', { status: 400 })

  // In the real app, store snapshot or cartId ref in Supabase/R2 here and get snapshotRef.
  const payload = {
    cartId,
    snapshotRef: snapshot ? 'local' : undefined,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
    nonce: crypto.randomUUID(),
    v: 1,
  }
  const token = signRestoreToken(payload, CART_RECOVERY_SECRET)
  const url = `${restoreBaseUrl || 'https://example.com/cart'}?restore=${encodeURIComponent(token)}`

  return new Response(JSON.stringify({ restoreUrl: url, token }), { headers: { 'content-type': 'application/json' } })
}
