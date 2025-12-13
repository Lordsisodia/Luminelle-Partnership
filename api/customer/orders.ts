import type { VercelRequest, VercelResponse } from '@vercel/node'

function getCookie(req: VercelRequest, name: string) {
  const cookies = req.headers.cookie || ''
  const map = new Map(cookies.split(';').map(v => v.trim().split('=') as [string, string]))
  return map.get(name)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const shop = process.env.SHOPIFY_STORE_DOMAIN || ''
  const at = getCookie(req, 'cust_at')
  const rt = getCookie(req, 'cust_rt')

  if (!shop || !at) return res.status(401).json({ error: 'Not authenticated' })

  // Discover Customer Account API endpoint
  const discover = await fetch(`https://${shop}/.well-known/shopify/customer-account-api/unstable`).then(r => r.json()).catch(() => null)
  const endpoint = discover?.graphql?.endpoint as string | undefined
  if (!endpoint) return res.status(500).send('No customer account API endpoint')

  const query = `#graphql
    query Orders {
      customer { orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        nodes { name processedAt totalPrice { amount currencyCode } }
      } }
    }
  `
  let response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${at}` },
    body: JSON.stringify({ query }),
  })

  let setCookie: string[] = []
  if (response.status === 401 && rt) {
    // try refresh
    const token = await (await import('../customer-auth/utils.js')).refreshAccessToken(shop, rt)
    if (token?.access_token) {
      const cookieBase = 'Path=/; HttpOnly; Secure; SameSite=None'
      setCookie.push(`cust_at=${token.access_token}; ${cookieBase}; Max-Age=3600`)
      if (token.refresh_token) setCookie.push(`cust_rt=${token.refresh_token}; ${cookieBase}; Max-Age=2592000`)
      response = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token.access_token}` }, body: JSON.stringify({ query }) })
    }
  }

  const json = await response.json().catch(() => ({}))

  if (setCookie.length) {
    res.setHeader('Set-Cookie', setCookie)
  }

  return res.status(200).json(json)
}
