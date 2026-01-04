export type AdminOrderStatus = 'paid' | 'pending' | 'refunded' | 'cancelled'

export type AdminOrder = {
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
    (raw?.customer?.first_name && raw?.customer?.last_name ? [raw?.customer?.first_name, raw?.customer?.last_name].filter(Boolean).join(' ') : '')
  const name = String(full || '').trim()
  if (name) return name
  const email = String(orderRow?.email || '').trim()
  if (email && email.includes('@')) return email.split('@')[0]
  return '—'
}

export function mapShopOrderRowToAdminOrder(row: any): AdminOrder {
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

