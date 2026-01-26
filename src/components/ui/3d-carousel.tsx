"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { StarRating } from "@ui/components/StarRating"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

type ReviewCard = {
  author: string
  title?: string
  body: string
  stars?: number
  image?: string
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    if (typeof matchMedia.addEventListener === "function") {
      matchMedia.addEventListener("change", handleChange)
      return () => {
        matchMedia.removeEventListener("change", handleChange)
      }
    }

    // Safari/legacy fallback
    ;(matchMedia as any).addListener?.(handleChange)
    return () => {
      ;(matchMedia as any).removeListener?.(handleChange)
    }
  }, [query])

  return matches
}

const reviewFallbacks: ReviewCard[] = [
  { author: "Kara", body: "Roomy enough for rollers and still sealed.", stars: 5 },
  { author: "Shanice", body: "Zero frizz even on wash day steam.", stars: 5 },
  { author: "Jules", body: "Luxe feel, dries fast, still looks cute.", stars: 5 },
  { author: "Amari", body: "Finally a cap that fits my braids.", stars: 5 },
  { author: "Bri", body: "Elastic is comfy and doesn’t dent my forehead.", stars: 4.8 },
  { author: "Tay", body: "Worth it for silk press protection alone.", stars: 5 },
]

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

const ReviewCardOrnaments = () => (
  <>
    <div className="pointer-events-none absolute inset-0 rounded-[15px] bg-[radial-gradient(700px_circle_at_50%_0%,rgba(251,199,178,0.3),transparent_60%)]" />
    <div className="pointer-events-none absolute inset-0 rounded-[15px] ring-1 ring-inset ring-semantic-legacy-brand-blush/40" />
    <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-semantic-accent-cta/50 to-transparent" />

    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="pointer-events-none absolute left-3 top-3 h-6 w-6 text-semantic-accent-cta/40"
      fill="none"
    >
      <path
        d="M10.5 11.3c0 3.5-1.8 6.2-5.1 7.7l-.8-1.6c2.1-1.1 3.2-2.7 3.4-4.8H5.2V7.5h5.3v3.8Zm8.3 0c0 3.5-1.8 6.2-5.1 7.7l-.8-1.6c2.1-1.1 3.2-2.7 3.4-4.8h-2.8V7.5h5.3v3.8Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-semantic-accent-cta/40"
      fill="none"
    >
      <path
        d="M12 3l1.25 5.1L18 9.4l-4.75 1.3L12 16l-1.25-5.3L6 9.4l4.75-1.3L12 3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  </>
)

const ReviewCardContent = ({
  review,
  showReviewerPhotos,
}: {
  review: ReviewCard
  showReviewerPhotos: boolean
}) => {
  return (
    <div className="pointer-events-none relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-white px-5 py-6 shadow-soft">
      <div className="relative flex justify-center">
        <StarRating value={review.stars ?? 5} size={14} />
      </div>
      <div className="relative mt-4 flex-1">
        <p className="text-base leading-relaxed text-left text-semantic-text-primary font-medium line-clamp-4">
          {review.body}
        </p>
      </div>
      <div className="relative mt-4 flex items-center justify-center">
        <p className="text-sm font-medium text-semantic-text-primary">
          {review.author}
        </p>
      </div>
    </div>
  )
}

