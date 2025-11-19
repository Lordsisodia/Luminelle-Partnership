import { useRef } from 'react'
import { SectionHeading } from '@/components/SectionHeading'

export type UseImage = { src: string; alt: string; caption: string }

type Heading = {
  eyebrow?: string
  title?: string
  description?: string
  alignment?: 'left' | 'center' | 'right'
}

type Props = {
  items: UseImage[]
  heading?: Heading
  sectionId?: string
}

const defaultHeading: Heading = {
  title: 'Real‑world results',
  alignment: 'center',
}

export const RealWorldUseCarousel = ({ items, heading, sectionId }: Props) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const nudge = (dir: 'left' | 'right') => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.min(360, el.clientWidth * 0.8)
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: reduce ? 'auto' : 'smooth' })
  }
  const resolvedHeading = {
    ...defaultHeading,
    ...heading,
    alignment: heading?.alignment ?? defaultHeading.alignment,
  }
  return (
    <section id={sectionId} className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        {resolvedHeading.title ? (
          <SectionHeading
            eyebrow={resolvedHeading.eyebrow}
            title={resolvedHeading.title}
            description={resolvedHeading.description}
            alignment={resolvedHeading.alignment === 'right' ? 'center' : resolvedHeading.alignment}
          />
        ) : null}
        <div ref={scrollerRef} className="relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {items.map((m, i) => (
            <figure key={i} className="min-w-[min(85vw,380px)] snap-center">
              <img src={m.src} alt={m.alt} loading="lazy" className="h-[520px] w-full rounded-3xl border border-brand-blush/60 object-cover" />
              <figcaption className="mt-2 text-center text-sm text-brand-cocoa/80">{m.caption}</figcaption>
            </figure>
          ))}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden items-center md:flex">
            <button aria-label="Scroll left" onClick={() => nudge('left')} className="pointer-events-auto ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-blush/60 bg-white text-brand-cocoa shadow-soft hover:bg-brand-blush/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cocoa">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center md:flex">
            <button aria-label="Scroll right" onClick={() => nudge('right')} className="pointer-events-auto mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-blush/60 bg-white text-brand-cocoa shadow-soft hover:bg-brand-blush/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cocoa">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RealWorldUseCarousel
