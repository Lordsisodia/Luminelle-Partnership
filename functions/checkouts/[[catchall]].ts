const SHOPIFY_RESOLVE_OVERRIDE = 'shops.myshopify.com'
const LOOP_GUARD_HEADER = 'x-lumelle-shopify-proxy'

export const onRequest: PagesFunction = async ({ request }) => {
  // Prevent accidental recursion if a future change causes this proxy to re-hit itself.
  if (request.headers.get(LOOP_GUARD_HEADER) === '1') {
    return new Response('Checkout proxy loop detected', { status: 508 })
  }

  const headers = new Headers(request.headers)
  headers.set(LOOP_GUARD_HEADER, '1')

  const proxiedRequest = new Request(request, { headers })

  return fetch(proxiedRequest, {
    redirect: 'manual',
    cf: {
      // Route the request to Shopify’s network while preserving the original hostname (SNI + Host).
      resolveOverride: SHOPIFY_RESOLVE_OVERRIDE,
      cacheEverything: false,
    },
  })
}

