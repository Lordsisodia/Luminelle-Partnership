import { SectionHeading } from '@ui/components/SectionHeading'
import { leaderboardEntries } from '@/content/landing'

type LeaderboardSectionProps = {
  onJoinClick: () => void
}

export const LeaderboardSection = ({
  onJoinClick,
}: LeaderboardSectionProps) => {
  return (
    <section
      id="leaderboard"
      className="scroll-mt-24 bg-semantic-legacy-brand-blush/15 py-20 text-semantic-text-primary md:scroll-mt-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Leaderboard"
          title="Top creators this month"
          description="A snapshot from our creator program. Join WhatsApp for leaderboard updates and announcements."
          actions={
            <button
              type="button"
              onClick={onJoinClick}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-semantic-accent-cta px-5 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft hover:-translate-y-0.5 hover:bg-semantic-accent-cta/90"
            >
              Claim your slot
            </button>
          }
        />
        <div className="mt-10 overflow-hidden rounded-3xl border border-semantic-accent-cta/40 bg-white/95 shadow-sm">
          <table className="min-w-full divide-y divide-semantic-legacy-brand-blush/40 text-left text-sm">
            <thead className="bg-semantic-legacy-brand-blush/30 text-xs uppercase tracking-[0.28em] text-semantic-text-primary/60">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Creator</th>
                <th className="px-4 py-3">Handle</th>
                <th className="px-4 py-3 text-right">Units sold</th>
                <th className="px-4 py-3 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-semantic-legacy-brand-blush/30 text-semantic-text-primary/80">
              {leaderboardEntries.map((entry) => (
                <tr key={entry.handle}>
                  <td className="px-4 py-4 font-heading text-xl text-semantic-text-primary">
                    #{entry.rank}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={entry.avatarSrc}
                        alt={entry.avatarAlt}
                        className="h-12 w-12 rounded-full object-cover"
                        loading="lazy"
                      />
                      <span className="font-semibold text-semantic-text-primary">
                        {entry.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-semantic-text-primary">
                    {entry.handle}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold text-semantic-text-primary">
                    {entry.sold}
                  </td>
                  <td className="px-4 py-4 text-right">
                    {entry.trend === 'up' ? (
                      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">
                        Rising
                      </span>
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
                        Steady
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.28em] text-semantic-text-primary/50">
          Snapshot · Join WhatsApp for leaderboard updates
        </p>
      </div>
    </section>
  )
}
