import type { PagesFunction } from '../../../_lib/types'
import { requireInternalAuth } from '../../../_lib/internalAuth'
import { getSupabase } from '../../../_lib/supabase'
import { json, methodNotAllowed, text } from '../../../_lib/response'

type AdminOrderStatus = 'paid' | 'pending' | 'refunded' | 'cancelled'

type AdminOrder = {
  id: string
  number: string
  customer: string
  email: string
  status: AdminOrderStatus
  total: number
  currency?: string | null
  items: number
  createdAt: string
}

function parseItems(rawLineItems: unknown): unknown[] {
  if (Array.isArray(rawLineItems)) return rawLineItems
  if (typeof rawLineItems === 'string') {
    try {
      const parsed = JSON.parse(rawLineItems)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

function parseJson(raw: unknown): any {
  if (!raw) return {}
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw)
    } catch {
      return {}
    }
  }
  if (typeof raw === 'object') return raw
  return {}
}

function toAdminStatus(financialStatus: unknown): AdminOrderStatus {
  const s = String(financialStatus ?? '').toLowerCase()
  if (s.includes('refund')) return 'refunded'
  if (s.includes('paid')) return 'paid'
  if (s.includes('pending') || s.includes('authoriz')) return 'pending'
  if (s.includes('void') || s.includes('cancel')) return 'cancelled'
  return 'pending'
}

function inferCustomerName(orderRow: any): string {
  const raw = parseJson(orderRow?.raw)
  const candidate = raw?.shipping_address || raw?.billing_address || raw?.customer?.default_address || null
  const full =
    (candidate && [candidate.first_name, candidate.last_name].filter(Boolean).join(' ')) ||
    candidate?.name ||
    raw?.customer?.first_name && raw?.customer?.last_name
      ? [raw?.customer?.first_name, raw?.customer?.last_name].filter(Boolean).join(' ')
      : ''
  const name = (full || '').trim()
  if (name) return name
  const email = String(orderRow?.email || '').trim()
  if (email && email.includes('@')) return email.split('@')[0]
  return '—'
}

function mapRowToAdminOrder(row: any): AdminOrder {
  const orderId = String(row.order_id)
  const number = typeof row.name === 'string' && row.name.trim() ? row.name.trim() : `#${orderId}`
  const email = typeof row.email === 'string' ? row.email : ''
  const createdAt = row.processed_at || row.created_at || new Date().toISOString()
  const items = parseItems(row.line_items).length

  return {
    id: orderId,
    number,
    customer: inferCustomerName(row),
    email,
    status: toAdminStatus(row.financial_status),
    total: Number(row.total ?? 0),
    currency: row.currency ?? null,
    items,
    createdAt: new Date(createdAt).toISOString(),
  }
}

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])

  const auth = requireInternalAuth(request, env)
  if (!auth.ok) return json({ error: auth.message }, { status: auth.status })

  const url = new URL(request.url)
  const id = (url.searchParams.get('id') || '').trim()
  if (!id) return text('Missing id', { status: 400 })

  const supabase = getSupabase(env)
  const numeric = Number(id)
  if (!Number.isFinite(numeric)) return text('Invalid id', { status: 400 })

  const { data, error } = await supabase
    .from('ShopOrders')
    .select('order_id,name,email,currency,total,financial_status,processed_at,created_at,line_items,raw')
    .eq('order_id', Math.trunc(numeric))
    .limit(1)

  if (error) throw error
  if (!data || data.length === 0) return text('Not found', { status: 404 })

  return json({ order: mapRowToAdminOrder(data[0]) })
}
