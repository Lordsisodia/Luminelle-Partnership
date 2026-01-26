import { CART_FRAGMENT, runStorefront, processCartResponse } from '../_client.ts'

export default async function handler(req: Request) {
  const body = await req.json()
  const data = await runStorefront<any>(
    `#graphql
    mutation CartLinesUpdate($cartId:ID!, $lines:[CartLineUpdateInput!]!) { cartLinesUpdate(cartId:$cartId, lines:$lines) { cart { ...CartFields } } }
    ${CART_FRAGMENT}
  `,
    { cartId: body.cartId, lines: [{ id: body.lineId, quantity: body.quantity }] },
  )
  // Rewrite the checkout URL to use SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN
  processCartResponse(data.cartLinesUpdate.cart)
  return new Response(JSON.stringify({ cart: data.cartLinesUpdate.cart }), { headers: { 'content-type': 'application/json' } })
}
