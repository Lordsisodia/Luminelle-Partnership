import { useEffect, useMemo, useState } from 'react'
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

const defaultHeading: Required<Heading> = {
  eyebrow: 'Loved by thousands',
  title: 'Customer Stories',
  description: 'Real experiences from people who use it every day. To see more reviews visit our TikTok shop product page.',
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

  const resolvedHeading = {
    ...defaultHeading,
    ...heading,
    alignment: heading?.alignment ?? defaultHeading.alignment,
  }

  const [active, setActive] = useState(0)
  const total = cards.length || 1
  const go = (dir: 'prev' | 'next') => {
    setActive((prev) => {
      const next = dir === 'next' ? prev + 1 : prev - 1
      return (next + total) % total
    })
  }

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => ((prev + 1) % total))
    }, 5000)
    return () => window.clearInterval(id)
  }, [total])

  const card = cards[active] ?? {
    author: 'Lumelle Reviewer',
    stars: 5,
    title: 'Great cap',
    body: 'This cap keeps my hair frizz-free and comfy.',
    image: fallbackImages[0],
  }

  return (
    <section id={sectionId ?? 'reviews'} className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <SectionHeading
          eyebrow={resolvedHeading.eyebrow}
          title={resolvedHeading.title}
          description="Real experiences from people who use our product every day and love it."
          alignment={resolvedHeading.alignment === 'right' ? 'center' : resolvedHeading.alignment}
        />

        <div className="relative mt-10">
          <article className="mx-auto flex max-w-md flex-col gap-2 rounded-[24px] border border-brand-peach/60 bg-gradient-to-br from-white via-[#fff6f2] to-white p-5 text-center shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
            <div className="flex justify-center">
              <StarRating value={card.stars} size={18} />
            </div>
            <p className="text-sm leading-relaxed text-brand-cocoa/90">{card.body}</p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <img
                src={card.image ?? fallbackImages[0]}
                alt={card.author}
                className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-soft"
              />
              <p className="text-sm font-semibold text-brand-cocoa">- {card.author}</p>
            </div>
          </article>

          <button
            type="button"
            aria-label="Previous review"
            onClick={() => go('prev')}
            className="absolute left-[-10px] top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-brand-cocoa text-white shadow-soft transition hover:-translate-y-1/2 hover:-translate-x-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <button
            type="button"
            aria-label="Next review"
            onClick={() => go('next')}
            className="absolute right-[-10px] top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-brand-cocoa text-white shadow-soft transition hover:-translate-y-1/2 hover:translate-x-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-brand-cocoa/60">
          To see more reviews, visit our TikTok shop product page.
        </p>
      </div>
    </section>
  )
}
