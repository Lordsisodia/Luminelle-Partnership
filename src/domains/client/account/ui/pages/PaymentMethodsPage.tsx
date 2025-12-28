import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SUPPORT_EMAIL, WHATSAPP_SUPPORT_URL } from '@/config/constants'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'

const PaymentMethodsPage = () => {
  return (
    <>
      <Seo
        title="Payment methods"
        description="Payment methods and checkout help."
        url={toPublicUrl('/account/payments')}
        type="website"
      />
      <MarketingLayout navItems={[]} subtitle="Payments">
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>

        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Account</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-semantic-text-primary">Payment methods</h1>
            <p className="mt-4 text-sm leading-relaxed text-semantic-text-primary/70">
              Saved payment methods aren’t managed in this storefront yet. Payments are handled securely at checkout
              (Shop Pay, Apple Pay, cards). If you need help completing a purchase, message us and we’ll guide you.
            </p>

            <div className="mt-8 rounded-3xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Need help?</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/cart"
                  className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                >
                  View cart
                </Link>
                <a
                  href={WHATSAPP_SUPPORT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
                >
                  Message on WhatsApp
                </a>
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Checkout help')}`}
                  className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
                >
                  Email support
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/account"
                className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white"
              >
                Back to account
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary"
              >
                Back to shop
              </Link>
            </div>
          </div>
        </section>
      </MarketingLayout>
    </>
  )
}

export default PaymentMethodsPage
