import { useMemo } from 'react'
import { heroContent, heroSpotlightSlides, metricBadges } from '@/content/landing'

type HeroSectionProps = {
  onPrimaryAction: () => void
  onSecondaryAction: () => void
}

export const HeroSection = ({
  onPrimaryAction,
  onSecondaryAction,
}: HeroSectionProps) => {
  // Force a single-slide experience (no auto-advance) per client request
  const slides = useMemo(() => heroSpotlightSlides.slice(0, 1), [])
  const activeSlide = 0

  const currentSlide = slides[activeSlide]

  return (
    <section
      id="hero"
      className="relative overflow-hidden scroll-mt-24 bg-semantic-legacy-brand-blush/10 pb-20 pt-24 text-semantic-text-primary md:scroll-mt-32 md:pb-24 md:pt-32"
    >
        <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.backgroundSrc}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-contain object-center md:object-cover transition-opacity duration-700 ${
                  index === activeSlide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
        <div className="absolute inset-0 bg-semantic-legacy-brand-cocoa/20 md:bg-semantic-legacy-brand-cocoa/50 backdrop-blur-[2px]" />
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-semantic-accent-cta px-8 py-3 text-sm font-semibold text-semantic-text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-semantic-accent-cta/90"
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
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
                  {metric.label}
                </p>
                <p className="mt-2 font-heading text-2xl text-semantic-text-primary">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-semantic-text-primary/70">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full rounded-[2.5rem] border border-white/40 bg-white/90 p-6 text-left shadow-soft backdrop-blur md:max-w-3xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              {currentSlide.imageSrc ? (
                <div className="relative h-32 w-full overflow-hidden rounded-2xl border border-semantic-accent-cta/40 bg-semantic-legacy-brand-blush/30 md:h-40 md:w-56">
                  <img
                    src={currentSlide.imageSrc}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain object-center"
                  />
                  <div className="absolute inset-0 bg-semantic-legacy-brand-cocoa/15 backdrop-blur-[1px]" />
                </div>
              ) : null}
              <div className="flex-1 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-semantic-text-primary/60">
                  {currentSlide.label}
                </p>
                <p className="font-heading text-2xl text-semantic-text-primary">
                  {currentSlide.title}
                </p>
                <p className="text-sm text-semantic-text-primary/70">
                  {currentSlide.description}
                </p>
              </div>
            </div>
            {/* No pagination/next controls when only one slide */}
          </div>
        </div>
      </div>
    </section>
  )
}
