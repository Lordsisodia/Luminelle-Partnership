import type { PagesFunction } from '../../../_lib/types'
import { CART_FRAGMENT, runStorefront, storefrontError } from '../../../_lib/storefront'
import { json, methodNotAllowed, text } from '../../../_lib/response'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])
  const body = await request.json().catch(() => ({} as any))
  if (!body.cartId || !Array.isArray(body.codes)) return text('Missing params', { status: 400 })
  try {
    const data = await runStorefront<any>(
      env,
      `#graphql
        mutation CartDiscountCodesUpdate($cartId:ID!, $codes:[String!]!) {
          cartDiscountCodesUpdate(cartId:$cartId, discountCodes:$codes) { cart { ...CartFields } }
        }
        ${CART_FRAGMENT}
      `,
      { cartId: body.cartId, codes: body.codes },
    )
    return json({ cart: data.cartDiscountCodesUpdate.cart })
  } catch (err) {
    console.error('[storefront/cart/discount-codes-update] failed', err)
    return storefrontError(err)
  }
}
