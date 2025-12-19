type CtaRibbonProps = {
  headline: string
  subtext?: string
  ctaLabel: string
  ctaHref: string
}

export function CtaRibbon({ headline, subtext, ctaLabel, ctaHref }: CtaRibbonProps) {
  return (
    <div className="w-full bg-brand-porcelain text-semantic-text-primary">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div>
          <div className="text-sm font-semibold">{headline}</div>
          {subtext ? <div className="text-xs text-semantic-text-primary/70">{subtext}</div> : null}
        </div>
        <a
          href={ctaHref}
          className="inline-flex items-center rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}

export default CtaRibbon
