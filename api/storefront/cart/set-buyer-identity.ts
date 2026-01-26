import { CART_FRAGMENT, runStorefront, processCartResponse } from '../_client.ts'

export default async function handler(req: Request) {
  const body = await req.json().catch(() => ({}))
  if (!body.cartId) return new Response('Missing cartId', { status: 400 })
  const buyerIdentity: Record<string, any> = {}
  if (body.email) buyerIdentity.email = body.email
  if (body.phone) buyerIdentity.phone = body.phone
  if (body.customerAccessToken) buyerIdentity.customerAccessToken = body.customerAccessToken
  if (body.deliveryAddress) {
    buyerIdentity.deliveryAddressPreferences = [{ deliveryAddress: body.deliveryAddress }]
  }
  if (Object.keys(buyerIdentity).length === 0) return new Response('No buyer identity provided', { status: 400 })
  const data = await runStorefront<any>(
    `#graphql
    mutation CartBuyerIdentityUpdate($cartId:ID!, $buyerIdentity:CartBuyerIdentityInput!) {
      cartBuyerIdentityUpdate(cartId:$cartId, buyerIdentity:$buyerIdentity) { cart { ...CartFields } }
    }
    ${CART_FRAGMENT}
  `,
    { cartId: body.cartId, buyerIdentity },
  )
  // Rewrite the checkout URL to use SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN
  processCartResponse(data.cartBuyerIdentityUpdate.cart)
  return new Response(JSON.stringify({ cart: data.cartBuyerIdentityUpdate.cart }), { headers: { 'content-type': 'application/json' } })
}
