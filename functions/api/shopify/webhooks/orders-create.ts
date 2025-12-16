import type { PagesFunction } from '../../../_lib/types'
import { methodNotAllowed, text } from '../../../_lib/response'
import { hmacSha256Base64, safeEqual } from '../../../_lib/crypto'
import { capturePosthogEvent } from '../../../_lib/posthog'
import { upsertShopOrder } from '../../../_lib/shopOrders'
import { isProcessed, markProcessed } from '../../../_lib/webhooks'

function extractNoteAttributes(body: any): Record<string, string> {
  const attrs: Record<string, string> = {}
  const raw = body?.note_attributes
  if (!Array.isArray(raw)) return attrs
  for (const item of raw) {
    const key = (item?.name || item?.key || item?.Name || item?.Key) as string | undefined
    const value = (item?.value || item?.Value) as string | undefined
    if (!key || typeof value !== 'string' || !value) continue
    attrs[String(key)] = value
  }
  return attrs
}

export const onRequest: PagesFunction = async ({ request, env, waitUntil }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])

  const hmacHeader =
    request.headers.get('x-shopify-hmac-sha256')?.trim() || request.headers.get('X-Shopify-Hmac-Sha256')?.trim() || ''
  if (!hmacHeader) return text('Missing HMAC', { status: 401 })

  const rawBody = await request.text().catch(() => '')
  if (!rawBody) return text('Missing body', { status: 400 })

  // Shopify signs webhook payloads with the app secret (`SHOPIFY_API_SECRET`).
  // Some deployments historically used a separate env var name (`SHOPIFY_WEBHOOK_SECRET`) which
  // may or may not match. To avoid an env mismatch silently breaking all webhooks, accept either.
  const apiSecret = env.SHOPIFY_API_SECRET || ''
  const webhookSecret = env.SHOPIFY_WEBHOOK_SECRET || ''
  if (!apiSecret && !webhookSecret) return text('Missing Shopify webhook secret', { status: 500 })

  const computedApi = apiSecret ? await hmacSha256Base64(apiSecret, rawBody) : null
  const computedWebhook =
    webhookSecret && webhookSecret !== apiSecret ? await hmacSha256Base64(webhookSecret, rawBody) : null
  const ok = Boolean(
    (computedApi && safeEqual(computedApi, hmacHeader)) || (computedWebhook && safeEqual(computedWebhook, hmacHeader)),
  )
  if (!ok) return text('Invalid HMAC', { status: 401 })

  let body: any
  try {
    body = JSON.parse(rawBody)
  } catch {
    return text('Invalid JSON', { status: 400 })
  }

  const deliveryId = request.headers.get('x-shopify-delivery-id')?.trim() || ''
  if (deliveryId && (await isProcessed(env, deliveryId))) return text('OK', { status: 200 })
  const shop = (request.headers.get('x-shopify-shop-domain') || body?.shop_domain || body?.domain || '').toString()
  if (!shop) return text('Missing shop', { status: 400 })

  // Persist order snapshot for analytics + downstream fulfillment processing.
  await upsertShopOrder(env, shop, body)

  // Capture a server-side purchase event (joins back to the browser via cart/order attributes)
  try {
    const attrs = extractNoteAttributes(body)
    const distinctId = attrs.ph_distinct_id || attrs.lumelle_anon_id
    if (distinctId) {
      const expProps: Record<string, string> = {}
      for (const [k, v] of Object.entries(attrs)) {
        if (k.startsWith('exp_') && v) expProps[k] = v
      }

      // Do the network call after returning 200 to Shopify (reduce retries / timeouts).
      waitUntil(
        capturePosthogEvent(env, {
          distinctId,
          event: 'purchase',
          timestamp: body?.processed_at || body?.created_at || undefined,
          properties: {
            source: 'shopify_webhook',
            $process_person_profile: false,
            shopify_delivery_id: deliveryId || undefined,
            shop,
            order_id: body?.id,
            order_name: body?.name,
            value: Number(body?.total_price || 0),
            currency: body?.currency || body?.presentment_currency,
            lumelle_anon_id: attrs.lumelle_anon_id,
            lumelle_session_id: attrs.lumelle_session_id,
            ...expProps,
          },
        }),
      )
    }
  } catch (e) {
    console.error('PostHog purchase capture failed', e)
  }

  if (deliveryId) await markProcessed(env, deliveryId)
  return text('OK', { status: 200 })
}
