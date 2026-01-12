import { runStorefront } from '../../storefront/_client.ts'

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const handle = url.searchParams.get('handle')
  if (!handle) return new Response('Missing handle', { status: 400 })
  const data = await runStorefront<any>(
    `#graphql
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        featuredImage { url }
        images(first: 10) { edges { node { url } } }
        variants(first: 5) { edges { node { id title price: priceV2 { amount currencyCode } } } }
      }
    }
  `,
    { handle },
  )
  return new Response(JSON.stringify({ product: data.product }), { headers: { 'content-type': 'application/json' } })
}
