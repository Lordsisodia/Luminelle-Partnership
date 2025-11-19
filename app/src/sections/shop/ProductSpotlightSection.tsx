import { StarRating } from '@/components/StarRating'
import type { HomeConfig } from '@/content/home.config'

type Props = {
  teaser: HomeConfig['pdpTeaser']
}

export const ProductSpotlightSection = ({ teaser }: Props) => {
  return (
    <section className="bg-white py-10" data-sticky-buy-target>
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="grid gap-6 rounded-[2.5rem] border border-brand-peach/40 bg-white/95 p-6 shadow-soft md:grid-cols-[0.9fr_1fr]">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-blush/20">
            <img
              src={teaser.image}
              alt={teaser.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-4 text-left text-brand-cocoa">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Product spotlight</p>
              <h2 className="font-heading text-3xl leading-snug">{teaser.title}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-brand-cocoa/80">
              <StarRating value={teaser.rating} size={18} />
              <span className="text-sm font-semibold">{teaser.rating.toFixed(1)} ({teaser.reviews.toLocaleString()} reviews)</span>
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
              <span className="text-base font-semibold text-brand-cocoa">{teaser.price}</span>
              <a
                href={teaser.href}
                className="inline-flex items-center justify-center rounded-full bg-brand-cocoa px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
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
