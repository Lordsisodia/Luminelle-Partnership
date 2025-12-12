"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
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

const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (body: string, index: number) => void
    controls: any
    cards: ReviewCard[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1800 : 2500
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
              className="absolute flex origin-center items-center justify-center rounded-xl bg-white p-3 shadow-soft border border-brand-peach/50"
              style={{
                width: `${faceWidth}px`,
                maxWidth: isScreenSizeSm ? 280 : 360,
                height: "170px",
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(card.body, i)}
            >
              <div className="pointer-events-none flex h-full w-full flex-col justify-between rounded-lg bg-white text-center py-2.5 px-2">
                <div className="flex justify-center">
                  <StarRating value={card.stars ?? 5} size={16} />
                </div>
                <p className="mt-2 text-[13px] leading-snug text-brand-cocoa">“{card.body}”</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-cocoa/80">
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
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()
  const cards = useMemo(() => (reviews?.length ? reviews : reviewFallbacks), [reviews])

  useEffect(() => {
    console.log("Cards loaded:", cards)
  }, [cards])

  const handleClick = (body: string) => {
    setActiveImg(body)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.div
              layoutId={`img-${activeImg}`}
              className="max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
              initial={{ scale: 0.85, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="flex justify-center pb-3">
                <StarRating value={5} size={18} />
              </div>
              <p className="text-lg leading-relaxed text-brand-cocoa">“{activeImg}”</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative min-h-[340px] w-full overflow-visible rounded-3xl bg-white pt-8 pb-6 md:min-h-[400px]">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel }
