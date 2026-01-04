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

type AvatarSources = {
  avif?: string
  webp?: string
  jpg: string
}

const fallbackAvatarKeys = ["rachel", "shannon", "randomlife"] as const

const hashString = (input: string) => {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return hash
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

const getFallbackAvatarSources = (key: (typeof fallbackAvatarKeys)[number]): AvatarSources => {
  const base = `/images/avatar-${key}`
  return {
    avif: `${base}-320.avif`,
    webp: `${base}-320.webp`,
    jpg: `${base}.jpg`,
  }
}

const getAvatarSources = (review: ReviewCard): AvatarSources => {
  if (review.image) return { jpg: review.image }
  const seed = review.author?.trim() || "customer"
  const index = Math.abs(hashString(seed)) % fallbackAvatarKeys.length
  return getFallbackAvatarSources(fallbackAvatarKeys[index] ?? "rachel")
}

const ReviewCardOrnaments = () => (
  <>
    <div className="pointer-events-none absolute inset-0 rounded-[15px] bg-[radial-gradient(700px_circle_at_20%_0%,rgba(253,212,220,0.55),transparent_55%)]" />
    <div className="pointer-events-none absolute inset-0 rounded-[15px] ring-1 ring-inset ring-brand-blush/55" />
    <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-peach/45 to-transparent" />

    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="pointer-events-none absolute left-3 top-3 h-6 w-6 text-brand-peach/55"
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
      className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-brand-peach/55"
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

const ReviewCardContent = ({ review }: { review: ReviewCard }) => {
  const avatar = getAvatarSources(review)

  return (
    <div className="pointer-events-none relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[15px] bg-brand-blush/30 px-4 py-3 text-center">
      <ReviewCardOrnaments />
      <div className="relative flex justify-center">
        <StarRating value={review.stars ?? 5} size={16} />
      </div>
      <p className="relative mt-2 text-[13px] leading-snug text-semantic-text-primary">“{review.body}”</p>
      <div className="relative mt-3 flex items-center justify-center gap-2">
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/70 ring-1 ring-brand-blush/55">
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-semantic-text-primary/80"
          >
            {getInitials(review.author)}
          </span>
          <picture className="relative z-10 block h-full w-full">
            {avatar.avif ? <source srcSet={avatar.avif} type="image/avif" /> : null}
            {avatar.webp ? <source srcSet={avatar.webp} type="image/webp" /> : null}
            <img
              src={avatar.jpg}
              alt={`${review.author} profile photo`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.style.display = "none"
              }}
            />
          </picture>
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-semantic-text-primary/80">
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
          className="flex w-full gap-3 overflow-x-auto px-4 pb-1 pt-3 md:pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
              <div className="rounded-2xl bg-gradient-to-br from-brand-blush/70 via-white to-brand-peach/60 p-[1px] shadow-[0_18px_45px_rgba(251,199,178,0.18)]">
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
      />
    </div>
  )
}

export { ThreeDPhotoCarousel }
