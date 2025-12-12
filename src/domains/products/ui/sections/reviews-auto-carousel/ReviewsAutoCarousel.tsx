/* @ts-nocheck */
import { useMemo } from 'react'
import { SectionHeading } from '@ui/components/SectionHeading'
import { StarRating } from '@ui/components/StarRating'
import { ThreeDPhotoCarousel } from '@/components/ui/3d-carousel'
import type { Review as ReviewType } from '@landing/data/home.config'

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
  const filteredReviews = useMemo(() => {
    const onlyFiveStar = reviews.filter((review) => review.stars >= 5)
    return onlyFiveStar.length ? onlyFiveStar : reviews
  }, [reviews])

  const cards = useMemo(
    () =>
      filteredReviews.map((review, idx) => ({
        ...review,
        image: review.image ?? fallbackImages[idx % fallbackImages.length],
      })),
    [filteredReviews]
  )

  const resolvedHeading = {
    ...defaultHeading,
    ...heading,
    alignment: heading?.alignment ?? defaultHeading.alignment,
  }

  return (
    <section id={sectionId ?? 'reviews'} className="bg-white py-12 md:py-14">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <SectionHeading
          eyebrow={resolvedHeading.eyebrow}
          title={resolvedHeading.title}
          description={resolvedHeading.description}
          alignment={resolvedHeading.alignment === 'right' ? 'center' : resolvedHeading.alignment}
          className="gap-3 md:gap-4"
        />

        <div className="mt-10 md:mt-12">
          <ThreeDPhotoCarousel reviews={cards} />
        </div>
      </div>
    </section>
  )
}
