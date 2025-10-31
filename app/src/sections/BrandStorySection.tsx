import { useEffect, useMemo, useState } from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { storyCards } from '@/content/landing'

export const BrandStorySection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const slides = useMemo(() => storyCards, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <section
      id="story"
      className="scroll-mt-24 bg-brand-blush/15 py-20 text-brand-cocoa md:scroll-mt-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Brand Story"
          title="Why creators choose Lumelle"
          description="Combine luxury aesthetics with proven conversion tactics—every detail is crafted to help you stand out and sell out."
          alignment="center"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-start">
          <div className="relative min-h-[32rem] overflow-hidden rounded-[2.5rem] border border-brand-peach/40 bg-white shadow-soft">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex
              return (
                <article
                  key={slide.title}
                  className={`absolute inset-0 flex h-full w-full flex-col justify-between transition-opacity duration-700 ${
                    isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  <figure className="relative h-72 w-full overflow-hidden rounded-[2.5rem]">
                    <img
                      src={slide.imageSrc}
                      alt={slide.mediaAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa">
                      {slide.mediaAlt}
                    </figcaption>
                  </figure>
                  <div className="space-y-4 p-8">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/50">
                      {slide.title}
                    </span>
                    <h3 className="font-heading text-3xl">{slide.headline}</h3>
                    <p className="text-base text-brand-cocoa/75">{slide.body}</p>
                  </div>
                </article>
              )
            })}
            <div className="pointer-events-none absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  onClick={() => goToSlide(index)}
                  className={`pointer-events-auto h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? 'w-8 bg-brand-cocoa'
                      : 'w-2.5 bg-brand-cocoa/30 hover:bg-brand-cocoa/70'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-brand-peach/30 bg-white/90 p-6 shadow-inner lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">
              Explore the story
            </p>
            <div className="mt-4 space-y-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  onClick={() => goToSlide(index)}
                  type="button"
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    index === activeIndex
                      ? 'border-brand-peach bg-brand-peach/20 text-brand-cocoa'
                      : 'border-transparent bg-brand-blush/20 text-brand-cocoa/70 hover:border-brand-peach/40'
                  }`}
                >
                  <span className="block text-sm font-semibold">{slide.headline}</span>
                  <span className="text-xs uppercase tracking-[0.28em] text-brand-cocoa/60">
                    {slide.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
