import { useEffect, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { useAuth as useAppAuth } from '@auth/ui/providers/AuthContext'
import { fetchOrderById, type Order } from '@account/state/OrdersStore'
import { shopifyEnabled } from '@/lib/shopify/shopify'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import { setNoIndexNoFollow } from '@/lib/seo'

export const OrderDetailPage = () => {
  const { orderId } = useParams()
  const { signedIn, signIn } = useAppAuth()
  const { getToken } = useClerkAuth()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setNoIndexNoFollow()
    if (!orderId) return
    let active = true

    const hydrate = async () => {
      setLoading(true)
      try {
        let found: Order | null = null
        if (shopifyEnabled && orderId.startsWith('#')) {
          // Try Customer Accounts order detail first
          const ca = await fetch(`/api/customer/order?name=${encodeURIComponent(orderId)}`).then((r) => (r.ok ? r.json() : null)).catch(() => null)
          const o = ca?.order
          if (o) {
            found = {
              id: o.name,
              placedAt: o.processedAt,
              status: 'processing',
              items: (o.lineItems?.nodes || []).map((li: any) => ({ id: li.title, title: li.title, qty: li.quantity, price: Number(li.originalTotal?.amount || 0) / Math.max(1, li.quantity) })),
              subtotal: 0,
              shipping: 0,
              total: Number(o.totalPrice?.amount || 0),
              events: [{ at: o.processedAt, message: 'Order placed' }],
            }
            ;(found as any).shippingAddress = o.shippingAddress ? {
              name: o.shippingAddress.displayName,
              address1: o.shippingAddress.address1,
              address2: o.shippingAddress.address2,
              city: o.shippingAddress.city,
              province: o.shippingAddress.province,
              zip: o.shippingAddress.zip,
              country: o.shippingAddress.country,
            } : undefined
            ;(found as any).fulfillmentStatus = o.fulfillmentStatus
          }
        }
        if (!found) {
          found = shopifyEnabled
            ? (orderId.startsWith('#')
                ? await fetch(`/api/orders/by-name?name=${encodeURIComponent(orderId)}`).then((r) => (r.ok ? r.json() : null)).catch(() => null)
                : await fetch(`/api/orders/get?id=${encodeURIComponent(orderId)}`).then((r) => (r.ok ? r.json() : null)).catch(() => null))
            : await (async () => {
              const token = await getToken({ template: 'supabase' }).catch(() => null)
              return fetchOrderById(orderId, token ?? undefined)
            })()
        }
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
          ) : loading ? (
            <div className="mt-4 rounded-2xl border border-brand-blush/60 bg-white p-6 text-brand-cocoa/80">Loading order details…</div>
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
              {Boolean((order as any).trackingUrl) ? (
                <div className="rounded-xl border border-brand-blush/60 p-3 text-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Tracking</div>
                  <a className="text-brand-cocoa underline" href={(order as any).trackingUrl} target="_blank" rel="noreferrer">Track shipment</a>
                </div>
              ) : null}
              {Boolean((order as any).shippingAddress) ? (
                <div className="rounded-xl border border-brand-blush/60 p-3 text-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Shipping address</div>
                  <AddressBlock address={(order as any).shippingAddress} />
                </div>
              ) : null}
              <div className="space-y-3">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl border border-brand-blush/60 p-3">
                    <img
                      src="/uploads/luminele/product-feature-05.webp"
                      alt=""
                      className="h-14 w-14 rounded-lg border border-brand-blush/40 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
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
                  {order.events.map((ev: any, idx: number) => (
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

function AddressBlock({ address }: { address: any }) {
  return (
    <div className="mt-2 text-brand-cocoa/80">
      <div>{address.name}</div>
      <div>{address.address1}</div>
      {address.address2 ? <div>{address.address2}</div> : null}
      <div>
        {[address.city, address.province, address.zip].filter(Boolean).join(', ')}
      </div>
      <div>{address.country}</div>
    </div>
  )
}

export default OrderDetailPage
