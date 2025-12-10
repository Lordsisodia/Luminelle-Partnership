import { CART_FRAGMENT, runStorefront } from '../_client'

export default async function handler(req: Request) {
  const body = await req.json()
  const data = await runStorefront<any>(
    `#graphql
    mutation CartLinesUpdate($cartId:ID!, $lines:[CartLineUpdateInput!]!) { cartLinesUpdate(cartId:$cartId, lines:$lines) { cart { ...CartFields } } }
    ${CART_FRAGMENT}
  `,
    { cartId: body.cartId, lines: [{ id: body.lineId, quantity: body.quantity }] },
  )
  return new Response(JSON.stringify({ cart: data.cartLinesUpdate.cart }), { headers: { 'content-type': 'application/json' } })
}

