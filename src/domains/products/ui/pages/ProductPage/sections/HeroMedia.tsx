import { cdnUrl } from '@/utils/cdn'
import { memo } from 'react'
import { Link } from 'react-router-dom'

const toCdn = (src: string) => encodeURI(cdnUrl(src))

const buildSources = (src: string) => {
  if (src.startsWith('video://')) return null
  const cdnSrc = toCdn(src)
  const base = cdnSrc.replace(/\.[^.]+$/, '')
  const widths = [640, 960, 1280]
  return {
    avif: widths.map((w) => `${base}-${w}.avif ${w}w`).join(', '),
    webp: widths.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
    sizes: '(min-width: 1024px) 640px, 92vw',
    fallback: cdnSrc,
  }
}

type Props = {
  gallery: string[]
  activeImage: number
  onSelect: (idx: number) => void
}

const HeroMedia = memo(({ gallery, activeImage, onSelect }: Props) => {
  return (
    <section id="media" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-3 pb-6 pt-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:px-4 md:py-10">
        <div className="min-w-0">
          <Link
            to="/product/satin-overnight-curler"
            className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.25 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-cocoa shadow-soft ring-1 ring-brand-peach/50 transition hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cocoa/50"
            aria-label="New eyelash curler launched — view the satin overnight curler set"
          >
            <span className="h-2 w-2 rounded-full bg-brand-cocoa" aria-hidden />
            New Eyelash Curler Launched
            <span aria-hidden>→</span>
          </Link>
          <div className="relative w-full overflow-hidden rounded-[2.25rem] border border-brand-blush/60 bg-white md:flex md:items-center md:justify-center md:bg-brand-blush/20">
            {gallery[activeImage]?.startsWith('video://') ? (
              <iframe
                src={gallery[activeImage].replace('video://', '')}
                title="Lumelle product video"
                className="h-[60vh] w-full max-h-[80vh] rounded-[2.5rem] md:max-h-none"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              (() => {
                const sources = buildSources(gallery[activeImage])
                const img = (
                  <img
                    src={sources?.fallback ?? toCdn(gallery[activeImage])}
                    alt="Lumelle product detail"
                    className="w-full h-auto max-h-[80vh] object-contain md:max-h-none"
                    width={960}
                    height={960}
                    draggable="false"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                  />
                )
                if (!sources) return img
                return (
                  <picture>
                    <source type="image/avif" srcSet={sources.avif} sizes={sources.sizes} />
                    <source type="image/webp" srcSet={sources.webp} sizes={sources.sizes} />
                    {img}
                  </picture>
                )
              })()
            )}
          </div>
          <div
            className="mt-4 w-full overflow-x-auto overscroll-x-contain pb-1 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="inline-flex max-w-full gap-2 px-1 snap-x snap-mandatory touch-pan-x">
              {gallery.map((src, idx) => {
                const isVideo = src.startsWith('video://')
                const sources = buildSources(src)
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => onSelect(idx)}
                    className={`h-14 w-14 shrink-0 overflow-hidden rounded-2xl border snap-start ${idx === activeImage ? 'border-brand-cocoa' : 'border-brand-blush/60'}`}
                    aria-label={`Show media ${idx + 1}`}
                  >
                    {isVideo ? (
                      <div className="relative h-full w-full bg-brand-blush/40">
                        <img src="/uploads/luminele/product-feature-03.webp" alt="Video" className="h-full w-full object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-cocoa shadow-soft">
                            ▶
                          </span>
                        </span>
                      </div>
                    ) : sources ? (
                      <picture>
                        <source type="image/avif" srcSet={sources.avif} sizes="80px" />
                        <source type="image/webp" srcSet={sources.webp} sizes="80px" />
                        <img
                          src={sources.fallback}
                          alt=""
                          className="h-full w-full object-cover"
                          width={160}
                          height={160}
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    ) : (
                      <img src={toCdn(src)} alt="" className="h-full w-full object-cover" width={160} height={160} loading="lazy" decoding="async" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export { HeroMedia }
