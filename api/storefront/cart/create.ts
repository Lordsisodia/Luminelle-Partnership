import { CART_FRAGMENT, runStorefront } from '../_client.ts'

export default async function handler(req: Request) {
  const body = await req.json().catch(() => ({}))
  const lines = body.merchandiseId ? [{ merchandiseId: body.merchandiseId, quantity: body.quantity ?? 1 }] : []
  const data = await runStorefront<any>(
    `#graphql
    mutation CartCreate($lines:[CartLineInput!]) { cartCreate(input:{ lines:$lines }) { cart { ...CartFields } } }
    ${CART_FRAGMENT}
  `,
    { lines },
  )
  return new Response(JSON.stringify({ cart: data.cartCreate.cart }), { headers: { 'content-type': 'application/json' } })
}
