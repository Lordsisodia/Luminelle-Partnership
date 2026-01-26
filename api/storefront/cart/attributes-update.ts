import { CART_FRAGMENT, runStorefront, processCartResponse } from '../_client.ts'

export default async function handler(req: Request) {
  const body = await req.json().catch(() => ({}))
  if (!body.cartId || !Array.isArray(body.attributes)) return new Response('Missing params', { status: 400 })
  const data = await runStorefront<any>(
    `#graphql
    mutation CartAttributesUpdate($cartId:ID!, $attributes:[AttributeInput!]!) { cartAttributesUpdate(cartId:$cartId, attributes:$attributes) { cart { ...CartFields } } }
    ${CART_FRAGMENT}
  `,
    { cartId: body.cartId, attributes: body.attributes },
  )
  // Rewrite the checkout URL to use SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN
  processCartResponse(data.cartAttributesUpdate.cart)
  return new Response(JSON.stringify({ cart: data.cartAttributesUpdate.cart }), { headers: { 'content-type': 'application/json' } })
}
