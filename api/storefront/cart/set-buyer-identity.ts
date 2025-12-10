import { CART_FRAGMENT, runStorefront } from '../_client'

export default async function handler(req: Request) {
  const body = await req.json().catch(() => ({}))
  if (!body.cartId) return new Response('Missing cartId', { status: 400 })
  const data = await runStorefront<any>(
    `#graphql
    mutation CartBuyerIdentityUpdate($cartId:ID!, $buyerIdentity:CartBuyerIdentityInput!) {
      cartBuyerIdentityUpdate(cartId:$cartId, buyerIdentity:$buyerIdentity) { cart { ...CartFields } }
    }
    ${CART_FRAGMENT}
  `,
    { cartId: body.cartId, buyerIdentity: { email: body.email } },
  )
  return new Response(JSON.stringify({ cart: data.cartBuyerIdentityUpdate.cart }), { headers: { 'content-type': 'application/json' } })
}

