import type { PagesFunction } from '../../_lib/types'
import { getSupabase } from '../../_lib/supabase'
import { json, methodNotAllowed } from '../../_lib/response'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const supabase = getSupabase(env)
  const { data, error } = await supabase
    .from('experiments')
    .select('key,status,default_split,targeting,start_at,end_at,updated_at')
    .order('key', { ascending: true })
  if (error) throw error

  const items = data || []
  let maxUpdated = 0
  for (const it of items) {
    const ts = it.updated_at ? Date.parse(it.updated_at) : 0
    if (Number.isFinite(ts) && ts > maxUpdated) maxUpdated = ts
  }

  const etag = `W/\"experiments:${items.length}:${maxUpdated}\"`
  const ifNoneMatch = request.headers.get('if-none-match')
  if (ifNoneMatch && ifNoneMatch === etag) {
    return new Response('', { status: 304, headers: { ETag: etag } })
  }

  const config = items.map(({ updated_at: _updatedAt, ...rest }) => rest)
  return json(config, { headers: { ETag: etag } })
}

