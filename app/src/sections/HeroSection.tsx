import { heroContent, metricBadges } from '@/content/landing'

type HeroSectionProps = {
  onPrimaryAction: () => void
  onSecondaryAction: () => void
}

export const HeroSection = ({
  onPrimaryAction,
  onSecondaryAction,
}: HeroSectionProps) => {
  return (
    <section
      id="hero"
      className="bg-brand-blush/10 pb-16 pt-20 text-brand-cocoa md:pt-28"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 md:flex-row md:items-center md:px-6">
        <div className="flex-1 space-y-6">
          <span className="inline-flex rounded-full bg-brand-blush/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/70">
            {heroContent.eyebrow}
          </span>
          <h1 className="font-heading text-4xl leading-tight md:text-5xl">
            {heroContent.headline}
          </h1>
          <p className="max-w-xl text-lg text-brand-cocoa/80">
            {heroContent.subheadline}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-peach px-8 py-3 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-peach/90"
            >
              {heroContent.primaryCta}
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-peach/60 px-8 py-3 text-sm font-semibold text-brand-cocoa/80 transition hover:border-brand-peach hover:text-brand-cocoa"
            >
              {heroContent.secondaryCta}
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {metricBadges.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-brand-peach/40 bg-white/90 px-4 py-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">
                  {metric.label}
                </p>
                <p className="mt-2 font-heading text-2xl">{metric.value}</p>
                <p className="mt-1 text-sm text-brand-cocoa/65">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[3rem] border border-brand-peach/60 shadow-[0_40px_80px_rgba(251,199,178,0.35)]">
            <img
              src={heroContent.imageSrc}
              alt={heroContent.imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-cocoa/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/85 p-5 shadow-soft backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">
                Creator prize highlight
              </p>
              <div className="mt-2 flex flex-col gap-2 text-brand-cocoa sm:flex-row sm:items-center sm:justify-between">
                <p className="font-heading text-2xl leading-snug">
                  This month’s bonus drops
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">
                  Spa day · Cash boosts · Product drops
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
