import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { cdnUrl } from '@/lib/utils/cdn'

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
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
    pill?: string
  }
}

export const HeroShop = ({ config }: Props) => {
  const baseSlides = config.gallery && config.gallery.length > 0 ? config.gallery.slice(0, 1) : [config.image]
  const slides = baseSlides.map((s) => encodeURI(cdnUrl(s)))
  const [active, setActive] = useState(0)
  type SourceSets = { avif: string; webp: string; sizes: string } | null
  // Use the single hero asset; we don't ship resized AVIF/WEBP variants for this image.
  const buildSources = (_src: string): SourceSets => null

  useEffect(() => {
    // no auto-advance when single slide
    if (slides.length <= 1) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [slides.length])

  // controls removed; retain auto-advance only

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-white md:min-h-[76vh]">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 flex transition-transform duration-700"
          style={{ transform: `translateX(-${active * 100}%)`, width: `${slides.length * 100}%` }}
          aria-hidden="true"
        >
          {slides.map((src, idx) => {
            const sources = buildSources(src)
            const imgEl = (
              <img
                key={`${src}-${idx}`}
                src={src}
                alt=""
                className="h-full w-full flex-[0_0_100%] brightness-95 object-cover scale-[1.08]"
                style={{
                  objectPosition: config.objectPosition || 'center center',
                  objectFit: config.objectFit || 'cover',
                }}
                width={1920}
                height={1080}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            )
            if (!sources) return imgEl
            return (
              <picture key={idx} className="h-full w-full flex-[0_0_100%]">
                <source type="image/avif" srcSet={sources.avif} sizes={sources.sizes} />
                <source type="image/webp" srcSet={sources.webp} sizes={sources.sizes} />
                {imgEl}
              </picture>
            )
          })}
        </div>
        <div
          className="absolute inset-0 pointer-events-none backdrop-blur-[1px]"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(247,239,232,0.5) 0%, rgba(247,239,232,0.3) 32%, rgba(247,239,232,0.12) 55%, rgba(247,239,232,0) 78%)',
          }}
        />
      </div>
      <div className="absolute inset-0 z-10">
        <div className="mx-auto flex h-full max-w-6xl items-center px-4 pt-[3.5rem] pb-[3.5rem] text-center md:px-6">
          <div className="mx-auto w-full max-w-xl p-5 md:max-w-2xl">
            <div className="inline-flex flex-nowrap items-center gap-3 rounded-full bg-white/30 px-6 py-2 text-brand-cocoa backdrop-blur-md shadow-soft ring-1 ring-white/50 min-w-[300px] justify-center">
              <div className="flex -space-x-1.5 flex-shrink-0 pl-1">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&h=120&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&h=120&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=120&h=120&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&h=120&auto=format&fit=crop',
                ].map((src, idx) => (
                    <img
                      key={`${src}-${idx}`}
                      src={src}
                      alt="avatar"
                      className="h-7 w-7 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-cocoa/80 whitespace-nowrap pl-1">
                Trusted by 10k users
                </span>
            </div>
            <h1 className="mt-4 whitespace-pre-line font-heading text-3xl font-bold leading-tight text-brand-cocoa sm:text-4xl md:text-5xl lg:text-6xl">
              {config.headline}
            </h1>
            <p className="mt-4 text-base text-brand-cocoa/80 sm:text-lg">
              {config.subhead}
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href={config.ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-brand-cocoa px-7 py-3 text-base font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                {config.ctaLabel}
              </a>
            </div>
            <div className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full border border-white/80 bg-white/70 px-3 py-1 shadow-[0_0_18px_rgba(255,255,255,0.7)] backdrop-blur-sm">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className="h-4 w-4 text-amber-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                  fill="currentColor"
                  stroke="white"
                  strokeWidth={1}
                />
              ))}
              <span className="ml-2 text-sm font-semibold text-brand-cocoa">4.8 (100+)</span>
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
