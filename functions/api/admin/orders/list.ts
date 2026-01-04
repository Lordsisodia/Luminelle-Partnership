import type { PagesFunction } from '../../../_lib/types'
import { requireInternalAuth } from '../../../_lib/internalAuth'
import { getSupabase } from '../../../_lib/supabase'
import { json, methodNotAllowed } from '../../../_lib/response'

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
  const limitRaw = url.searchParams.get('limit')
  const q = (url.searchParams.get('q') || '').trim()
  const status = (url.searchParams.get('status') || '').trim().toLowerCase()

  const limit = (() => {
    const parsed = Number(limitRaw)
    if (!Number.isFinite(parsed) || parsed <= 0) return 200
    return Math.max(1, Math.min(500, Math.floor(parsed)))
  })()

  const supabase = getSupabase(env)

  let query = supabase
    .from('ShopOrders')
    .select('order_id,name,email,currency,total,financial_status,processed_at,created_at,line_items,raw')
    .order('processed_at', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (q) {
    const escaped = q.replace(/[%_,]/g, '').slice(0, 80)
    const numeric = Number(escaped)
    const orParts = [`name.ilike.%${escaped}%`, `email.ilike.%${escaped}%`]
    if (Number.isFinite(numeric)) orParts.push(`order_id.eq.${Math.trunc(numeric)}`)
    query = query.or(orParts.join(','))
  }

  if (status === 'paid') query = query.in('financial_status', ['paid', 'partially_paid'])
  if (status === 'pending') query = query.in('financial_status', ['pending', 'authorized'])
  if (status === 'refunded') query = query.in('financial_status', ['refunded', 'partially_refunded'])
  if (status === 'cancelled') query = query.in('financial_status', ['voided', 'cancelled'])

  const { data, error } = await query
  if (error) throw error

  const orders = (data || []).map(mapRowToAdminOrder)
  return json({ orders })
}
