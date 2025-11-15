type GuaranteeProps = {
  comparison: { feature: string; lumelle: string; other: string; icon?: string }[]
}

export const GuaranteeSection = ({ comparison }: GuaranteeProps) => (
  <section className="bg-brand-blush/15 py-16">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1fr_1.2fr] md:px-6">
      <div className="rounded-3xl border border-brand-peach/50 bg-white/95 p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Risk-free</p>
        <h2 className="mt-3 font-heading text-3xl text-brand-cocoa">30-day Luxe Guarantee</h2>
        <p className="mt-3 text-brand-cocoa/75">
          Test Lumelle in your full routine. If it doesn’t keep your silk press, curls, or braids protected, send it back—no awkward questions.
        </p>
        <ul className="mt-4 space-y-2 text-brand-cocoa/80">
          <li>✓ Free UK exchanges + returns</li>
          <li>✓ WhatsApp concierge for fit and care tips</li>
          <li>✓ Secure checkout with instant order tracking</li>
        </ul>
      </div>
      <div className="rounded-3xl border border-brand-peach/40 bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Why Lumelle wins</p>
        <div className="mt-4 grid grid-cols-[1.1fr_1fr_1fr] items-center text-sm font-semibold text-brand-cocoa/70">
          <span />
          <span className="rounded-full bg-brand-blush/30 px-3 py-1 text-center text-brand-cocoa">Lumelle cap</span>
          <span className="text-center text-brand-cocoa/50">Generic cap</span>
        </div>
        <div className="mt-4 space-y-2 text-sm text-brand-cocoa/85">
          {comparison.map((row) => (
            <div key={row.feature} className="grid grid-cols-[1.1fr_1fr_1fr] items-center gap-4 rounded-2xl bg-brand-blush/10 p-4 md:bg-transparent md:p-0">
              <div className="flex items-center gap-3 rounded-2xl border border-brand-blush/30 bg-white/90 p-4 shadow-sm">
                <span className="text-lg" aria-hidden>
                  {row.icon || '✶'}
                </span>
                <span className="font-semibold text-brand-cocoa">{row.feature}</span>
              </div>
              <div className="rounded-2xl border border-brand-peach/40 bg-brand-blush/15 p-4 text-brand-cocoa">
                {row.lumelle}
              </div>
              <div className="rounded-2xl border border-brand-blush/30 bg-white p-4 text-brand-cocoa/60">
                {row.other}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-4 rounded-2xl border border-brand-peach/40 p-4 text-base font-semibold text-brand-cocoa">
            <span>Overall result</span>
            <span className="text-brand-cocoa">Keeps styles flawless for 100+ wears</span>
            <span className="text-brand-cocoa/60">Frizz, dents, and disposable waste</span>
          </div>
        </div>
      </div>
    </div>
  </section>
)
