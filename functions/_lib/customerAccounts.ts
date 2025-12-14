import type { Env } from './types'
import { randomBase64Url, sha256Base64Url } from './crypto'

export function generateVerifier() {
  // PKCE verifier is typically 43-128 chars; we generate 32 random bytes and base64url-encode.
  return randomBase64Url(32)
}

export async function challengeFromVerifier(verifier: string) {
  return sha256Base64Url(verifier)
}

export function randomState() {
  return randomBase64Url(16)
}

export async function discoverCustomerApi(shop: string) {
  const [wellKnown, ca] = await Promise.all([
    fetch(`https://${shop}/.well-known/openid-configuration`).then((r) => r.json()),
    fetch(`https://${shop}/.well-known/shopify/customer-account-api/unstable`).then((r) => r.json()),
  ])
  return {
    authorization_endpoint: wellKnown.authorization_endpoint as string,
    token_endpoint: wellKnown.token_endpoint as string,
    graphql_endpoint: ca?.graphql?.endpoint as string,
  }
}

function getCustomerClient(env: Env) {
  const clientId = env.CUSTOMER_CLIENT_ID || ''
  const clientSecret = env.CUSTOMER_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) {
    throw new Error('Customer client not configured (CUSTOMER_CLIENT_ID/SECRET)')
  }
  return { clientId, clientSecret }
}

export async function refreshAccessToken(env: Env, shop: string, refreshToken: string) {
  const { token_endpoint } = await discoverCustomerApi(shop)
  const { clientId, clientSecret } = getCustomerClient(env)
  const body = new URLSearchParams()
  body.set('grant_type', 'refresh_token')
  body.set('refresh_token', refreshToken)
  const basic = btoa(`${clientId}:${clientSecret}`)
  const res = await fetch(token_endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: `Basic ${basic}` },
    body,
  })
  if (!res.ok) return null
  const json = await res.json().catch(() => null)
  return json as any
}