const Reviews2DCarousel = memo(
  ({
    cards,
    activeIndex,
    onActiveIndexChange,
    prefersReducedMotion,
    showReviewerPhotos,
  }: {
    cards: ReviewCard[]
    activeIndex: number
    onActiveIndexChange: (index: number) => void
    prefersReducedMotion: boolean
    showReviewerPhotos: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const isScreenSizeLg = useMediaQuery("(max-width: 1024px)")
    const itemWidth = isScreenSizeSm ? 300 : isScreenSizeLg ? 400 : 480
    const itemHeight = isScreenSizeSm ? 380 : isScreenSizeLg ? 280 : 320
    const gapPx = 16
    const listRef = useRef<HTMLDivElement | null>(null)
    const isProgrammaticScrollRef = useRef(false)
    const programmaticScrollTimeoutRef = useRef<number | null>(null)

    const clampIndex = (index: number) =>
      Math.min(Math.max(index, 0), Math.max(0, cards.length - 1))

    const scrollToIndex = (index: number) => {
      const el = listRef.current
      if (!el) return
      const target = clampIndex(index)
      isProgrammaticScrollRef.current = true
      if (programmaticScrollTimeoutRef.current) {
        window.clearTimeout(programmaticScrollTimeoutRef.current)
      }
      el.scrollTo({
        left: target * (itemWidth + gapPx),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      })
      programmaticScrollTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticScrollRef.current = false
      }, prefersReducedMotion ? 0 : 450)
    }

    useEffect(() => {
      scrollToIndex(activeIndex)
    }, [activeIndex, itemWidth, cards.length])

    useEffect(() => {
      const el = listRef.current
      if (!el) return
      let raf = 0

      const onScroll = () => {
        if (isProgrammaticScrollRef.current) return
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          const nextIndex = clampIndex(Math.round(el.scrollLeft / (itemWidth + gapPx)))
          onActiveIndexChange(nextIndex)
        })
      }

      el.addEventListener("scroll", onScroll, { passive: true })
      return () => {
        el.removeEventListener("scroll", onScroll)
        cancelAnimationFrame(raf)
      }
    }, [gapPx, itemWidth, onActiveIndexChange])

    useEffect(() => {
      return () => {
        if (programmaticScrollTimeoutRef.current) {
          window.clearTimeout(programmaticScrollTimeoutRef.current)
        }
      }
    }, [])

    return (
      <div className="w-full">
        <div className="relative">
          <div
            ref={listRef}
            className="flex w-full gap-4 overflow-x-auto px-4 pb-4 pt-3 md:pt-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: "16px",
              scrollPaddingRight: "16px",
              // Allow horizontal swipe scrolling on mobile.
              touchAction: "pan-x",
            }}
            aria-label="Customer reviews"
          >
            {cards.map((card, i) => (
              <div
                key={`review-${card.author}-${i}`}
                className="shrink-0 snap-start"
                style={{ width: `${itemWidth}px` }}
              >
                <div className="rounded-2xl bg-gradient-to-br from-semantic-legacy-brand-blush/50 via-white to-semantic-accent-cta/40 p-[1px] shadow-[0_12px_35px_rgba(85,54,42,0.08)]">
                  <div style={{ height: `${itemHeight}px` }}>
                    <ReviewCardContent review={card} showReviewerPhotos={showReviewerPhotos} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-semantic-bg-subtle via-semantic-bg-subtle/70 to-transparent md:w-16 md:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-semantic-bg-subtle via-semantic-bg-subtle/70 to-transparent md:w-16 md:block"
          />

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2 pt-3 md:pt-4">
            {cards.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                aria-label={`Go to review ${idx + 1}`}
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  idx === activeIndex
                    ? 'w-8 bg-semantic-accent-cta'
                    : 'w-2 bg-semantic-legacy-brand-blush/60 hover:bg-semantic-legacy-brand-blush/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
)

function ThreeDPhotoCarousel({
  reviews,
  showReviewerPhotos = false,
}: {
  reviews?: ReviewCard[]
  showReviewerPhotos?: boolean
}) {
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const allCards = useMemo(() => (reviews?.length ? reviews : reviewFallbacks), [reviews])
  const cards = useMemo(() => allCards.slice(0, 12), [allCards])
  const clampIndex = (index: number) =>
    Math.min(Math.max(index, 0), Math.max(0, cards.length - 1))
  const prev = () => setActiveIndex((i) => clampIndex(i - 1))
  const next = () => setActiveIndex((i) => clampIndex(i + 1))

  const activeLabel = useMemo(() => {
    const current = cards[clampIndex(activeIndex)]
    if (!current) return `Review 1 of ${cards.length}`
    return `Review ${clampIndex(activeIndex) + 1} of ${cards.length}: ${current.author}`
  }, [activeIndex, cards])

  return (
    <div
      className="relative w-full overflow-visible"
      role="region"
      aria-label="Customer reviews carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault()
          prev()
        }
        if (e.key === "ArrowRight") {
          e.preventDefault()
          next()
        }
      }}
    >
      <p className="sr-only" aria-live="polite">
        {activeLabel}
      </p>

      <Reviews2DCarousel
        cards={cards}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        prefersReducedMotion={Boolean(prefersReducedMotion)}
        showReviewerPhotos={showReviewerPhotos}
      />
    </div>
  )
}

export { ThreeDPhotoCarousel }
