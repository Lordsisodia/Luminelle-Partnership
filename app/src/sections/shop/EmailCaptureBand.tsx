import { Lock } from 'lucide-react'

export const EmailCaptureBand = () => (
  <section className="bg-brand-blush/20 py-12">
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 text-center md:px-6">
      <h3 className="font-heading text-2xl font-bold text-brand-cocoa">Get 10% off your first order</h3>
      <p className="text-sm font-serif text-brand-cocoa/80">Join for exclusive creator tutorials, drops, and early access.</p>
      <form className="flex w-full max-w-xl flex-col items-stretch gap-2 sm:flex-row" aria-label="Newsletter signup">
        <div className="w-full text-left">
          <label htmlFor="landing-email" className="block text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">
            Email address
          </label>
          <input
            id="landing-email"
            type="email"
            required
            className="mt-2 w-full rounded-2xl border border-brand-blush/60 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-peach"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          className="rounded-2xl bg-brand-cocoa px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          Subscribe
        </button>
      </form>
      <p className="flex items-center gap-2 text-xs text-brand-cocoa/60">
        <Lock className="h-4 w-4" aria-hidden /> Secure signup. No spam, unsubscribe anytime.
      </p>
    </div>
  </section>
)
