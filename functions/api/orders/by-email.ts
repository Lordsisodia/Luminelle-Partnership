import type { PagesFunction } from '../../_lib/types'
import { requireInternalAuth } from '../../_lib/internalAuth'
import { getSupabase } from '../../_lib/supabase'
import { json, methodNotAllowed, text } from '../../_lib/response'
import { mapShopOrderRowToOrder } from '../../_lib/orders'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const auth = requireInternalAuth(request, env)
  if (!auth.ok) return json({ error: auth.message }, { status: auth.status })

  const url = new URL(request.url)
  const email = (url.searchParams.get('email') || '').trim().toLowerCase()
  if (!email) return text('Missing email', { status: 400 })

  const supabase = getSupabase(env)
  const { data, error } = await supabase
    .from('ShopOrders')
    .select('*')
    .ilike('email', email)
    .order('processed_at', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(50)
  if (error) throw error

  const orders = (data || []).map(mapShopOrderRowToOrder)
  return json(orders)
}
