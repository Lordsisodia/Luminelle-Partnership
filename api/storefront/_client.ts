const API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-10'
const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const PUBLIC_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_PUBLIC_TOKEN
const PRIVATE_TOKEN = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN

function assertEnv() {
  if (!DOMAIN) throw new Error('Storefront domain not set')
  if (!PUBLIC_TOKEN && !PRIVATE_TOKEN) throw new Error('Storefront token not set')
}

export async function runStorefront<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  assertEnv()
  const token = (PRIVATE_TOKEN || PUBLIC_TOKEN) as string
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
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

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  lines?: { edges?: Array<{ node: any }> } | null
}

/**
 * Rewrites the checkout URL to use the correct domain.
 * Shopify returns URLs with the myshopify.com domain, but we want to use
 * the SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN so checkout works properly.
 */
export function rewriteCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl)
    // Replace the hostname with SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN if set
    const checkoutDomain = process.env.SHOPIFY_CHECKOUT_UPSTREAM_DOMAIN
    if (checkoutDomain) {
      url.hostname = checkoutDomain
    }
    return url.toString()
  } catch {
    return checkoutUrl
  }
}

/**
 * Processes a cart response to rewrite the checkout URL if present.
 * Use this on all cart responses before sending to the client.
 */
export function processCartResponse(cart: ShopifyCart): ShopifyCart {
  if (cart.checkoutUrl) {
    cart.checkoutUrl = rewriteCheckoutUrl(cart.checkoutUrl)
  }
  return cart
}

export const CART_FRAGMENT = `
fragment CartFields on Cart {
  id
  checkoutUrl
  lines(first: 50) { edges { node { id quantity merchandise { ... on ProductVariant { id title product { title } price: priceV2 { amount currencyCode } } } } } }
}
`

