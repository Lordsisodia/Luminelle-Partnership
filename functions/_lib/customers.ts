import type { Env } from './types'
import { getSupabase } from './supabase'

export async function upsertCustomer(env: Env, payload: any) {
  const supabase = getSupabase(env)

  const id = String(payload?.id || '')
  if (!id) throw new Error('Missing customer id')

  const firstName = payload?.first_name ?? payload?.firstName ?? null
  const lastName = payload?.last_name ?? payload?.lastName ?? null
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim() || null

  const record = {
    id,
    email: payload?.email ?? null,
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    username: payload?.username ?? null,
    phone: payload?.phone ?? null,
    avatar_url: payload?.avatar_url ?? payload?.image_url ?? null,
    last_sign_in_at: payload?.last_sign_in_at ?? null,
    updated_at: new Date().toISOString(),
    raw: payload ?? {},
  }

  const { error } = await supabase.from('customers').upsert([record], { onConflict: 'id' })
  if (error) throw error
}

