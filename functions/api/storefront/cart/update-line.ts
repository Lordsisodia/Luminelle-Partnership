import type { PagesFunction } from '../../../_lib/types'
import { CART_FRAGMENT, runStorefront, storefrontError } from '../../../_lib/storefront'
import { json, methodNotAllowed } from '../../../_lib/response'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])
  const body = await request.json().catch(() => ({} as any))
  try {
    const data = await runStorefront<any>(
      env,
      `#graphql
        mutation CartLinesUpdate($cartId:ID!, $lines:[CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId:$cartId, lines:$lines) { cart { ...CartFields } }
        }
        ${CART_FRAGMENT}
      `,
      { cartId: body.cartId, lines: [{ id: body.lineId, quantity: body.quantity }] },
    )
    return json({ cart: data.cartLinesUpdate.cart })
  } catch (err) {
    console.error('[storefront/cart/update-line] failed', err)
    return storefrontError(err)
  }
}
