import { SectionHeading } from '@/components/SectionHeading'
import { useEffect, useRef, useState } from 'react'
import { HighlightsDots } from './HighlightsDots'

const bundles = [
  {
    name: 'Single',
    oldPrice: '£19.99',
    price: '£14.99',
    currencyLabel: 'GBP',
    perUnit: '',
    save: 'Best for trying',
    pill: 'Starter pick',
    description: 'Because it’s a small upgrade that makes your everyday routine easier.',
    href: '/product/shower-cap',
  },
  {
    name: 'Duo',
    oldPrice: '£39.98',
    price: '£26.99',
    currencyLabel: 'GBP',
    perUnit: '£13.49 / cap',
    save: 'Save 10%',
    pill: 'Popular',
    description: 'Grab one for you and a stylist partner, or rotate between showers.',
    href: '/product/shower-cap',
  },
  {
    name: 'Gift set',
    oldPrice: '£60.00',
    price: '£37.99',
    currencyLabel: 'GBP',
    perUnit: '£12.66 per cap + gift wrap',
    save: 'Give one to a friend',
    pill: 'Giftable',
    description: 'Trio gift: one for you, two for the people closest to you.',
    href: '/product/shower-cap',
  },
]

export const BundleCards = () => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>('[data-pack-card]')
      if (!card) return
      const cardWidth = card.offsetWidth + 16
      const idx = Math.round(el.scrollLeft / cardWidth)
      setActive(Math.max(0, Math.min(bundles.length - 1, idx)))
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
            <div ref={trackRef} className="no-scrollbar overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex snap-x gap-4">
                {bundles.map((b) => (
                  <a
                    key={b.name}
                    data-pack-card
                    href={b.href}
                    className="relative w-[90vw] max-w-[380px] shrink-0 snap-start rounded-3xl border border-brand-peach/30 bg-white p-7 text-left shadow-[0_14px_36px_rgba(0,0,0,0.07)]"
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cocoa/50">
                      <span>{b.save || '\u00A0'}</span>
                      {b.pill ? (
                        <span className="rounded-full bg-brand-blush/40 px-2 py-0.5 text-[10px] tracking-[0.24em] text-brand-cocoa/80">{b.pill}</span>
                      ) : (
                        <span />
                      )}
                    </div>
                    <div className="my-5 flex items-start justify-between gap-5">
                      <div className="flex-1">
                        <h3 className="font-heading text-3xl font-bold text-brand-cocoa leading-tight">{b.name}</h3>
                        <p className="mt-2 text-sm text-brand-cocoa/60">{b.description}</p>
                      </div>
                      <img src="/uploads/luminele/product-feature-05.jpg" alt={`${b.name} pack`} className="h-32 w-32 shrink-0 rounded-2xl border border-brand-blush/60 object-cover shadow-inner" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-3 text-brand-cocoa">
                      <span className="text-sm font-semibold text-brand-cocoa/50 line-through">{b.oldPrice}</span>
                      <p className="text-2xl font-semibold">{b.price}</p>
                      <span className="text-xs font-semibold tracking-[0.3em] text-brand-cocoa/70">{b.currencyLabel}</span>
                    </div>
                    {b.perUnit ? <p className="text-sm text-brand-cocoa/60">{b.perUnit}</p> : null}
                    <div className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-cocoa px-5 py-2 font-semibold text-white shadow-soft">
                      Buy Now
                    </div>
                  </a>
                ))}
              </div>
            </div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
        </div>
          <div className="mt-4 flex items-center justify-center">
            <HighlightsDots count={bundles.length} active={active} onSelect={goTo} />
          </div>
        </div>

        {/* Desktop: 3-up grid */}
        <div className="mt-10 hidden gap-4 md:grid md:grid-cols-3">
          {bundles.map((b) => (
            <a key={b.name} href={b.href} className="rounded-3xl border border-brand-peach/30 bg-white p-6 text-left shadow-[0_14px_36px_rgba(0,0,0,0.07)] transition hover:-translate-y-1 hover:shadow-lg">
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
                  <h3 className="font-heading text-3xl font-bold text-brand-cocoa">{b.name}</h3>
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
