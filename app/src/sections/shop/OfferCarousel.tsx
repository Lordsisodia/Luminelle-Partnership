import { useCallback, useEffect, useRef, useState } from 'react'
import { Quote } from 'lucide-react'

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

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory md:mx-0 md:px-0"
      >
        <div className="flex gap-4 pr-4">
          {slides.map((s, i) => (
            <a
              key={i}
              href={s.ctaHref}
              data-benefit-card
              className="relative block w-[88%] shrink-0 snap-center snap-always overflow-visible sm:w-[75%] md:w-[48%]"
            >
              <img
                src={s.image}
                alt={s.title}
                className="block h-80 w-full overflow-hidden rounded-3xl object-cover shadow-soft sm:h-96"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="px-1 pt-3 text-brand-cocoa">
                <h3 className="font-heading text-xl font-bold leading-tight text-brand-cocoa">{s.title}</h3>
                <p className="mt-1 text-sm text-brand-cocoa/80">{s.copy}</p>
                {s.proof ? (
                  <p className="mt-3 flex items-center gap-2 text-xs text-brand-cocoa/70">
                    <Quote className="h-3.5 w-3.5 text-brand-peach" />
                    {s.proof}
                  </p>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-brand-cocoa/80">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition ${i === active ? 'bg-brand-cocoa' : 'bg-brand-cocoa/30'}`}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        Showing benefit slide {active + 1} of {slides.length}
      </span>
    </div>
  )
}
