import { cdnUrl } from '@/utils/cdn'
import { memo } from 'react'
import { Link } from 'react-router-dom'

const toCdn = (src: string) => encodeURI(cdnUrl(src))

const buildSources = (src: string) => {
  if (src.startsWith('video://')) return null
  const cdnSrc = toCdn(src)
  // Only generate responsive sources when we actually have the resized assets.
  // Currently only the curler gallery has -640/-960/-1280 variants.
  if (!src.startsWith('/uploads/curler/')) return null
  const base = cdnSrc.replace(/\.[^.]+$/, '')
  const widths = [640, 960, 1280]
  return {
    avif: widths.map((w) => `${base}-${w}.avif ${w}w`).join(', '),
    // The unsuffixed curler `.webp` files are 960w already, so we can use them as the 960 candidate.
    webp: [`${base}-640.webp 640w`, `${cdnSrc} 960w`, `${base}-1280.webp 1280w`].join(', '),
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
      <div className="w-full flex flex-col gap-3">
          <Link
            to="/product/satin-overnight-curler"
            className="mt-2 mb-2 inline-flex w-auto max-w-fit items-center gap-2 rounded-full bg-white px-3.5 py-1.25 text-[11px] font-semibold uppercase tracking-[0.22em] text-semantic-text-primary shadow-soft ring-1 ring-semantic-accent-cta/50 transition hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-legacy-brand-cocoa/50 md:mt-3"
            aria-label="New heatless curler launched — view the satin overnight heatless curler set"
          >
            <span className="h-2 w-2 rounded-full bg-semantic-legacy-brand-cocoa" aria-hidden />
            New Heatless Curler Launched
            <span aria-hidden>→</span>
          </Link>
          <div className="relative w-full overflow-hidden rounded-[2rem] border border-semantic-legacy-brand-blush/60 bg-white md:bg-semantic-legacy-brand-blush/20">
            {gallery[activeImage]?.startsWith('video://') ? (
              <iframe
                src={gallery[activeImage].replace('video://', '')}
                title="Lumelle product video"
                className="absolute inset-0 h-full w-full rounded-[2rem]"
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
                    className="w-full h-full object-contain"
                    width={960}
                    height={960}
                    draggable="false"
                    loading="eager"
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
                    className={`h-14 w-14 shrink-0 overflow-hidden rounded-2xl border snap-start ${idx === activeImage ? 'border-semantic-legacy-brand-cocoa' : 'border-semantic-legacy-brand-blush/60'}`}
                    aria-label={`Show media ${idx + 1}`}
                  >
                    {isVideo ? (
                      <div className="relative h-full w-full bg-semantic-legacy-brand-blush/40">
                        <img src="/uploads/luminele/product-feature-03.webp" alt="Video" className="h-full w-full object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-semantic-text-primary shadow-soft">
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
    </section>
  )
})

export { HeroMedia }
