import type { Env } from './types'
import { getSupabase } from './supabase'

function toTagArray(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.map(String).map((t) => t.trim()).filter(Boolean)
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  }
  return []
}

function toBigIntString(id: unknown): string | null {
  if (typeof id === 'number' && Number.isFinite(id)) return String(Math.trunc(id))
  if (typeof id === 'bigint') return id.toString()
  if (typeof id === 'string' && id.trim()) {
    const numeric = id.match(/(\d+)\s*$/)?.[1] ?? id
    try {
      BigInt(numeric)
      return numeric
    } catch {
      return null
    }
  }
  return null
}

export async function upsertShopCustomer(env: Env, shop: string, payload: any) {
  const supabase = getSupabase(env)
  const customerId = toBigIntString(payload?.id)
  if (!customerId) throw new Error('Invalid customer id')

  const tags = toTagArray(payload?.tags)
  const acceptsMarketing = Boolean(payload?.accepts_marketing ?? payload?.marketing_opt_in)
  const email = typeof payload?.email === 'string' ? payload.email.trim().toLowerCase() : null

  const record = {
    shop,
    customer_id: customerId,
    email,
    first_name: payload?.first_name ?? payload?.firstName ?? null,
    last_name: payload?.last_name ?? payload?.lastName ?? null,
    state: payload?.state ?? null,
    marketing_opt_in: acceptsMarketing,
    tags,
    default_address: payload?.default_address ?? null,
    addresses: payload?.addresses ?? null,
    created_at: payload?.created_at ?? payload?.createdAt ?? null,
    updated_at: payload?.updated_at ?? payload?.updatedAt ?? null,
    raw: payload ?? {},
  }

  const { error } = await supabase.from('ShopCustomers').upsert([record], { onConflict: 'shop,customer_id' })
  if (error) throw error
}

export async function deleteShopCustomer(env: Env, shop: string, id: string) {
  const supabase = getSupabase(env)
  const { error } = await supabase.from('ShopCustomers').delete().eq('shop', shop).eq('customer_id', id)
  if (error) throw error
}

export async function redactShopCustomer(env: Env, shop: string, emailOrId: { email?: string; id?: string }) {
  const supabase = getSupabase(env)
  if (emailOrId.id) {
    const { error } = await supabase.from('ShopCustomers').delete().eq('shop', shop).eq('customer_id', emailOrId.id)
    if (error) throw error
    return
  }
  if (emailOrId.email) {
    const { error } = await supabase.from('ShopCustomers').delete().eq('shop', shop).eq('email', emailOrId.email.toLowerCase())
    if (error) throw error
  }
}

