import type { PagesFunction } from '../../_lib/types'
import { requireInternalAuth } from '../../_lib/internalAuth'
import { getSupabase } from '../../_lib/supabase'
import { json, methodNotAllowed, text } from '../../_lib/response'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const auth = requireInternalAuth(request, env)
  if (!auth.ok) return json({ error: auth.message }, { status: auth.status })

  const url = new URL(request.url)
  const days = Math.min(parseInt(url.searchParams.get('days') || '30', 10), 365)
  if (!Number.isFinite(days) || days <= 0) return text('Invalid days', { status: 400 })

  const supabase = getSupabase(env)
  const { data, error } = await supabase.rpc('lumelle_metrics_refund_rate', { days })
  if (error) throw error
  return json(data ?? {})
}
