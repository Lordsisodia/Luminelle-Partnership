import { useEffect, useMemo, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { SectionHeading } from '@ui/components/SectionHeading'
import { cdnUrl } from '@/lib/utils/cdn'

type Slide = {
  title: string
  copy: string
  image: string
  ctaHref: string
  tag?: string
  proof?: string
}

const clampIndex = (value: number, max: number) => Math.max(0, Math.min(max, value))

export const BenefitsSection = ({ slides = [] }: { slides?: Slide[] }) => {
  const resolvedSlides = useMemo(() => slides.filter((s) => s && s.title && s.copy && s.image), [slides])
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(0)
  }, [resolvedSlides.length])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let raf = 0

    const updateActive = () => {
      const children = Array.from(track.children) as HTMLElement[]
      if (children.length === 0) return

      const center = track.scrollLeft + track.clientWidth / 2
      let bestIdx = 0
      let bestDist = Number.POSITIVE_INFINITY

      children.forEach((child, idx) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2
        const dist = Math.abs(center - childCenter)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = idx
        }
      })

      setActive((prev) => (prev === bestIdx ? prev : bestIdx))
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(updateActive)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    updateActive()

    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [resolvedSlides.length])

  const scrollToSlide = (idx: number) => {
    const clamped = clampIndex(idx, resolvedSlides.length - 1)
    const track = trackRef.current
    if (!track) return
    const el = track.querySelector(`[data-slide-index="${clamped}"]`) as HTMLElement | null
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    setActive(clamped)
  }

  if (resolvedSlides.length === 0) return null

  return (
    <section className="bg-white py-12 md:py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Why you’ll love it"
          title="Effortless to put on, frizz-free when you take it off"
          description="Your small daily luxury — designed to seal out steam and keep styles smooth."
          alignment="center"
        />

        <div className="mt-8 flex items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
            Swipe
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollToSlide(active - 1)}
              disabled={active <= 0}
              className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-4 py-2 text-sm font-semibold text-semantic-text-primary disabled:opacity-50"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => scrollToSlide(active + 1)}
              disabled={active >= resolvedSlides.length - 1}
              className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-4 py-2 text-sm font-semibold text-semantic-text-primary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-4 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        >
          {resolvedSlides.map((slide, idx) => {
            const href = slide.ctaHref || '/product/lumelle-shower-cap'
            const isInternal = href.startsWith('/')
            const imageSrc = encodeURI(cdnUrl(slide.image))
            let cta
            if (isInternal) {
              cta = (
                <RouterLink
                  to={href}
                  className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-cocoa bg-white px-5 py-2.5 text-sm font-semibold text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-blush/20"
                >
                  Shop now
                </RouterLink>
              )
            } else {
              cta = (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-cocoa bg-white px-5 py-2.5 text-sm font-semibold text-semantic-text-primary transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-blush/20"
                >
                  Shop now
                </a>
              )
            }

            return (
              <article
                key={`${slide.title}-${idx}`}
                data-slide-index={idx}
                className="snap-start w-[82%] flex-shrink-0 rounded-[2.25rem] border border-semantic-legacy-brand-blush/60 bg-white p-4 shadow-soft md:w-[360px]"
              >
                <div className="relative overflow-hidden rounded-3xl bg-semantic-legacy-brand-blush/15">
                  <img
                    src={imageSrc}
                    alt={slide.title}
                    className="h-52 w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {slide.tag ? (
                    <div className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-semantic-text-primary shadow-soft backdrop-blur">
                      {slide.tag}
                    </div>
                  ) : null}
                </div>

                <div className="mt-4 space-y-2 text-semantic-text-primary">
                  <h3 className="font-heading text-xl font-bold leading-snug">{slide.title}</h3>
                  <p className="text-sm leading-relaxed text-semantic-text-primary/75">{slide.copy}</p>
                  {slide.proof ? <p className="text-xs text-semantic-text-primary/60">{slide.proof}</p> : null}
                </div>

                <div className="mt-4">{cta}</div>
              </article>
            )
          })}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {resolvedSlides.map((slide, idx) => (
            <button
              key={`${slide.title}-dot-${idx}`}
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-current={idx === active ? 'true' : undefined}
              onClick={() => scrollToSlide(idx)}
              className={`h-1 rounded-full transition-all ${
                idx === active ? 'w-6 bg-semantic-legacy-brand-cocoa' : 'w-1 bg-semantic-legacy-brand-cocoa/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
