type CompetitiveCalloutProps = {
  onJoinClick: () => void
}

export const CompetitiveCallout = ({
  onJoinClick,
}: CompetitiveCalloutProps) => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl rounded-3xl border border-brand-peach/50 bg-brand-peach/40 px-6 py-12 text-center text-brand-cocoa shadow-soft md:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-cocoa/70">
          Challenge Drop
        </p>
        <h3 className="mt-4 font-heading text-3xl md:text-4xl">
          Think you can top this month&apos;s leaderboard?
        </h3>
        <p className="mt-3 text-base text-brand-cocoa/80">
          The top three creators unlock Platinum perks for the next month—
          including 30% commission and co-created campaigns with Lumelle.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={onJoinClick}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-cocoa px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-cocoa/90"
          >
            Claim your slot
          </button>
          <span className="text-xs uppercase tracking-[0.28em] text-brand-cocoa/60">
            New leaderboard snapshot every Friday
          </span>
        </div>
      </div>
    </section>
  )
}
