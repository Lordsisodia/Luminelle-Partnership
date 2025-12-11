import { trustSignals } from '@/content/landing'

export const ProofBand = () => {
  return (
    <section className="border-y border-brand-blush/60 bg-white py-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 text-sm text-brand-cocoa/70 md:grid-cols-3 md:px-6">
        {trustSignals.map((signal) => (
          <div
            key={signal.label}
            className="flex flex-col items-center gap-1 text-center md:flex-row md:items-baseline md:justify-center md:text-left"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/50">
              {signal.label}
            </span>
            <span className="font-heading text-xl text-brand-cocoa">
              {signal.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
