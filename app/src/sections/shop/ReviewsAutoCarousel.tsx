import { useEffect, useMemo, useState } from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { StarRating } from '@/components/StarRating'
import type { Review } from '@/content/home.config'

export const ReviewsAutoCarousel = ({
  reviews,
}: {
  reviews: Review[]
}) => {
  const [active, setActive] = useState(0)
  const ordered = useMemo(() => reviews, [reviews])

  useEffect(() => {
    if (ordered.length <= 1) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % ordered.length)
    }, 3000)
    return () => window.clearInterval(id)
  }, [ordered.length])

  const review = ordered[active]
  const headlineBadge = review.meta?.includes('Type') ? review.meta : 'Community love'

  return (
    <section id="reviews" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Loved by thousands"
          title="What customers are saying"
          description="Short quotes from verified customers who use Lumelle every day."
          alignment="center"
        />
        <div className="mt-8 flex flex-col items-center gap-5 rounded-[32px] border border-brand-peach/50 bg-white/95 p-8 text-center shadow-soft">
          <div className="flex items-center gap-3 text-left">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold text-brand-cocoa"
              style={{ backgroundImage: `linear-gradient(135deg, hsl(${(active * 47) % 360} 70% 80%), hsl(${((active * 47) + 40) % 360} 65% 88%))` }}
            >
              {review.author
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-semibold text-brand-cocoa">{review.author}</div>
              <StarRating value={review.stars} size={14} />
              {review.meta ? <p className="text-xs text-brand-cocoa/60">{review.meta}</p> : null}
            </div>
          </div>
          <blockquote className="space-y-3 text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">{headlineBadge}</p>
            <p className="font-heading text-2xl text-brand-cocoa">{review.title}</p>
            <p className="text-lg text-brand-cocoa/80">
              <span className="text-3xl text-brand-cocoa">“</span>
              {review.body}
              <span className="text-3xl text-brand-cocoa">”</span>
            </p>
          </blockquote>
          <div className="flex items-center gap-3">
            {ordered.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show review ${idx + 1}`}
                onClick={() => setActive(idx)}
                className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cocoa ${
                  idx === active ? 'w-8 bg-brand-cocoa' : 'w-3 bg-brand-cocoa/30 hover:bg-brand-cocoa/70'
                }`}
              />
            ))}
          </div>
          <div className="text-sm font-semibold text-brand-cocoa/80">
            <a href="/product/shower-cap#reviews" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
              See all reviews
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
