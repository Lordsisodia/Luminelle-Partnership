import { useEffect, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { fetchOrderById, type Order } from '@account/state/OrdersStore'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import { setNoIndexNoFollow } from '@/lib/seo'

export const OrderConfirmationPage = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const { getToken } = useClerkAuth()

  useEffect(() => {
    setNoIndexNoFollow()
    if (!orderId) {
      setLoading(false)
      setOrder(null)
      return
    }

    let active = true
    const hydrate = async () => {
      setLoading(true)
      try {
        const token = await getToken({ template: 'supabase' }).catch(() => null)
        const found = await fetchOrderById(orderId, token ?? undefined)
        if (!active) return
        setOrder(found)
      } finally {
        if (active) setLoading(false)
      }
    }

    hydrate()
    return () => {
      active = false
    }
  }, [getToken, orderId])

  return (
    <MarketingLayout navItems={[]} subtitle="Order confirmed">
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-brand-cocoa">
          <div className="rounded-3xl border border-brand-peach/40 bg-white p-6 text-center shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Thank you</p>
            <h1 className="mt-2 font-heading text-3xl font-bold">Your order is on the way</h1>
            <p className="mt-2 text-brand-cocoa/75">We emailed a receipt to you. We’ll send tracking once it ships.</p>
            <div className="mt-4 rounded-2xl border border-brand-blush/60 bg-brand-blush/20 p-4 text-left text-sm" aria-live="polite">
              {loading ? (
                <div>
                  <p className="font-semibold">Loading order…</p>
                  <p className="text-brand-cocoa/70">We’re syncing the receipt from Supabase.</p>
                </div>
              ) : order ? (
                <div>
                  <p className="font-semibold">Order {order.id}</p>
                  <p className="text-brand-cocoa/70">Placed {new Date(order.placedAt).toLocaleString()}</p>
                  <ul className="mt-3 space-y-2 text-brand-cocoa">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between text-sm">
                        <span>{item.title} × {item.qty}</span>
                        <span>£{(item.qty * item.price).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex items-center justify-between border-t border-brand-blush/60 pt-2 text-sm font-semibold">
                    <span>Total</span>
                    <span>£{order.total.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-semibold">Order saved</p>
                  <p className="text-brand-cocoa/70">If you refreshed, view the details in your account orders page.</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <RouterLink to="/account/orders" className="rounded-full border border-brand-blush/60 px-6 py-2 text-sm font-semibold text-brand-cocoa">Track order</RouterLink>
              <RouterLink to="/" className="rounded-full bg-brand-cocoa px-6 py-2 text-sm font-semibold text-white">Continue shopping</RouterLink>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default OrderConfirmationPage
