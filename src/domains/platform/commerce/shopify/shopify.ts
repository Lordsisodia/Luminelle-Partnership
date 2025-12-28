import { env } from '@/utils/env'

const apiVersion = env('SHOPIFY_API_VERSION') || '2025-10'
const domain = env('SHOPIFY_STORE_DOMAIN')
const publicToken = env('SHOPIFY_STOREFRONT_PUBLIC_TOKEN')

export const shopifyEnabled = Boolean(domain && publicToken)

export type ShopifyFetchError = {
  message: string
  code?: string
}

export const shopifyEndpoint = domain
  ? `https://${domain}/api/${apiVersion}/graphql.json`
  : ''

export async function runStorefront<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!shopifyEnabled || !shopifyEndpoint) {
    throw new Error('Shopify Storefront is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_PUBLIC_TOKEN.')
  }

  const res = await fetch(shopifyEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': publicToken!,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Shopify error ${res.status}: ${text}`)
  }

  const json = await res.json()
  if (json.errors) {
    const msg = json.errors.map((e: ShopifyFetchError) => e.message).join('; ')
    throw new Error(msg)
  }
  return json.data as T
}
