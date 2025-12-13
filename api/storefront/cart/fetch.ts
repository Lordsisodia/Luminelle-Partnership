import { CART_FRAGMENT, runStorefront } from '../_client.js'

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return new Response('Missing id', { status: 400 })
  const data = await runStorefront<any>(
    `#graphql
    query Cart($id:ID!) { cart(id:$id) { ...CartFields } }
    ${CART_FRAGMENT}
  `,
    { id },
  )
  if (!data.cart) return new Response('Not found', { status: 404 })
  return new Response(JSON.stringify({ cart: data.cart }), { headers: { 'content-type': 'application/json' } })
}
