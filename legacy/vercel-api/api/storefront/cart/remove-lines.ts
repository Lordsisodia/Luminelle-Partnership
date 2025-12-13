import { CART_FRAGMENT, runStorefront } from '../_client.js'

export default async function handler(req: Request) {
  const body = await req.json()
  const data = await runStorefront<any>(
    `#graphql
    mutation CartLinesRemove($cartId:ID!, $lineIds:[ID!]!) { cartLinesRemove(cartId:$cartId, lineIds:$lineIds) { cart { ...CartFields } } }
    ${CART_FRAGMENT}
  `,
    { cartId: body.cartId, lineIds: body.lineIds || [] },
  )
  return new Response(JSON.stringify({ cart: data.cartLinesRemove.cart }), { headers: { 'content-type': 'application/json' } })
}
