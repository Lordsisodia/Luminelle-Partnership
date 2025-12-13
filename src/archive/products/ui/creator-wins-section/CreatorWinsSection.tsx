import type { HomeConfig } from '@content/home.types'

type Props = {
  stats: HomeConfig['stats']
}

export const CreatorWinsSection = ({ stats }: Props) => (
  <section className="bg-white py-16">
    <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Creator results</p>
        <h2 className="mt-3 font-heading text-3xl font-bold leading-snug text-brand-cocoa md:text-4xl">
          Real stats from the Lumelle community
        </h2>
        <p className="mt-2 text-brand-cocoa/75">
          From TikTok sellouts to spa-day payouts, Lumelle caps are trusted by creators who need their hair protected on camera.
          Tap to watch their routines or read every review before you buy.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#ugc"
            className="inline-flex items-center rounded-full border border-brand-cocoa/20 px-5 py-2 text-sm font-semibold text-brand-cocoa transition hover:border-brand-cocoa"
          >
            View creator routines
          </a>
          <a
            href="#reviews"
            className="inline-flex items-center rounded-full bg-brand-peach px-5 py-2 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-peach/90"
          >
            Read reviews
          </a>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-brand-peach/50 bg-white/95 p-5 text-center shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
            <p className="font-heading text-3xl font-bold text-brand-cocoa">{stat.value}</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-brand-cocoa/60">{stat.label}</p>
            {stat.helper ? <p className="mt-1 text-sm text-brand-cocoa/70">{stat.helper}</p> : null}
          </div>
        ))}
      </div>
    </div>
  </section>
)
