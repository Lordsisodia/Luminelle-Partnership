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
  '/reviews/Gemini_Generated_Image_1ohn881ohn881ohn.png',
  '/reviews/Gemini_Generated_Image_2suo7c2suo7c2suo.png',
  '/reviews/Gemini_Generated_Image_btzh5ubtzh5ubtzh.png',
  '/reviews/Gemini_Generated_Image_crdb1mcrdb1mcrdb.png',
  '/reviews/Gemini_Generated_Image_e9x1q9e9x1q9e9x1.png',
  '/reviews/Gemini_Generated_Image_gaubrugaubrugaub.png',
  '/reviews/Gemini_Generated_Image_gyw8k3gyw8k3gyw8.png',
  '/reviews/Gemini_Generated_Image_l0ygmll0ygmll0yg.png',
  '/reviews/Gemini_Generated_Image_nwz7cunwz7cunwz7.png',
  '/reviews/Gemini_Generated_Image_o80p76o80p76o80p.png',
  '/reviews/Gemini_Generated_Image_qpfy4yqpfy4yqpfy.png',
  '/reviews/Gemini_Generated_Image_t2ay1yt2ay1yt2ay.png',
  '/reviews/Gemini_Generated_Image_t9xqp9t9xqp9t9xq.png',
  '/reviews/Gemini_Generated_Image_tcejrztcejrztcej.png',
  '/reviews/Gemini_Generated_Image_vcg1r9vcg1r9vcg1.png',
  '/reviews/Gemini_Generated_Image_wpf7igwpf7igwpf7.png',
  '/reviews/Gemini_Generated_Image_ynux5pynux5pynux.png',
]

const cardBase = 'relative h-72 w-44 shrink-0 overflow-hidden rounded-[24px] shadow-xl shadow-brand-cocoa/15'

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
    // Loop 4x to eliminate visible gaps on wide viewports
    const looped = items.length ? [...items, ...items, ...items, ...items] : []
    if (!looped.length) return null
    const duration = Math.max(10, items.length * 2.5)
    return (
      <div className="relative -mx-6 overflow-hidden px-6 md:mx-0 md:px-0">
        <div
          className="flex min-w-max gap-2"
          style={{ animation: `marquee ${duration}s linear infinite${reverse ? ' reverse' : ''}` }}
        >
          {looped.map((review, idx) => (
            <article
              key={`${review.author}-${idx}-${reverse ? 'rev' : 'fwd'}`}
              className={cardBase}
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
          alignment={resolvedHeading.alignment === 'right' ? 'center' : resolvedHeading.alignment}
        />
        <div className="mt-10 space-y-6">
          {renderRow(rows[0], true)}
          {renderRow(rows[1])}
        </div>
      </div>
    </section>
  )
}
