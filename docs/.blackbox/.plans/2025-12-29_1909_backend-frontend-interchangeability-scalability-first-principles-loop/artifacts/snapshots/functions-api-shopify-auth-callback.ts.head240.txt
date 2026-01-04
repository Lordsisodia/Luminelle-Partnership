import type { PagesFunction } from '../../../_lib/types'
import { getCookie, appendSetCookie } from '../../../_lib/cookies'
import { methodNotAllowed, text } from '../../../_lib/response'
import { verifyShopifyHmac } from '../../../_lib/shopifyOAuth'
import { getSupabase } from '../../../_lib/supabase'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const url = new URL(request.url)
  const shop = url.searchParams.get('shop')
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const host = url.searchParams.get('host') || ''

  if (!shop || !code || !state) return text('Bad request', { status: 400 })
  if (state !== getCookie(request, 'shopify_state')) return text('Invalid state', { status: 401 })

  const ok = await verifyShopifyHmac(env, url)
  if (!ok) return text('Invalid HMAC', { status: 401 })

  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_id: env.SHOPIFY_API_KEY,
      client_secret: env.SHOPIFY_API_SECRET,
      code,
    }),
  })
  if (!tokenRes.ok) return text('Token exchange failed', { status: 502 })
  const tokenJson = (await tokenRes.json()) as { access_token: string; scope?: string }

  const supabase = getSupabase(env)
  const { error } = await supabase.from('Session').upsert(
    [
      {
        id: `offline_${shop}`,
        shop,
        state,
        isonline: false,
        scope: tokenJson.scope ?? null,
        accesstoken: tokenJson.access_token,
      },
    ],
    { onConflict: 'id' },
  )
  if (error) throw error

  // Register shop webhooks (best-effort)
  const webhookUrlBase = env.SHOPIFY_APP_URL || url.origin
  const version = env.SHOPIFY_API_VERSION || '2025-10'
  async function createWebhook(topic: string, callbackPath: string) {
    const mutation = `#graphql
      mutation WebhookCreate($topic: WebhookSubscriptionTopic!, $callbackUrl: URL!) {
        webhookSubscriptionCreate(topic: $topic, webhookSubscription: {callbackUrl: $callbackUrl, format: JSON}) {
          userErrors { field message }
          webhookSubscription { id }
        }
      }`
    await fetch(`https://${shop}/admin/api/${version}/graphql.json`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'X-Shopify-Access-Token': tokenJson.access_token },
      body: JSON.stringify({ query: mutation, variables: { topic, callbackUrl: `${webhookUrlBase}${callbackPath}` } }),
    })
  }

  try {
    await createWebhook('CUSTOMERS_CREATE', '/api/shopify/webhooks/customers-create')
    await createWebhook('CUSTOMERS_UPDATE', '/api/shopify/webhooks/customers-update')
    await createWebhook('CUSTOMERS_DELETE', '/api/shopify/webhooks/customers-delete')
    await createWebhook('APP_UNINSTALLED', '/api/shopify/webhooks/app-uninstalled')
    await createWebhook('ORDERS_CREATE', '/api/shopify/webhooks/orders-create')
    await createWebhook('ORDERS_UPDATED', '/api/shopify/webhooks/orders-updated')
    await createWebhook('FULFILLMENTS_CREATE', '/api/shopify/webhooks/fulfillments-create')
  } catch (e) {
    console.error('Webhook subscription create failed', e)
  }

  const headers = new Headers()
  appendSetCookie(headers, [
    'shopify_state=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0',
    'shopify_shop=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0',
  ])

  const hostPath = host ? `?host=${encodeURIComponent(host)}&shop=${encodeURIComponent(shop)}` : `?shop=${encodeURIComponent(shop)}`
  headers.set('Location', `/shopify/app${hostPath}`)
  return new Response('', { status: 302, headers })
}

