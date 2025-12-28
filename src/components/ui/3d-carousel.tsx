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
  body: string
  stars?: number
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

const ReviewCardOrnaments = () => (
  <>
    <div className="pointer-events-none absolute inset-0 rounded-[15px] bg-[radial-gradient(700px_circle_at_20%_0%,rgba(231,197,106,0.22),transparent_55%)]" />
    <div className="pointer-events-none absolute inset-0 rounded-[15px] ring-1 ring-inset ring-[#E7C56A]/30" />
    <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#E7C56A]/40 to-transparent" />

    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="pointer-events-none absolute left-3 top-3 h-6 w-6 text-[#C9A227]/45"
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
      className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-[#E7C56A]/55"
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

const ReviewCardContent = ({ review }: { review: ReviewCard }) => (
  <div className="pointer-events-none relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[15px] bg-white px-4 py-3 text-center">
    <ReviewCardOrnaments />
    <div className="relative flex justify-center">
      <StarRating value={review.stars ?? 5} size={16} />
    </div>
    <p className="relative mt-2 text-[13px] leading-snug text-semantic-text-primary">“{review.body}”</p>
    <p className="relative mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-semantic-text-primary/80">
      {review.author}
    </p>
  </div>
)

const Reviews2DCarousel = memo(
  ({
    cards,
    activeIndex,
    onActiveIndexChange,
    prefersReducedMotion,
  }: {
    cards: ReviewCard[]
    activeIndex: number
    onActiveIndexChange: (index: number) => void
    prefersReducedMotion: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const itemWidth = isScreenSizeSm ? 208 : 280
    const itemHeight = 156
    const gapPx = 12
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
        <div
          ref={listRef}
          className="flex w-full gap-3 overflow-x-auto px-4 pb-1 pt-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
              <div className="rounded-2xl bg-gradient-to-br from-[#E7C56A]/55 via-white to-brand-blush/40 p-[1px] shadow-[0_18px_45px_rgba(18,16,15,0.12)]">
                <div style={{ height: `${itemHeight}px` }}>
                  <ReviewCardContent review={card} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

function ThreeDPhotoCarousel({ reviews }: { reviews?: ReviewCard[] }) {
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
    <div className="relative">
      <div
        className="relative w-full overflow-visible rounded-3xl border border-semantic-border-subtle bg-[linear-gradient(180deg,#FFFFFF_0%,#FDF8F6_100%)] pt-8 pb-6 shadow-[0_26px_70px_rgba(251,199,178,0.12)] md:pt-10"
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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(800px_circle_at_50%_0%,rgba(231,197,106,0.12),transparent_60%)]"
        />
        <div className="mx-auto flex w-full max-w-[520px] items-center justify-between px-4 md:px-6">
          <button
            type="button"
            onClick={prev}
            className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-4 py-2 text-xs font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60 focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/25"
            aria-label="Previous review"
          >
            ← Prev
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
            Reviews
          </p>
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-4 py-2 text-xs font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60 focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/25"
            aria-label="Next review"
          >
            Next →
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {activeLabel}
        </p>

        <div className="relative">
          <Reviews2DCarousel
            cards={cards}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            prefersReducedMotion={Boolean(prefersReducedMotion)}
          />
        </div>
      </div>
    </div>
  )
}

export { ThreeDPhotoCarousel }
