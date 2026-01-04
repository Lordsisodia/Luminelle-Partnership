import type { PagesFunction } from '../../../_lib/types'
import { requireInternalAuth } from '../../../_lib/internalAuth'
import { getSupabase } from '../../../_lib/supabase'
import { jsonNoStore, methodNotAllowed } from '../../../_lib/response'

type UpsertBody = {
  product_handle?: unknown
  handle?: unknown
  path?: unknown
  secure_url?: unknown
  alt?: unknown
  sort?: unknown
  sort_order?: unknown
  is_primary?: unknown
}

const toStringOrNull = (value: unknown): string | null => {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed ? trimmed : null
  }
  return null
}

const toNumberOrNull = (value: unknown): number | null => {
  const n = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN
  return Number.isFinite(n) ? n : null
}

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])

  const auth = requireInternalAuth(request, env)
  if (!auth.ok) return jsonNoStore({ error: auth.message }, { status: auth.status })

  const body = (await request.json().catch(() => ({}))) as UpsertBody
  const productHandle = toStringOrNull(body.product_handle) ?? toStringOrNull(body.handle)
  const path = toStringOrNull(body.path) ?? toStringOrNull(body.secure_url)
  if (!productHandle) return jsonNoStore({ error: 'product_handle required' }, { status: 400 })
  if (!path) return jsonNoStore({ error: 'path (or secure_url) required' }, { status: 400 })

  const sort = toNumberOrNull(body.sort) ?? toNumberOrNull(body.sort_order) ?? 0
  const alt = toStringOrNull(body.alt) ?? ''
  const isPrimaryRaw = body.is_primary
  const isPrimary = typeof isPrimaryRaw === 'boolean' ? isPrimaryRaw : sort === 0

  const supabase = getSupabase(env)
  const { data: product, error: productErr } = await supabase.from('cms_products').select('id').eq('handle', productHandle).maybeSingle()
  if (productErr) return jsonNoStore({ error: productErr.message }, { status: 500 })
  if (!product?.id) return jsonNoStore({ error: `Unknown product handle: ${productHandle}` }, { status: 404 })

  const record = {
    product_id: product.id,
    path,
    alt,
    sort,
    is_primary: isPrimary,
    status: 'draft',
  }

  const { data, error } = await supabase
    .from('cms_product_media')
    .upsert([record], { onConflict: 'product_id,path' })
    .select('id, product_id, path, alt, sort, is_primary, status')
  if (error) return jsonNoStore({ error: error.message }, { status: 500 })

  return jsonNoStore({ ok: true, media: data ?? [] })
}

