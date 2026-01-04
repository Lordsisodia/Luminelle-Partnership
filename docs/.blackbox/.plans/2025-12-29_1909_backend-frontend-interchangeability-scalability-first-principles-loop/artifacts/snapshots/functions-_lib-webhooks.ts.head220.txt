import type { Env } from './types'
import { getSupabase } from './supabase'

export async function isProcessed(env: Env, deliveryId: string) {
  if (!deliveryId) return false
  const supabase = getSupabase(env)
  const { data, error } = await supabase.from('ShopWebhookDeliveries').select('id').eq('id', deliveryId).limit(1)
  if (error) throw error
  return (data || []).length > 0
}

export async function markProcessed(env: Env, deliveryId: string) {
  if (!deliveryId) return
  const supabase = getSupabase(env)
  const { error } = await supabase.from('ShopWebhookDeliveries').upsert([{ id: deliveryId }], { onConflict: 'id' })
  if (error) throw error
}

