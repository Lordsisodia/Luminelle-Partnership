export async function discoverCustomerApi(shop: string) {
  const wellKnown = await fetch(`https://${shop}/.well-known/openid-configuration`).then(r => r.json())
  const ca = await fetch(`https://${shop}/.well-known/shopify/customer-account-api/unstable`).then(r => r.json())
  return {
    authorization_endpoint: wellKnown.authorization_endpoint as string,
    token_endpoint: wellKnown.token_endpoint as string,
    graphql_endpoint: ca?.graphql?.endpoint as string,
  }
}

export async function refreshAccessToken(shop: string, refreshToken: string) {
  const { token_endpoint } = await discoverCustomerApi(shop)
  const clientId = process.env.CUSTOMER_CLIENT_ID || ''
  const clientSecret = process.env.CUSTOMER_CLIENT_SECRET || ''
  const body = new URLSearchParams()
  body.set('grant_type', 'refresh_token')
  body.set('refresh_token', refreshToken)
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const res = await fetch(token_endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: `Basic ${basic}` },
    body,
  })
  if (!res.ok) return null
  const json = await res.json().catch(() => null)
  return json as any
}

