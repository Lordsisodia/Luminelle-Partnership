import type { PagesFunction } from '../../_lib/types'
import { getSupabase } from '../../_lib/supabase'
import { json, methodNotAllowed } from '../../_lib/response'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const url = new URL(request.url)
  const shop = url.searchParams.get('shop')
  if (!shop) return json({ installed: false })

  const supabase = getSupabase(env)
  const { data, error } = await supabase.from('Session').select('id').eq('id', `offline_${shop}`).limit(1)
  if (error) throw error

  return json({ installed: (data || []).length > 0 })
}

