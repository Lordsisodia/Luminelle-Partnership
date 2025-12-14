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

  const supabase = getSupabase(env)
  const { error } = await supabase.from('ShopCustomers').delete().eq('shop', String(shop))
  if (error) throw error

  return text('OK', { status: 200 })
}

