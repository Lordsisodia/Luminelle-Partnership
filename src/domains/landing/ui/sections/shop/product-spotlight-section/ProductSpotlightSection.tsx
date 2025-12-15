/* @ts-nocheck */
import { useEffect, useMemo, useState } from 'react'
import { StarRating } from '@ui/components/StarRating'
import type { HomeConfig } from '@content/home.types'
import { cdnUrl } from '@/lib/utils/cdn'

type Props = {
  teasers: HomeConfig['pdpTeaser'][]
}

const parsePrice = (price: string) => {
  const match = price.match(/£\s?(\d+(?:\.\d+)?)\s*\(was\s*£\s?(\d+(?:\.\d+)?)\)/i)
  if (!match) return null

  const now = Number.parseFloat(match[1])
  const was = Number.parseFloat(match[2])
  if (!Number.isFinite(now) || !Number.isFinite(was) || was <= 0) return null

  const discountPercent = Math.round((1 - now / was) * 100)
  if (!Number.isFinite(discountPercent) || discountPercent <= 0) return null

  return {
    nowLabel: `£${match[1]}`,
    wasLabel: `£${match[2]}`,
    discountLabel: `-${discountPercent}%`,
  }
}

export const ProductSpotlightSection = ({ teasers }: Props) => {
  const slides = useMemo(() => (teasers.length > 0 ? teasers : []), [teasers])
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (active <= slides.length - 1) return
    setActive(0)
  }, [active, slides.length])

  return (
    <section className="bg-white py-10" data-sticky-buy-target>
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="relative overflow-hidden">
          <div
            className="flex w-full transition-transform duration-700"
            style={{ transform: `translateX(-${active * 100}%)` }}
            aria-hidden={slides.length > 1 ? 'true' : undefined}
          >
            {slides.map((teaser) => {
              const imageSrc = encodeURI(cdnUrl(teaser.image))
              const price = parsePrice(teaser.price)
              const reviewsLabel = `${teaser.reviews.toLocaleString()}+ reviews`

              return (
                <div key={teaser.href} className="w-full flex-[0_0_100%]">
                  <div className="grid gap-6 rounded-[2.5rem] border border-semantic-accent-cta/40 bg-white/95 p-6 shadow-soft md:grid-cols-[0.9fr_1fr]">
                    <div className="relative aspect-square overflow-hidden rounded-3xl bg-semantic-legacy-brand-blush/20">
                      <img
                        src={imageSrc}
                        alt={teaser.title}
                        className="h-full w-full object-cover object-[center_25%] md:object-[center_22%]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex flex-col gap-4 text-left text-semantic-text-primary">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-semantic-text-primary/60">Product spotlight</p>
                        <h2 className="font-heading text-3xl font-bold leading-snug">{teaser.title}</h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-semantic-text-primary/80">
                        <StarRating value={teaser.rating} size={18} />
                        <span className="text-sm font-semibold">
                          {teaser.rating.toFixed(1)} ({reviewsLabel})
                        </span>
                      </div>
                      <p className="text-base text-semantic-text-primary/80">{teaser.description}</p>
                      <ul className="space-y-1 text-sm text-semantic-text-primary/70">
                        {teaser.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-semantic-accent-cta" aria-hidden />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-col gap-3 text-sm md:items-start">
                        {price ? (
                          <div className="flex flex-wrap items-baseline gap-3">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[21px] font-semibold leading-none text-rose-600">{price.discountLabel}</span>
                              <span className="text-3xl font-semibold text-semantic-text-primary">{price.nowLabel}</span>
                            </div>
                            <div className="text-xs font-semibold text-semantic-text-primary/60">
                              RRP: <span className="line-through">{price.wasLabel}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-base font-semibold text-semantic-text-primary">{teaser.price}</div>
                        )}
                        <a
                          href={teaser.href}
                          className="inline-flex items-center justify-center rounded-full border-2 border-semantic-legacy-brand-cocoa bg-white px-7 py-2.5 text-sm font-extrabold uppercase tracking-[0.08em] text-semantic-text-primary shadow-[0_10px_18px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
                        >
                          {teaser.ctaLabel}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {slides.length > 1 ? (
            <div className="mt-4 flex items-center justify-center gap-2">
              {slides.map((teaser, idx) => (
                <button
                  key={teaser.href}
                  type="button"
                  aria-label={`Show ${teaser.title}`}
                  aria-current={idx === active ? 'true' : undefined}
                  onClick={() => setActive(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === active
                      ? 'w-8 bg-semantic-legacy-brand-cocoa'
                      : 'w-2.5 bg-semantic-legacy-brand-cocoa/30 hover:bg-semantic-legacy-brand-cocoa/70'
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
