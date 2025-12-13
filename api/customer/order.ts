import type { VercelRequest, VercelResponse } from '@vercel/node'

import { refreshAccessToken } from '../customer-auth/utils.js'

function getCookie(req: VercelRequest, name: string) {
  const cookies = req.headers.cookie || ''
  const parts = cookies.split(';').map((value) => value.trim())
  for (const part of parts) {
    if (!part) continue
    const eq = part.indexOf('=')
    if (eq === -1) continue
    const key = part.slice(0, eq)
    if (key !== name) continue
    return part.slice(eq + 1)
  }
  return undefined
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = new URL(req.url!, `http://${req.headers.host}`)
  const name = url.searchParams.get('name')
  if (!name) return res.status(400).send('Missing name')
  const shop = process.env.SHOPIFY_STORE_DOMAIN || ''
  const at = getCookie(req, 'cust_at')
  const rt = getCookie(req, 'cust_rt')
  if (!shop || !at) return res.status(401).json({ error: 'Not authenticated' })
  const discover = await fetch(`https://${shop}/.well-known/shopify/customer-account-api/unstable`).then(r => r.json()).catch(() => null)
  const endpoint = discover?.graphql?.endpoint as string | undefined
  if (!endpoint) return res.status(500).send('No endpoint')
  const query = `#graphql
    query OrdersForDetail {
      customer { orders(first: 50, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          name processedAt totalPrice { amount currencyCode }
          shippingAddress { address1 address2 city province zip country displayName }
          fulfillmentStatus
          lineItems(first: 50) { nodes { title quantity originalTotal { amount currencyCode } }}
        }
      }}
    }
  `
  let upstreamRes = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${at}` }, body: JSON.stringify({ query }) })
  let setCookie: string[] = []
  if (upstreamRes.status === 401 && rt) {
    const token = await refreshAccessToken(shop, rt)
    if (token?.access_token) {
      const cookieBase = 'Path=/; HttpOnly; Secure; SameSite=None'
      setCookie.push(`cust_at=${token.access_token}; ${cookieBase}; Max-Age=3600`)
      if (token.refresh_token) setCookie.push(`cust_rt=${token.refresh_token}; ${cookieBase}; Max-Age=2592000`)
      upstreamRes = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token.access_token}` }, body: JSON.stringify({ query }) })
    }
  }
  if (!upstreamRes.ok) return res.status(502).send('Upstream error')
  const json = await upstreamRes.json().catch(() => ({}))
  if (setCookie.length) res.setHeader('Set-Cookie', setCookie)
  return res.status(200).json(json)
}
