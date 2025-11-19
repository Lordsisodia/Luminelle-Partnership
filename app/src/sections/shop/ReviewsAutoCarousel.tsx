import { useMemo } from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { StarRating } from '@/components/StarRating'
import type { Review as ReviewType } from '@/content/home.config'

type Review = ReviewType & { image?: string }

type Heading = {
  eyebrow?: string
  title?: string
  description?: string
  alignment?: 'left' | 'center' | 'right'
}

type ReviewsAutoCarouselProps = {
  reviews: Review[]
  heading?: Heading
  sectionId?: string
}

const fallbackImages = [
  '/uploads/luminele/product-feature-02.jpg',
  '/uploads/luminele/product-feature-03.jpg',
  '/uploads/luminele/product-feature-04.jpg',
  '/uploads/luminele/product-feature-05.jpg',
  '/uploads/luminele/product-feature-06.jpg',
  '/uploads/luminele/product-feature-07.jpg',
]

const cardBase = 'relative h-80 w-56 shrink-0 overflow-hidden rounded-[28px] shadow-xl shadow-brand-cocoa/15'

const defaultHeading: Required<Heading> = {
  eyebrow: 'Loved by thousands',
  title: 'Customer Stories',
  description: 'Portrait stories from verified shoppers—scroll to peek at the glow-ups.',
  alignment: 'center',
}

export const ReviewsAutoCarousel = ({ reviews, heading, sectionId }: ReviewsAutoCarouselProps) => {
  const cards = useMemo(
    () =>
      reviews.map((review, idx) => ({
        ...review,
        image: review.image ?? fallbackImages[idx % fallbackImages.length],
      })),
    [reviews]
  )

  const rows = [
    cards.filter((_, idx) => idx % 2 === 0),
    cards.filter((_, idx) => idx % 2 === 1),
  ]

  const renderRow = (items: Review[], reverse = false) => {
    const looped = items.length ? [...items, ...items] : []
    if (!looped.length) return null
    return (
      <div className="relative overflow-hidden">
        <div
          className="flex gap-4"
          style={{ animation: `marquee 22s linear infinite${reverse ? ' reverse' : ''}` }}
        >
          {looped.map((review, idx) => (
            <article
              key={`${review.author}-${idx}-${reverse ? 'rev' : 'fwd'}`}
              className={`${cardBase} bg-brand-blush/20`}
              aria-hidden={idx >= items.length}
            >
              <img
                src={review.image}
                alt={review.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/85" />
              <div className="relative flex h-full flex-col justify-end gap-2 p-5 text-white">
                <StarRating value={review.stars} size={16} />
                <p className="text-sm font-semibold leading-snug">{review.title}</p>
                <p className="text-xs text-white/80">{review.body}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/70">{review.author}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    )
  }

  const resolvedHeading = {
    ...defaultHeading,
    ...heading,
    alignment: heading?.alignment ?? defaultHeading.alignment,
  }

  return (
    <section id={sectionId ?? 'reviews'} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow={resolvedHeading.eyebrow}
          title={resolvedHeading.title}
          description={resolvedHeading.description}
          alignment={resolvedHeading.alignment}
        />
        <div className="mt-10 space-y-6">
          {renderRow(rows[0], true)}
          {renderRow(rows[1])}
        </div>
      </div>
    </section>
  )
}
