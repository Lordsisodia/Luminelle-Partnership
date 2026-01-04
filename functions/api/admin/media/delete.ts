import type { PagesFunction } from '../../../_lib/types'
import { requireInternalAuth } from '../../../_lib/internalAuth'
import { getSupabase } from '../../../_lib/supabase'
import { jsonNoStore, methodNotAllowed } from '../../../_lib/response'

type DeleteBody = {
  id?: unknown
  product_handle?: unknown
  handle?: unknown
  path?: unknown
}

const toStringOrNull = (value: unknown): string | null => {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed ? trimmed : null
  }
  return null
}

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])

  const auth = requireInternalAuth(request, env)
  if (!auth.ok) return jsonNoStore({ error: auth.message }, { status: auth.status })

  const body = (await request.json().catch(() => ({}))) as DeleteBody
  const id = toStringOrNull(body.id)
  const productHandle = toStringOrNull(body.product_handle) ?? toStringOrNull(body.handle)
  const path = toStringOrNull(body.path)

  const supabase = getSupabase(env)

  if (id) {
    const { data, error } = await supabase.from('cms_product_media').delete().eq('id', id).select('id')
    if (error) return jsonNoStore({ error: error.message }, { status: 500 })
    return jsonNoStore({ ok: true, deleted: (data ?? []).length })
  }

  if (!productHandle || !path) {
    return jsonNoStore({ error: 'Provide either {id} or {product_handle, path}' }, { status: 400 })
  }

  const { data: product, error: productErr } = await supabase.from('cms_products').select('id').eq('handle', productHandle).maybeSingle()
  if (productErr) return jsonNoStore({ error: productErr.message }, { status: 500 })
  if (!product?.id) return jsonNoStore({ error: `Unknown product handle: ${productHandle}` }, { status: 404 })

  const { data, error } = await supabase.from('cms_product_media').delete().eq('product_id', product.id).eq('path', path).select('id')
  if (error) return jsonNoStore({ error: error.message }, { status: 500 })
  return jsonNoStore({ ok: true, deleted: (data ?? []).length })
}

