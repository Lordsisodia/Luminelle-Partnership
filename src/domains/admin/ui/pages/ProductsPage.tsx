import { useEffect, useMemo, useRef, useState } from 'react'
import { AdminPageLayout } from '@admin/ui/layouts'
import { CheckCircle2, Save, Star, Trash2 } from 'lucide-react'
import { DEFAULT_VIDEO_SLOT, productConfigs } from '@/domains/products/data/product-config'
import type { ProductConfig } from '@/domains/products/data/product-types'

type QtyDiscount = { min_qty: number; type: 'percent' | 'fixed'; value: number }
type Bullet = { title: string; subtext: string }
type Video = { embed_url: string; caption?: string }
type Testimonial = { quote: string; creator: string; role?: string }
type Faq = { question: string; answer: string }

type ProductContent = {
  id: string
  title: string
  handle: string
  subtext: string
  price: number
  compare_at_price?: number
  review_count?: number
  average_rating?: number
  badges: string[]
  gallery: string[]
  quantity_discounts: QtyDiscount[]
  sign_to_try: { title: string; subtext: string }
  why_love: { title: string; subtext: string; bullets: Bullet[]; videos: Video[] }
  materials: { title: string; bullets: Bullet[]; care_notes: string }
  testimonials: Testimonial[]
  creators_in_action: Video[]
  faq: Faq[]
}

const parseCountLabel = (label?: string): number | undefined => {
  if (!label) return undefined
  const n = Number(label.replace(/[^0-9]/g, ''))
  if (!Number.isFinite(n) || n <= 0) return undefined
  return n
}

const uniq = <T,>(list: T[]) => Array.from(new Set(list))

