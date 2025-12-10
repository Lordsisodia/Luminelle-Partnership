import { useState } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { setMetaTags, injectJsonLd } from '@/lib/seo'
import { useEffect } from 'react'

export const ReturnsPage = () => {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  useEffect(() => {
    const url = 'https://lumelle.com/returns'
    setMetaTags({
      title: 'Returns & 30-day Luxe Guarantee | Lumelle',
      description: 'Start a return or exchange within 30 days. Free return shipping and easy labels.',
      url,
      type: 'website',
    })
    injectJsonLd('returns-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumelle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Returns', item: url },
      ],
    })
  }, [])

  return (
    <MarketingLayout navItems={[]} subtitle="Returns">
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="font-heading text-3xl text-brand-cocoa">Start a return</h1>
          <p className="mt-2 text-brand-cocoa/70">We offer a 30-day Luxe Guarantee. Tell us about your order and we’ll send a prepaid label.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-brand-blush/60 bg-white p-5 shadow-soft">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Order ID</label>
              <input required className="mt-1 w-full rounded-xl border border-brand-blush/60 px-3 py-2 text-sm" placeholder="LUM-ABC123" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Email</label>
              <input type="email" required className="mt-1 w-full rounded-xl border border-brand-blush/60 px-3 py-2 text-sm" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Reason</label>
              <select className="mt-1 w-full rounded-xl border border-brand-blush/60 px-3 py-2 text-sm">
                <option>Didn’t fit</option>
                <option>Changed mind</option>
                <option>Arrived damaged</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Notes</label>
              <textarea className="mt-1 w-full rounded-xl border border-brand-blush/60 px-3 py-2 text-sm" rows={3} placeholder="Optional"></textarea>
            </div>
            <button className="w-full rounded-full bg-brand-cocoa px-5 py-3 text-sm font-semibold text-white">Request return label</button>
          </form>
          {submitted ? (
            <div className="mt-4 rounded-2xl border border-brand-peach/40 bg-brand-peach/10 p-4 text-sm text-brand-cocoa">
              Thanks! We’ll email your shipping label and steps within a few minutes.
            </div>
          ) : null}
        </div>
      </section>
    </MarketingLayout>
  )
}

export default ReturnsPage
