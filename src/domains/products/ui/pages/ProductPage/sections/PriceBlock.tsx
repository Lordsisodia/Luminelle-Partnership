import { StarRating } from '@ui/components/StarRating'
import { useMemo, useState } from 'react'

type Props = {
  productTitle: string
  productDesc: string
  price: number
  compareAtPrice?: number
  discountPercentOverride?: number
  badge?: string
  ratingValue: number
  ratingLabel: string
  canonicalUrl: string
  onAdd: () => void
  onBuy: () => void
  isAdding: boolean
  justAdded: boolean
  quantity: number
  setQuantity: (qty: number) => void
}

type TrustMicroProps = {
  ratingValue: number
  reviewCountLabel: string
  showShipping?: boolean
  compact?: boolean
}

export const TrustMicro = ({ ratingValue, reviewCountLabel, showShipping = true, compact = false }: TrustMicroProps) => (
  <div className={`flex items-center gap-2 text-sm font-semibold text-semantic-text-primary/80 ${compact ? 'justify-center' : ''}`}>
    <div className="flex items-center gap-1.5">
      <StarRating value={ratingValue} size={15} />
      <span className="text-base font-semibold text-semantic-text-primary">{ratingValue.toFixed(1)}</span>
    </div>
    <span className="text-semantic-text-primary/75">({reviewCountLabel})</span>
    {showShipping ? <span className="text-semantic-text-primary/70">• Free returns • Ships in 48h</span> : null}
  </div>
)

export const PriceBlock = ({
  productTitle,
  productDesc,
  price,
  compareAtPrice,
  discountPercentOverride,
  badge,
  ratingValue,
  ratingLabel,
  canonicalUrl,
  onAdd,
  onBuy,
  isAdding,
  justAdded,
  quantity,
  setQuantity,
}: Props) => {
  const [isQtyOpen, setIsQtyOpen] = useState(false)

  const deliveryInfo = useMemo(() => {
    const now = new Date()
    const midnight = new Date(now)
    midnight.setDate(now.getDate() + 1)
    midnight.setHours(0, 0, 0, 0)
    const diffMs = midnight.getTime() - now.getTime()
    const hours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)))
    const minutes = Math.max(0, Math.floor((diffMs / (1000 * 60)) % 60))

    const deliveryDate = new Date(now)
    deliveryDate.setDate(now.getDate() + 2)
    const deliveryLabel = deliveryDate.toLocaleDateString(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })

    return { hours, minutes, deliveryLabel }
  }, [])

  return (
    <div className="space-y-5 text-semantic-text-primary min-w-0 w-full md:pl-0">
      <div>
        <div className="mt-2 flex items-start gap-3">
          <h1 className="font-heading text-[1.95rem] font-bold leading-tight md:text-4xl">{productTitle}</h1>
          <button
            type="button"
            aria-label="Share product"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white text-semantic-text-primary shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: productTitle, url: canonicalUrl }).catch(() => undefined)
              } else {
                navigator.clipboard?.writeText(canonicalUrl).catch(() => undefined)
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
              <path d="M16 6l-4-4-4 4" />
              <path d="M12 2v14" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-semantic-text-primary/70">{productDesc}</p>
        <button
          type="button"
          onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="mt-2 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-legacy-brand-cocoa/40"
          aria-label="Jump to reviews"
        >
          <TrustMicro ratingValue={ratingValue} reviewCountLabel={ratingLabel} showShipping={false} />
        </button>
        <div className="mt-2">
          {compareAtPrice && compareAtPrice > price ? (
            <>
              <div className="flex items-baseline gap-3">
                <span className="text-xl font-semibold text-rose-600 md:text-2xl">
                  -{discountPercentOverride ?? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}%
                </span>
                <span className="text-4xl font-bold text-semantic-text-primary leading-tight md:text-[2.75rem]">£{price.toFixed(2)}</span>
              </div>
              <div className="mt-1 text-sm font-semibold text-semantic-text-primary/70">
                RRP: <span className="line-through">£{compareAtPrice.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <span className="text-4xl font-bold text-semantic-text-primary leading-tight md:text-[2.75rem]">£{price.toFixed(2)}</span>
          )}
        </div>
        {badge && badge.toLowerCase() !== 'buy 2, save 10%' && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-semantic-text-primary shadow-soft">
            {badge}
          </div>
        )}
        <div className="mt-3 text-sm text-semantic-text-primary text-left">
          <div className="font-semibold tracking-[0.02em]"><span className="uppercase">Free</span> delivery {deliveryInfo.deliveryLabel}</div>
          <div className="text-semantic-text-primary/80">Order within {deliveryInfo.hours} hrs {deliveryInfo.minutes.toString().padStart(2, '0')} mins for earliest dispatch</div>
        </div>
        <div className="mt-3 space-y-1">
          <div className="relative">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-base font-semibold text-semantic-text-primary shadow-soft focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/30"
              onClick={() => setIsQtyOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={isQtyOpen}
            >
              <div className="flex flex-col items-start leading-snug">
                <span>{`Quantity: ${quantity}`}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/70">Buy 2, save 10%</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isQtyOpen ? 'rotate-180' : ''} transition-transform`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {isQtyOpen && (
              <div className="absolute left-0 right-0 z-10 mt-2 rounded-2xl border border-semantic-legacy-brand-blush/70 bg-white shadow-lg">
                <ul role="listbox" className="max-h-56 overflow-auto py-2 text-semantic-text-primary">
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <li key={qty} role="option" aria-selected={qty === quantity}>
                      <button
                        type="button"
                        className={`flex w-full items-center justify-between px-4 py-2 text-left hover:bg-semantic-legacy-brand-blush/10 ${qty === quantity ? 'font-semibold' : ''}`}
                        onClick={() => {
                          setQuantity(qty)
                          setIsQtyOpen(false)
                        }}
                      >
                        <span>{`Quantity: ${qty}`}</span>
                        {qty >= 2 ? <span className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">Save 10%</span> : <span className="text-xs text-semantic-text-primary/60">Standard</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          <button
            className={`inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-semantic-accent-cta to-semantic-legacy-brand-cocoa px-6 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.14)] ${justAdded ? 'animate-pulse' : ''}`}
            onClick={onAdd}
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add to Basket'}
          </button>
          <button
            className="inline-flex w-full items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.12)]"
            onClick={onBuy}
            disabled={isAdding}
          >
            {isAdding ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
