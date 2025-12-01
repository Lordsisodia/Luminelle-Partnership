import { SectionHeading } from '@/components/SectionHeading'
import { useEffect, useRef, useState } from 'react'
import { HighlightsDots } from './HighlightsDots'

const bundles = [
  {
    name: 'Single',
    oldPrice: '£19.99',
    price: '£15.00',
    currencyLabel: 'GBP',
    perUnit: 'Now £15 / cap',
    save: '',
    pill: '',
    description: 'One cap to keep every wash day camera-ready.',
    href: '/product/shower-cap',
  },
  {
    name: 'Duo',
    oldPrice: '£39.98',
    price: '£27.00',
    currencyLabel: 'GBP',
    perUnit: '£13.50 / cap',
    save: 'Save 10%',
    pill: 'Popular',
    description: 'Grab one for you and a stylist partner, or rotate between showers.',
    href: '/product/shower-cap',
  },
  {
    name: 'Gift set',
    oldPrice: '£59.97',
    price: '£45.00',
    currencyLabel: 'GBP',
    perUnit: '£15 / cap + gift wrap',
    save: 'Give one to a friend',
    pill: 'Giftable',
    description: 'Packaged for gifting with designer wrap and handwritten note.',
    href: '/product/shower-cap',
  },
]

export const BundleCards = () => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>('[data-pack-card]')
      if (!card) return
      const cardWidth = card.offsetWidth + 16
      const idx = Math.round(el.scrollLeft / cardWidth)
      setActive(Math.max(0, Math.min(bundles.length - 1, idx)))
      const max = el.scrollWidth - el.clientWidth
      setProgress(max <= 0 ? 1 : Math.min(Math.max(el.scrollLeft / max, 0), 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-pack-card]')
    const cardWidth = (card?.offsetWidth || 300) + 16
    el.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Bundles & Savings"
          title="Choose your pack"
          description="One for you, one for a friend—or stock up and save on the duo."
          alignment="center"
        />

        {/* Mobile: horizontal scroll with dots */}
        <div className="mt-8 md:hidden">
          <div className="mb-4 flex gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">
            {bundles.map((b, idx) => (
              <button
                key={b.name}
                onClick={() => goTo(idx)}
                className={`rounded-full px-4 py-1 tracking-[0.3em] transition ${idx === active ? 'bg-brand-cocoa text-white' : 'bg-brand-blush/40 text-brand-cocoa/70'}`}
              >
                {b.name}
              </button>
            ))}
          </div>
          <div className="relative">
            <div ref={trackRef} className="no-scrollbar overflow-x-auto pb-4">
              <div className="flex snap-x gap-4">
                {bundles.map((b) => (
                  <a
                    key={b.name}
                    data-pack-card
                    href={b.href}
                    className="relative w-[82vw] max-w-[340px] shrink-0 snap-start rounded-3xl border border-brand-peach/50 bg-white/90 p-6 text-left shadow-soft"
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cocoa/50">
                      <span>{b.save || '\u00A0'}</span>
                      {b.pill ? (
                        <span className="rounded-full bg-brand-blush/40 px-2 py-0.5 text-[10px] tracking-[0.24em] text-brand-cocoa/80">{b.pill}</span>
                      ) : (
                        <span />
                      )}
                    </div>
                    <div className="my-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-2xl text-brand-cocoa">{b.name}</h3>
                        <p className="text-sm text-brand-cocoa/60">{b.description}</p>
                      </div>
                      <img src="/uploads/luminele/product-feature-05.jpg" alt={`${b.name} pack`} className="h-24 w-24 rounded-2xl border border-brand-blush/60 object-cover shadow-inner" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-3 text-brand-cocoa">
                      <span className="text-sm font-semibold text-brand-cocoa/50 line-through">{b.oldPrice}</span>
                      <p className="text-2xl font-semibold">{b.price}</p>
                      <span className="text-xs font-semibold tracking-[0.3em] text-brand-cocoa/70">{b.currencyLabel}</span>
                    </div>
                    <p className="text-sm text-brand-cocoa/60">{b.perUnit}</p>
                    <div className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-cocoa px-5 py-2 font-semibold text-white shadow-soft">
                      Buy Now
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="h-1 w-24 rounded-full bg-brand-blush/50">
              <div className="h-1 rounded-full bg-brand-cocoa transition-all" style={{ width: `${Math.max(progress, 0.06) * 100}%` }} />
            </div>
            <HighlightsDots count={bundles.length} active={active} onSelect={goTo} />
          </div>
        </div>

        {/* Desktop: 3-up grid */}
        <div className="mt-10 hidden gap-4 md:grid md:grid-cols-3">
          {bundles.map((b) => (
            <a key={b.name} href={b.href} className="rounded-3xl border border-brand-peach/50 bg-white/95 p-6 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cocoa/50">
                <span>{b.save || '\u00A0'}</span>
                {b.pill ? (
                  <span className="rounded-full bg-brand-blush/40 px-2 py-0.5 text-[10px] tracking-[0.24em] text-brand-cocoa/80">{b.pill}</span>
                ) : (
                  <span />
                )}
              </div>
              <div className="my-5 flex items-center gap-6">
                <img src="/uploads/luminele/product-feature-05.jpg" alt={`${b.name} pack`} className="h-28 w-28 rounded-2xl border border-brand-blush/60 object-cover shadow-inner" />
                <div>
                  <h3 className="font-heading text-3xl text-brand-cocoa">{b.name}</h3>
                  <p className="mt-1 text-sm text-brand-cocoa/70">{b.description}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold text-brand-cocoa">{b.price}</p>
                <span className="text-xs font-semibold tracking-[0.3em] text-brand-cocoa/70">{b.currencyLabel}</span>
              </div>
              <p className="text-sm text-brand-cocoa/60">{b.perUnit}</p>
              <div className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-cocoa px-5 py-2 font-semibold text-white shadow-soft">
                Buy Now
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
