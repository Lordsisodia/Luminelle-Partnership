import { useEffect, useState } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { useAuth as useAppAuth } from '@auth/ui/providers/AuthContext'
import { fetchOrders, type Order, type OrderItem } from '@account/state/OrdersStore'
import { shopifyEnabled } from '@/lib/shopify/shopify'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import { setNoIndexNoFollow } from '@/lib/seo'

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const colors: Record<Order['status'], string> = {
    processing: 'bg-amber-100 text-amber-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${colors[status]}`}>{status}</span>
}

export const OrdersPage = () => {
  const { signedIn, signIn } = useAppAuth()
  const { getToken } = useClerkAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [emailLookup, setEmailLookup] = useState('')
  const [orderNameLookup, setOrderNameLookup] = useState('')

  useEffect(() => {
    setNoIndexNoFollow()
    let active = true

    if (!signedIn) {
      setOrders([])
      setLoading(false)
      return () => {
        active = false
      }
    }

    const loadOrders = async () => {
      try {
        let next: Order[] = []
        if (shopifyEnabled && orderNameLookup) {
          const res = await fetch(`/api/orders/by-name?name=${encodeURIComponent(orderNameLookup)}`)
          next = res.ok ? [await res.json()] : []
        } else if (shopifyEnabled && emailLookup) {
          next = await fetch(`/api/orders/by-email?email=${encodeURIComponent(emailLookup)}`).then((r) => r.json()).catch(() => [])
        } else if (!shopifyEnabled) {
          const token = await getToken({ template: 'supabase' }).catch(() => null)
          next = await fetchOrders(token ?? undefined)
        } else {
          next = []
        }
        if (!active) return
        setOrders(next)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadOrders()
    return () => {
      active = false
    }
  }, [getToken, signedIn, emailLookup, orderNameLookup])

  // Try Customer Accounts orders (if signed in via Shopify Accounts)
  useEffect(() => {
    if (!shopifyEnabled) return
    let active = true
    fetch('/api/customer/orders')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!active || !j) return
        const nodes = j?.data?.customer?.orders?.nodes || []
        if (nodes.length === 0) return
        const mapped: Order[] = nodes.map((n: any) => ({
          id: n.name,
          placedAt: n.processedAt,
          status: 'processing',
          items: [],
          subtotal: 0,
          shipping: 0,
          total: Number(n.totalPrice?.amount || 0),
          events: [{ at: n.processedAt, message: 'Order placed' }],
        }))
        setOrders(mapped)
        setLoading(false)
      })
      .catch(() => undefined)
    return () => { active = false }
  }, [])

  const [isCASignedIn, setIsCASignedIn] = useState(false)

  useEffect(() => {
    if (!shopifyEnabled) return
    fetch('/api/customer/orders').then((r) => setIsCASignedIn(r.ok)).catch(() => setIsCASignedIn(false))
  }, [])

  return (
    <MarketingLayout navItems={[]} subtitle="Orders">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h1 className="font-heading text-2xl text-brand-cocoa">Your orders</h1>
          {!signedIn ? (
            <div className="mt-4 rounded-2xl border border-brand-blush/60 bg-white p-6">
              <p className="text-brand-cocoa/80">Sign in to view orders and tracking updates.</p>
              <button className="mt-3 rounded-full bg-brand-peach px-5 py-2 font-semibold text-brand-cocoa" onClick={() => signIn('Jane')}>Sign in</button>
            </div>
          ) : shopifyEnabled ? (
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-brand-blush/60 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Sign in with Shopify Accounts</div>
                <div className="mt-2 flex gap-2">
                  <a
                    className="rounded-full bg-brand-cocoa px-4 py-2 text-sm font-semibold text-white"
                    href={`/api/customer-auth/start?shop=${encodeURIComponent(import.meta.env.SHOPIFY_STORE_DOMAIN || '')}`}
                  >
                    Sign in securely
                  </a>
                  <a className="rounded-full border border-brand-blush/60 px-4 py-2 text-sm font-semibold text-brand-cocoa" href={`https://${import.meta.env.SHOPIFY_STORE_DOMAIN}/account`}>Open hosted account</a>
                  {isCASignedIn ? (
                    <a className="rounded-full border border-brand-blush/60 px-4 py-2 text-sm font-semibold text-brand-cocoa" href="/api/customer-auth/logout">Sign out</a>
                  ) : null}
                </div>
                <p className="mt-2 text-[11px] text-brand-cocoa/60">{isCASignedIn ? 'Signed in with Shopify Customer Accounts.' : 'Once signed in, your orders will load automatically.'}</p>
              </div>
              <div className="rounded-2xl border border-brand-blush/60 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Find your orders</div>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <div className="flex gap-2">
                    <input
                      className="flex-1 rounded-xl border border-brand-blush/60 px-3 py-2 text-sm"
                      placeholder="Order number (e.g., #1001)"
                      value={orderNameLookup}
                      onChange={(e) => setOrderNameLookup(e.target.value)}
                    />
                    <button className="rounded-full bg-brand-cocoa px-4 py-2 text-sm font-semibold text-white" onClick={() => setLoading(true)}>Find</button>
                  </div>
                  <input
                    className="rounded-xl border border-brand-blush/60 px-3 py-2 text-sm"
                    placeholder="Or enter your order email"
                    value={emailLookup}
                    onChange={(e) => setEmailLookup(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-[11px] text-brand-cocoa/60">Tip: use the email you used at checkout.</p>
              </div>
              {loading ? (
                <div className="rounded-2xl border border-brand-blush/60 bg-white p-6 text-brand-cocoa/80">Loading your orders…</div>
              ) : orders.length === 0 ? (
                <div className="rounded-2xl border border-brand-blush/60 bg-white p-6 text-brand-cocoa/80">No orders found for that email yet.</div>
              ) : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <RouterLink to={`/account/orders/${o.id}`} key={o.id} className="block rounded-2xl border border-brand-blush/60 bg-white p-4 hover:shadow-soft">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm text-brand-cocoa">
                          <div className="font-semibold">Order {o.id}</div>
                          <div className="text-brand-cocoa/70">Placed {new Date(o.placedAt).toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={o.status} />
                          <div className="text-sm font-semibold">£{o.total.toFixed(2)}</div>
                        </div>
                      </div>
                    </RouterLink>
                  ))}
                </div>
              )}
            </div>
          ) : loading ? (
            <div className="mt-4 rounded-2xl border border-brand-blush/60 bg-white p-6 text-brand-cocoa/80">Loading your orders…</div>
          ) : orders.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-brand-blush/60 bg-white p-6 text-brand-cocoa/80">
              You haven’t placed any orders yet.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.map((o) => (
                <RouterLink to={`/account/orders/${o.id}`} key={o.id} className="block rounded-2xl border border-brand-blush/60 bg-white p-4 hover:shadow-soft">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm text-brand-cocoa">
                      <div className="font-semibold">Order {o.id}</div>
                      <div className="text-brand-cocoa/70">Placed {new Date(o.placedAt).toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={o.status} />
                      <div className="text-sm font-semibold">£{o.total.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr]">
                    <div className="space-y-3">
                      {o.items.map((it: OrderItem) => (
                        <div key={it.id} className="flex items-center gap-3">
                          <img
                            src="/uploads/luminele/product-feature-05.jpg"
                            alt=""
                            className="h-12 w-12 rounded-lg border border-brand-blush/60 object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="flex-1 text-sm text-brand-cocoa">
                            <div className="font-medium">{it.title}</div>
                            <div className="text-brand-cocoa/70">Qty {it.qty}</div>
                          </div>
                          <div className="text-sm font-semibold">£{(it.price * it.qty).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-brand-blush/60 p-3">
                      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Updates</div>
                      <ol className="mt-2 space-y-1 text-sm text-brand-cocoa/80">
                        {o.events.map((ev: any, i: number) => (
                          <li key={i}>• {new Date(ev.at).toLocaleString()} — {ev.message}</li>
                        ))}
                        {o.status === 'processing' ? (
                          <li>• You’ll receive tracking once your order ships.</li>
                        ) : null}
                      </ol>
                    </div>
                  </div>
                </RouterLink>
              ))}
            </div>
          )}
        </div>
      </section>
    </MarketingLayout>
  )
}

export default OrdersPage
