import { StarRating } from '@/components/StarRating'
import { ShieldCheck } from 'lucide-react'

export const SocialProofStrip = ({
  data,
}: {
  data: { rating: number; count: number; tagline: string }
}) => {
  const badges = ['TikTok Shop', 'Trustpilot Verified']
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand-peach/50 bg-white/95 p-4 text-center shadow-soft md:flex-row md:items-center md:justify-between md:text-left">
      <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
        <StarRating value={data.rating} />
        <span className="text-sm text-brand-cocoa/80">
          {data.rating.toFixed(1)} ({data.count.toLocaleString()}) — {data.tagline}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">
        {badges.map((badge) => (
          <span key={badge} className="inline-flex items-center gap-1 rounded-full bg-brand-blush/40 px-3 py-1 text-[10px] tracking-[0.24em] text-brand-cocoa/80">
            <ShieldCheck className="h-3 w-3 text-brand-peach" />
            {badge}
          </span>
        ))}
      </div>
      <a
        href="#reviews"
        className="inline-flex items-center justify-center rounded-full border border-brand-cocoa/20 px-4 py-2 text-sm font-semibold text-brand-cocoa hover:border-brand-cocoa"
      >
        See all reviews
      </a>
    </div>
  )
}
