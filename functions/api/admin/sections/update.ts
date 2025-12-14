import type { PagesFunction } from '../../../_lib/types'
import { requireInternalAuth } from '../../../_lib/internalAuth'
import { json, methodNotAllowed, text } from '../../../_lib/response'
import { adminGraphQL, getAdminToken } from '../../../_lib/shopifyAdmin'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])

  const auth = requireInternalAuth(request, env)
  if (!auth.ok) return json({ error: auth.message }, { status: auth.status })

  const url = new URL(request.url)
  const handle = url.searchParams.get('handle') || 'shower-cap'
  const shop = url.searchParams.get('shop') || env.SHOPIFY_STORE_DOMAIN || ''
  if (!shop) return text('Missing shop', { status: 400 })

  const token = await getAdminToken(env, shop)

  const prod = await adminGraphQL<any>(
    env,
    shop,
    token,
    `#graphql
      query($q:String!) {
        products(first:1, query:$q) {
          edges { node { metafield(namespace:"custom", key:"sections") { reference { ... on Metaobject { id } } } } }
        }
      }
    `,
    { q: `handle:${handle}` },
  )

  const id = prod?.products?.edges?.[0]?.node?.metafield?.reference?.id
  if (!id) return text('No metaobject linked', { status: 404 })

  const body = await request.json().catch(() => ({} as any))
  const fieldsObj: Record<string, unknown> = body?.fields || {}
  const entries = Object.entries(fieldsObj)
  const fields = entries.map(([key, value]) => ({ key, value: typeof value === 'string' ? value : JSON.stringify(value) }))

  const mut = await adminGraphQL<any>(
    env,
    shop,
    token,
    `#graphql
      mutation Update($id: ID!, $fields: [MetaobjectFieldInput!]!) {
        metaobjectUpdate(id: $id, metaobject: { fields: $fields }) {
          userErrors { field message }
          metaobject { id }
        }
      }
    `,
    { id, fields },
  )

  return json({ ok: true, result: mut?.metaobjectUpdate })
}

