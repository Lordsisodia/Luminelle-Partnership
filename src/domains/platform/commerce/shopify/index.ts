export * from './shopify'
export * from './shopifyCart'

// Shopify Admin API client is not implemented in this repo yet.
export async function runAdmin<T = unknown>(_query: string, _vars?: Record<string, unknown>): Promise<T> {
  throw new Error('Shopify Admin API client is not implemented (use a server-side integration).')
}
