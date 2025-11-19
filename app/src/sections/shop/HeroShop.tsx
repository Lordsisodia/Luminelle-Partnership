import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

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
    <section className="relative min-h-[76vh] overflow-hidden md:min-h-[72vh]">
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
        <div className="mx-auto flex h-full max-w-6xl items-center px-4 pt-[4.5rem] pb-[3.5rem] text-center md:px-6">
          <div className="mx-auto w-full max-w-xl md:max-w-2xl">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full bg-white/30 px-4 py-2 text-brand-cocoa backdrop-blur-md shadow-soft ring-1 ring-white/50">
              <div className="flex -space-x-1.5">
                {["https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=120","https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120","https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&h=120&auto=format&fit=crop","https://randomuser.me/api/portraits/men/75.jpg"].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="avatar"
                    className="h-7 w-7 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                ))}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-cocoa/80 whitespace-nowrap">
                Trusted by 100k users
              </span>
            </div>
            <h1 className="mt-4 font-heading text-3xl leading-tight text-brand-cocoa sm:text-4xl md:text-5xl lg:text-6xl">
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
            <div className="mt-3 flex items-center justify-center gap-1 text-brand-cocoa">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-brand-peach text-brand-peach" />
              ))}
              <span className="ml-2 text-sm font-semibold">4.9 (1,240)</span>
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
