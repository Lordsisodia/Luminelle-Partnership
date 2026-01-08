import type { Env } from './types'
import { jsonNoStore } from './response'

export function getStorefrontConfig(env: Env) {
  const version = env.SHOPIFY_API_VERSION || '2025-10'
  const domain = env.SHOPIFY_STORE_DOMAIN || env.VITE_SHOPIFY_STORE_DOMAIN
  const token = env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN || env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN || env.VITE_SHOPIFY_STOREFRONT_PUBLIC_TOKEN
  if (!domain || !token) {
    throw new Error('Storefront not configured (SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_PUBLIC_TOKEN/SHOPIFY_STOREFRONT_PRIVATE_TOKEN)')
  }
  return { version, domain, token }
}

export async function runStorefront<T>(env: Env, query: string, variables?: Record<string, unknown>): Promise<T> {
  const { version, domain, token } = getStorefrontConfig(env)
  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error(`Storefront ${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))
  return json.data as T
}

export const storefrontError = (err: unknown) => {
  const message = err instanceof Error ? err.message : String(err ?? 'Unknown error')

  // Keep messages helpful for ops while not leaking secrets.
  const safeMessage = message.includes('Storefront not configured')
    ? message
    : message.startsWith('Storefront ')
      ? `Storefront request failed (${message})`
      : `Storefront request failed (${message.slice(0, 200)})`

  // "NOT_CONFIGURED" is used by the frontend PortError classifier.
  const hint = message.includes('not configured')
    ? 'Check Cloudflare Pages env vars: SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_PUBLIC_TOKEN (or SHOPIFY_STOREFRONT_PRIVATE_TOKEN).'
    : undefined

  return jsonNoStore(
    {
      error: {
        code: message.includes('not configured') ? 'NOT_CONFIGURED' : 'UNAVAILABLE',
        message: safeMessage,
        hint,
      },
    },
    { status: 500 }
  )
}

export const CART_FRAGMENT = `
fragment CartFields on Cart {
  id
  checkoutUrl
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            product { title }
            price: priceV2 { amount currencyCode }
          }
        }
      }
    }
  }
}
`
