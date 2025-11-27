export const FinalCtaSection = () => (
  <section className="bg-white py-16 px-4 md:px-6">
    <div className="mx-auto max-w-4xl rounded-[3rem] border border-brand-peach/40 bg-gradient-to-br from-[#F9D8D0] via-[#FCEBE3] to-[#FDE7DA] p-8 text-center shadow-[0_25px_80px_rgba(249,165,138,0.35)] md:p-12">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Rewards • Prizes • Surprises</p>
      <h2 className="mt-4 font-heading text-4xl text-brand-cocoa">Log in to spin the wheel and win prizes</h2>
      <p className="mt-3 text-lg text-brand-cocoa/80">Unlock instant rewards, bundle boosts, and exclusive creator-only perks.</p>
      <ul className="mt-6 flex flex-col gap-3 text-left text-brand-cocoa/85 md:flex-row md:justify-center md:text-center">
        <li className="flex items-center justify-center gap-2 text-base">
          <span className="text-brand-cocoa">•</span>
          Surprise discounts up to 15%
        </li>
        <li className="flex items-center justify-center gap-2 text-base">
          <span className="text-brand-cocoa">•</span>
          Extra entry for “Buy 2, save 10%”
        </li>
        <li className="flex items-center justify-center gap-2 text-base">
          <span className="text-brand-cocoa">•</span>
          Free shipping spins over £19.99
        </li>
      </ul>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href="/sign-in"
          className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-brand-cocoa px-10 py-3 text-lg font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          Log in & Spin
        </a>
      </div>
      <p className="mt-4 text-sm text-brand-cocoa/70">No purchase necessary to spin. Prizes include discounts, free shipping, and bundle bonuses.</p>
    </div>
  </section>
)
