const API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-10'
const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const PRIVATE_TOKEN = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN

function assertEnv() {
  if (!DOMAIN || !PRIVATE_TOKEN) throw new Error('Storefront private token or domain not set')
}

export async function runStorefront<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  assertEnv()
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-Shopify-Storefront-Private-Token': PRIVATE_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error(`Storefront ${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))
  return json.data as T
}

export const CART_FRAGMENT = `
fragment CartFields on Cart {
  id
  checkoutUrl
  lines(first: 50) { edges { node { id quantity merchandise { ... on ProductVariant { id title product { title } price: priceV2 { amount currencyCode } } } } } }
}
`

