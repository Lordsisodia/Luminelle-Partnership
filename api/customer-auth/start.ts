import { challengeFromVerifier, generateVerifier, randomState } from './pkce'

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const shop = (url.searchParams.get('shop') || process.env.SHOPIFY_STORE_DOMAIN || '').trim()
  if (!shop) return new Response('Missing shop', { status: 400 })
  const clientId = process.env.CUSTOMER_CLIENT_ID || ''
  const clientSecret = process.env.CUSTOMER_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) return new Response('Customer client not configured', { status: 500 })

  const wellKnown = await fetch(`https://${shop}/.well-known/openid-configuration`).then(r => r.json())
  const authorization_endpoint = wellKnown.authorization_endpoint as string
  if (!authorization_endpoint) return new Response('No authorization endpoint', { status: 500 })

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

  const headers = new Headers({ Location: authUrl.toString() })
  const cookieBase = 'Path=/; HttpOnly; Secure; SameSite=None; Max-Age=600'
  headers.append('Set-Cookie', `cust_state=${state}; ${cookieBase}`)
  headers.append('Set-Cookie', `cust_verifier=${verifier}; ${cookieBase}`)
  headers.append('Set-Cookie', `cust_shop=${shop}; ${cookieBase}`)
  return new Response(null, { status: 302, headers })
}

