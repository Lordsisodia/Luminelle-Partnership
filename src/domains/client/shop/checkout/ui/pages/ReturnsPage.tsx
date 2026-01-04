import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SUPPORT_EMAIL, WHATSAPP_SUPPORT_URL } from '@/config/constants'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'

const ReturnsPage = () => {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')

  const mailtoHref = useMemo(() => {
    const subject = `Return request${orderNumber.trim() ? ` — Order ${orderNumber.trim()}` : ''}`
    const lines = [
      'Hi Lumelle support,',
      '',
      'I would like to request a return.',
      '',
      `Order number: ${orderNumber.trim() || '(not sure)'}`,
      `Email used at checkout: ${email.trim() || '(not sure)'}`,
      `Reason: ${reason.trim() || '(not provided)'}`,
      '',
      'Please let me know the next steps and return address/label instructions.',
      '',
      'Thank you,',
    ]
    const body = lines.join('\n')
    return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [email, orderNumber, reason])

  return (
    <>
      <Seo
        title="Returns"
        description="Start a return or get help with an existing return request."
        url={toPublicUrl('/returns')}
        type="website"
      />
      <MarketingLayout navItems={[]} subtitle="Returns">
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>

        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Support</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-semantic-text-primary">Start a return</h1>
            <p className="mt-4 text-sm leading-relaxed text-semantic-text-primary/70">
              Need to send something back? Start here and we’ll guide you. For the full policy, see{' '}
              <Link to="/terms#returns" className="underline">
                Terms &amp; Conditions
              </Link>
              .
            </p>

            <div className="mt-8 space-y-4 rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
                Quick return request
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

                <label className="grid gap-1 text-sm font-semibold text-semantic-text-primary">
                  What’s the reason? (optional)
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Size/fit, changed mind, damaged item, etc."
                    className="min-h-[110px] rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm font-normal text-semantic-text-primary placeholder:text-semantic-text-primary/45"
                  />
                </label>
              </div>

              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                >
                  Email support to start return
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
                Tip: Including your order number helps us reply faster.
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

export default ReturnsPage
