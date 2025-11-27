import { useRef } from 'react'
import { successStories } from '@/content/landing'
import { homeConfig } from '@/content/home.config'
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
  title: 'Creators using Lumelle, unfiltered',
  description: 'Swipe to watch a few of our favourite videos.',
  alignment: 'center',
}

export const FeaturedTikTok = ({ heading, sectionId }: Props) => {
  const mainClip = homeConfig.mainCreatorClip
  const stories = [
    ...successStories.slice(0, 3).map((s) => ({ kind: 'embed' as const, ...s })),
    {
      kind: 'image' as const,
      title: mainClip.title,
      description: mainClip.description,
      stat: mainClip.stat,
      image: mainClip.image,
      href: mainClip.ctaHref,
    },
  ]
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const nudge = (dir: 'left' | 'right') => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.min(420, el.clientWidth * 0.8)
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
  }

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

        <div ref={scrollerRef} className="relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {stories.map((s, idx) => {
            if (s.kind === 'embed') {
              return (
                <article key={s.handle} className="min-w-[min(90vw,420px)] snap-center">
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
            }

            return (
              <article key={`main-${idx}`} className="min-w-[min(90vw,420px)] snap-center">
                <div className="relative overflow-hidden rounded-3xl border border-brand-peach/40 pb-[133%] shadow-soft">
                  <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-black/75" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/80">From Lumelle HQ</p>
                    <h3 className="mt-2 font-heading text-2xl leading-tight">{s.title}</h3>
                    <p className="mt-1 text-sm text-white/85">{s.description}</p>
                    {s.stat ? <p className="mt-2 text-xs text-white/70">{s.stat}</p> : null}
                    {s.href ? (
                      <a
                        href={s.href}
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-brand-cocoa shadow-soft"
                      >
                        See the full brief →
                      </a>
                    ) : null}
                  </div>
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
      </div>
    </section>
  )
}

export default FeaturedTikTok
