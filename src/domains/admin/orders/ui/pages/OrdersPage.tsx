import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AdminPageLayout } from '@admin/shared/ui/layouts'
import { fetchAdminOrderById, fetchAdminOrders, type AdminOrder } from '../../data/adminOrdersApi'
import { getAdminPass, setAdminPass } from '@admin/shared/data/adminInternalAuth'

const MOCK_ORDERS: AdminOrder[] = [
  {
    id: 'ord_1001',
    number: '#1001',
    customer: 'Rachel M.',
    email: 'rachel@example.com',
    status: 'paid',
    total: 29.98,
    currency: 'GBP',
    items: 2,
    createdAt: '2025-12-21T13:42:00Z',
  },
  {
    id: 'ord_1002',
    number: '#1002',
    customer: 'Amina K.',
    email: 'amina@example.com',
    status: 'pending',
    total: 14.99,
    currency: 'GBP',
    items: 1,
    createdAt: '2025-12-22T09:18:00Z',
  },
  {
    id: 'ord_1003',
    number: '#1003',
    customer: 'Sofia P.',
    email: 'sofia@example.com',
    status: 'paid',
    total: 19.99,
    currency: 'GBP',
    items: 1,
    createdAt: '2025-12-23T18:07:00Z',
  },
  {
    id: 'ord_1004',
    number: '#1004',
    customer: 'Naomi J.',
    email: 'naomi@example.com',
    status: 'refunded',
    total: 14.99,
    currency: 'GBP',
    items: 1,
    createdAt: '2025-12-24T11:31:00Z',
  },
]

function formatMoney(amount: number, currency?: string | null) {
  const safeCurrency = (currency || 'GBP').toUpperCase()
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: safeCurrency }).format(amount)
  } catch {
    return `£${amount.toFixed(2)}`
  }
}

const statusTone: Record<AdminOrder['status'], string> = {
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  refunded: 'bg-blue-50 text-blue-700 border-blue-200',
  cancelled: 'bg-neutral-100 text-neutral-800 border-neutral-200',
}

