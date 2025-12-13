import { challengeFromVerifier, generateVerifier, randomState } from './pkce.js'

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const host = req.headers.host || 'localhost'
  const url = new URL(req.url || '/', `https://${host}`)
  const shop = (url.searchParams.get('shop') || process.env.SHOPIFY_STORE_DOMAIN || '').trim()
  if (!shop) return res.status(400).send('Missing shop')
  const clientId = process.env.CUSTOMER_CLIENT_ID || ''
  const clientSecret = process.env.CUSTOMER_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) return res.status(500).send('Customer client not configured')

  const wellKnown = await fetch(`https://${shop}/.well-known/openid-configuration`).then(r => r.json())
  const authorization_endpoint = wellKnown.authorization_endpoint as string
  if (!authorization_endpoint) return res.status(500).send('No authorization endpoint')

  const verifier = generateVerifier()
  const challenge = challengeFromVerifier(verifier)
  const state = randomState()
  const nonce = randomState()

  const redirectUri = new URL('/api/customer-auth/callback', url.origin).toString()
  const authUrl = new URL(authorization_endpoint)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('scope', 'openid email')
  authUrl.searchParams.set('code_challenge', challenge)
  authUrl.searchParams.set('code_challenge_method', 'S256')
  authUrl.searchParams.set('state', state)
  authUrl.searchParams.set('nonce', nonce)

  const cookieBase = 'Path=/; HttpOnly; Secure; SameSite=None; Max-Age=600'
  res.setHeader('Set-Cookie', [
    `cust_state=${state}; ${cookieBase}`,
    `cust_verifier=${verifier}; ${cookieBase}`,
    `cust_shop=${shop}; ${cookieBase}`,
  ])
  res.setHeader('Location', authUrl.toString())
  return res.status(302).send('')
}
