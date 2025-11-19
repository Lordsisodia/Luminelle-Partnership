import { useEffect, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { useAuth } from '@/state/AuthContext'
import { getOrders, type Order } from '@/state/OrdersStore'

export const OrderDetailPage = () => {
  const { orderId } = useParams()
  const { signedIn, signIn } = useAuth()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (!orderId) return
    const found = getOrders().find((o) => o.id === orderId) || null
    setOrder(found)
  }, [orderId])

  return (
    <MarketingLayout navItems={[]} subtitle="Order detail">
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
          <RouterLink to="/account/orders" className="text-sm text-brand-cocoa/70">← Back to orders</RouterLink>
          <h1 className="mt-2 font-heading text-2xl text-brand-cocoa">Order {orderId}</h1>
          {!signedIn ? (
            <div className="mt-4 rounded-2xl border border-brand-blush/60 bg-white p-6">
              <p className="text-brand-cocoa/80">Sign in to view detailed order info and tracking.</p>
              <button className="mt-3 rounded-full bg-brand-peach px-5 py-2 font-semibold text-brand-cocoa" onClick={() => signIn('Jane')}>
                Sign in
              </button>
            </div>
          ) : !order ? (
            <div className="mt-4 rounded-2xl border border-brand-blush/60 bg-white p-6 text-brand-cocoa/80">
              We couldn’t find this order. Check the ID or view your <RouterLink to="/account/orders" className="underline">orders list</RouterLink>.
            </div>
          ) : (
            <article className="mt-4 space-y-4 rounded-2xl border border-brand-blush/60 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between text-sm text-brand-cocoa">
                <div>
                  <p className="font-semibold">Status: {order.status}</p>
                  <p className="text-brand-cocoa/70">Placed {new Date(order.placedAt).toLocaleString()}</p>
                </div>
                <p className="text-lg font-semibold">£{order.total.toFixed(2)}</p>
              </div>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl border border-brand-blush/60 p-3">
                    <img src="/uploads/luminele/product-feature-05.jpg" alt="" className="h-14 w-14 rounded-lg border border-brand-blush/40 object-cover" />
                    <div className="flex-1 text-sm text-brand-cocoa">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-brand-cocoa/70">Qty {item.qty}</p>
                    </div>
                    <div className="text-sm font-semibold">£{(item.price * item.qty).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-brand-blush/60 p-4 text-sm text-brand-cocoa">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Timeline</p>
                <ol className="mt-2 space-y-1">
                  {order.events.map((ev, idx) => (
                    <li key={idx} className="text-brand-cocoa/80">
                      • {new Date(ev.at).toLocaleString()} — {ev.message}
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          )}
        </div>
      </section>
    </MarketingLayout>
  )
}

export default OrderDetailPage
