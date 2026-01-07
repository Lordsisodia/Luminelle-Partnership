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
        mutation CartLinesRemove($cartId:ID!, $lineIds:[ID!]!) {
          cartLinesRemove(cartId:$cartId, lineIds:$lineIds) { cart { ...CartFields } }
        }
        ${CART_FRAGMENT}
      `,
      { cartId: body.cartId, lineIds: body.lineIds || [] },
    )
    return json({ cart: data.cartLinesRemove.cart })
  } catch (err) {
    console.error('[storefront/cart/remove-lines] failed', err)
    return storefrontError(err)
  }
}
