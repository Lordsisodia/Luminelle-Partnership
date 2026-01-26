import { SectionHeading } from '@ui/components/SectionHeading'
import { StarRating } from '@ui/components/StarRating'
import { ThreeDPhotoCarousel } from '@/components/ui/3d-carousel'
import type { Review as ReviewType } from '@content/home.types'

type Heading = {
  eyebrow?: string
  title?: string
  description?: string
  alignment?: 'left' | 'center' | 'right'
}

type Summary = {
  rating?: number
  count?: number
  tagline?: string
}

type ReviewsAutoCarouselProps = {
  reviews: ReviewType[]
  heading?: Heading
  summary?: Summary
  sectionId?: string
  showReviewerPhotos?: boolean
}

const defaultHeading: Required<Heading> = {
  eyebrow: 'Loved by thousands',
  title: 'Customer Stories',
  description: 'Real experiences from people who use it every day.',
  alignment: 'center',
}

const formatCountLabel = (count: number) => {
  if (!Number.isFinite(count)) return ''
  if (count >= 1_000_000) return `${Math.round(count / 100_000) / 10}M+`
  if (count >= 10_000) return `${Math.round(count / 1_000)}k+`
  if (count >= 1_000) return `${Math.round(count / 100) / 10}k+`
  return `${count}+`
}

const resolveSummary = (reviews: ReviewType[], summary?: Summary) => {
  const ratingFromReviews = (() => {
    if (!reviews.length) return undefined
    const sum = reviews.reduce((acc, r) => acc + (Number.isFinite(r.stars) ? r.stars : 5), 0)
    return Math.round((sum / reviews.length) * 10) / 10
  })()

  return {
    rating: summary?.rating ?? ratingFromReviews,
    count: summary?.count,
    tagline: summary?.tagline,
  }
}

const ReviewsDesktopHeading = ({
  eyebrow,
  title,
  description,
  rating,
  count,
  tagline,
}: {
  eyebrow?: string
  title?: string
  description?: string
  rating?: number
  count?: number
  tagline?: string
}) => {
  const ratingLabel = rating ? rating.toFixed(1) : undefined
  const countLabel = count && !tagline ? formatCountLabel(count) : undefined

  return (
    <div className="hidden lg:flex lg:flex-col lg:items-start lg:gap-4 lg:text-left">
      {eyebrow ? (
        <span className="inline-flex rounded-full bg-semantic-legacy-brand-blush/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/70">
          {eyebrow}
        </span>
      ) : null}

      {title ? (
        <h2 className="font-heading text-4xl font-bold text-semantic-text-primary whitespace-pre-line">
          {title}
        </h2>
      ) : null}

      {description ? (
        <p className="max-w-md text-base leading-relaxed text-semantic-text-primary/80 font-serif">
          {description}
        </p>
      ) : null}

      {ratingLabel || countLabel || tagline ? (
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-semantic-text-primary/80">
          {ratingLabel ? (
            <span className="inline-flex items-center gap-2">
              <StarRating value={rating ?? 5} size={18} />
              <span className="font-semibold text-semantic-text-primary text-base">{ratingLabel}</span>
            </span>
          ) : null}

          {countLabel ? (
            <span className="inline-flex items-center rounded-full bg-white/75 px-4 py-1.5 font-semibold text-base ring-1 ring-semantic-legacy-brand-blush/50 backdrop-blur">
              {countLabel} reviews
            </span>
          ) : null}

          {tagline ? (
            <span className="inline-flex items-center rounded-full bg-white/60 px-4 py-1.5 text-semantic-text-primary/70 text-base ring-1 ring-semantic-legacy-brand-blush/40 backdrop-blur">
              {tagline}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export const ReviewsAutoCarousel = ({
  reviews,
  heading,
  summary,
  sectionId,
  showReviewerPhotos,
}: ReviewsAutoCarouselProps) => {
  const resolvedHeading = {
    ...defaultHeading,
    ...heading,
    alignment: heading?.alignment ?? defaultHeading.alignment,
  }

  const resolvedSummary = resolveSummary(reviews, summary)

  return (
    <section
      id={sectionId ?? 'reviews'}
      className="relative overflow-hidden bg-semantic-bg-subtle py-12 md:py-14 lg:py-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-semantic-accent-cta/25 blur-3xl" />
        <div className="absolute -bottom-32 right-[-120px] h-[520px] w-[520px] rounded-full bg-semantic-legacy-brand-blush/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={resolvedHeading.eyebrow}
              title={resolvedHeading.title ?? ''}
              description={resolvedHeading.description}
              alignment={resolvedHeading.alignment === 'right' ? 'center' : resolvedHeading.alignment}
              className="gap-3 md:gap-4 lg:hidden"
            />

            <ReviewsDesktopHeading
              eyebrow={resolvedHeading.eyebrow}
              title={resolvedHeading.title}
              description={resolvedHeading.description}
              rating={resolvedSummary.rating}
              count={resolvedSummary.count}
              tagline={resolvedSummary.tagline}
            />
          </div>

          <div className="mt-4 md:mt-6 lg:col-span-7 lg:mt-0 lg:-mr-10">
            <ThreeDPhotoCarousel reviews={reviews} showReviewerPhotos={showReviewerPhotos} />
          </div>
        </div>
      </div>
    </section>
  )
}
