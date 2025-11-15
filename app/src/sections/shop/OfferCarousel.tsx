import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

type Slide = { title: string; copy: string; image: string; ctaHref: string; tag?: string; proof?: string }

export const OfferCarousel = ({ slides }: { slides: Slide[] }) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const cardWidth = el.firstElementChild?.clientWidth ?? el.clientWidth
      const idx = Math.round(el.scrollLeft / (cardWidth + 16))
      setActive(Math.max(0, Math.min(slides.length - 1, idx)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [slides.length])

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const target = ((i % slides.length) + slides.length) % slides.length
    const cards = el.querySelectorAll<HTMLElement>('[data-benefit-card]')
    const card = cards[target]
    if (!card) return
    const offset = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2
    el.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' })
    setActive(target)
  }

  const handlePrev = () => goTo(active - 1)
  const handleNext = () => goTo(active + 1)

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex snap-x snap-mandatory gap-4 pr-4">
          {slides.map((s, i) => (
            <a
              key={i}
              href={s.ctaHref}
              data-benefit-card
              className="relative block w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-brand-blush/60 bg-white shadow-soft transition hover:-translate-y-1 sm:w-72 md:w-[calc(50%-0.5rem)]"
            >
              {s.tag ? (
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa">
                  {s.tag}
                </span>
              ) : null}
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
      <div className="mt-4 flex flex-col items-center gap-3 text-brand-cocoa/70">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              aria-label={`Go to ${slide.title}`}
              onClick={() => goTo(i)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] transition ${
                i === active
                  ? 'border-brand-cocoa bg-brand-cocoa text-white'
                  : 'border-brand-cocoa/30 text-brand-cocoa/70 hover:border-brand-cocoa/60'
              }`}
            >
              {slide.title}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center gap-1 rounded-full border border-brand-cocoa/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-cocoa/80 transition hover:border-brand-cocoa hover:text-brand-cocoa"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1 rounded-full border border-brand-cocoa/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-cocoa/80 transition hover:border-brand-cocoa hover:text-brand-cocoa"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        Showing benefit slide {active + 1} of {slides.length}
      </span>
    </div>
  )
}
