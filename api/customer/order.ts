function getCookie(req: Request, name: string) {
  const cookies = (req.headers.cookie || '') as string
  const map = new Map(cookies.split(';').map(v => v.trim().split('=')))
  return map.get(name)
}

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = new URL(req.url!, `http://${req.headers.host}`)
  const name = url.searchParams.get('name')
  if (!name) return new Response('Missing name', { status: 400 })
  const shop = process.env.SHOPIFY_STORE_DOMAIN || ''
  const at = getCookie(req, 'cust_at')
  const rt = getCookie(req, 'cust_rt')
  if (!shop || !at) return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 })
  const discover = await fetch(`https://${shop}/.well-known/shopify/customer-account-api/unstable`).then(r => r.json()).catch(() => null)
  const endpoint = discover?.graphql?.endpoint as string | undefined
  if (!endpoint) return new Response('No endpoint', { status: 500 })
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
    const token = await (await import('./utils')).refreshAccessToken(shop, rt)
    if (token?.access_token) {
      const cookieBase = 'Path=/; HttpOnly; Secure; SameSite=None'
      setCookie.push(`cust_at=${token.access_token}; ${cookieBase}; Max-Age=3600`)
      if (token.refresh_token) setCookie.push(`cust_rt=${token.refresh_token}; ${cookieBase}; Max-Age=2592000`)
      upstreamRes = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token.access_token}` }, body: JSON.stringify({ query }) })
    }
  }
  if (!upstreamRes.ok) return res.status(502).send('Upstream error')
  const json = await upstreamRes.json().catch(() => ({}))
  if (setCookie.length) res.setHeader('Set-Cookie', setCookie.join(', '))
  return res.status(200).json(json)
}
```