export default function OrdersPage() {
  const navigate = useNavigate()
  const { orderId } = useParams<{ orderId?: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [pass, setPass] = useState<string>(() => getAdminPass())
  const [query, setQuery] = useState<string>(() => (searchParams.get('q') ?? '').trim())
  const [statusFilter, setStatusFilter] = useState<string>(() => (searchParams.get('status') ?? 'all').trim() || 'all')
  const [orders, setOrders] = useState<AdminOrder[]>(MOCK_ORDERS)
  const [ordersSource, setOrdersSource] = useState<'api' | 'mock'>('mock')
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)
  const [ordersError, setOrdersError] = useState<string | null>(null)
  const [hasLoadedOrdersOnce, setHasLoadedOrdersOnce] = useState(false)
  const [hasTriedFetchOrderById, setHasTriedFetchOrderById] = useState(false)

  // URL -> state (deep links / back-forward)
  useEffect(() => {
    setQuery((searchParams.get('q') ?? '').trim())
    const rawStatus = (searchParams.get('status') ?? 'all').trim() || 'all'
    setStatusFilter(rawStatus === 'paid' || rawStatus === 'pending' || rawStatus === 'refunded' || rawStatus === 'cancelled' ? rawStatus : 'all')
  }, [searchParams])

  // state -> URL (shareable filters)
  const desiredSearch = useMemo(() => {
    const next = new URLSearchParams()
    if (query.trim()) next.set('q', query.trim())
    if (statusFilter !== 'all') next.set('status', statusFilter)
    return next
  }, [query, statusFilter])

  useEffect(() => {
    if (searchParams.toString() === desiredSearch.toString()) return
    setSearchParams(desiredSearch, { replace: true })
  }, [desiredSearch, searchParams, setSearchParams])

  const qs = searchParams.toString()

  const refreshOrders = useCallback(async () => {
    setIsLoadingOrders(true)
    setOrdersError(null)
    try {
      const data = await fetchAdminOrders({ limit: 200 })
      setOrders(data)
      setOrdersSource('api')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load orders'
      console.warn('Admin orders list failed; using mock orders', err)
      setOrdersError(message)
      setOrders(MOCK_ORDERS)
      setOrdersSource('mock')
    } finally {
      setIsLoadingOrders(false)
      setHasLoadedOrdersOnce(true)
    }
  }, [])

  useEffect(() => {
    void refreshOrders()
  }, [refreshOrders])

  useEffect(() => {
    setHasTriedFetchOrderById(false)
  }, [orderId])

  const selected = useMemo(() => (orderId ? orders.find((o) => o.id === orderId) ?? null : null), [orderId, orders])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return orders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false
      if (!q) return true
      return (
        o.number.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
      )
    })
  }, [orders, query, statusFilter])

  // Deep-link helper: if the list doesn't include the order, try to fetch it.
  useEffect(() => {
    if (!orderId) return
    if (selected) return
    if (ordersSource !== 'api') return

    const run = async () => {
      try {
        setHasTriedFetchOrderById(true)
        const fetched = await fetchAdminOrderById(orderId)
        if (!fetched) return
        setOrders((prev) => [fetched, ...prev.filter((o) => o.id !== fetched.id)])
      } catch (err) {
        console.warn('Admin order get failed', err)
      }
    }

    void run()
  }, [orderId, ordersSource, selected])

  // Redirect unknown order IDs back to the list (keeps URLs clean / avoids stale deep links).
  useEffect(() => {
    if (!orderId) return
    if (selected) return
    if (!hasLoadedOrdersOnce) return
    if (isLoadingOrders) return
    if (ordersSource === 'api' && !hasTriedFetchOrderById) return
    navigate(qs ? `/admin/orders?${qs}` : '/admin/orders', { replace: true })
  }, [hasLoadedOrdersOnce, hasTriedFetchOrderById, isLoadingOrders, navigate, orderId, ordersSource, qs, selected])

  return (
    <AdminPageLayout
      title="Orders"
      subtitle="Prototype UI. Next: wire to Shopify (or Supabase mirror), then add search + actions."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${
              ordersSource === 'api' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'
            }`}
          >
            {ordersSource === 'api' ? 'Supabase mirror' : 'Mock data'}
          </span>
          <input
            type="password"
            placeholder="Admin pass"
            value={pass}
            onChange={(e) => {
              const next = e.target.value
              setPass(next)
              setAdminPass(next)
            }}
            className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1 text-[11px] font-semibold text-semantic-text-primary/80 placeholder:text-semantic-text-primary/40"
          />
          <button
            type="button"
            onClick={refreshOrders}
            className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1 text-[11px] font-semibold text-semantic-text-primary/80 hover:bg-brand-porcelain/60 disabled:opacity-60"
            disabled={isLoadingOrders}
          >
            {isLoadingOrders ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[420px,1fr] items-start">
        <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Recent</div>
            <span className="rounded-full bg-brand-porcelain px-3 py-1 text-[11px] font-semibold text-semantic-text-primary/80">
              {filtered.length} result{filtered.length === 1 ? '' : 's'}
            </span>
          </div>

          {ordersError ? (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900/80">
              <div className="font-semibold">Couldn’t load live orders.</div>
              <div className="mt-1 text-[13px]">{ordersError}</div>
              <div className="mt-2 text-[12px] text-amber-900/70">
                If you’re on Vite dev (`localhost:5174`), `/api/admin/orders/*` won’t exist unless your backend is also running. Mock data is shown for now.
              </div>
            </div>
          ) : null}

          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search order, customer, email…"
                className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm text-semantic-text-primary placeholder:text-semantic-text-primary/40 md:w-[260px]"
              />
              {(['paid', 'pending', 'refunded'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter((prev) => (prev === status ? 'all' : status))}
                  className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                    statusFilter === status
                      ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-legacy-brand-cocoa'
                      : 'border-semantic-legacy-brand-blush/60 bg-brand-porcelain text-semantic-text-primary/70 hover:bg-brand-porcelain/70'
                  }`}
                >
                  {status}
                </button>
              ))}
              {(query.trim() || statusFilter !== 'all') ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setStatusFilter('all')
                  }}
                  className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1 text-xs font-semibold text-semantic-text-primary/70 hover:bg-brand-porcelain/60"
                >
                  Clear
                </button>
              ) : null}
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 text-sm text-semantic-text-primary/70">
                No orders match these filters.
              </div>
            ) : null}

            {filtered.map((o) => (
              <button
                key={o.id}
                onClick={() => navigate(qs ? `/admin/orders/${encodeURIComponent(o.id)}?${qs}` : `/admin/orders/${encodeURIComponent(o.id)}`)}
                className={`group flex w-full flex-col rounded-2xl border px-4 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
                  selected?.id === o.id ? 'border-semantic-legacy-brand-cocoa/60 bg-brand-porcelain/40' : 'border-semantic-legacy-brand-blush/60 bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-semantic-text-primary">{o.number}</div>
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${statusTone[o.status]}`}>
                    {o.status}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-semantic-text-primary/70">
                  <span className="font-semibold text-semantic-text-primary/80">{o.customer}</span>
                  <span className="text-semantic-text-primary/50">•</span>
                  <span>{o.email}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[12px] text-semantic-text-primary/70">
                  <span>{o.items} item{o.items === 1 ? '' : 's'}</span>
                  <span className="font-semibold text-semantic-text-primary">{formatMoney(o.total, o.currency)}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {selected ? (
          <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="truncate text-lg font-semibold text-semantic-text-primary">{selected.number}</div>
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-semibold ${statusTone[selected.status]}`}>
                    {selected.status}
                  </span>
                </div>
                <div className="mt-1 text-sm text-semantic-text-primary/75">
                  {selected.customer} • {selected.email}
                </div>
              </div>
              <button
                className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
                onClick={() => navigate(qs ? `/admin/orders?${qs}` : '/admin/orders')}
              >
                Back to list
              </button>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                { label: 'Total', value: formatMoney(selected.total, selected.currency) },
                { label: 'Items', value: String(selected.items) },
                { label: 'Created', value: new Date(selected.createdAt).toLocaleString() },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/40 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
                    {item.label}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-semantic-text-primary/85">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/30 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
                Next (real functionality)
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-semantic-text-primary/80 md:grid-cols-2">
                <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3">
                  Search + filters (status/date/customer/email)
                </li>
                <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3">
                  Actions (open in Shopify, refund, resend confirmation)
                </li>
                <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3">
                  Timeline (payment/fulfillment/notes)
                </li>
                <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3">
                  Audit log (actor + timestamp for each action)
                </li>
              </ul>
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-semantic-text-primary">Open an order</div>
            <p className="mt-2 text-sm text-semantic-text-primary/70">
              Select an order to view details. URL deep-linking is supported at{' '}
              <span className="font-mono text-[12px]">/admin/orders/:orderId</span>.
            </p>
          </section>
        )}
      </div>
    </AdminPageLayout>
  )
}
