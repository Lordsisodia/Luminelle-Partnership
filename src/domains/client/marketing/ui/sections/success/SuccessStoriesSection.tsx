import { SectionHeading } from '@ui/components/SectionHeading'
import { successStories } from '@/content/landing'
import { useEffect, useState } from 'react'
import { LazyVisible } from '@ui/components/LazyVisible'

export const SuccessStoriesSection = () => {
  const [featured, ...others] = successStories
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
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr,1fr]">
        <article className="rounded-3xl border border-semantic-accent-cta/40 bg-white/90 p-6 shadow-soft">
          <span className="inline-flex items-center gap-2 rounded-full bg-semantic-accent-cta/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/70">
            Featured
            {featured.badge ? (
              <span className="font-normal normal-case text-semantic-text-primary">
                {featured.badge}
              </span>
            ) : null}
          </span>
          <div className="mt-4 flex flex-col gap-6 md:flex-row">
            <div className="flex flex-shrink-0 items-center justify-center">
              <img
                src={featured.avatarSrc}
                alt={featured.avatarAlt}
                className="h-20 w-20 rounded-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-4 md:flex-1">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="font-heading text-2xl font-bold text-semantic-text-primary">
                  {featured.name}
                </h3>
                <p className="text-sm font-medium text-semantic-text-primary/70">
                  {featured.handle}
                </p>
              </div>
              <p className="text-lg font-semibold text-semantic-text-primary text-center md:text-left">
                {featured.highlight}
              </p>
              <p className="text-sm text-semantic-text-primary/70 text-center leading-relaxed md:text-left">
                {featured.stats} · {featured.earnings}
              </p>
              <blockquote className="rounded-2xl bg-semantic-legacy-brand-blush/40 p-4 text-sm leading-relaxed text-semantic-text-primary/80">
                <p className="whitespace-pre-line">{featured.quote}</p>
              </blockquote>
              <LazyVisible
                placeholder={
                  <div className="relative overflow-hidden rounded-2xl border border-semantic-accent-cta/40 pb-[178%] bg-semantic-legacy-brand-blush/20" />
                }
              >
                <div className="relative overflow-hidden rounded-2xl border border-semantic-accent-cta/40 pb-[178%] bg-black">
                  {hydrated ? (
                    <iframe
                      src={featured.embedUrl.includes('lang=') ? featured.embedUrl : `${featured.embedUrl}&lang=en`}
                      title={`${featured.name} TikTok embed`}
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
            </div>
          </div>
        </article>
        <div className="grid gap-6">
          {others.map((story) => (
            <article
              key={story.handle}
              className="rounded-3xl border border-semantic-accent-cta/30 bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:gap-4 md:text-left">
                <img
                  src={story.avatarSrc}
                  alt={story.avatarAlt}
                  className="h-16 w-16 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="space-y-2 md:flex-1">
                  <div className="space-y-1">
                    <h4 className="font-heading text-xl font-bold text-semantic-text-primary">
                      {story.name}
                    </h4>
                    <p className="text-sm font-medium text-semantic-text-primary/70">
                      {story.handle}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-semantic-text-primary">
                    {story.highlight}
                  </p>
                  <p className="text-sm text-semantic-text-primary/65">
                    {story.stats} · {story.earnings}
                  </p>
                  <p className="text-sm text-semantic-text-primary/75 leading-relaxed">
                    “{story.quote}”
                  </p>
                  <LazyVisible
                    placeholder={
                      <div className="relative overflow-hidden rounded-xl border border-semantic-accent-cta/30 pb-[178%] bg-semantic-legacy-brand-blush/20" />
                    }
                  >
                    <div className="relative overflow-hidden rounded-xl border border-semantic-accent-cta/30 pb-[178%] bg-black">
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
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
