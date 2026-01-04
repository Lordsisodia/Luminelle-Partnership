import { Star } from 'lucide-react'
import { productConfigs } from '@client/shop/products/data/product-config'
import React from 'react'

export type AdminProductCard = {
  id: string
  handle: string
  // Optional: additional handles that redirect to this canonical handle.
  // Used for admin clarity when legacy/alias handles still exist in Supabase.
  alias_handles?: string[]
  title: string
  short_desc: string
  long_desc: string
  price: number | null
  compare_at_price: number | null
  discount_percent_override: number | null
  average_rating: number | null
  review_count: number | null
  review_count_label: string
  badge: string
  video_slot: string
  care_label_override: string
  hide_details_accordion: boolean
  fallback_variant_id: string
  fallback_item_id: string
  specs_text: string
  faq_text: string
  status: string
  updated_at?: string
  media: AdminMediaItem[]
}

// Alias for shared usage
export type AdminProduct = AdminProductCard

export type AdminMediaItem = {
  id?: string
  path: string
  alt: string
  sort: number
  is_primary: boolean
}

const prettyTitle = (raw: string) =>
  raw
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase())

const formatUpdatedAt = (value?: string) => {
  if (!value) return null
  const ts = Date.parse(value)
  if (!Number.isFinite(ts)) return null

  const deltaMs = Math.max(0, Date.now() - ts)
  const seconds = Math.floor(deltaMs / 1000)
  if (seconds < 10) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`

  return new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-porcelain px-2.5 py-1 text-[11px] font-semibold text-semantic-text-primary/80">
      {children}
    </span>
  )
}

export function ProductCard({ product, onOpen }: { product: AdminProductCard; onOpen: () => void }) {
  const cfg = productConfigs[product.handle] ?? Object.values(productConfigs).find((c) => c.handle === product.handle)
  const hero =
    product.media.find((m) => m.is_primary)?.path ?? product.media[0]?.path ?? cfg?.gallery?.[0] ?? cfg?.featureCallouts?.mediaSrc ?? null
  const price = product.price ?? cfg?.defaultPrice ?? 0
  const compareAtPrice = product.compare_at_price ?? cfg?.compareAtPrice ?? null
  const hasDiscount = compareAtPrice != null && compareAtPrice > price
  const aliases = Array.isArray(product.alias_handles) ? product.alias_handles.filter(Boolean) : []
  const aliasLabel =
    aliases.length > 0 ? (aliases.length === 1 ? aliases[0] : `${aliases[0]} +${aliases.length - 1}`) : null
  const pctOff =
    hasDiscount && compareAtPrice
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
      : product.discount_percent_override ?? cfg?.discountPercentOverride ?? null
  const title = prettyTitle(product.title || cfg?.defaultTitle || (cfg as any)?.title || product.handle)
  const subtitle = product.short_desc || cfg?.defaultSubtitle || (cfg as any)?.hero?.description || ''
  const avgRating = product.average_rating ?? cfg?.ratingValueOverride ?? null
  const ratingLabel =
    product.review_count_label ||
    (product.review_count != null ? String(product.review_count) : undefined) ||
    cfg?.ratingCountLabelOverride ||
    null
  const updatedLabel = formatUpdatedAt(product.updated_at)

  return (
    <button
      className="flex w-full flex-col gap-0 overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow"
      onClick={onOpen}
    >
      {hero ? (
        <div className="h-64 w-full overflow-hidden bg-brand-porcelain">
          <img src={hero} alt={title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      ) : null}
      <div className="space-y-2 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="text-base font-semibold text-semantic-text-primary line-clamp-1">{title}</div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Pill>{product.handle}</Pill>
            {aliasLabel ? <Pill>Alias: {aliasLabel}</Pill> : null}
          </div>
        </div>
        <div className="text-xs text-semantic-text-primary/70 line-clamp-2">{subtitle || 'No description yet'}</div>
        <div className="flex items-baseline gap-2 text-semantic-text-primary">
          <span className="text-lg font-semibold">£{price.toFixed(2)}</span>
          {hasDiscount && compareAtPrice != null ? (
            <>
              <span className="text-sm text-semantic-text-primary/60 line-through">£{compareAtPrice.toFixed(2)}</span>
              {pctOff ? <span className="text-sm font-semibold text-rose-600">-{pctOff}%</span> : null}
            </>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-semantic-text-primary/70">
          {avgRating != null ? (
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {avgRating.toFixed(1)}
            </span>
          ) : null}
          {ratingLabel ? <span>• {ratingLabel} reviews</span> : null}
          {compareAtPrice && hasDiscount ? <span className="text-rose-600 font-semibold">Sale</span> : null}
          {updatedLabel ? <span className="text-semantic-text-primary/60">Updated {updatedLabel}</span> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {product.badge ? (
            <span className="rounded-full bg-brand-porcelain px-2 py-1 text-[11px] font-semibold text-semantic-text-primary/80">
              {product.badge}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  )
}

export default ProductCard
