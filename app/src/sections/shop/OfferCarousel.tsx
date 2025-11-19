import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

type Slide = { title: string; copy: string; image: string; ctaHref: string; tag?: string; proof?: string }

export const OfferCarousel = ({ slides }: { slides: Slide[] }) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const snapTimeout = useRef<number | null>(null)

  const goTo = useCallback(
    (i: number, behavior: ScrollBehavior = 'smooth') => {
      const el = trackRef.current
      if (!el) return
      const target = ((i % slides.length) + slides.length) % slides.length
      const cards = el.querySelectorAll<HTMLElement>('[data-benefit-card]')
      const card = cards[target]
      if (!card) return
      const offset = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2
      el.scrollTo({ left: Math.max(0, offset), behavior })
      setActive(target)
    },
    [slides.length]
  )

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const cardWidth = el.firstElementChild?.clientWidth ?? el.clientWidth
      const idx = Math.round(el.scrollLeft / (cardWidth + 16))
      setActive(Math.max(0, Math.min(slides.length - 1, idx)))

      if (snapTimeout.current) window.clearTimeout(snapTimeout.current)
      snapTimeout.current = window.setTimeout(() => goTo(idx, 'smooth'), 120)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [slides.length, goTo])

  const handlePrev = () => goTo(active - 1)
  const handleNext = () => goTo(active + 1)

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
      >
        <div className="flex gap-4 pr-4">
          {slides.map((s, i) => (
            <a
              key={i}
              href={s.ctaHref}
              data-benefit-card
              className="relative block w-[85%] shrink-0 snap-center snap-always overflow-hidden rounded-2xl border border-brand-blush/60 bg-white shadow-soft transition hover:-translate-y-1 sm:w-72 md:w-[calc(50%-0.5rem)]"
            >
              {s.tag ? (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-cocoa backdrop-blur">
                  {s.tag}
                </span>
              ) : null}
              <span className="absolute left-3 top-3 z-10 rounded-full bg-brand-cocoa/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                {s.title}
              </span>
              <img src={s.image} alt={s.title} className="block h-44 w-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
              <div className="p-4">
                <h3 className="font-heading text-xl text-brand-cocoa">{s.title}</h3>
                <p className="text-sm text-brand-cocoa/80">{s.copy}</p>
                {s.proof ? (
                  <p className="mt-3 flex items-center gap-2 text-xs text-brand-cocoa/70">
                    <Quote className="h-3.5 w-3.5 text-brand-peach" />
                    {s.proof}
                  </p>
                ) : null}
                <span className="mt-3 inline-flex items-center text-sm font-semibold text-brand-peach">
                  Shop now →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3 text-brand-cocoa/70">
        <button
          type="button"
          onClick={handlePrev}
          className="inline-flex items-center gap-1 rounded-full border border-brand-cocoa/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-cocoa/80 transition hover:border-brand-cocoa hover:text-brand-cocoa"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>
        <div className="flex items-center gap-1">
          {slides.map((slide, i) => (
            <span
              key={slide.title}
              className={`h-2 w-2 rounded-full transition ${i === active ? 'bg-brand-cocoa' : 'bg-brand-cocoa/30'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-1 rounded-full border border-brand-cocoa/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-cocoa/80 transition hover:border-brand-cocoa hover:text-brand-cocoa"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        Showing benefit slide {active + 1} of {slides.length}
      </span>
    </div>
  )
}
