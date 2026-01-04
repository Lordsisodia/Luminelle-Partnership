import type { PagesFunction } from '../../_lib/types'
import { requireInternalAuth } from '../../_lib/internalAuth'
import { getSupabase } from '../../_lib/supabase'
import { json, methodNotAllowed } from '../../_lib/response'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])
  const auth = requireInternalAuth(request, env)
  if (!auth.ok) return json({ error: auth.message }, { status: auth.status })
  const supabase = getSupabase(env)
  const { data, error } = await supabase.rpc('lumelle_metrics_repeat')
  if (error) throw error
  return json(data ?? {})
}
