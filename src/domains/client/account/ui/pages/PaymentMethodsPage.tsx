import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SUPPORT_EMAIL, WHATSAPP_SUPPORT_URL } from '@/config/constants'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'
import { usePayments } from '@client/account/providers/PaymentsProvider'
import { env } from '@/utils/env'
import { useEffect, useState } from 'react'
import { StripeDevEmbeddedPaymentPanel } from '@client/account/ui/components/StripeDevEmbeddedPaymentPanel'

const PaymentMethodsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { capabilities, beginPayment } = usePayments()
  const providerLabel = capabilities.providerLabel ?? 'Payments'
  const canTest = import.meta.env.DEV && capabilities.mode !== 'none'
  const stripePublishableKey = env('STRIPE_PUBLISHABLE_KEY')
  const stripeDashboardBase = (() => {
    const key = (stripePublishableKey ?? '').trim()
    if (!key) return 'https://dashboard.stripe.com'
    return key.startsWith('pk_test_') ? 'https://dashboard.stripe.com/test' : 'https://dashboard.stripe.com'
  })()
  const stripeModeLabel = stripeDashboardBase.includes('/test') ? 'test' : 'live'
  const stripeKeyPrefix = (() => {
    const key = (stripePublishableKey ?? '').trim()
    if (key.startsWith('pk_test_')) return 'pk_test'
    if (key.startsWith('pk_live_')) return 'pk_live'
    return key ? 'pk_(unknown)' : '(missing)'
  })()
  const [startError, setStartError] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [lastIntent, setLastIntent] = useState<string | null>(() => {
    if (!import.meta.env.DEV) return null
    try {
      return localStorage.getItem('lumelle_dev_last_payment_intent')
    } catch {
      return null
    }
  })
  const [lastRedirectStatus, setLastRedirectStatus] = useState<string | null>(() => {
    if (!import.meta.env.DEV) return null
    try {
      return localStorage.getItem('lumelle_dev_last_redirect_status')
    } catch {
      return null
    }
  })
  const [lastDebugTs, setLastDebugTs] = useState<number | null>(() => {
    if (!import.meta.env.DEV) return null
    try {
      const raw = localStorage.getItem('lumelle_dev_last_stripe_debug_ts')
      const n = raw ? Number(raw) : NaN
      return Number.isFinite(n) ? n : null
    } catch {
      return null
    }
  })
  const [lastRunId, setLastRunId] = useState<string | null>(() => {
    if (!import.meta.env.DEV) return null
    try {
      const raw = localStorage.getItem('lumelle_dev_last_stripe_run_id')
      return raw ? String(raw) : null
    } catch {
      return null
    }
  })

  const paymentResult = (() => {
    try {
      const params = new URLSearchParams(location.search)
      const payment = params.get('payment')
      if (payment === 'success') return { kind: 'success' as const, message: 'Payment flow returned successfully.' }
      if (payment === 'cancel') return { kind: 'warning' as const, message: 'Payment was cancelled.' }

      const stripeStatus = params.get('redirect_status')
      if (stripeStatus === 'succeeded') return { kind: 'success' as const, message: 'Payment succeeded.' }
      if (stripeStatus === 'failed') return { kind: 'error' as const, message: 'Payment failed.' }
      if (stripeStatus === 'canceled') return { kind: 'warning' as const, message: 'Payment was cancelled.' }

      return null
    } catch {
      return null
    }
  })()

  const stripeDebug = (() => {
    if (!import.meta.env.DEV) return null
    try {
      const params = new URLSearchParams(location.search)
      const paymentIntent = params.get('payment_intent')
      const redirectStatus = params.get('redirect_status')
      const clientSecret = params.get('payment_intent_client_secret')
      if (!paymentIntent && !redirectStatus && !clientSecret) return null

      return {
        paymentIntent,
        redirectStatus,
        // Never show full secrets; last 6 chars is enough to correlate.
        clientSecretSuffix: typeof clientSecret === 'string' && clientSecret.length > 6 ? clientSecret.slice(-6) : null,
      }
    } catch {
      return null
    }
  })()

  const effectivePaymentIntent = stripeDebug?.paymentIntent ?? lastIntent
  const lastRunSummary = (() => {
    const s = (stripeDebug?.redirectStatus ?? lastRedirectStatus ?? '').trim().toLowerCase()
    if (!s) return null
    if (s === 'succeeded') return { kind: 'success' as const, label: 'succeeded' }
    if (s === 'failed') return { kind: 'error' as const, label: 'failed' }
    if (s === 'canceled' || s === 'cancelled') return { kind: 'warning' as const, label: 'canceled' }
    return { kind: 'warning' as const, label: s }
  })()

  useEffect(() => {
    if (!import.meta.env.DEV) return
    try {
      const params = new URLSearchParams(location.search)
      const paymentIntent = params.get('payment_intent')
      const redirectStatus = params.get('redirect_status')
      if (!paymentIntent) return
      localStorage.setItem('lumelle_dev_last_payment_intent', paymentIntent)
      setLastIntent(paymentIntent)
      if (redirectStatus) {
        localStorage.setItem('lumelle_dev_last_redirect_status', redirectStatus)
        setLastRedirectStatus(redirectStatus)
      }
      const ts = Date.now()
      localStorage.setItem('lumelle_dev_last_stripe_debug_ts', String(ts))
      setLastDebugTs(ts)
      const runId = Math.random().toString(36).slice(2, 8)
      localStorage.setItem('lumelle_dev_last_stripe_run_id', runId)
      setLastRunId(runId)
    } catch {
      // ignore
    }
  }, [location.search])

  const copyPaymentIntent = async (value: string) => {
    setCopied(false)
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        const ta = document.createElement('textarea')
        ta.value = value
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  const openStripeDashboardSearch = (query: string) => {
    try {
      const url = `${stripeDashboardBase}/search?query=${encodeURIComponent(query)}`
      window.open(url, '_blank', 'noreferrer')
    } catch {
      // ignore
    }
  }

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
              Saved payment methods aren’t managed in this storefront yet. Payments are handled securely at checkout via{' '}
              <span className="font-semibold">{providerLabel}</span>. If you need help completing a purchase, message us and we’ll guide you.
            </p>

            {import.meta.env.DEV && paymentResult ? (
              <div
                className={
                  paymentResult.kind === 'success'
                    ? 'mt-6 rounded-3xl border border-green-200 bg-green-50 p-4 text-green-900'
                    : paymentResult.kind === 'warning'
                      ? 'mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-amber-900'
                      : 'mt-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-red-900'
                }
              >
                <p className="text-sm font-semibold">Payment result (dev)</p>
                <p className="mt-1 text-xs">{paymentResult.message}</p>
                {stripeDebug ? (
                  <div className="mt-3 rounded-2xl border border-black/10 bg-white/60 p-3 text-[11px] text-black/70">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full border border-black/10 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/60">
                        Stripe {stripeModeLabel}
                      </span>
                      <span className="rounded-full border border-black/10 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/60">
                        {stripeKeyPrefix}
                      </span>
                    </div>
                    <div className="mb-2">
                      dashboard:{' '}
                      <span className="font-mono text-[11px]">{stripeDashboardBase}</span>
                    </div>
                    {lastRunSummary ? (
                      <div className="mb-2">
                        last_run:{' '}
                        <span
                          className={
                            lastRunSummary.kind === 'success'
                              ? 'font-mono text-[11px] text-green-800'
                              : lastRunSummary.kind === 'error'
                                ? 'font-mono text-[11px] text-red-800'
                                : 'font-mono text-[11px] text-amber-800'
                          }
                        >
                          {lastRunSummary.label}
                        </span>
                      </div>
                    ) : null}
                    {typeof lastDebugTs === 'number' ? (
                      <div className="mb-2">
                        last_seen:{' '}
                        <span className="font-mono text-[11px]">
                          {new Date(lastDebugTs).toLocaleString()}
                        </span>
                      </div>
                    ) : null}
                    {lastRunId ? (
                      <div className="mb-2">
                        run_id:{' '}
                        <span className="font-mono text-[11px]">{lastRunId}</span>
                      </div>
                    ) : null}
                    <div>
                      payment_intent:{' '}
                      <span className="font-mono text-[11px]">{effectivePaymentIntent ?? '(none)'}</span>
                      {effectivePaymentIntent ? (
                        <>
                          <button
                            type="button"
                            onClick={() => void copyPaymentIntent(effectivePaymentIntent!)}
                            className="ml-2 inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-black/70 hover:bg-white"
                          >
                            {copied ? 'Copied' : 'Copy'}
                          </button>
                          <button
                            type="button"
                            onClick={() => openStripeDashboardSearch(effectivePaymentIntent!)}
                            className="ml-2 inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] font-semibold text-black/70 hover:bg-white"
                          >
                            Open in Stripe
                          </button>
                        </>
                      ) : null}
                    </div>
                    <div>
                      redirect_status:{' '}
                      <span className="font-mono text-[11px]">{stripeDebug.redirectStatus ?? '(none)'}</span>
                    </div>
                    {lastRedirectStatus && !stripeDebug.redirectStatus ? (
                      <div>
                        last_redirect_status:{' '}
                        <span className="font-mono text-[11px]">{lastRedirectStatus}</span>
                      </div>
                    ) : null}
                    <div>
                      client_secret (suffix):{' '}
                      <span className="font-mono text-[11px]">{stripeDebug.clientSecretSuffix ?? '(none)'}</span>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setClientSecret(null)
                          setStartError(null)
                          setLastIntent(null)
                          setLastRedirectStatus(null)
                          setLastDebugTs(null)
                          setLastRunId(null)
                          try {
                            localStorage.removeItem('lumelle_dev_last_payment_intent')
                            localStorage.removeItem('lumelle_dev_last_redirect_status')
                            localStorage.removeItem('lumelle_dev_last_stripe_debug_ts')
                            localStorage.removeItem('lumelle_dev_last_stripe_run_id')
                          } catch {
                            // ignore
                          }
                          navigate('/account/payments', { replace: true })
                        }}
                        className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold text-black/70 hover:bg-white"
                      >
                        Reset debug state
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="mt-8 rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-6">
              <p className="text-sm font-semibold text-semantic-text-primary">Payments status</p>
              <p className="mt-2 text-xs text-semantic-text-primary/60">
                Provider mode: <span className="font-mono text-[12px]">{capabilities.mode}</span>
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!canTest) return
                    setStartError(null)
                    setClientSecret(null)
                    void beginPayment({
                      amount: { amount: 1, currencyCode: 'GBP' },
                      reference: 'account.payments.test',
                      metadata: lastRunId ? { run_id: lastRunId } : undefined,
                      source: 'lumelle.account.payments.dev',
                    })
                      .then((start) => {
                        if (start.mode === 'embedded') {
                          setClientSecret(start.clientSecret)
                          return
                        }
                        if (start.mode === 'redirect') {
                          window.location.href = start.url
                          return
                        }
                        setStartError(start.reason)
                      })
                      .catch((err) => {
                        setStartError(err instanceof Error ? err.message : 'Payment failed.')
                      })
                  }}
                  disabled={!canTest || !stripePublishableKey}
                  className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  Create test payment (dev)
                </button>
              </div>
              <p className="mt-3 text-xs text-semantic-text-primary/60">
                This is a developer-only wiring check. It will stay disabled in production until payments are fully implemented.
                {!stripePublishableKey ? (
                  <span>
                    {' '}
                    Missing <span className="font-mono text-[12px]">VITE_STRIPE_PUBLISHABLE_KEY</span>.
                  </span>
                ) : null}
              </p>
              {startError ? <p className="mt-3 text-xs text-red-700">{startError}</p> : null}
            </div>

            {import.meta.env.DEV && clientSecret && stripePublishableKey ? (
              <StripeDevEmbeddedPaymentPanel publishableKey={stripePublishableKey} clientSecret={clientSecret} />
            ) : null}

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
