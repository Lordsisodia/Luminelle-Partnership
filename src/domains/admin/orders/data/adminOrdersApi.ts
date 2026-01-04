import { getAdminAuthHeaders } from '../../shared/data/adminInternalAuth'

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

type ListResponse = { orders: AdminOrder[] }
type GetResponse = { order: AdminOrder }

let cachedList: { data: AdminOrder[]; fetchedAt: number } | null = null
const LIST_CACHE_TTL_MS = 30 * 1000

export async function fetchAdminOrders(params?: { limit?: number; q?: string; status?: string }): Promise<AdminOrder[]> {
  const now = Date.now()
  const hasParams = Boolean(params?.q || params?.status || params?.limit)

  if (!hasParams && cachedList && now - cachedList.fetchedAt < LIST_CACHE_TTL_MS) return cachedList.data

  const sp = new URLSearchParams()
  if (params?.limit) sp.set('limit', String(params.limit))
  if (params?.q) sp.set('q', params.q)
  if (params?.status) sp.set('status', params.status)

  const url = sp.toString() ? `/api/admin/orders/list?${sp.toString()}` : '/api/admin/orders/list'
  const res = await fetch(url, { headers: { Accept: 'application/json', ...getAdminAuthHeaders() } })
  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(msg || `Admin orders list failed: ${res.status}`)
  }

  const payload = (await res.json()) as ListResponse
  const orders = Array.isArray(payload?.orders) ? payload.orders : []

  if (!hasParams) cachedList = { data: orders, fetchedAt: now }
  return orders
}

export async function fetchAdminOrderById(id: string): Promise<AdminOrder | null> {
  const trimmed = id.trim()
  if (!trimmed) return null

  const sp = new URLSearchParams({ id: trimmed })
  const res = await fetch(`/api/admin/orders/get?${sp.toString()}`, { headers: { Accept: 'application/json', ...getAdminAuthHeaders() } })
  if (res.status === 404) return null
  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(msg || `Admin order get failed: ${res.status}`)
  }

  const payload = (await res.json()) as GetResponse
  return payload?.order ?? null
}
