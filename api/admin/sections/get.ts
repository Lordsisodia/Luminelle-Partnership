import { getAdminToken, adminGraphQL } from "../../shopify/_admin";
import { requireInternalAuth } from "../../_lib/internalAuth";

export default async function handler(req: Request) {
  const auth = requireInternalAuth(req)
  if (!auth.ok) return new Response(JSON.stringify({ error: auth.message }), { status: auth.status })
  const url = new URL(req.url)
  const handle = url.searchParams.get('handle') || 'shower-cap'
  const shop = url.searchParams.get('shop') || process.env.SHOPIFY_STORE_DOMAIN || ''
  if (!shop) return new Response('Missing shop', { status: 400 })
  const token = await getAdminToken(shop)
  const data = await adminGraphQL<any>(shop, token, `#graphql
    query($q:String!) {
      products(first:1, query:$q) {
        edges { node { id metafield(namespace:"custom", key:"sections") { reference { ... on Metaobject { id fields { key value } } } } } }
      }
    }
  `, { q: `handle:${handle}` })
  const product = data?.products?.edges?.[0]?.node
  const meta = product?.metafield?.reference
  return new Response(JSON.stringify({ metaobjectId: meta?.id, fields: meta?.fields || [] }), { headers: { 'content-type': 'application/json' } })
}
