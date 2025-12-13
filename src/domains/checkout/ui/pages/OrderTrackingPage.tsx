import { useEffect, useState } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { fetchOrderById, type Order } from '@account/state/OrdersStore'
import { setNoIndexNoFollow } from '@/lib/seo'

export const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState('')
  const [result, setResult] = useState<Order | null>(null)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  useEffect(() => { setNoIndexNoFollow() }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const lookup = orderId.trim()
    if (!lookup) {
      setError('Enter your order ID to continue.')
      setResult(null)
      return
    }

    setChecking(true)
    try {
      const found = await fetchOrderById(lookup)
      if (!found) {
        setError('We couldn’t find that order. Double-check the ID from your confirmation email.')
        setResult(null)
        return
      }
      setError('')
      setResult(found)
    } catch (err) {
      console.error('Order lookup failed', err)
      setError('Something went wrong while checking Supabase. Please try again in a moment.')
      setResult(null)
    } finally {
      setChecking(false)
    }
  }

  return (
    <MarketingLayout navItems={[]} subtitle="Track order">
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="font-heading text-3xl text-brand-cocoa">Track your order</h1>
          <p className="mt-2 text-brand-cocoa/70">Enter the order ID from your confirmation email. No account required.</p>
          <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-brand-blush/60 bg-white p-4 shadow-soft">
            <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60" htmlFor="track-order">
              Order ID
            </label>
            <div className="mt-2 flex gap-3">
              <input id="track-order" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="flex-1 rounded-xl border border-brand-blush/60 px-3 py-2 text-sm" placeholder="e.g. LUM-ABC123" />
              <button className="rounded-full bg-brand-cocoa px-5 py-2 text-sm font-semibold text-white disabled:opacity-60" disabled={checking}>
                {checking ? 'Checking…' : 'Check status'}
              </button>
            </div>
            {error ? <p className="mt-2 text-sm text-brand-peach">{error}</p> : null}
            {!error && checking ? <p className="mt-2 text-sm text-brand-cocoa/70">Contacting Supabase…</p> : null}
          </form>
          {result ? (
            <div className="mt-6 rounded-2xl border border-brand-blush/60 bg-brand-blush/20 p-4 text-brand-cocoa">
              <p className="text-sm font-semibold">Order {result.id}</p>
              <p className="text-xs text-brand-cocoa/60">Placed {new Date(result.placedAt).toLocaleString()}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {result.events.map((ev, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-peach" />
                    <div>
                      <p className="font-semibold">{ev.message}</p>
                      <p className="text-brand-cocoa/70">{new Date(ev.at).toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </MarketingLayout>
  )
}

export default OrderTrackingPage
