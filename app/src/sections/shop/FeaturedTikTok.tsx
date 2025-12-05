import { useCallback, useEffect, useRef, useState } from 'react'
import { successStories } from '@/content/landing'
import { SectionHeading } from '@/components/SectionHeading'

type Heading = {
  eyebrow?: string
  title?: string
  description?: string
  alignment?: 'left' | 'center' | 'right'
}

type Props = {
  heading?: Heading
  sectionId?: string
}

const defaultHeading: Heading = {
  eyebrow: 'As seen on TikTok',
  title: 'Creators using Lumelle',
  description: 'Swipe to watch a few of our favourite videos.',
  alignment: 'center',
}

export const FeaturedTikTok = ({ heading, sectionId }: Props) => {
  const stories = successStories.slice(0, 6).map((s) => ({ kind: 'embed' as const, ...s }))
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)

  const goTo = useCallback(
    (idx: number, behavior: ScrollBehavior = 'smooth') => {
      const el = scrollerRef.current
      if (!el) return
      const cards = el.querySelectorAll<HTMLElement>('[data-tiktok-card]')
      if (!cards.length) return

      const target = ((idx % cards.length) + cards.length) % cards.length
      const card = cards[target]
      const offset = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2
      el.scrollTo({ left: Math.max(0, offset), behavior })
    },
    []
  )

  const nudge = (dir: 'left' | 'right') => {
    goTo(active + (dir === 'right' ? 1 : -1))
  }

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const handleScroll = () => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-tiktok-card]'))
      if (!cards.length) return

      const viewportCenter = el.scrollLeft + el.clientWidth / 2
      let closestIdx = 0
      let smallestDistance = Number.POSITIVE_INFINITY

      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(cardCenter - viewportCenter)
        if (distance < smallestDistance) {
          smallestDistance = distance
          closestIdx = idx
        }
      })

      setActive(closestIdx)
    }

    handleScroll()
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  const resolvedHeading = {
    ...defaultHeading,
    ...heading,
    alignment: heading?.alignment ?? defaultHeading.alignment,
  }

  return (
    <section id={sectionId} className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <SectionHeading
          eyebrow={resolvedHeading.eyebrow}
          title={resolvedHeading.title ?? ''}
          description={resolvedHeading.description}
          alignment={resolvedHeading.alignment === 'right' ? 'center' : resolvedHeading.alignment}
        />

        <div
          ref={scrollerRef}
          className="relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {stories.map((s) => {
            return (
              <article key={s.handle} data-tiktok-card className="min-w-[min(90vw,420px)] snap-center">
                <div className="relative overflow-hidden rounded-3xl border border-brand-peach/40 pb-[177.77%] shadow-soft">
                  <iframe
                    src={`${s.embedUrl}?lang=en`}
                    title={`${s.name} TikTok embed`}
                    loading="lazy"
                    allow="encrypted-media; fullscreen; clipboard-write"
                    scrolling="no"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="mt-3 text-center text-sm text-brand-cocoa/70">{s.name} • {s.handle}</div>
                <div className="mt-1 hidden text-center md:block">
                  <a
                    href={s.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-brand-blush/60 px-3 py-1 text-xs font-semibold text-brand-cocoa/80 hover:bg-brand-blush/40"
                  >
                    Watch on TikTok
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </a>
                </div>
              </article>
            )
          })}
          {/* Desktop-only arrow nudges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center md:flex">
            <button
              aria-label="Scroll videos left"
              onClick={() => nudge('left')}
              className="pointer-events-auto ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-blush/60 bg-white text-brand-cocoa shadow-soft hover:bg-brand-blush/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cocoa"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center md:flex">
            <button
              aria-label="Scroll videos right"
              onClick={() => nudge('right')}
              className="pointer-events-auto mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-blush/60 bg-white text-brand-cocoa shadow-soft hover:bg-brand-blush/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cocoa"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-brand-cocoa/80">
          {stories.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to TikTok slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${i === active ? 'bg-brand-cocoa' : 'bg-brand-cocoa/30'}`}
            />
          ))}
        </div>
        <span className="sr-only" aria-live="polite">
          Showing TikTok slide {active + 1} of {stories.length}
        </span>
      </div>
    </section>
  )
}

export default FeaturedTikTok
