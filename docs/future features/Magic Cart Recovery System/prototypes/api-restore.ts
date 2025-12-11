// Flagged restore endpoint prototype (server-side, not deployed).
import { CART_RECOVERY_ENABLED, CART_RECOVERY_SECRET } from './env.server'
import { verifyRestoreToken } from './token'

export async function restoreHandler(req: Request): Promise<Response> {
  if (!CART_RECOVERY_ENABLED) return new Response('disabled', { status: 404 })
  if (!CART_RECOVERY_SECRET) return new Response('missing secret', { status: 500 })

  const body = await req.json().catch(() => ({} as any))
  const token = body.token as string | undefined
  if (!token) return new Response('missing token', { status: 400 })

  const payload = verifyRestoreToken(token, CART_RECOVERY_SECRET)
  if (!payload) return new Response('invalid or expired token', { status: 401 })

  // TODO: load snapshot or cart by payload.cartId/payload.snapshotRef
  // TODO: fetch/create Shopify cart and replay lines/discounts/email
  // For now, return stub checkout url.
  return new Response(JSON.stringify({ checkoutUrl: '/checkout', cartId: payload.cartId ?? 'restored-cart' }), {
    headers: { 'content-type': 'application/json' },
  })
}
