import { Crown, Gift, Sparkles, Trophy } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import {
  commissionDetails,
  rewardHighlights,
  rewardTiers,
  weekOneRoadmap,
} from '@/content/landing'

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
      className="bg-white py-20 text-brand-cocoa"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Rewards & Earnings"
          title="Stack commissions, bonuses, and prizes"
          description="We reward momentum. Hit your numbers and graduate tiers for bigger percentages, cash boosts, and luxury experiences."
        />
        <div className="mt-12 grid gap-8">
          <div className="grid gap-4 rounded-3xl border border-brand-peach/40 bg-white/90 p-6 shadow-inner md:grid-cols-2">
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
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {rewardTiers.map((tier) => (
              <article
                key={tier.name}
                className="rounded-3xl border border-brand-peach/40 bg-brand-blush/20 p-6 shadow-inner"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">
                      {tier.range}
                    </p>
                    <h3 className="font-heading text-2xl text-brand-cocoa">
                      {tier.name} tier
                    </h3>
                  </div>
                  {tier.callout ? (
                    <span className="rounded-full bg-brand-peach/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa">
                      {tier.callout}
                    </span>
                  ) : null}
                </div>
                <ul className="mt-4 space-y-2 text-sm text-brand-cocoa/80">
                  {tier.rewards.map((reward) => (
                    <li key={reward} className="flex gap-2">
                      <span className="mt-[6px] inline-flex size-1.5 rounded-full bg-brand-cocoa/60" />
                      <span>{reward}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="flex flex-col gap-8">
            <article className="rounded-3xl border border-brand-peach/40 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-2xl">Commission breakdown</h3>
              <ul className="mt-4 space-y-3 text-sm text-brand-cocoa/75">
                {commissionDetails.map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="font-semibold text-brand-cocoa">
                      {item.label}
                    </span>
                    <span>{item.details}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-brand-peach/40 bg-brand-blush/20 p-6 shadow-inner">
              <h3 className="font-heading text-2xl">Week-one roadmap</h3>
              <ul className="mt-4 space-y-3 text-sm text-brand-cocoa/75">
                {weekOneRoadmap.map((step) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-semibold text-brand-cocoa">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
