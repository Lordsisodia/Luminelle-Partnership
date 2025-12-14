import type { PagesFunction } from '../../_lib/types'
import { getSupabase } from '../../_lib/supabase'
import { json, methodNotAllowed, text } from '../../_lib/response'
import { mapShopOrderRowToOrder } from '../../_lib/orders'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  if (!id) return text('Missing id', { status: 400 })

  const supabase = getSupabase(env)
  const { data, error } = await supabase.from('ShopOrders').select('*').eq('order_id', id).limit(1)
  if (error) throw error
  if (!data || data.length === 0) return text('Not found', { status: 404 })
  return json(mapShopOrderRowToOrder(data[0]))
}

