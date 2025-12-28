type CompetitiveCalloutProps = {
  onJoinClick: () => void
}

export const CompetitiveCallout = ({
  onJoinClick,
}: CompetitiveCalloutProps) => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl rounded-3xl border border-semantic-accent-cta/50 bg-semantic-accent-cta/40 px-6 py-12 text-center text-semantic-text-primary shadow-soft md:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-semantic-text-primary/70">
          Challenge Drop
        </p>
        <h3 className="mt-4 font-heading text-3xl md:text-4xl">
          Think you can top this month&apos;s leaderboard?
        </h3>
        <p className="mt-3 text-base text-semantic-text-primary/80">
          The top three creators unlock Platinum perks for the next month—
          including 20% commission boosters and co-created campaigns with
          Lumelle.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={onJoinClick}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-semantic-legacy-brand-cocoa/90"
          >
            Claim your slot
          </button>
          <span className="text-xs uppercase tracking-[0.28em] text-semantic-text-primary/60">
            New leaderboard snapshot every Friday
          </span>
        </div>
      </div>
    </section>
  )
}
