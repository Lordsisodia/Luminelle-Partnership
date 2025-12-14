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
    <div className="border-b border-semantic-legacy-brand-blush/40 bg-white/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:px-6">
        <div className="text-center text-semantic-text-primary md:text-center md:flex md:flex-col md:items-center">
          <div className="flex flex-col items-center gap-1 text-sm text-semantic-text-primary/80 md:flex-row md:gap-3 md:justify-center">
            <StarRating value={rating} size={18} />
            <span className="font-semibold">
              {rating.toFixed(1)} ({count.toLocaleString()}) — {tagline}
            </span>
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-semantic-text-primary/60">
            Source: TikTok Shop + verified store reviews
          </p>
        </div>

        <div className="grid w-full gap-3 text-semantic-text-primary/80 md:grid-cols-3 md:gap-4">
          {quickFacts.map((fact) => {
            const Icon = fact.icon
            return (
              <div
                key={fact.label}
                className="flex items-center gap-3 rounded-2xl border border-semantic-legacy-brand-blush/50 bg-semantic-legacy-brand-blush/20 px-5 py-4 shadow-soft md:px-6 md:py-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-semantic-text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">{fact.label}</p>
                  <p className="text-sm font-medium text-semantic-text-primary">{fact.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
