import type { PagesFunction } from '../../_lib/types'
import { getSupabase } from '../../_lib/supabase'
import { json, methodNotAllowed, text } from '../../_lib/response'
import { mapShopOrderRowToOrder } from '../../_lib/orders'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const url = new URL(request.url)
  const raw = (url.searchParams.get('name') || '').trim()
  if (!raw) return text('Missing name', { status: 400 })

  const name = raw.startsWith('#') ? raw : `#${raw}`
  const supabase = getSupabase(env)
  const { data, error } = await supabase.from('ShopOrders').select('*').eq('name', name).limit(1)
  if (error) throw error
  if (!data || data.length === 0) return text('Not found', { status: 404 })
  return json(mapShopOrderRowToOrder(data[0]))
}

