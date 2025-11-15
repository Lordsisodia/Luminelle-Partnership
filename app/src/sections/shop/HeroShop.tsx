import { useEffect, useState } from 'react'
import { Truck, RotateCcw, Lock, Play } from 'lucide-react'

type Props = {
  config: {
    headline: string
    subhead: string
    ctaLabel: string
    ctaHref: string
    offerChip?: string
    image: string
    bgImage?: string
    gallery?: string[]
    objectPosition?: string
    pill?: string
  }
}

export const HeroShop = ({ config }: Props) => {
  const slides = config.gallery && config.gallery.length > 0 ? config.gallery : [config.image]
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [slides.length])

  // controls removed; retain auto-advance only

  return (
    <section className="relative min-h-[78vh] md:min-h-[74vh] overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 flex transition-transform duration-700"
          style={{ transform: `translateX(-${active * 100}%)`, width: `${slides.length * 100}%` }}
          aria-hidden="true"
        >
          {slides.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt=""
              className="h-full w-full flex-[0_0_100%] scale-110 object-cover brightness-90 blur-[1px]"
              style={{ objectPosition: config.objectPosition || 'center center' }}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-white/40" />
      </div>
      <div className="absolute inset-0 z-10">
        <div className="grid h-full place-items-center px-4 pt-20 pb-16 text-center md:px-6">
          <div className="max-w-2xl">
            {config.pill ? (
              <span className="inline-flex rounded-full bg-brand-blush/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa/70">
                {config.pill}
              </span>
            ) : null}
            <h1 className="mt-4 font-heading text-4xl leading-tight text-brand-cocoa md:text-5xl lg:text-6xl">
              {config.headline}
            </h1>
            <p className="mt-4 text-base text-brand-cocoa/80 md:text-lg">
              {config.subhead}
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={config.ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-brand-cocoa px-7 py-3 text-base font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                {config.ctaLabel}
              </a>
              <a
                href="#closer-look"
                className="inline-flex items-center justify-center rounded-full border border-brand-cocoa/30 px-6 py-3 text-base font-semibold text-brand-cocoa/80"
              >
                <Play className="mr-2 h-4 w-4" /> Watch demo
              </a>
            </div>
            {config.offerChip ? (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-peach/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/70">
                {config.offerChip}
              </div>
            ) : null}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/70">
              <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4" /> Fast shipping</span>
              <span className="inline-flex items-center gap-2"><RotateCcw className="h-4 w-4" /> Easy returns</span>
              <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4" /> Secure checkout</span>
            </div>
          </div>
        </div>
        <span className="sr-only" aria-live="polite">
          Showing hero slide {active + 1} of {slides.length}
        </span>
      </div>
    </section>
  )
}
