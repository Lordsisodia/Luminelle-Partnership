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
        mutation CartLinesAdd($cartId:ID!, $lines:[CartLineInput!]!) {
          cartLinesAdd(cartId:$cartId, lines:$lines) { cart { ...CartFields } }
        }
        ${CART_FRAGMENT}
      `,
      { cartId: body.cartId, lines: [{ merchandiseId: body.merchandiseId, quantity: body.quantity ?? 1 }] },
    )
    return json({ cart: data.cartLinesAdd.cart })
  } catch (err) {
    console.error('[storefront/cart/add-lines] failed', err)
    return storefrontError(err)
  }
}
