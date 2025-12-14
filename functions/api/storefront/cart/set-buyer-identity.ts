import type { PagesFunction } from '../../../_lib/types'
import { CART_FRAGMENT, runStorefront } from '../../../_lib/storefront'
import { json, methodNotAllowed, text } from '../../../_lib/response'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])
  const body = await request.json().catch(() => ({} as any))
  if (!body.cartId) return text('Missing cartId', { status: 400 })

  const buyerIdentity: Record<string, any> = {}
  if (body.email) buyerIdentity.email = body.email
  if (body.phone) buyerIdentity.phone = body.phone
  if (body.customerAccessToken) buyerIdentity.customerAccessToken = body.customerAccessToken
  if (body.deliveryAddress) {
    buyerIdentity.deliveryAddressPreferences = [{ deliveryAddress: body.deliveryAddress }]
  }
  if (Object.keys(buyerIdentity).length === 0) return text('No buyer identity provided', { status: 400 })

  const data = await runStorefront<any>(
    env,
    `#graphql
      mutation CartBuyerIdentityUpdate($cartId:ID!, $buyerIdentity:CartBuyerIdentityInput!) {
        cartBuyerIdentityUpdate(cartId:$cartId, buyerIdentity:$buyerIdentity) { cart { ...CartFields } }
      }
      ${CART_FRAGMENT}
    `,
    { cartId: body.cartId, buyerIdentity },
  )
  return json({ cart: data.cartBuyerIdentityUpdate.cart })
}

