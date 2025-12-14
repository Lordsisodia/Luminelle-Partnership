import type { PagesFunction } from '../../../_lib/types'
import { methodNotAllowed, text } from '../../../_lib/response'
import { verifyShopifyWebhook } from '../../../_lib/shopifyWebhooks'
import { getSupabase } from '../../../_lib/supabase'
import { isProcessed, markProcessed } from '../../../_lib/webhooks'

function extractNoteAttributes(raw: any): Record<string, string> {
  const attrs: Record<string, string> = {}
  const notes = raw?.note_attributes
  if (!Array.isArray(notes)) return attrs
  for (const item of notes) {
    const key = (item?.name || item?.key || item?.Name || item?.Key) as string | undefined
    const value = (item?.value || item?.Value) as string | undefined
    if (!key || typeof value !== 'string' || !value) continue
    attrs[String(key)] = value
  }
  return attrs
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const n = Number(value)
    return Number.isFinite(n) ? n : null
  }
  return null
}

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])

  const { valid, body } = await verifyShopifyWebhook(request, env)
  if (!valid) return text('Invalid HMAC', { status: 401 })

  const deliveryId =
    request.headers.get('x-shopify-delivery-id') ||
    request.headers.get('x-shopify-webhook-id') ||
    request.headers.get('X-Shopify-Webhook-Id') ||
    ''
  const deliveryAlreadyProcessed = deliveryId ? await isProcessed(env, deliveryId) : false

  const shop =
    request.headers.get('x-shopify-shop-domain') ||
    request.headers.get('X-Shopify-Shop-Domain') ||
    body?.domain ||
    body?.shop_domain
  if (!shop) return text('Missing shop', { status: 400 })

  const orderIdRaw = body?.order_id
  const orderId = typeof orderIdRaw === 'number' ? String(Math.trunc(orderIdRaw)) : typeof orderIdRaw === 'string' ? orderIdRaw : null
  if (!orderId) return text('Missing order_id', { status: 400 })

  const status = body?.status || 'success'
  const fulfillmentStatus = status === 'success' ? 'fulfilled' : String(status)

  const trackingCompany = body?.tracking_company || null
  const trackingNumber = body?.tracking_number || null
  const trackingUrl = body?.tracking_url || null

  const supabase = getSupabase(env)
  const { data: existing, error: readError } = await supabase
    .from('ShopOrders')
    .select('raw, subtotal, currency, email')
    .eq('shop', String(shop))
    .eq('order_id', orderId)
    .limit(1)
    .maybeSingle()
  if (readError) throw readError

  const raw = (existing?.raw && typeof existing.raw === 'object') ? existing.raw : {}
  const mergedRaw = {
    ...(raw || {}),
    tracking_company: trackingCompany,
    tracking_number: trackingNumber,
    tracking_url: trackingUrl,
  }

  if (!deliveryAlreadyProcessed) {
    const { error: updateError } = await supabase
      .from('ShopOrders')
      .update({
        fulfillment_status: fulfillmentStatus,
        updated_at: new Date().toISOString(),
        raw: mergedRaw,
      })
      .eq('shop', String(shop))
      .eq('order_id', orderId)
    if (updateError) throw updateError

    if (deliveryId) await markProcessed(env, deliveryId)
  }

  // Loyalty points award: 50 points per £1 (subtotal), awarded on fulfillment.
  // Only awards if the order contains `lumelle_user_id` in note_attributes.
  const awardKey = `loyalty:award:fulfillment:${shop}:${orderId}`
  if (!(await isProcessed(env, awardKey))) {
    if (!existing) return text('Order not found', { status: 500 })
    const attrs = extractNoteAttributes(mergedRaw)
    const userId = attrs.lumelle_user_id || attrs.clerk_user_id || null

    const pointsPerGbp = Number(env.LOYALTY_POINTS_PER_GBP || 50)
    const subtotal = toNumber(existing?.subtotal ?? mergedRaw?.subtotal_price ?? mergedRaw?.subtotal_price_set?.shop_money?.amount)
    const points = subtotal && pointsPerGbp > 0 ? Math.max(0, Math.floor(subtotal * pointsPerGbp)) : 0

    if (userId && points > 0) {
      await supabase.from('customers').upsert(
        [{ id: userId, email: existing?.email ?? attrs.lumelle_user_email ?? null, updated_at: new Date().toISOString(), raw: { source: 'shopify_webhook' } }],
        { onConflict: 'id' },
      )

      const { error: insertError } = await supabase.from('loyalty_points_ledger').insert([
        {
          user_id: userId,
          points,
          source: `shopify:fulfillment:${shop}:${orderId}`,
          meta: {
            shop,
            order_id: orderId,
            currency: existing?.currency ?? mergedRaw?.currency ?? null,
            subtotal: subtotal ?? null,
            reason: 'order_fulfilled',
            shopify_delivery_id: deliveryId || null,
          },
        },
      ])
      if (insertError) throw insertError
    }

    await markProcessed(env, awardKey)
  }

  return text('OK', { status: 200 })
}
