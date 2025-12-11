import { StarRating } from '@ui/components/StarRating'
import { Users, ShieldCheck, Truck } from 'lucide-react'

type Props = {
  rating: number
  count: number
  tagline: string
}

export const HeroProofStrip = ({ rating, count, tagline }: Props) => {
  const quickFacts = [
    { label: 'Proven', value: 'Protects hair', icon: ShieldCheck },
    { label: 'Dispatch', value: '48 hrs ship time', icon: Truck },
    { label: 'Guarantee', value: 'Free returns in 30 days', icon: Users },
  ]

  return (
    <div className="border-b border-brand-blush/40 bg-white/95">
      <div className="mx-auto flex flex-col gap-3 px-4 py-5 md:max-w-6xl md:flex-row md:items-center md:justify-between md:px-6 md:gap-4">
        <div className="text-center text-brand-cocoa md:text-left md:min-w-[260px]">
          <div className="flex flex-col items-center gap-1 text-sm text-brand-cocoa/80 md:flex-row md:gap-3">
            <StarRating value={rating} size={18} />
            <span className="font-semibold">
              {rating.toFixed(1)} ({count.toLocaleString()}) — {tagline}
            </span>
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-brand-cocoa/60">
            Source: TikTok Shop + verified store reviews
          </p>
        </div>
        <div className="grid w-full gap-3 text-brand-cocoa/80 md:grid-cols-3 md:gap-4">
          {quickFacts.map((fact) => {
            const Icon = fact.icon
            return (
              <div
                key={fact.label}
                className="flex items-center gap-3 rounded-2xl border border-brand-blush/50 bg-brand-blush/20 px-5 py-4 shadow-soft md:px-6 md:py-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-cocoa">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa/60">{fact.label}</p>
                  <p className="text-sm font-medium text-brand-cocoa">{fact.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
