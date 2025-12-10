import { base64url } from './pkce'

function getCookie(req: Request, name: string) {
  const cookies = (req.headers.cookie || '') as string
  const map = new Map(cookies.split(';').map(v => v.trim().split('=')))
  return map.get(name)
}

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = new URL(req.url!, `http://${req.headers.host}`)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const shop = getCookie(req, 'cust_shop')
  if (!code || !state || !shop) return new Response('Bad request', { status: 400 })
  if (state !== getCookie(req, 'cust_state')) return new Response('State mismatch', { status: 400 })
  if (!code || !state || !shop) return res.status(400).send('Bad request')
  if (state !== getCookie(req, 'cust_state')) return res.status(400).send('State mismatch')

  const verifier = getCookie(req, 'cust_verifier') || ''
  const wellKnown = await fetch(`https://${shop}/.well-known/openid-configuration`).then(r => r.json())
  const token_endpoint = wellKnown.token_endpoint as string
  if (!token_endpoint) return res.status(500).send('No token endpoint')

  const clientId = process.env.CUSTOMER_CLIENT_ID || ''
  const clientSecret = process.env.CUSTOMER_CLIENT_SECRET || ''
  const redirectUri = new URL('/api/customer-auth/callback', `https://${req.headers.host}`).toString()

  const body = new URLSearchParams()
  body.set('grant_type', 'authorization_code')
  body.set('code', code)
  body.set('client_id', clientId)
  body.set('redirect_uri', redirectUri)
  body.set('code_verifier', verifier)

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const tokenRes = await fetch(token_endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: `Basic ${basic}` },
    body,
  })
  if (!tokenRes.ok) return new Response('Token exchange failed', { status: 400 })
  const tokenJson = await tokenRes.json()

  const at = tokenJson.access_token as string
  const rt = tokenJson.refresh_token as string | undefined
  const cookieBase = 'Path=/; HttpOnly; Secure; SameSite=None'
  const headers = new Headers({ Location: '/account/orders?ca=1' })
  headers.append('Set-Cookie', `cust_at=${at}; ${cookieBase}; Max-Age=3600`)
  if (rt) headers.append('Set-Cookie', `cust_rt=${rt}; ${cookieBase}; Max-Age=2592000`)
  // clear temp cookies
  headers.append('Set-Cookie', 'cust_state=; Path=/; Max-Age=0')
  headers.append('Set-Cookie', 'cust_verifier=; Path=/; Max-Age=0')
  headers.append('Set-Cookie', 'cust_shop=; Path=/; Max-Age=0')
  return new Response(null, { status: 302, headers })
}

