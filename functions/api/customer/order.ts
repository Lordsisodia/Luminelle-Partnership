import type { PagesFunction } from '../../_lib/types'
import { getCookie, appendSetCookie } from '../../_lib/cookies'
import { json, methodNotAllowed, text } from '../../_lib/response'
import { refreshAccessToken } from '../../_lib/customerAccounts'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const url = new URL(request.url)
  const name = url.searchParams.get('name')
  if (!name) return text('Missing name', { status: 400 })

  const shop = env.SHOPIFY_STORE_DOMAIN || ''
  const at = getCookie(request, 'cust_at')
  const rt = getCookie(request, 'cust_rt')
  if (!shop || !at) return json({ error: 'Not authenticated' }, { status: 401 })

  const discover = await fetch(`https://${shop}/.well-known/shopify/customer-account-api/unstable`)
    .then((r) => r.json())
    .catch(() => null)
  const endpoint = discover?.graphql?.endpoint as string | undefined
  if (!endpoint) return text('No endpoint', { status: 500 })

  const query = `#graphql
    query OrdersForDetail {
      customer {
        orders(first: 50, sortKey: PROCESSED_AT, reverse: true) {
          nodes {
            name processedAt totalPrice { amount currencyCode }
            shippingAddress { address1 address2 city province zip country displayName }
            fulfillmentStatus
            lineItems(first: 50) { nodes { title quantity originalTotal { amount currencyCode } } }
          }
        }
      }
    }
  `

  const run = (token: string) =>
    fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
      body: JSON.stringify({ query }),
    })

  let upstreamRes = await run(at)
  const headers = new Headers({ 'content-type': 'application/json; charset=utf-8' })

  if (upstreamRes.status === 401 && rt) {
    const token = await refreshAccessToken(env, shop, rt)
    if (token?.access_token) {
      const cookieBase = 'Path=/; HttpOnly; Secure; SameSite=None'
      appendSetCookie(headers, [
        `cust_at=${token.access_token}; ${cookieBase}; Max-Age=3600`,
        token.refresh_token ? `cust_rt=${token.refresh_token}; ${cookieBase}; Max-Age=2592000` : null,
      ].filter(Boolean) as string[])
      upstreamRes = await run(token.access_token)
    }
  }

  if (upstreamRes.status === 401) return json({ error: 'Not authenticated' }, { status: 401, headers })
  if (!upstreamRes.ok) return text('Upstream error', { status: 502, headers })

  const payload = await upstreamRes.json().catch(() => ({}))
  return json(payload, { status: 200, headers })
}

