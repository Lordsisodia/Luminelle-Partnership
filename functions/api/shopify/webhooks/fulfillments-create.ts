import type { PagesFunction } from '../../../_lib/types'
import { methodNotAllowed, text } from '../../../_lib/response'
import { verifyShopifyWebhook } from '../../../_lib/shopifyWebhooks'
import { getSupabase } from '../../../_lib/supabase'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])

  const { valid, body } = await verifyShopifyWebhook(request, env)
  if (!valid) return text('Invalid HMAC', { status: 401 })

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
    .select('raw')
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

  return text('OK', { status: 200 })
}

