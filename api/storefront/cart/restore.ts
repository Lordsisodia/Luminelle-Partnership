import { CART_RECOVERY_ENABLED, CART_RECOVERY_SECRET } from '@/domains/shop/cart/recovery/env'
import { verifyRestoreToken } from '@/domains/shop/cart/recovery/token'

export default async function handler(req: Request) {
  if (!CART_RECOVERY_ENABLED) return new Response('disabled', { status: 404 })
  if (!CART_RECOVERY_SECRET) return new Response('missing secret', { status: 500 })

  const body = await req.json().catch(() => ({} as any))
  const token = body.token as string | undefined
  if (!token) return new Response('missing token', { status: 400 })

  const payload = verifyRestoreToken(token, CART_RECOVERY_SECRET)
  if (!payload) return new Response('invalid or expired token', { status: 401 })

  // TODO: load snapshot or cart by payload.cartId/payload.snapshotRef
  // TODO: fetch/create Shopify cart and replay lines/discounts/email
  return new Response(JSON.stringify({ checkoutUrl: '/checkout', cartId: payload.cartId ?? 'restored-cart' }), {
    headers: { 'content-type': 'application/json' },
  })
}
