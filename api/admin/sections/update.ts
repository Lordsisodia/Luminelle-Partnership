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
  // find metaobject id
  const prod = await adminGraphQL<any>(shop, token, `#graphql
    query($q:String!) { products(first:1, query:$q) { edges { node { metafield(namespace:"custom", key:"sections") { reference { ... on Metaobject { id } } } } } } }
  `, { q: `handle:${handle}` })
  const id = prod?.products?.edges?.[0]?.node?.metafield?.reference?.id
  if (!id) return new Response('No metaobject linked', { status: 404 })

  const body = await req.json().catch(() => ({}))
  const fieldsObj: Record<string, unknown> = body?.fields || {}
  const entries = Object.entries(fieldsObj)
  const fields = entries.map(([key, value]) => ({ key, value: typeof value === 'string' ? value : JSON.stringify(value) }))

  const mut = await adminGraphQL<any>(shop, token, `#graphql
    mutation Update($id: ID!, $fields: [MetaobjectFieldInput!]!) {
      metaobjectUpdate(id: $id, metaobject: { fields: $fields }) {
        userErrors { field message }
        metaobject { id }
      }
    }
  `, { id, fields })
  return new Response(JSON.stringify({ ok: true, result: mut?.metaobjectUpdate }), { headers: { 'content-type': 'application/json' } })
}
