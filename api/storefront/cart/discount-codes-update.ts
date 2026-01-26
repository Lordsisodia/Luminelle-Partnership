import { CART_FRAGMENT, runStorefront, processCartResponse } from '../_client.ts'

export default async function handler(req: Request) {
  const body = await req.json().catch(() => ({}))
  if (!body.cartId || !Array.isArray(body.codes)) return new Response('Missing params', { status: 400 })
  const data = await runStorefront<any>(
    `#graphql
    mutation CartDiscountCodesUpdate($cartId:ID!, $codes:[String!]!) {
      cartDiscountCodesUpdate(cartId:$cartId, discountCodes:$codes) { cart { ...CartFields } }
    }
    ${CART_FRAGMENT}
  `,
    { cartId: body.cartId, codes: body.codes },
  )
  // Rewrite the checkout URL to use SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN
  processCartResponse(data.cartDiscountCodesUpdate.cart)
  return new Response(JSON.stringify({ cart: data.cartDiscountCodesUpdate.cart }), { headers: { 'content-type': 'application/json' } })
}
