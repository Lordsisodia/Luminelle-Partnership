import { cdnUrl } from '@/utils/cdn'
import { memo, useEffect, useRef, useState } from 'react'
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
  productTitle: string
  showLaunchBanner?: boolean
}

const HeroMedia = memo(({ gallery, activeImage, onSelect, productTitle, showLaunchBanner = true }: Props) => {
  const thumbnailsRef = useRef<HTMLDivElement | null>(null)
  const [{ hasOverflow, canScrollLeft, canScrollRight }, setThumbnailScrollState] = useState(() => ({
    hasOverflow: false,
    canScrollLeft: false,
    canScrollRight: false,
  }))

  useEffect(() => {
    const el = thumbnailsRef.current
    if (!el) return

    const update = () => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth
      const nextHasOverflow = maxScrollLeft > 1
      const nextCanScrollLeft = nextHasOverflow && el.scrollLeft > 1
      const nextCanScrollRight = nextHasOverflow && el.scrollLeft < maxScrollLeft - 1

      setThumbnailScrollState((prev) => {
        if (
          prev.hasOverflow === nextHasOverflow &&
          prev.canScrollLeft === nextCanScrollLeft &&
          prev.canScrollRight === nextCanScrollRight
        ) {
          return prev
        }
        return { hasOverflow: nextHasOverflow, canScrollLeft: nextCanScrollLeft, canScrollRight: nextCanScrollRight }
      })
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [gallery.length])

  const scrollThumbnails = (direction: 'left' | 'right') => {
    const el = thumbnailsRef.current
    if (!el) return
    const amount = Math.min(240, el.clientWidth * 0.85)
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const titleBase = productTitle?.trim() ? productTitle.trim() : 'Product'
  const heroLabel = `${titleBase} — product photo ${activeImage + 1}`
  const videoLabel = `${titleBase} — product video`

  return (
    <section id="media" className="bg-white">
      <div id="pdp-hero-gallery" className="h-0 scroll-mt-24" />
      <div className="w-full flex flex-col gap-3">
          {showLaunchBanner ? (
            <Link
              to="/product/satin-overnight-curler"
              className="mt-2 mb-2 inline-flex w-auto max-w-fit items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-semantic-text-primary shadow-soft ring-1 ring-semantic-accent-cta/50 transition hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-legacy-brand-cocoa/50 md:mt-3"
              aria-label="New heatless curler launched — view the satin overnight heatless curler set"
            >
              <span className="h-2 w-2 rounded-full bg-semantic-legacy-brand-cocoa" aria-hidden />
              New Heatless Curler Launched
              <span aria-hidden>→</span>
            </Link>
          ) : null}
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-semantic-legacy-brand-blush/60 bg-white md:bg-semantic-legacy-brand-blush/20">
            {gallery[activeImage]?.startsWith('video://') ? (
              <iframe
                src={gallery[activeImage].replace('video://', '')}
                title={videoLabel}
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
                    alt={heroLabel}
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
	          <div className="relative mt-4 w-full">
	            <div
	              ref={thumbnailsRef}
	              className="w-full overflow-x-auto overscroll-x-contain pb-1 [&::-webkit-scrollbar]:hidden"
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
	                        <img
	                          src={toCdn(src)}
	                          alt=""
	                          className="h-full w-full object-cover"
	                          width={160}
	                          height={160}
	                          loading="lazy"
	                          decoding="async"
	                        />
	                      )}
	                    </button>
	                  )
	                })}
	              </div>
	            </div>

	            {hasOverflow ? (
	              <>
	                <div
	                  aria-hidden
	                  className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white via-white/60 to-transparent transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
	                />
	                <div
	                  aria-hidden
	                  className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white via-white/60 to-transparent transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}
	                />
	                {canScrollLeft ? (
	                  <button
	                    type="button"
	                    onClick={() => scrollThumbnails('left')}
	                    className="hidden md:inline-flex absolute left-1 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white/90 text-semantic-text-primary shadow-soft ring-1 ring-semantic-legacy-brand-blush/50 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-legacy-brand-cocoa/50"
	                    aria-label="Scroll product media thumbnails left"
	                  >
	                    ‹
	                  </button>
	                ) : null}
	                {canScrollRight ? (
	                  <button
	                    type="button"
	                    onClick={() => scrollThumbnails('right')}
	                    className="hidden md:inline-flex absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white/90 text-semantic-text-primary shadow-soft ring-1 ring-semantic-legacy-brand-blush/50 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-legacy-brand-cocoa/50"
	                    aria-label="Scroll product media thumbnails right"
	                  >
	                    ›
	                  </button>
	                ) : null}
	              </>
	            ) : null}
	          </div>
	        </div>
	    </section>
	  )
})

export { HeroMedia }
