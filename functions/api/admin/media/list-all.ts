import type { PagesFunction } from '../../../_lib/types'
import { requireInternalAuth } from '../../../_lib/internalAuth'
import { getSupabase } from '../../../_lib/supabase'
import { jsonNoStore, methodNotAllowed } from '../../../_lib/response'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const auth = requireInternalAuth(request, env)
  if (!auth.ok) return jsonNoStore({ error: auth.message }, { status: auth.status })

  const supabase = getSupabase(env)
  const { data, error } = await supabase
    .from('cms_product_media')
    .select('id, product_id, path, alt, sort, is_primary, status')
    .order('product_id', { ascending: true })
    .order('sort', { ascending: true })

  if (error) return jsonNoStore({ error: error.message }, { status: 500 })
  return jsonNoStore({ media: data ?? [] })
}

