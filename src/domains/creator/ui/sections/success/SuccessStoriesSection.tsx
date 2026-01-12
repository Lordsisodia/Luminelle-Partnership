import { SectionHeading } from '@ui/components/SectionHeading'
import { successStories } from '@/content/landing'
import { useEffect, useState } from 'react'
import { LazyVisible } from '@ui/components/LazyVisible'

export const SuccessStoriesSection = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return (
    <section
      id="success"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 text-semantic-text-primary md:scroll-mt-32 md:px-6"
    >
      <SectionHeading
        eyebrow="Creator Proof"
        title="Real wins from the community"
        description="These creators started with the same WhatsApp message. Now they lead with confidence, consistent conversions, and repeatable frameworks."
        alignment="center"
      />
      <div
        className="mt-12 flex gap-5 overflow-x-auto px-1 pb-2 sm:px-2 lg:px-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {successStories.map((story) => (
          <article
            key={story.handle}
            className="min-w-[min(85vw,420px)] snap-center rounded-3xl border border-semantic-accent-cta/35 bg-white/92 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] md:min-w-[400px] lg:min-w-[420px]"
          >
            <div className="mb-3 text-center">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
                <span className="text-semantic-text-primary/60">{story.handle}</span>
              </div>
              <h3 className="mt-2 font-heading text-2xl font-bold text-semantic-text-primary leading-tight">{story.name}</h3>
              <p className="mt-1 text-sm text-semantic-text-primary/70">{story.stats} · {story.earnings}</p>
            </div>

            <p className="mt-3 text-sm font-semibold text-semantic-text-primary/90 leading-relaxed">{story.highlight}</p>
            <p className="mt-2 text-sm text-semantic-text-primary/75 leading-relaxed">“{story.quote}”</p>

            <LazyVisible
              placeholder={
                <div className="relative overflow-hidden rounded-2xl border border-semantic-accent-cta/30 pb-[158%] bg-semantic-legacy-brand-blush/20" />
              }
            >
              <div className="relative overflow-hidden rounded-2xl border border-semantic-accent-cta/30 pb-[158%] bg-black">
                {hydrated ? (
                  <iframe
                    src={story.embedUrl.includes('lang=') ? story.embedUrl : `${story.embedUrl}&lang=en`}
                    title={`${story.name} TikTok embed`}
                    loading="lazy"
                    allow="encrypted-media; fullscreen; clipboard-write"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                    style={{ border: 0 }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-semantic-legacy-brand-blush/20 text-semantic-text-primary/60 text-xs">
                    Loading…
                  </div>
                )}
              </div>
            </LazyVisible>
          </article>
        ))}
      </div>
    </section>
  )
}
