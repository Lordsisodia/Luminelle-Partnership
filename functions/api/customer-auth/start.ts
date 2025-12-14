import type { PagesFunction } from '../../_lib/types'
import { appendSetCookie } from '../../_lib/cookies'
import { methodNotAllowed, text } from '../../_lib/response'
import { challengeFromVerifier, discoverCustomerApi, generateVerifier, randomState } from '../../_lib/customerAccounts'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const url = new URL(request.url)
  const shop = (url.searchParams.get('shop') || env.SHOPIFY_STORE_DOMAIN || '').trim()
  if (!shop) return text('Missing shop', { status: 400 })

  const clientId = env.CUSTOMER_CLIENT_ID || ''
  const clientSecret = env.CUSTOMER_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) return text('Customer client not configured', { status: 500 })

  const { authorization_endpoint } = await discoverCustomerApi(shop)
  if (!authorization_endpoint) return text('No authorization endpoint', { status: 500 })

  const verifier = generateVerifier()
  const challenge = await challengeFromVerifier(verifier)
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
  appendSetCookie(headers, [
    `cust_state=${state}; ${cookieBase}`,
    `cust_verifier=${verifier}; ${cookieBase}`,
    `cust_shop=${shop}; ${cookieBase}`,
  ])

  return new Response('', { status: 302, headers })
}

