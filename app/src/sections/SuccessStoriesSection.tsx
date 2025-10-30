import { SectionHeading } from '@/components/SectionHeading'
import { successStories } from '@/content/landing'

export const SuccessStoriesSection = () => {
  const [featured, ...others] = successStories

  return (
    <section
      id="success"
      className="mx-auto max-w-6xl px-4 py-20 text-brand-cocoa md:px-6"
    >
      <SectionHeading
        eyebrow="Creator Proof"
        title="Real wins from the community"
        description="These creators started with the same WhatsApp message. Now they lead with confidence, consistent conversions, and repeatable frameworks."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr,1fr]">
        <article className="rounded-3xl border border-brand-peach/40 bg-white/90 p-6 shadow-soft">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-peach/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa/70">
            Featured
            {featured.badge ? (
              <span className="font-normal normal-case text-brand-cocoa">
                {featured.badge}
              </span>
            ) : null}
          </span>
          <div className="mt-4 flex flex-col gap-6 md:flex-row">
            <div className="flex-shrink-0">
              <img
                src={featured.avatarSrc}
                alt={featured.avatarAlt}
                className="h-20 w-20 rounded-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="font-heading text-2xl">{featured.name}</h3>
                <p className="text-sm text-brand-cocoa/60">
                  {featured.handle}
                </p>
              </div>
              <p className="text-lg font-semibold text-brand-cocoa">
                {featured.highlight}
              </p>
              <p className="text-sm text-brand-cocoa/70">
                {featured.stats} · {featured.earnings}
              </p>
              <blockquote className="rounded-2xl bg-brand-blush/40 p-4 text-sm leading-relaxed text-brand-cocoa/80">
                “{featured.quote}”
              </blockquote>
              <div className="overflow-hidden rounded-2xl border border-brand-peach/40">
                <iframe
                  src={`${featured.embedUrl}?lang=en`}
                  title={`${featured.name} TikTok embed`}
                  loading="lazy"
                  allow="encrypted-media; fullscreen; clipboard-write"
                  className="h-72 w-full"
                />
              </div>
            </div>
          </div>
        </article>
        <div className="grid gap-6">
          {others.map((story) => (
            <article
              key={story.handle}
              className="rounded-3xl border border-brand-peach/30 bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft"
            >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-4">
                  <img
                    src={story.avatarSrc}
                    alt={story.avatarAlt}
                    className="h-16 w-16 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-heading text-xl">{story.name}</h4>
                      <p className="text-xs uppercase tracking-[0.28em] text-brand-cocoa/60">
                        {story.handle}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-brand-cocoa">
                      {story.highlight}
                    </p>
                    <p className="text-xs uppercase tracking-[0.28em] text-brand-cocoa/50">
                      {story.stats} · {story.earnings}
                    </p>
                    <p className="text-sm text-brand-cocoa/75">“{story.quote}”</p>
                    <div className="overflow-hidden rounded-xl border border-brand-peach/30">
                      <iframe
                        src={`${story.embedUrl}?lang=en`}
                        title={`${story.name} TikTok embed`}
                        loading="lazy"
                        allow="encrypted-media; fullscreen; clipboard-write"
                        className="h-64 w-full"
                      />
                    </div>
                  </div>
                </div>
              </article>
          ))}
        </div>
      </div>
    </section>
  )
}
