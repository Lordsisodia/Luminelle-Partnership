import type { PagesFunction } from '../../../_lib/types'
import { requireInternalAuth } from '../../../_lib/internalAuth'
import { getSupabase } from '../../../_lib/supabase'
import { jsonNoStore, methodNotAllowed } from '../../../_lib/response'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const auth = requireInternalAuth(request, env)
  if (!auth.ok) return jsonNoStore({ error: auth.message }, { status: auth.status })

  const url = new URL(request.url)
  const handle = url.searchParams.get('handle') || url.searchParams.get('product_handle')
  if (!handle) return jsonNoStore({ error: 'handle required' }, { status: 400 })

  const supabase = getSupabase(env)
  const { data: product, error: productErr } = await supabase.from('cms_products').select('id').eq('handle', handle).maybeSingle()
  if (productErr) return jsonNoStore({ error: productErr.message }, { status: 500 })
  if (!product?.id) return jsonNoStore({ error: `Unknown product handle: ${handle}` }, { status: 404 })

  const { data, error } = await supabase
    .from('cms_product_media')
    .select('id, product_id, path, alt, sort, is_primary, status')
    .eq('product_id', product.id)
    .order('sort', { ascending: true })

  if (error) return jsonNoStore({ error: error.message }, { status: 500 })
  return jsonNoStore({ media: data ?? [] })
}

