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
  showReviewerPhotos?: boolean
}

const defaultHeading: Required<Heading> = {
  eyebrow: 'Loved by thousands',
  title: 'Customer Stories',
  description: 'Real experiences from people who use it every day.',
  alignment: 'center',
}

export const ReviewsAutoCarousel = ({ reviews, heading, sectionId, showReviewerPhotos }: ReviewsAutoCarouselProps) => {
  const resolvedHeading = {
    ...defaultHeading,
    ...heading,
    alignment: heading?.alignment ?? defaultHeading.alignment,
  }

  return (
    <section
      id={sectionId ?? 'reviews'}
      className="relative overflow-hidden bg-semantic-bg-subtle py-12 md:py-14"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-semantic-accent-cta/25 blur-3xl" />
        <div className="absolute -bottom-32 right-[-120px] h-[520px] w-[520px] rounded-full bg-semantic-legacy-brand-blush/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <SectionHeading
          eyebrow={resolvedHeading.eyebrow}
          title={resolvedHeading.title}
          description={resolvedHeading.description}
          alignment={resolvedHeading.alignment === 'right' ? 'center' : resolvedHeading.alignment}
          className="gap-3 md:gap-4"
        />

        <div className="mt-4 md:mt-6">
          <ThreeDPhotoCarousel reviews={reviews} showReviewerPhotos={showReviewerPhotos} />
        </div>
      </div>
    </section>
  )
}
