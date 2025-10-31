import { Crown, Gift, Sparkles, Trophy } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { rewardHighlights, rewardTiers } from '@/content/landing'

const highlightIconMap = {
  Gift,
  Crown,
  Sparkles,
  Trophy,
} as const

export const ValueStackSection = () => {
  return (
    <section
      id="rewards"
      className="scroll-mt-24 bg-white py-20 text-brand-cocoa md:scroll-mt-32"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Rewards & Earnings"
          title="Stack commissions, bonuses, and prizes"
          description="We reward momentum. Finish the month on the leaderboard to unlock cash, experiences, and long-term retainers."
          alignment="center"
        />
        <div className="mt-12 grid gap-4 rounded-3xl border border-brand-peach/40 bg-white/90 p-6 shadow-inner sm:grid-cols-2">
          {rewardHighlights.map((highlight) => {
            const Icon = highlightIconMap[highlight.icon]
            return (
              <div
                key={highlight.title}
                className="flex flex-col gap-2 rounded-2xl bg-brand-blush/30 p-4"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-peach/60 text-brand-cocoa">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-heading text-lg text-brand-cocoa">
                  {highlight.title}
                </p>
                <p className="text-sm text-brand-cocoa/70">
                  {highlight.description}
                </p>
              </div>
            )
          })}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {rewardTiers.map((tier) => (
            <article
              key={tier.name}
              className="flex h-full flex-col justify-between rounded-3xl border border-brand-peach/40 bg-brand-blush/20 p-6 text-center shadow-inner"
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">
                  {tier.range}
                </p>
                <h3 className="font-heading text-2xl text-brand-cocoa">
                  {tier.name} reward
                </h3>
                <div className="space-y-2 text-sm text-brand-cocoa/75">
                  {tier.rewards.map((reward) => (
                    <p key={reward}>{reward}</p>
                  ))}
                </div>
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-brand-cocoa/60">
                Retainer invitations follow every podium finish.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
