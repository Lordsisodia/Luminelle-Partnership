import { useEffect, useMemo, useRef, useState } from 'react'
import { AdminPageLayout } from '@admin/ui/layouts'
import { CheckCircle2, Save, Star, Trash2 } from 'lucide-react'

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

const initialProducts: ProductContent[] = [
  {
    id: 'cloudsoft',
    title: 'CloudSoft™ Heatless Curl Kit',
    // Use real storefront handle so preview pulls the right PDP.
    handle: 'satin-overnight-curler',
    subtext: 'Wake up to glossy, frizz-free waves with zero heat damage.',
    price: 54,
    compare_at_price: 68,
    review_count: 50,
    average_rating: 4.8,
    badges: ['Best seller', 'Derm-tested'],
    gallery: [
      '/uploads/curler/1-960.avif',
      '/uploads/curler/2-960.avif',
      '/uploads/curler/3-960.avif',
      '/uploads/curler/4-960.avif',
    ],
    quantity_discounts: [
      { min_qty: 2, type: 'percent', value: 10 },
      { min_qty: 3, type: 'percent', value: 15 },
    ],
    sign_to_try: {
      title: 'Sign to try risk-free',
      subtext: '30-day returns. Free exchanges. Ships in 48 hours.',
    },
    why_love: {
      title: "Why you'll love it",
      subtext: 'Salon results without heat — proven to protect hair.',
      bullets: [
        { title: 'Effortless to put on', subtext: 'Wrap in 30 seconds, sleep, unveil.' },
        { title: 'Happy hair days', subtext: 'No breakage, less frizz, more shine.' },
        { title: 'Stays comfy all night', subtext: 'Cloud-soft fill + breathable silk.' },
        { title: 'Results in one sleep', subtext: 'Defined waves by morning.' },
      ],
      videos: [
        { embed_url: 'https://www.tiktok.com/@lumelle/video/123', caption: 'Real results, zero heat' },
        { embed_url: 'https://www.tiktok.com/@lumelle/video/456', caption: 'Wrap tutorial' },
      ],
    },
    materials: {
      title: 'Materials & care',
      bullets: [
        { title: 'Mulberry silk exterior', subtext: 'Gentle on hair, reduces friction.' },
        { title: 'Cloud-fill core', subtext: 'Plush support keeps shape overnight.' },
      ],
      care_notes: 'Hand-wash cold. Lay flat to dry. Do not tumble dry.',
    },
    testimonials: [
      { quote: 'My curls finally last all day without heat.', creator: '@sloane.b', role: 'Creator' },
      { quote: 'Clients ask what changed — it was this kit.', creator: 'Jess M', role: 'Stylist' },
    ],
    creators_in_action: [{ embed_url: 'https://www.tiktok.com/@lumelle/video/789', caption: 'Before/after' }],
    faq: [
      { question: 'Will it work on short hair?', answer: 'Best for shoulder-length or longer; results vary.' },
      { question: 'How long do curls last?', answer: 'Most report 24-48 hours with light hairspray.' },
    ],
  },
  {
    id: 'shower-cap',
    title: 'CloudSoft™ Shower Cap',
    handle: 'shower-cap',
    subtext: 'Keeps blowouts dry and frizz-free with cloud-soft seal.',
    price: 38,
    compare_at_price: 44,
    review_count: 100,
    average_rating: 4.7,
    badges: ['New'],
    gallery: [
      '/uploads/luminele/hero-main-960.webp',
      '/uploads/luminele/2ND PHOTO.webp',
      '/uploads/luminele/3RD PHOTO.webp',
      '/uploads/luminele/4TH PHOTO.webp',
    ],
    quantity_discounts: [{ min_qty: 2, type: 'percent', value: 10 }],
    sign_to_try: { title: 'Try it for 30 days', subtext: 'Free exchanges. Ships in 48 hours.' },
    why_love: {
      title: "Why you'll love it",
      subtext: 'Protects hair between wash days.',
      bullets: [
        { title: 'Leak-proof seal', subtext: 'Stays put without creasing hair.' },
        { title: 'Quick-dry lining', subtext: 'No mildew, no odors.' },
        { title: 'Travel-friendly', subtext: 'Packs flat in the pouch.' },
        { title: 'One size fits most', subtext: 'Adjustable soft strap.' },
      ],
      videos: [{ embed_url: 'https://www.tiktok.com/@lumelle/video/999', caption: 'Shower test' }],
    },
    materials: {
      title: 'Materials & care',
      bullets: [
        { title: 'Waterproof exterior', subtext: 'Repels steam and splashes.' },
        { title: 'Soft mesh lining', subtext: 'Gentle on curls.' },
      ],
      care_notes: 'Rinse after use. Hang to dry. Hand-wash weekly.',
    },
    testimonials: [{ quote: 'Finally a cap that doesn’t crush curls.', creator: '@liv.l', role: 'Creator' }],
    creators_in_action: [],
    faq: [{ question: 'Does it fit braids?', answer: 'Yes, the elastic is adjustable.' }],
  },
]

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
      {/* Product list */}
      <div className="grid gap-3 md:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={() => setSelectedId(p.id)} />
        ))}
      </div>

      {/* Detail view */}
      {product ? (
      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_360px]">
          <div className="space-y-6">
            {/* Breadcrumb + back */}
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3">
              <button
                onClick={() => setSelectedId(null)}
                className="text-sm font-semibold text-semantic-legacy-brand-cocoa hover:underline"
              >
                ← Back to products
              </button>
              <div className="text-sm font-semibold text-semantic-text-primary/80">{product.title}</div>
              <Pill>Handle: {product.handle}</Pill>
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

            {/* Pricing / offers minimal */}
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

            {/* Reviews metadata */}
            <section className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Reviews</p>
          </section>
          </div>

          {/* Live preview (desktop only) */}
          <div className="hidden xl:block">
            <iframe
              ref={iframeRef}
              title="Product mobile preview"
              src={`/admin/preview/product/${product.handle}`}
              className="w-[393px] max-w-full rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white"
              style={{ height: iframeHeight }}
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
