/* @ts-nocheck */
import { useMemo } from 'react'
import { SectionHeading } from '@ui/components/SectionHeading'
import { ThreeDPhotoCarousel } from '@/components/ui/3d-carousel'
import type { Review as ReviewType } from '@content/home.types'

type Heading = {
  eyebrow?: string
  title?: string
  description?: string
  alignment?: 'left' | 'center' | 'right'
}

type ReviewsAutoCarouselProps = {
  reviews: ReviewType[]
  heading?: Heading
  sectionId?: string
}

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
          <ThreeDPhotoCarousel reviews={filteredReviews} />
        </div>
      </div>
    </section>
  )
}
