import { useEffect, useMemo, useState } from 'react'
import {
  heroContent,
  heroSpotlightSlides,
  metricBadges,
} from '@/content/landing'

type HeroSectionProps = {
  onPrimaryAction: () => void
  onSecondaryAction: () => void
}

export const HeroSection = ({
  onPrimaryAction,
  onSecondaryAction,
}: HeroSectionProps) => {
  const slides = useMemo(() => heroSpotlightSlides, [])
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 7000)

    return () => window.clearInterval(id)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setActiveSlide(index)
  }

  const currentSlide = slides[activeSlide]

  return (
    <section
      id="hero"
      className="relative overflow-hidden scroll-mt-24 bg-brand-blush/10 pb-20 pt-24 text-brand-cocoa md:scroll-mt-32 md:pb-24 md:pt-32"
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.backgroundSrc}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-brand-cocoa/55 backdrop-blur-sm" />
      </div>
      <div className="relative">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 text-center md:items-start md:px-6 md:text-left">
          <span className="inline-flex rounded-full bg-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/80 backdrop-blur">
            {heroContent.eyebrow}
          </span>
          <h1 className="font-heading text-4xl leading-tight text-white md:text-5xl">
            {heroContent.headline}
          </h1>
          <p className="max-w-2xl text-lg text-white/80 md:text-xl">
            {heroContent.subheadline}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-peach px-8 py-3 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-peach/90"
            >
              {heroContent.primaryCta}
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white/80 transition hover:border-white hover:text-white"
            >
              {heroContent.secondaryCta}
            </button>
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-3">
            {metricBadges.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-white/40 bg-white/85 px-4 py-5 text-center shadow-soft backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">
                  {metric.label}
                </p>
                <p className="mt-2 font-heading text-2xl text-brand-cocoa">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-brand-cocoa/70">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full rounded-[2.5rem] border border-white/40 bg-white/90 p-6 text-left shadow-soft backdrop-blur md:max-w-3xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              {currentSlide.imageSrc ? (
                <div className="relative h-28 w-full overflow-hidden rounded-2xl border border-brand-peach/40 bg-brand-blush/30 md:h-32 md:w-40">
                  <img
                    src={currentSlide.imageSrc}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-cocoa/20 backdrop-blur-sm" />
                </div>
              ) : null}
              <div className="flex-1 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">
                  {currentSlide.label}
                </p>
                <p className="font-heading text-2xl text-brand-cocoa">
                  {currentSlide.title}
                </p>
                <p className="text-sm text-brand-cocoa/70">
                  {currentSlide.description}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Show spotlight ${slide.title}`}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeSlide
                        ? 'w-8 bg-brand-cocoa'
                        : 'w-2.5 bg-brand-cocoa/30 hover:bg-brand-cocoa/70'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => goToSlide((activeSlide + 1) % slides.length)}
                className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/70 transition hover:text-brand-cocoa"
              >
                Next highlight →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
