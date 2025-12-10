import { CART_FRAGMENT, runStorefront } from '../_client'

export default async function handler(req: Request) {
  const body = await req.json()
  const data = await runStorefront<any>(
    `#graphql
    mutation CartLinesAdd($cartId:ID!, $lines:[CartLineInput!]!) { cartLinesAdd(cartId:$cartId, lines:$lines) { cart { ...CartFields } } }
    ${CART_FRAGMENT}
  `,
    { cartId: body.cartId, lines: [{ merchandiseId: body.merchandiseId, quantity: body.quantity ?? 1 }] },
  )
  return new Response(JSON.stringify({ cart: data.cartLinesAdd.cart }), { headers: { 'content-type': 'application/json' } })
}

