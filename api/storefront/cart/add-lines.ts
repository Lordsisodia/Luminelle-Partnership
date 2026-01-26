import { CART_FRAGMENT, runStorefront, processCartResponse } from '../_client.ts'

export default async function handler(req: Request) {
  const body = await req.json()
  const data = await runStorefront<any>(
    `#graphql
    mutation CartLinesAdd($cartId:ID!, $lines:[CartLineInput!]!) { cartLinesAdd(cartId:$cartId, lines:$lines) { cart { ...CartFields } } }
    ${CART_FRAGMENT}
  `,
    { cartId: body.cartId, lines: [{ merchandiseId: body.merchandiseId, quantity: body.quantity ?? 1 }] },
  )
  // Rewrite the checkout URL to use SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN
  processCartResponse(data.cartLinesAdd.cart)
  return new Response(JSON.stringify({ cart: data.cartLinesAdd.cart }), { headers: { 'content-type': 'application/json' } })
}
