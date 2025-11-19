import { MarketingLayout } from '@/layouts/MarketingLayout'
import { useAuth } from '@/state/AuthContext'
import { getOrders, type Order, type OrderItem } from '@/state/OrdersStore'
import { Link as RouterLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

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
  const { signedIn, signIn } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setOrders(getOrders())
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
                          <img src="/uploads/luminele/product-feature-05.jpg" alt="" className="h-12 w-12 rounded-lg border border-brand-blush/60 object-cover" />
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
                        {o.events.map((ev, i) => (
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