const videoToEmbedUrl = (value: string) => value.replace(/^video:\/\//, '')

const toAdminProduct = (cfg: ProductConfig): ProductContent => {
  const videoSlot = cfg.videoSlot ?? DEFAULT_VIDEO_SLOT
  const baseGallery = cfg.gallery ?? []
  const gallery = uniq([...baseGallery.filter((src) => src !== videoSlot), videoSlot])

  const qtyDiscountPercent = (() => {
    const badge = (cfg.badge ?? '').toLowerCase()
    const m = badge.match(/save\s+(\d{1,2})%/)
    if (!m) return undefined
    const v = Number(m[1])
    return Number.isFinite(v) ? v : undefined
  })()

  const reasons = cfg.reasons ?? []
  const care = cfg.care ?? []
  const feature = cfg.featureCallouts

  const featureVideo = feature?.mediaSrc?.startsWith('video://')
    ? [{ embed_url: videoToEmbedUrl(feature.mediaSrc), caption: feature.mediaLabel ?? feature.mediaNote }]
    : []

  return {
    id: cfg.handle,
    title: cfg.defaultTitle,
    handle: cfg.handle,
    subtext: cfg.defaultSubtitle,
    price: cfg.defaultPrice ?? 0,
    compare_at_price: cfg.compareAtPrice,
    review_count: parseCountLabel(cfg.ratingCountLabelOverride),
    average_rating: cfg.ratingValueOverride,
    badges: cfg.badge ? [cfg.badge] : [],
    gallery,
    quantity_discounts: qtyDiscountPercent ? [{ min_qty: 2, type: 'percent', value: qtyDiscountPercent }] : [],
    sign_to_try: { title: 'Your sign to try this', subtext: 'Free 30-day returns · Ships in 48h' },
    why_love: {
      title: feature?.heading?.title ?? "Why you'll love it",
      subtext: feature?.heading?.description ?? '',
      bullets: reasons.map((r) => ({ title: r.title, subtext: r.desc })),
      videos: featureVideo,
    },
    materials: {
      title: cfg.careLabelOverride ?? 'Care & materials',
      bullets: care.map((c) => ({ title: c.title, subtext: c.body })),
      care_notes: '',
    },
    testimonials: [],
    creators_in_action: [],
    faq: (cfg.qa ?? []).map((q) => ({ question: q.q, answer: q.a })),
  }
}

const ADMIN_HIDDEN_HANDLES = new Set<string>(['satin-overnight-curler-set'])

const initialProducts: ProductContent[] = Object.values(productConfigs)
  .filter((cfg) => !ADMIN_HIDDEN_HANDLES.has(cfg.handle))
  .map(toAdminProduct)
  .sort((a, b) => a.title.localeCompare(b.title))

function Field({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm font-semibold text-semantic-text-primary">
        <span>{label}</span>
      </div>
      {description ? <p className="text-sm text-semantic-text-primary/70">{description}</p> : null}
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (val: string) => void; placeholder?: string }) {
  return (
    <input
      className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm text-semantic-text-primary shadow-sm focus:border-semantic-legacy-brand-cocoa focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string
  onChange: (val: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <textarea
      className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm text-semantic-text-primary shadow-sm focus:border-semantic-legacy-brand-cocoa focus:outline-none"
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-porcelain px-2.5 py-1 text-[11px] font-semibold text-semantic-text-primary/80">
      {children}
    </span>
  )
}

// (legacy preview removed; iframe handles preview rendering)

function ProductCard({ product, onOpen }: { product: ProductContent; onOpen: () => void }) {
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price
  return (
    <button
      className="flex w-full flex-col gap-0 overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow"
      onClick={onOpen}
    >
      {product.gallery[0] ? (
        <div className="h-40 w-full overflow-hidden bg-brand-porcelain">
          <img src={product.gallery[0]} alt={product.title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      ) : null}
      <div className="space-y-2 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-semibold text-semantic-text-primary">{product.title}</div>
          <Pill>{product.handle}</Pill>
        </div>
        <div className="text-xs text-semantic-text-primary/70 line-clamp-2">{product.subtext}</div>
        <div className="flex items-baseline gap-2 text-semantic-text-primary">
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
          {hasDiscount ? (
            <span className="text-sm text-semantic-text-primary/60 line-through">${product.compare_at_price?.toFixed(2)}</span>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-semantic-text-primary/70">
          {product.average_rating ? (
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {product.average_rating.toFixed(1)}
            </span>
          ) : null}
          {product.review_count ? <span>• {product.review_count} reviews</span> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {product.badges.slice(0, 3).map((b) => (
            <span key={b} className="rounded-full bg-brand-porcelain px-2 py-1 text-[11px] font-semibold text-semantic-text-primary/80">
              {b}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductContent[]>(initialProducts)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [snapshots, setSnapshots] = useState<Record<string, string>>(() =>
    Object.fromEntries(initialProducts.map((p) => [p.id, JSON.stringify(p)])),
  )
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [iframeHeight, setIframeHeight] = useState(844)

  const product = selectedId ? products.find((p) => p.id === selectedId) : null

  const dirty = useMemo(() => {
    if (!product) return false
    return JSON.stringify(product) !== snapshots[product.id]
  }, [product, snapshots])

  const updateProduct = (updater: (p: ProductContent) => ProductContent) => {
    if (!product) return
    setProducts((prev) => prev.map((p) => (p.id === product.id ? updater(p) : p)))
  }

  // Send draft to iframe preview for live mobile render
  useEffect(() => {
    if (!product || !iframeRef.current) return
    iframeRef.current.contentWindow?.postMessage(
      {
        type: 'admin-draft-product',
        handle: product.handle,
        payload: {
          productTitle: product.title,
          productDesc: product.subtext,
          price: product.price,
          gallery: product.gallery,
        },
      },
      '*',
    )
  }, [product])

  // Listen for height messages from iframe preview
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'pdpHeight' && typeof event.data.height === 'number') {
        // Clamp to iPhone-ish height while allowing slight growth if content overflows.
        setIframeHeight(Math.min(Math.max(event.data.height, 844), 1400))
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  const handleSave = async () => {
    if (!product) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setSnapshots((prev) => ({ ...prev, [product.id]: JSON.stringify(product) }))
    setSaving(false)
    setLastSavedAt(new Date())
  }

  return (
    <AdminPageLayout
      title="Products"
      subtitle="Select a product to edit storefront copy, offers, and sections."
      actions={
        <div className="flex items-center gap-2">
          <Pill>{products.length} products</Pill>
          {lastSavedAt && product ? (
            <span className="flex items-center gap-1 text-xs text-semantic-text-primary/70">
              <CheckCircle2 className="h-4 w-4 text-green-600" /> Saved {lastSavedAt.toLocaleTimeString()}
            </span>
          ) : null}
          <button
            disabled={saving || !dirty}
            onClick={handleSave}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
              saving || !dirty
                ? 'cursor-not-allowed bg-semantic-text-primary/10 text-semantic-text-primary/50'
                : 'bg-semantic-legacy-brand-cocoa text-white hover:opacity-90'
            }`}
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      }
    >
      {/* Product list (only when none selected) */}
      {!product ? (
        <div className="grid gap-3 md:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={() => setSelectedId(p.id)} />
          ))}
        </div>
      ) : null}

      {/* Detail view */}
      {product ? (
      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_360px]">
          <div className="space-y-6">
            {/* Breadcrumb + back + switcher */}
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3">
              <button
                onClick={() => setSelectedId(null)}
                className="text-sm font-semibold text-semantic-legacy-brand-cocoa hover:underline"
              >
                ← Back to products
              </button>
              <div className="text-sm font-semibold text-semantic-text-primary/80">{product.title}</div>
              <Pill>Handle: {product.handle}</Pill>
              <div className="flex items-center gap-2 text-sm text-semantic-text-primary/70">
                <span>Switch:</span>
                <select
                  className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                  value={product.id}
                  onChange={(e) => setSelectedId(e.target.value)}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hero basics */}
            <section className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Hero</p>
              <Field label="Title">
                <TextInput value={product.title} onChange={(v) => updateProduct((p) => ({ ...p, title: v }))} />
              </Field>
              <Field label="Subtext / hero description">
                <TextArea value={product.subtext} onChange={(v) => updateProduct((p) => ({ ...p, subtext: v }))} />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Price">
                  <TextInput
                    value={product.price.toString()}
                    onChange={(v) => updateProduct((p) => ({ ...p, price: Number(v) || 0 }))}
                  />
                </Field>
                <Field label="Compare at (discounted from)">
                  <TextInput
                    value={product.compare_at_price?.toString() || ''}
                    onChange={(v) => updateProduct((p) => ({ ...p, compare_at_price: v ? Number(v) : undefined }))}
                  />
                </Field>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Number of reviews">
                  <TextInput
                    value={(product.review_count ?? '').toString()}
                    onChange={(v) => updateProduct((p) => ({ ...p, review_count: v ? Number(v) : undefined }))}
                  />
                </Field>
                <Field label="Average rating (1-5)">
                  <TextInput
                    value={(product.average_rating ?? '').toString()}
                    onChange={(v) => updateProduct((p) => ({ ...p, average_rating: v ? Number(v) : undefined }))}
                  />
                </Field>
              </div>
              <Field label="Badges">
                <div className="flex flex-wrap gap-2">
                  {product.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/60 bg-brand-porcelain px-3 py-1 text-xs font-semibold text-semantic-text-primary"
                    >
                      {badge}
                      <button
                        aria-label="Remove badge"
                        onClick={() => updateProduct((p) => ({ ...p, badges: p.badges.filter((_, i) => i !== idx) }))}
                        className="text-semantic-text-primary/60 hover:text-semantic-text-primary"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    className="text-xs font-semibold text-semantic-legacy-brand-cocoa"
                    onClick={() => updateProduct((p) => ({ ...p, badges: [...p.badges, 'New badge'] }))}
                  >
                    + Add badge
                  </button>
                </div>
              </Field>
            </section>
            {/* Gallery */}
            <section className="space-y-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Gallery</p>
              <div className="space-y-2">
                {product.gallery.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 px-3 py-2"
                  >
                    <TextInput
                      value={item}
                      onChange={(v) =>
                        updateProduct((p) => ({
                          ...p,
                          gallery: p.gallery.map((g, i) => (i === idx ? v : g)),
                        }))
                      }
                      placeholder="Image or video URL"
                    />
                    <button
                      className="inline-flex items-center gap-1 text-xs text-semantic-text-primary/70 hover:text-semantic-text-primary"
                      onClick={() => updateProduct((p) => ({ ...p, gallery: p.gallery.filter((_, i) => i !== idx) }))}
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                ))}
                <button
                  className="text-xs font-semibold text-semantic-legacy-brand-cocoa"
                  onClick={() => updateProduct((p) => ({ ...p, gallery: [...p.gallery, ''] }))}
                >
                  + Add media
                </button>
              </div>
            </section>

            {/* Pricing */}
            <section className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Pricing</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Price">
                  <TextInput
                    value={product.price.toString()}
                    onChange={(v) => updateProduct((p) => ({ ...p, price: Number(v) || 0 }))}
                  />
                </Field>
                <Field label="Compare at (discounted from)">
                  <TextInput
                    value={product.compare_at_price?.toString() || ''}
                    onChange={(v) => updateProduct((p) => ({ ...p, compare_at_price: v ? Number(v) : undefined }))}
                  />
                </Field>
              </div>
            </section>

                      </div>

          {/* Live preview (desktop only) */}
          <div className="hidden xl:block">
            <iframe
              ref={iframeRef}
              title="Product mobile preview"
              src={`/admin/preview/product/${product.handle}`}
              className="w-[340px] max-w-full rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white"
              style={{ height: iframeHeight, display: "block" }}
              scrolling="yes"
            />
          </div>
        </div>
      ) : null}

      {/* Save bar duplicate for mobile */}
      {product ? (
        <div className="flex justify-end">
          <button
            disabled={saving || !dirty}
            onClick={handleSave}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
              saving || !dirty
                ? 'cursor-not-allowed bg-semantic-text-primary/10 text-semantic-text-primary/50'
                : 'bg-semantic-legacy-brand-cocoa text-white hover:opacity-90'
            }`}
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      ) : null}
    </AdminPageLayout>
  )
}
