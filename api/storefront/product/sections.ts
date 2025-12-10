import { runStorefront } from '../../storefront/_client'

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const handle = url.searchParams.get('handle')
  if (!handle) return new Response('Missing handle', { status: 400 })
  const data = await runStorefront<any>(
    `#graphql
    query Sections($handle: String!) {
      product(handle: $handle) {
        metafield(namespace: "custom", key: "sections") {
          reference { ... on Metaobject { fields { key value } } }
        }
      }
    }
  `,
    { handle },
  )
  return new Response(JSON.stringify({ sections: data?.product?.metafield?.reference?.fields || [] }), { headers: { 'content-type': 'application/json' } })
}

