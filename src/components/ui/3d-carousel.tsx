"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { motion, useAnimation, useMotionValue, useTransform, useReducedMotion } from "framer-motion"
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

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
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

const Carousel = memo(
  ({
    controls,
    cards,
    isCarouselActive,
  }: {
    controls: any
    cards: ReviewCard[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1200 : 1600
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center bg-transparent"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
            willChange: isCarouselActive ? "transform" : "auto",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((card, i) => (
            <motion.div
              key={`key-${card.author}-${i}`}
              className="absolute flex origin-center items-center justify-center rounded-xl bg-white p-3 shadow-md border border-semantic-accent-cta/50"
              style={{
                width: `${faceWidth}px`,
                maxWidth: isScreenSizeSm ? 240 : 320,
                height: "160px",
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <div className="pointer-events-none flex h-full w-full flex-col justify-between rounded-lg bg-white text-center py-2.5 px-2">
                <div className="flex justify-center">
                  <StarRating value={card.stars ?? 5} size={16} />
                </div>
                <p className="mt-2 text-[13px] leading-snug text-semantic-text-primary">“{card.body}”</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-semantic-text-primary/80">
                  {card.author}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

function ThreeDPhotoCarousel({ reviews }: { reviews?: ReviewCard[] }) {
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!wrapperRef.current || prefersReducedMotion) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px", threshold: 0.15 }
    )
    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  const isCarouselActive = !prefersReducedMotion && isVisible
  const controls = useAnimation()
  const cards = useMemo(() => (reviews?.length ? reviews : reviewFallbacks), [reviews])

  return (
    <motion.div layout className="relative" ref={wrapperRef}>
      <div className="relative min-h-[340px] w-full overflow-visible rounded-3xl bg-white pt-8 pb-6 md:min-h-[400px]">
        <Carousel
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel }
