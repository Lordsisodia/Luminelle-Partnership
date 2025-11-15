type Props = {
  data: {
    headline: string
    subhead: string
    bullets: string[]
    ctaLabel: string
    ctaHref: string
  }
}

export const FinalCtaSection = ({ data }: Props) => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-4xl rounded-[3rem] border border-brand-peach/40 bg-gradient-to-br from-[#F9D8D0] via-[#FCEBE3] to-[#FDE7DA] p-8 text-center shadow-[0_25px_80px_rgba(249,165,138,0.35)] md:p-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Limited restock • Only 250 caps left</p>
      <h2 className="mt-4 font-heading text-4xl text-brand-cocoa">{data.headline}</h2>
      <p className="mt-3 text-lg text-brand-cocoa/80">{data.subhead}</p>
      <ul className="mt-6 flex flex-col gap-3 text-left text-brand-cocoa/85 md:flex-row md:justify-center md:text-center">
        {data.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center justify-center gap-2 text-base">
            <span className="text-brand-cocoa">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href={data.ctaHref}
          className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-brand-cocoa px-10 py-3 text-lg font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          {data.ctaLabel}
        </a>
        <a
          href="https://wa.me/message/lumellecaps"
          className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-brand-cocoa/30 px-10 py-3 text-lg font-semibold text-brand-cocoa/80 hover:border-brand-cocoa"
        >
          Chat with a stylist
        </a>
      </div>
      <p className="mt-4 text-sm text-brand-cocoa/70">Need sizing or routine advice? Our WhatsApp team answers in under 5 minutes.</p>
    </div>
  </section>
)
