import { StarRating } from '@ui/components/StarRating'
import { Users, ShieldCheck, Truck } from 'lucide-react'

type Props = {
  rating: number
  count: number
  tagline: string
  facts?: { label: string; value: string }[]
}

export const HeroProofStrip = ({ rating, count, tagline, facts: factsProp }: Props) => {
  const defaultFacts = [
    { label: 'Satin', value: 'Satin-smooth finish', icon: ShieldCheck },
    { label: 'Dispatch', value: 'Fast dispatch', icon: Truck },
    { label: 'Returns', value: 'Free returns in 30 days', icon: Users },
  ]
  const icons = [ShieldCheck, Truck, Users]
  const facts = (() => {
    if (!Array.isArray(factsProp) || factsProp.length === 0) return defaultFacts
    const normalized = factsProp.map((item, idx) => {
      const fallback = defaultFacts[idx] ?? defaultFacts[0]
      const Icon = icons[idx] ?? fallback.icon
      return {
        label: item?.label?.trim() ? item.label : fallback.label,
        value: item?.value?.trim() ? item.value : fallback.value,
        icon: Icon,
      }
    })
    while (normalized.length < defaultFacts.length) {
      const idx = normalized.length
      const fallback = defaultFacts[idx] ?? defaultFacts[0]
      normalized.push({ label: fallback.label, value: fallback.value, icon: icons[idx] ?? fallback.icon })
    }
    return normalized.slice(0, defaultFacts.length)
  })()

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
        </div>

        <div className="grid w-full gap-3 text-semantic-text-primary/80 md:grid-cols-3 md:gap-4">
          {facts.map((fact, idx) => {
            const Icon = fact.icon
            return (
              <div
                key={fact.label}
                id={`pdp-proof-item-${idx + 1}`}
                className="scroll-mt-24 flex items-center gap-3 rounded-2xl border border-semantic-legacy-brand-blush/50 bg-semantic-legacy-brand-blush/20 px-5 py-4 shadow-soft md:px-6 md:py-4"
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
