import type { PagesFunction } from '../../../_lib/types'
import { jsonTenantPublic, methodNotAllowed, text } from '../../../_lib/response'
import { runStorefront, storefrontError } from '../../../_lib/storefront'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])
  const url = new URL(request.url)
  const handle = url.searchParams.get('handle')
  if (!handle) return text('Missing handle', { status: 400, headers: { 'Cache-Control': 'no-store' } })
  try {
    const data = await runStorefront<any>(
      env,
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
    return jsonTenantPublic({ product: data.product }, { ttlSeconds: 60 })
  } catch (err) {
    console.error('[storefront/product/by-handle] failed', err)
    return storefrontError(err)
  }
}
