import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HighlightsDots } from './HighlightsDots'

type Item = {
  src: string
  alt?: string
  title?: string
  description?: string
  badge?: string
  objectPosition?: string
}

export const HighlightsCarousel = ({ items }: { items: Item[] }) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>('[data-card]')
      if (!card) return
      const cardWidth = card.offsetWidth + 12 // include gap
      const idx = Math.round(el.scrollLeft / cardWidth)
      setActive(Math.max(0, Math.min(items.length - 1, idx)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [items.length])

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const cardWidth = (card?.offsetWidth || 320) + 12
    el.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
  }

  return (
    <div className="w-full">
      <div className="relative">
        <div ref={trackRef} className="no-scrollbar overflow-x-auto pb-4">
          <div className="flex snap-x gap-4 px-2">
            {items.map((it, i) => (
              <figure
                key={i}
                data-card
                className="relative w-[92vw] max-w-[640px] shrink-0 snap-start overflow-hidden rounded-[34px] border border-brand-blush/70 shadow-xl shadow-brand-blush/20 md:w-[680px]"
              >
                <img
                  src={it.src}
                  alt={it.alt || 'Lumelle highlight'}
                  className="h-[58vh] w-full object-cover md:h-[48vh]"
                  style={{ objectPosition: it.objectPosition || 'center center' }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                <figcaption className="absolute inset-0 flex flex-col justify-end px-5 pb-6">
                  <div className="max-w-sm rounded-3xl bg-white/85 px-6 py-5 text-brand-cocoa shadow-lg backdrop-blur">
                    {it.badge ? (
                      <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-brand-cocoa/70">{it.badge}</span>
                    ) : null}
                    <p className="mt-2 text-2xl font-serif leading-snug">{it.title || 'Luxe detail'}</p>
                    {it.description ? (
                      <p className="mt-3 text-sm text-brand-cocoa/80">{it.description}</p>
                    ) : null}
                  </div>
                </figcaption>
              </figure>
            ))}
            {/* right-edge peek fade */}
          </div>
        </div>
        <button
          type="button"
          aria-label="Show previous highlight"
          onClick={() => goTo(Math.max(active - 1, 0))}
          className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-3 text-brand-cocoa shadow-lg backdrop-blur md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Show next highlight"
          onClick={() => goTo(Math.min(active + 1, items.length - 1))}
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/85 p-3 text-brand-cocoa shadow-lg backdrop-blur md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <HighlightsDots count={items.length} active={active} onSelect={goTo} />
    </div>
  )
}
