import type { Env } from './types'
import { getSupabase } from './supabase'

function toBigIntString(id: unknown): string | null {
  if (typeof id === 'number' && Number.isFinite(id)) return String(Math.trunc(id))
  if (typeof id === 'bigint') return id.toString()
  if (typeof id === 'string' && id.trim()) {
    const numeric = id.match(/(\d+)\s*$/)?.[1] ?? id
    try {
      // Validate it is integer-like
      BigInt(numeric)
      return numeric
    } catch {
      return null
    }
  }
  return null
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim()) {
    const n = Number(value)
    return Number.isFinite(n) ? n : null
  }
  return null
}

export async function upsertShopOrder(env: Env, shop: string, payload: any) {
  const supabase = getSupabase(env)

  const orderId = toBigIntString(payload?.id ?? payload?.order_id)
  if (!orderId) throw new Error('Invalid order id')

  const subtotal =
    toNumber(payload?.subtotal_price ?? payload?.subtotal ?? payload?.subtotal_price_set?.shop_money?.amount) ?? null
  const total =
    toNumber(payload?.total_price ?? payload?.total ?? payload?.total_price_set?.shop_money?.amount) ?? null

  const lineItems = payload?.line_items ?? payload?.lineItems ?? null
  const email = typeof payload?.email === 'string' ? payload.email.trim().toLowerCase() : null

  const record = {
    shop,
    order_id: orderId,
    name: payload?.name ?? null,
    email,
    currency: payload?.currency ?? payload?.currencyCode ?? payload?.currency_code ?? null,
    subtotal,
    total,
    financial_status: payload?.financial_status ?? payload?.financialStatus ?? null,
    fulfillment_status: payload?.fulfillment_status ?? payload?.fulfillmentStatus ?? null,
    processed_at: payload?.processed_at ?? payload?.processedAt ?? null,
    created_at: payload?.created_at ?? payload?.createdAt ?? null,
    updated_at: payload?.updated_at ?? payload?.updatedAt ?? null,
    line_items: lineItems,
    raw: payload ?? {},
  }

  const { error } = await supabase.from('ShopOrders').upsert([record], { onConflict: 'shop,order_id' })
  if (error) throw error
}

export async function updateShopOrderFulfillment(
  env: Env,
  shop: string,
  orderId: string,
  patch: { fulfillment_status?: string | null; raw_patch?: Record<string, unknown> },
) {
  const supabase = getSupabase(env)
  const update: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (typeof patch.fulfillment_status !== 'undefined') update.fulfillment_status = patch.fulfillment_status
  // best-effort: store raw_patch for later inspection
  if (patch.raw_patch) update.raw = patch.raw_patch

  const { error } = await supabase.from('ShopOrders').update(update).eq('shop', shop).eq('order_id', orderId)
  if (error) throw error
}

