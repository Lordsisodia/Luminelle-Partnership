import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { heroContent, heroSpotlightSlides, metricBadges } from '@/content/landing'
import { useCountUpAnimation } from '@/domains/shared/hooks/useCountUpAnimation'
import { AnimatedSection, itemVariants } from '@/ui/components/AnimatedSection'

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

  // Swipe gesture state for spotlight card
  const touchStartX = useRef<number>(0)

  // Parse metric values for count-up animation
  // Extracts numeric value from strings like "20%" or "48 hrs"
  const parseMetricValue = (value: string): { number: number; suffix: string } => {
    const match = value.match(/^([\d.]+)(\D*)$/)
    if (match) {
      return { number: parseFloat(match[1]), suffix: match[2] }
    }
    return { number: 0, suffix: value }
  }

  // Animate each metric badge value
  const metric0Value = parseMetricValue(metricBadges[0]?.value ?? '0')
  const metric1Value = parseMetricValue(metricBadges[1]?.value ?? '0')
  const metric2Value = parseMetricValue(metricBadges[2]?.value ?? '0')

  const { displayValue: displayMetric0, elementRef: ref0 } = useCountUpAnimation(metric0Value.number)
  const { displayValue: displayMetric1, elementRef: ref1 } = useCountUpAnimation(metric1Value.number)
  const { displayValue: displayMetric2, elementRef: ref2 } = useCountUpAnimation(metric2Value.number)

  return (
    <section
      id="hero"
      className="relative overflow-hidden scroll-mt-24 bg-semantic-legacy-brand-blush/10 pb-20 pt-24 text-semantic-text-primary md:scroll-mt-32 md:pb-24 md:pt-32"
    >
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <picture
              key={slide.id}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source media="(min-width: 1024px)" srcSet={slide.backgroundSrcDesktop ?? slide.backgroundSrc} />
              <img
                src={slide.backgroundSrc}
                alt=""
                aria-hidden="true"
                className="h-full w-full max-w-[1800px] object-cover object-center md:h-auto md:w-full md:object-contain md:object-center"
              />
            </picture>
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/35 via-white/10 to-white/0 md:from-semantic-legacy-brand-blush/18 md:via-white/8" />
      </div>
      <div className="relative">
        <AnimatedSection className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 text-center md:items-start md:px-6 md:text-left">
          <motion.span variants={itemVariants} className="inline-flex rounded-full bg-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/80 backdrop-blur">
            {heroContent.eyebrow}
          </motion.span>
          <motion.h1 variants={itemVariants} className="font-heading text-4xl leading-tight text-white md:text-5xl">
            {heroContent.headline}
          </motion.h1>
          <motion.p variants={itemVariants} className="max-w-2xl text-lg text-white/80 md:text-xl">
            {heroContent.subheadline}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full bg-semantic-accent-cta px-8 py-3 text-sm font-semibold text-semantic-text-primary shadow-soft transition-transform duration-100 md:hover:-translate-y-0.5 md:hover:bg-semantic-accent-cta/90 active:scale-95"
            >
              {heroContent.primaryCta}
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white/80 transition-transform duration-100 md:hover:border-white md:hover:text-white active:scale-95"
            >
              {heroContent.secondaryCta}
            </button>
          </motion.div>
          <motion.div variants={itemVariants} className="grid w-full gap-4 sm:grid-cols-3">
            {metricBadges.map((metric, index) => {
              const refs = [ref0, ref1, ref2]
              const displayValues = [displayMetric0, displayMetric1, displayMetric2]
              const metricValues = [metric0Value, metric1Value, metric2Value]
              const ref = refs[index]
              const displayValue = displayValues[index]
              const { suffix } = metricValues[index]

              return (
                <div
                  key={metric.label}
                  ref={ref}
                  className="rounded-3xl border border-white/40 bg-white/85 px-4 py-5 text-center shadow-soft backdrop-blur transition-all duration-300 md:hover:scale-105 md:hover:shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
                    {metric.label}
                  </p>
                  <p className="mt-2 font-heading text-2xl text-semantic-text-primary">
                    {displayValue > 0 ? `${Math.floor(displayValue)}${suffix}` : metric.value}
                  </p>
                  <p className="mt-1 text-sm text-semantic-text-primary/70">
                    {metric.description}
                  </p>
                </div>
              )
            })}
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="w-full cursor-pointer rounded-[2.5rem] border border-white/40 bg-white/90 p-6 shadow-soft backdrop-blur md:max-w-3xl"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX
            }}
            onTouchEnd={(e) => {
              const diff = e.changedTouches[0].clientX - touchStartX.current
              if (Math.abs(diff) > 50) {
                onSecondaryAction()
              }
            }}
          >
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
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
