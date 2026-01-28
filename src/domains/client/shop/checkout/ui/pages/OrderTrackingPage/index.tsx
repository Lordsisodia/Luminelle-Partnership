import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SUPPORT_EMAIL, WHATSAPP_SUPPORT_URL } from '@/config/constants'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'
import { Package } from 'lucide-react'
import { TrackingTimeline, fetchShopifyOrderForTracking } from '../../shared'

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<Awaited<ReturnType<typeof fetchShopifyOrderForTracking>>['order']>()
  const [trackingEvents, setTrackingEvents] = useState<Awaited<ReturnType<typeof fetchShopifyOrderForTracking>>['trackingEvents']>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim()) return

    setLoading(true)
    setError(null)
    setOrder(undefined)
    setTrackingEvents(undefined)

    const customerAccessToken = localStorage.getItem('shopifyCustomerAccessToken')
    const result = await fetchShopifyOrderForTracking(orderNumber.trim(), email.trim(), customerAccessToken || undefined)

    if (result.error) {
      setError(result.error)
    } else {
      setOrder(result.order)
      setTrackingEvents(result.trackingEvents)
    }

    setLoading(false)
  }

  // Get tracking info from order
  const trackingNumber = order?.successfulFulfillments?.[0]?.trackingInfo?.[0]?.trackingNumber
  const trackingUrl = order?.successfulFulfillments?.[0]?.trackingInfo?.[0]?.trackingUrl || order?.trackingUrl

  return (
    <>
      <Seo
        title="Order tracking"
        description="Find your tracking link or get help from support."
        url={toPublicUrl('/order/track')}
        type="website"
      />
      <MarketingLayout navItems={[]} subtitle="Tracking">
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>

        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-5 py-14 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Support</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-semantic-text-primary">Track an order</h1>
            <p className="mt-4 text-sm leading-relaxed text-semantic-text-primary/70">
              Enter your order number and email to view tracking information and delivery status.
            </p>

            {/* Tracking form */}
            <div className="mt-8 rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
                Find your order
              </p>

              <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
                <label className="grid gap-1 text-sm font-semibold text-semantic-text-primary">
                  Order number
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. #1234 or your confirmation reference"
                    required
                    className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm font-normal text-semantic-text-primary placeholder:text-semantic-text-primary/45 focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/20"
                    inputMode="text"
                    autoCapitalize="characters"
                  />
                </label>

                <label className="grid gap-1 text-sm font-semibold text-semantic-text-primary">
                  Email used at checkout
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm font-normal text-semantic-text-primary placeholder:text-semantic-text-primary/45 focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/20"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Looking up order…' : 'Track order'}
                </button>
              </form>

              <p className="mt-3 text-xs text-semantic-text-primary/60">
                Tip: If you used Apple Pay / Shop Pay, the tracking email may come from the payment provider or the carrier.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-6">
                <p className="text-sm font-semibold text-red-800">Unable to find your order</p>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={WHATSAPP_SUPPORT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
                  >
                    Message WhatsApp
                  </a>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}?subject=Tracking help`}
                    className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
                  >
                    Email support
                  </a>
                </div>
              </div>
            )}

            {/* Tracking results */}
            {order && trackingEvents && (
              <div className="mt-8 rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-semantic-legacy-brand-blush/30">
                  {order.lineItems.edges[0]?.node?.variant?.image && (
                    <img
                      src={order.lineItems.edges[0].node.variant.image.url}
                      alt=""
                      className="h-12 w-12 rounded-xl border border-semantic-legacy-brand-blush/40 object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-semantic-text-primary">Order #{order.orderNumber}</p>
                    <p className="text-xs text-semantic-text-primary/60">
                      {new Date(order.processedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <TrackingTimeline
                  events={trackingEvents}
                  trackingNumber={trackingNumber}
                  trackingUrl={trackingUrl}
                />
              </div>
            )}

            {/* Support links */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                Back to shop
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
              >
                View cart
              </Link>
              <Link
                to="/returns"
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
              >
                Start a return
              </Link>
            </div>
          </div>
        </section>
      </MarketingLayout>
    </>
  )
}
