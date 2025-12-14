import type { PagesFunction } from '../../_lib/types'
import { getCookie, appendSetCookie } from '../../_lib/cookies'
import { methodNotAllowed, text } from '../../_lib/response'
import { discoverCustomerApi } from '../../_lib/customerAccounts'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const shop = getCookie(request, 'cust_shop')

  if (!code || !state || !shop) return text('Bad request', { status: 400 })
  if (state !== getCookie(request, 'cust_state')) return text('State mismatch', { status: 400 })

  const verifier = getCookie(request, 'cust_verifier') || ''
  const { token_endpoint } = await discoverCustomerApi(shop)
  if (!token_endpoint) return text('No token endpoint', { status: 500 })

  const clientId = env.CUSTOMER_CLIENT_ID || ''
  const clientSecret = env.CUSTOMER_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) return text('Customer client not configured', { status: 500 })

  const redirectUri = new URL('/api/customer-auth/callback', url.origin).toString()

  const body = new URLSearchParams()
  body.set('grant_type', 'authorization_code')
  body.set('code', code)
  body.set('client_id', clientId)
  body.set('redirect_uri', redirectUri)
  body.set('code_verifier', verifier)

  const basic = btoa(`${clientId}:${clientSecret}`)
  const tokenRes = await fetch(token_endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: `Basic ${basic}` },
    body,
  })

  if (!tokenRes.ok) return text('Token exchange failed', { status: 400 })
  const tokenJson = await tokenRes.json().catch(() => null)
  if (!tokenJson?.access_token) return text('Token exchange failed', { status: 400 })

  const at = tokenJson.access_token as string
  const rt = tokenJson.refresh_token as string | undefined

  const headers = new Headers({ Location: '/account/orders?ca=1' })
  const cookieBase = 'Path=/; HttpOnly; Secure; SameSite=None'
  const setCookies = [
    `cust_at=${at}; ${cookieBase}; Max-Age=3600`,
    rt ? `cust_rt=${rt}; ${cookieBase}; Max-Age=2592000` : null,
    // Clear temp cookies
    'cust_state=; Path=/; Max-Age=0',
    'cust_verifier=; Path=/; Max-Age=0',
    'cust_shop=; Path=/; Max-Age=0',
  ].filter(Boolean) as string[]

  appendSetCookie(headers, setCookies)
  return new Response('', { status: 302, headers })
}

