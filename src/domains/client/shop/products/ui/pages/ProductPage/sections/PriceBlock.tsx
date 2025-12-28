import { useEffect, useState } from 'react'
import { StarRating } from '@ui/components/StarRating'
import { FREE_SHIPPING_THRESHOLD_LABEL, MAX_CART_ITEM_QTY } from '@/config/constants'

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
  const [shareToast, setShareToast] = useState<string | null>(null)

  useEffect(() => {
    if (!shareToast) return
    const id = window.setTimeout(() => setShareToast(null), 2000)
    return () => window.clearTimeout(id)
  }, [shareToast])

  return (
    <div className="space-y-5 text-semantic-text-primary min-w-0 w-full md:pl-0">
      <div>
        <div id="pdp-hero-text" className="h-0 scroll-mt-24" />
        <div className="mt-2 flex items-start gap-3">
          <h1 className="font-heading text-[1.95rem] font-bold leading-tight md:text-4xl">{productTitle}</h1>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            {shareToast ? (
              <span className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1 text-xs font-semibold text-semantic-text-primary shadow-soft">
                {shareToast}
              </span>
            ) : null}
            <button
              type="button"
              aria-label="Share product"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white text-semantic-text-primary shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({ title: productTitle, url: canonicalUrl })
                    setShareToast('Shared')
                  } catch {
                    // User cancelled / share not completed — avoid noisy errors.
                  }
                  return
                }

                try {
                  if (navigator.clipboard?.writeText) {
                    await navigator.clipboard.writeText(canonicalUrl)
                    setShareToast('Link copied')
                    return
                  }

                  window.prompt('Copy this link:', canonicalUrl)
                  setShareToast('Copy link')
                } catch {
                  window.prompt('Copy this link:', canonicalUrl)
                  setShareToast('Copy link')
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
        </div>
        <p className="mt-2 text-semantic-text-primary/70">{productDesc}</p>
        <div id="pdp-hero-reviews" className="h-0 scroll-mt-24" />
        <button
          type="button"
          onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="mt-2 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-legacy-brand-cocoa/40"
          aria-label="Jump to reviews"
        >
          <TrustMicro ratingValue={ratingValue} reviewCountLabel={ratingLabel} showShipping={false} />
        </button>
        <div id="pdp-hero-price" className="h-0 scroll-mt-24" />
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
        <div id="pdp-hero-badge" className="h-0 scroll-mt-24" />
        {badge && badge.toLowerCase() !== 'buy 2, save 10%' && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-semantic-text-primary shadow-soft">
            {badge}
          </div>
        )}
        <div className="mt-3 text-sm text-semantic-text-primary text-left">
          <div className="font-semibold tracking-[0.02em]">Free shipping {FREE_SHIPPING_THRESHOLD_LABEL}</div>
          <div className="text-semantic-text-primary/80">Dispatch target: 48h · Free 30-day returns</div>
        </div>
        <div className="mt-3 space-y-1">
          <div className="relative">
            <label htmlFor="pdp-quantity" className="sr-only">
              Quantity
            </label>
            <select
              id="pdp-quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => {
                const next = Number(e.target.value)
                if (Number.isFinite(next) && next >= 1) setQuantity(next)
              }}
              className="flex w-full appearance-none items-center justify-between rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 pr-12 text-base font-semibold text-semantic-text-primary shadow-soft focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/30"
            >
              {Array.from({ length: MAX_CART_ITEM_QTY }, (_, i) => i + 1).map((qty) => (
                <option key={qty} value={qty}>
                  {`Quantity: ${qty} — £${(price * qty).toFixed(2)}`}
                </option>
              ))}
            </select>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-semantic-text-primary/70"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          <button
            className={`inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-semantic-accent-cta to-semantic-legacy-brand-cocoa px-6 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.14)] ${justAdded ? 'motion-safe:animate-pulse motion-reduce:animate-none' : ''}`}
            onClick={onAdd}
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
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
