import { useEffect, useRef, useState } from 'react'
import { HighlightsDots } from './HighlightsDots'
import { SectionHeading } from '@/components/SectionHeading'

type Step = { n: string; title: string; desc: string }

const defaultSteps: Step[] = [
  { n: '01', title: 'Protect', desc: 'Slip on before showers to shield styles.' },
  { n: '02', title: 'Rinse', desc: 'After use, rinse and air‑dry; stays fresh.' },
  { n: '03', title: 'Repeat', desc: 'Reusable comfort you’ll reach for daily.' },
]

export const StepsCarousel = ({ steps = defaultSteps }: { steps?: Step[] }) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>('[data-step-card]')
      if (!card) return
      const cardWidth = card.offsetWidth + 12
      const idx = Math.round(el.scrollLeft / cardWidth)
      setActive(Math.max(0, Math.min(steps.length - 1, idx)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [steps.length])

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-step-card]')
    const cardWidth = (card?.offsetWidth || 280) + 12
    el.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
  }

  return (
    <section className="bg-brand-blush/20 py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Three simple steps"
          description="Protect your style, rinse, and repeat — no fuss."
          alignment="center"
        />
        <div className="mt-6 flex items-center justify-center">
          <div ref={trackRef} className="no-scrollbar w-full overflow-x-auto md:overflow-visible">
            <div className="flex snap-x gap-3 md:grid md:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  data-step-card
                  className="h-[150px] w-[72vw] max-w-[320px] shrink-0 snap-start rounded-2xl border border-brand-peach/40 bg-white p-4 text-center md:h-[160px] md:w-auto"
                >
                  <div className="inline-flex items-center justify-center rounded-full bg-brand-peach/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/70">
                    {s.n}
                  </div>
                  <h3 className="mt-3 font-heading text-lg text-brand-cocoa">{s.title}</h3>
                  <p className="mt-1 text-sm text-brand-cocoa/75">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <HighlightsDots count={steps.length} active={active} onSelect={goTo} />
        </div>
      </div>
    </section>
  )
}
