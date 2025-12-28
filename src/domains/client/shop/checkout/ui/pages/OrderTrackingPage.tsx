import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SUPPORT_EMAIL, WHATSAPP_SUPPORT_URL } from '@/config/constants'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'

const OrderTrackingPage = () => {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')

  const mailtoHref = useMemo(() => {
    const subject = `Tracking help${orderNumber.trim() ? ` — Order ${orderNumber.trim()}` : ''}`
    const lines = [
      'Hi Lumelle support,',
      '',
      'I need help tracking my order.',
      '',
      `Order number: ${orderNumber.trim() || '(not sure)'}`,
      `Email used at checkout: ${email.trim() || '(not sure)'}`,
      '',
      'I’ve checked my order/shipping emails but can’t find the tracking link.',
      '',
      'Thank you,',
    ]
    const body = lines.join('\n')
    return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [email, orderNumber])

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
          <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Support</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-semantic-text-primary">Track an order</h1>
            <p className="mt-4 text-sm leading-relaxed text-semantic-text-primary/70">
              Tracking details are typically sent in your shipping confirmation email. If you can’t find it, send us your
              order number and we’ll help immediately.
            </p>

            <div className="mt-8 space-y-4 rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
                Request tracking help
              </p>

              <div className="grid gap-3">
                <label className="grid gap-1 text-sm font-semibold text-semantic-text-primary">
                  Order number (optional)
                  <input
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. #1234 or your confirmation reference"
                    className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm font-normal text-semantic-text-primary placeholder:text-semantic-text-primary/45"
                    inputMode="text"
                    autoCapitalize="characters"
                  />
                </label>

                <label className="grid gap-1 text-sm font-semibold text-semantic-text-primary">
                  Email used at checkout (optional)
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm font-normal text-semantic-text-primary placeholder:text-semantic-text-primary/45"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </label>
              </div>

              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                >
                  Email support for tracking
                </a>
                <a
                  href={WHATSAPP_SUPPORT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
                >
                  Message on WhatsApp
                </a>
              </div>

              <p className="mt-3 text-xs text-semantic-text-primary/60">
                Tip: If you used Apple Pay / Shop Pay, the tracking email may come from Shopify or the carrier.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white"
              >
                Back to shop
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary"
              >
                View cart
              </Link>
            </div>
          </div>
        </section>
      </MarketingLayout>
    </>
  )
}

export default OrderTrackingPage
