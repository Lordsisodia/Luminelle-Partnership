import type { PagesFunction } from '../../../_lib/types'
import { methodNotAllowed, text } from '../../../_lib/response'
import { verifyShopifyWebhook } from '../../../_lib/shopifyWebhooks'
import { upsertShopOrder } from '../../../_lib/shopOrders'
import { isProcessed, markProcessed } from '../../../_lib/webhooks'
import { getSupabase } from '../../../_lib/supabase'

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

function toOrderId(value: unknown): string | null {
  if (typeof value === 'number' && Number.isFinite(value)) return String(Math.trunc(value))
  if (typeof value === 'string' && value.trim()) return value.trim()
  return null
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
    body?.shop_domain ||
    body?.domain ||
    body?.shop
  if (!shop) return text('Missing shop', { status: 400 })

  if (!deliveryAlreadyProcessed) {
    await upsertShopOrder(env, String(shop), body)
    if (deliveryId) await markProcessed(env, deliveryId)
  }

  // Loyalty points reversal: if order becomes fully refunded, reverse previously-awarded points.
  const financialStatus = String(body?.financial_status ?? '').toLowerCase()
  if (financialStatus === 'refunded') {
    const orderId = toOrderId(body?.id)
    if (!orderId) return text('OK', { status: 200 })

    const reversalKey = `loyalty:reverse:refund:${shop}:${orderId}`
    if (!(await isProcessed(env, reversalKey))) {
      const supabase = getSupabase(env)

      const { data: order, error: orderError } = await supabase
        .from('ShopOrders')
        .select('raw, email, currency')
        .eq('shop', String(shop))
        .eq('order_id', orderId)
        .maybeSingle()
      if (orderError) throw orderError
      if (!order) return text('Order not found', { status: 500 })

      const attrs = extractNoteAttributes(order.raw)
      const userId = attrs.lumelle_user_id || attrs.clerk_user_id || null

      if (userId) {
        await supabase.from('customers').upsert(
          [{ id: userId, email: order.email ?? attrs.lumelle_user_email ?? null, updated_at: new Date().toISOString(), raw: { source: 'shopify_webhook' } }],
          { onConflict: 'id' },
        )

        const awardSource = `shopify:fulfillment:${shop}:${orderId}`
        const { data: awarded, error: awardError } = await supabase
          .from('loyalty_points_ledger')
          .select('points')
          .eq('user_id', userId)
          .eq('source', awardSource)
          .order('created_at', { ascending: true })
          .limit(1)
          .maybeSingle()
        if (awardError) throw awardError

        const earned = toNumber(awarded?.points) ?? 0
        const reversePoints = earned > 0 ? -Math.abs(earned) : 0
        if (reversePoints !== 0) {
          const { error: insertError } = await supabase.from('loyalty_points_ledger').insert([
            {
              user_id: userId,
              points: reversePoints,
              source: `shopify:refund:${shop}:${orderId}`,
              meta: {
                shop: String(shop),
                order_id: orderId,
                currency: order.currency ?? null,
                reason: 'order_refunded',
                awarded_points: earned,
              },
            },
          ])
          if (insertError) throw insertError
        }
      }

      await markProcessed(env, reversalKey)
    }
  }

  return text('OK', { status: 200 })
}
