import type { PagesFunction } from '../../../_lib/types'
import { jsonTenantPublic, methodNotAllowed, text } from '../../../_lib/response'
import { runStorefront } from '../../../_lib/storefront'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])
  const url = new URL(request.url)
  const handle = url.searchParams.get('handle')
  if (!handle) return text('Missing handle', { status: 400, headers: { 'Cache-Control': 'no-store' } })
  const data = await runStorefront<any>(
    env,
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
  return jsonTenantPublic({ sections: data?.product?.metafield?.reference?.fields || [] }, { ttlSeconds: 60 })
}
