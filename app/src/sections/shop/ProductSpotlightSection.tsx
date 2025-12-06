import { StarRating } from '@/components/StarRating'
import type { HomeConfig } from '@/content/home.config'
import { cdnUrl } from '@/utils/cdn'

type Props = {
  teaser: HomeConfig['pdpTeaser']
}

export const ProductSpotlightSection = ({ teaser }: Props) => {
  const imageSrc = cdnUrl(teaser.image)

  const buildSources = (src: string) => {
    if (!src.includes('page9-image')) return null
    const base = src.replace(/\.[^.]+$/, '')
    const widths = [640, 960, 1280]
    return {
      avif: widths.map((w) => `${base}-${w}.avif ${w}w`).join(', '),
      webp: widths.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
      sizes: '(min-width: 1024px) 520px, 90vw',
    }
  }

  const sources = buildSources(imageSrc)

  return (
    <section className="bg-white py-10" data-sticky-buy-target>
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="grid gap-6 rounded-[2.5rem] border border-brand-peach/40 bg-white/95 p-6 shadow-soft md:grid-cols-[0.9fr_1fr]">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-blush/20">
            {sources ? (
              <picture>
                <source type="image/avif" srcSet={sources.avif} sizes={sources.sizes} />
                <source type="image/webp" srcSet={sources.webp} sizes={sources.sizes} />
                <img
                  src={imageSrc}
                  alt={teaser.title}
                  className="h-full w-full object-cover object-[center_25%] md:object-[center_22%]"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            ) : (
              <img
                src={imageSrc}
                alt={teaser.title}
                className="h-full w-full object-cover object-[center_25%] md:object-[center_22%]"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
          <div className="flex flex-col gap-4 text-left text-brand-cocoa">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Product spotlight</p>
              <h2 className="font-heading text-3xl font-bold leading-snug">{teaser.title}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-brand-cocoa/80">
              <StarRating value={5} size={18} />
              <span className="text-sm font-semibold">4.8 (100+ reviews)</span>
            </div>
            <p className="text-base text-brand-cocoa/80">{teaser.description}</p>
            <ul className="space-y-1 text-sm text-brand-cocoa/70">
              {teaser.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-peach" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-col gap-2 text-sm md:flex-row md:items-center md:justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-[21px] font-semibold leading-none text-rose-600">-25%</span>
                <span className="text-3xl font-semibold text-brand-cocoa">£14.99</span>
              </div>
              <div className="text-xs font-semibold text-brand-cocoa/60">
                RRP: <span className="line-through">£19.99</span>
              </div>
              <a
                href={teaser.href}
                className="inline-flex items-center justify-center rounded-full border-2 border-brand-cocoa px-7 py-2.5 text-sm font-extrabold uppercase tracking-[0.08em] text-brand-cocoa shadow-[0_10px_18px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)] bg-white"
              >
                {teaser.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
