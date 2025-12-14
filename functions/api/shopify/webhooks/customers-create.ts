import type { PagesFunction } from '../../../_lib/types'
import { methodNotAllowed, text } from '../../../_lib/response'
import { verifyShopifyWebhook } from '../../../_lib/shopifyWebhooks'
import { upsertShopCustomer } from '../../../_lib/shopCustomers'
import { isProcessed, markProcessed } from '../../../_lib/webhooks'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])

  const { valid, body } = await verifyShopifyWebhook(request, env)
  if (!valid) return text('Invalid HMAC', { status: 401 })

  const deliveryId =
    request.headers.get('x-shopify-delivery-id') ||
    request.headers.get('x-shopify-webhook-id') ||
    request.headers.get('X-Shopify-Webhook-Id') ||
    ''
  if (deliveryId && (await isProcessed(env, deliveryId))) return text('OK', { status: 200 })

  const shop =
    request.headers.get('x-shopify-shop-domain') ||
    request.headers.get('X-Shopify-Shop-Domain') ||
    body?.domain ||
    body?.shop_domain
  if (!shop) return text('Missing shop', { status: 400 })

  await upsertShopCustomer(env, String(shop), body)
  if (deliveryId) await markProcessed(env, deliveryId)
  return text('OK', { status: 200 })
}

