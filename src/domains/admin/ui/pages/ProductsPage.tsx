import { useMemo, useState } from 'react'
import { AdminPageLayout } from '@admin/ui/layouts'
import { CheckCircle2, Save, Trash2 } from 'lucide-react'

type QtyDiscount = { min_qty: number; type: 'percent' | 'fixed'; value: number }
type Bullet = { title: string; subtext: string }
type Video = { embed_url: string; caption?: string }
type Testimonial = { quote: string; creator: string; role?: string }
type Faq = { question: string; answer: string }

type ProductContent = {
  title: string
  handle: string
  subtext: string
  price: number
  compare_at_price?: number
  review_count?: number
  average_rating?: number
  quantity_discounts: QtyDiscount[]
  sign_to_try: { title: string; subtext: string }
  badges: string[]
  why_love: { title: string; subtext: string; bullets: Bullet[]; videos: Video[] }
  materials: { title: string; bullets: Bullet[]; care_notes: string }
  testimonials: Testimonial[]
  creators_in_action: Video[]
  faq: Faq[]
}

const initialProduct: ProductContent = {
  title: 'CloudSoft™ Heatless Curl Kit',
  handle: 'cloudsoft-heatless-curl-kit',
  subtext: 'Wake up to glossy, frizz-free waves with zero heat damage.',
  price: 54,
  compare_at_price: 68,
  review_count: 1426,
  average_rating: 4.8,
  quantity_discounts: [
    { min_qty: 2, type: 'percent', value: 10 },
    { min_qty: 3, type: 'percent', value: 15 },
  ],
  sign_to_try: {
    title: 'Sign to try risk-free',
    subtext: '30-day returns. Free exchanges. Ships in 48 hours.',
  },
  badges: ['Best seller', 'Derm-tested'],
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
  creators_in_action: [
    { embed_url: 'https://www.tiktok.com/@lumelle/video/789', caption: 'Before/after' },
  ],
  faq: [
    { question: 'Will it work on short hair?', answer: 'Best for shoulder-length or longer; results vary.' },
    { question: 'How long do curls last?', answer: 'Most report 24-48 hours with light hairspray.' },
  ],
}

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

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}) {
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
}: {
  value: string
  onChange: (val: string) => void
  rows?: number
}) {
  return (
    <textarea
      className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm text-semantic-text-primary shadow-sm focus:border-semantic-legacy-brand-cocoa focus:outline-none"
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
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

export default function ProductsPage() {
  const [product, setProduct] = useState<ProductContent>(initialProduct)
  const [saving, setSaving] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)

  const dirty = useMemo(() => JSON.stringify(product) !== JSON.stringify(initialProduct), [product])

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 650)) // simulate API
    setSaving(false)
    setLastSavedAt(new Date())
  }

  return (
    <AdminPageLayout
      title="Products"
      subtitle="Edit storefront copy, offers, and sections for each product. (Mocked locally until wired to Supabase.)"
      actions={
        <div className="flex items-center gap-2">
          {lastSavedAt ? (
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
      {/* Basics */}
      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Product</p>
              <h2 className="text-xl font-semibold text-semantic-text-primary">Basics</h2>
            </div>
            <Pill>Handle: {product.handle}</Pill>
          </div>

          <Field label="Title">
            <TextInput value={product.title} onChange={(v) => setProduct((p) => ({ ...p, title: v }))} />
          </Field>

          <Field label="Subtext / hero description">
            <TextArea value={product.subtext} onChange={(v) => setProduct((p) => ({ ...p, subtext: v }))} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Price">
              <TextInput
                value={product.price.toString()}
                onChange={(v) => setProduct((p) => ({ ...p, price: Number(v) || 0 }))}
              />
            </Field>
            <Field label="Compare at (discounted from)">
              <TextInput
                value={product.compare_at_price?.toString() || ''}
                onChange={(v) => setProduct((p) => ({ ...p, compare_at_price: v ? Number(v) : undefined }))}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Number of reviews">
              <TextInput
                value={(product.review_count ?? '').toString()}
                onChange={(v) => setProduct((p) => ({ ...p, review_count: v ? Number(v) : undefined }))}
              />
            </Field>
            <Field label="Average rating (1-5)">
              <TextInput
                value={(product.average_rating ?? '').toString()}
                onChange={(v) => setProduct((p) => ({ ...p, average_rating: v ? Number(v) : undefined }))}
              />
            </Field>
          </div>
        </div>

        {/* Offers + badges */}
        <div className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Offers</p>
              <h2 className="text-xl font-semibold text-semantic-text-primary">Quantity discounts</h2>
            </div>
          </div>

          <div className="space-y-3">
            {product.quantity_discounts.map((tier, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-3 text-sm">
                <TextInput
                  value={tier.min_qty.toString()}
                  onChange={(v) =>
                    setProduct((p) => ({
                      ...p,
                      quantity_discounts: p.quantity_discounts.map((t, i) =>
                        i === idx ? { ...t, min_qty: Number(v) || 1 } : t
                      ),
                    }))
                  }
                  placeholder="Min qty"
                />
                <select
                  className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                  value={tier.type}
                  onChange={(e) =>
                    setProduct((p) => ({
                      ...p,
                      quantity_discounts: p.quantity_discounts.map((t, i) =>
                        i === idx ? { ...t, type: e.target.value as QtyDiscount['type'] } : t
                      ),
                    }))
                  }
                >
                  <option value="percent">Percent</option>
                  <option value="fixed">Fixed</option>
                </select>
                <TextInput
                  value={tier.value.toString()}
                  onChange={(v) =>
                    setProduct((p) => ({
                      ...p,
                      quantity_discounts: p.quantity_discounts.map((t, i) =>
                        i === idx ? { ...t, value: Number(v) || 0 } : t
                      ),
                    }))
                  }
                  placeholder="Value"
                />
                <div className="col-span-3 flex justify-end">
                  <button
                    className="inline-flex items-center gap-1 text-xs text-semantic-text-primary/70 hover:text-semantic-text-primary"
                    onClick={() =>
                      setProduct((p) => ({
                        ...p,
                        quantity_discounts: p.quantity_discounts.filter((_, i) => i !== idx),
                      }))
                    }
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              className="text-xs font-semibold text-semantic-legacy-brand-cocoa"
              onClick={() =>
                setProduct((p) => ({
                  ...p,
                  quantity_discounts: [...p.quantity_discounts, { min_qty: 2, type: 'percent', value: 5 }],
                }))
              }
            >
              + Add tier
            </button>
          </div>

          <div className="border-t border-semantic-legacy-brand-blush/60 pt-4">
            <Field label="Sign to try">
              <TextInput
                value={product.sign_to_try.title}
                onChange={(v) => setProduct((p) => ({ ...p, sign_to_try: { ...p.sign_to_try, title: v } }))}
                placeholder="Title"
              />
              <div className="mt-2" />
              <TextArea
                value={product.sign_to_try.subtext}
                onChange={(v) => setProduct((p) => ({ ...p, sign_to_try: { ...p.sign_to_try, subtext: v } }))}
                rows={2}
              />
            </Field>
          </div>
        </div>
      </section>

      {/* Why you'll love it */}
      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Benefits</p>
              <h2 className="text-xl font-semibold text-semantic-text-primary">Why you'll love it</h2>
            </div>
            <Pill>{product.why_love.videos.length} videos</Pill>
          </div>

          <Field label="Section title">
            <TextInput
              value={product.why_love.title}
              onChange={(v) => setProduct((p) => ({ ...p, why_love: { ...p.why_love, title: v } }))}
            />
          </Field>
          <Field label="Section subtext">
            <TextArea
              value={product.why_love.subtext}
              onChange={(v) => setProduct((p) => ({ ...p, why_love: { ...p.why_love, subtext: v } }))}
            />
          </Field>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-semantic-text-primary">Bullets (cards)</h3>
              <button
                className="text-xs font-semibold text-semantic-legacy-brand-cocoa"
                onClick={() =>
                  setProduct((p) => ({
                    ...p,
                    why_love: {
                      ...p.why_love,
                      bullets: [...p.why_love.bullets, { title: 'New point', subtext: '' }],
                    },
                  }))
                }
              >
                + Add bullet
              </button>
            </div>
            {product.why_love.bullets.map((bullet, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-3 space-y-2"
              >
                <TextInput
                  value={bullet.title}
                  onChange={(v) =>
                    setProduct((p) => ({
                      ...p,
                      why_love: {
                        ...p.why_love,
                        bullets: p.why_love.bullets.map((b, i) => (i === idx ? { ...b, title: v } : b)),
                      },
                    }))
                  }
                />
                <TextArea
                  value={bullet.subtext}
                  rows={2}
                  onChange={(v) =>
                    setProduct((p) => ({
                      ...p,
                      why_love: {
                        ...p.why_love,
                        bullets: p.why_love.bullets.map((b, i) => (i === idx ? { ...b, subtext: v } : b)),
                      },
                    }))
                  }
                />
                <div className="flex justify-end">
                  <button
                    className="inline-flex items-center gap-1 text-xs text-semantic-text-primary/70 hover:text-semantic-text-primary"
                    onClick={() =>
                      setProduct((p) => ({
                        ...p,
                        why_love: {
                          ...p.why_love,
                          bullets: p.why_love.bullets.filter((_, i) => i !== idx),
                        },
                      }))
                    }
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-semantic-text-primary">TikTok videos (Why you'll love it)</h3>
            <button
              className="text-xs font-semibold text-semantic-legacy-brand-cocoa"
              onClick={() =>
                setProduct((p) => ({
                  ...p,
                  why_love: {
                    ...p.why_love,
                    videos: [...p.why_love.videos, { embed_url: '', caption: '' }],
                  },
                }))
              }
            >
              + Add video
            </button>
          </div>
          {product.why_love.videos.map((vid, idx) => (
            <div key={idx} className="space-y-2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-3">
              <TextInput
                value={vid.embed_url}
                onChange={(v) =>
                  setProduct((p) => ({
                    ...p,
                    why_love: {
                      ...p.why_love,
                      videos: p.why_love.videos.map((x, i) => (i === idx ? { ...x, embed_url: v } : x)),
                    },
                  }))
                }
                placeholder="TikTok embed URL"
              />
              <TextInput
                value={vid.caption || ''}
                onChange={(v) =>
                  setProduct((p) => ({
                    ...p,
                    why_love: {
                      ...p.why_love,
                      videos: p.why_love.videos.map((x, i) => (i === idx ? { ...x, caption: v } : x)),
                    },
                  }))
                }
                placeholder="Caption"
              />
              <div className="flex justify-end">
                <button
                  className="inline-flex items-center gap-1 text-xs text-semantic-text-primary/70 hover:text-semantic-text-primary"
                  onClick={() =>
                    setProduct((p) => ({
                      ...p,
                      why_love: {
                        ...p.why_love,
                        videos: p.why_love.videos.filter((_, i) => i !== idx),
                      },
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Materials & care */}
      <section className="grid gap-4 lg:grid-cols-[1.2fr,1fr]">
        <div className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Materials</p>
              <h2 className="text-xl font-semibold text-semantic-text-primary">Materials & care</h2>
            </div>
          </div>
          <Field label="Section title">
            <TextInput
              value={product.materials.title}
              onChange={(v) => setProduct((p) => ({ ...p, materials: { ...p.materials, title: v } }))}
            />
          </Field>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-semantic-text-primary">Bullet points</h3>
              <button
                className="text-xs font-semibold text-semantic-legacy-brand-cocoa"
                onClick={() =>
                  setProduct((p) => ({
                    ...p,
                    materials: {
                      ...p.materials,
                      bullets: [...p.materials.bullets, { title: 'New', subtext: '' }],
                    },
                  }))
                }
              >
                + Add bullet
              </button>
            </div>
            {product.materials.bullets.map((bullet, idx) => (
              <div key={idx} className="space-y-2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-3">
                <TextInput
                  value={bullet.title}
                  onChange={(v) =>
                    setProduct((p) => ({
                      ...p,
                      materials: {
                        ...p.materials,
                        bullets: p.materials.bullets.map((b, i) => (i === idx ? { ...b, title: v } : b)),
                      },
                    }))
                  }
                />
                <TextArea
                  rows={2}
                  value={bullet.subtext}
                  onChange={(v) =>
                    setProduct((p) => ({
                      ...p,
                      materials: {
                        ...p.materials,
                        bullets: p.materials.bullets.map((b, i) => (i === idx ? { ...b, subtext: v } : b)),
                      },
                    }))
                  }
                />
                <div className="flex justify-end">
                  <button
                    className="inline-flex items-center gap-1 text-xs text-semantic-text-primary/70 hover:text-semantic-text-primary"
                    onClick={() =>
                      setProduct((p) => ({
                        ...p,
                        materials: {
                          ...p.materials,
                          bullets: p.materials.bullets.filter((_, i) => i !== idx),
                        },
                      }))
                    }
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Field label="Care notes">
            <TextArea
              value={product.materials.care_notes}
              onChange={(v) => setProduct((p) => ({ ...p, materials: { ...p.materials, care_notes: v } }))}
            />
          </Field>
        </div>

        <div className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-semantic-text-primary">Badges</h3>
            <button
              className="text-xs font-semibold text-semantic-legacy-brand-cocoa"
              onClick={() => setProduct((p) => ({ ...p, badges: [...p.badges, 'New badge'] }))}
            >
              + Add badge
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.badges.map((badge, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/60 bg-brand-porcelain px-3 py-1 text-xs font-semibold text-semantic-text-primary"
              >
                {badge}
                <button
                  aria-label="Remove badge"
                  onClick={() => setProduct((p) => ({ ...p, badges: p.badges.filter((_, i) => i !== idx) }))}
                  className="text-semantic-text-primary/60 hover:text-semantic-text-primary"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-semantic-text-primary">Creator testimonials</h2>
            <button
              className="text-xs font-semibold text-semantic-legacy-brand-cocoa"
              onClick={() =>
                setProduct((p) => ({
                  ...p,
                  testimonials: [...p.testimonials, { quote: '', creator: '', role: '' }],
                }))
              }
            >
              + Add testimonial
            </button>
          </div>
          {product.testimonials.map((t, idx) => (
            <div key={idx} className="space-y-2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-3">
              <TextArea
                value={t.quote}
                rows={2}
                onChange={(v) =>
                  setProduct((p) => ({
                    ...p,
                    testimonials: p.testimonials.map((x, i) => (i === idx ? { ...x, quote: v } : x)),
                  }))
                }
                placeholder="Quote"
              />
              <div className="grid gap-2 sm:grid-cols-2">
                <TextInput
                  value={t.creator}
                  onChange={(v) =>
                    setProduct((p) => ({
                      ...p,
                      testimonials: p.testimonials.map((x, i) => (i === idx ? { ...x, creator: v } : x)),
                    }))
                  }
                  placeholder="Creator name/handle"
                />
                <TextInput
                  value={t.role || ''}
                  onChange={(v) =>
                    setProduct((p) => ({
                      ...p,
                      testimonials: p.testimonials.map((x, i) => (i === idx ? { ...x, role: v } : x)),
                    }))
                  }
                  placeholder="Role"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="inline-flex items-center gap-1 text-xs text-semantic-text-primary/70 hover:text-semantic-text-primary"
                  onClick={() =>
                    setProduct((p) => ({
                      ...p,
                      testimonials: p.testimonials.filter((_, i) => i !== idx),
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-semantic-text-primary">Creators in action (TikTok)</h2>
            <button
              className="text-xs font-semibold text-semantic-legacy-brand-cocoa"
              onClick={() =>
                setProduct((p) => ({
                  ...p,
                  creators_in_action: [...p.creators_in_action, { embed_url: '', caption: '' }],
                }))
              }
            >
              + Add video
            </button>
          </div>
          {product.creators_in_action.map((vid, idx) => (
            <div key={idx} className="space-y-2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-3">
              <TextInput
                value={vid.embed_url}
                onChange={(v) =>
                  setProduct((p) => ({
                    ...p,
                    creators_in_action: p.creators_in_action.map((x, i) => (i === idx ? { ...x, embed_url: v } : x)),
                  }))
                }
                placeholder="TikTok embed URL"
              />
              <TextInput
                value={vid.caption || ''}
                onChange={(v) =>
                  setProduct((p) => ({
                    ...p,
                    creators_in_action: p.creators_in_action.map((x, i) => (i === idx ? { ...x, caption: v } : x)),
                  }))
                }
                placeholder="Caption"
              />
              <div className="flex justify-end">
                <button
                  className="inline-flex items-center gap-1 text-xs text-semantic-text-primary/70 hover:text-semantic-text-primary"
                  onClick={() =>
                    setProduct((p) => ({
                      ...p,
                      creators_in_action: p.creators_in_action.filter((_, i) => i !== idx),
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">FAQ</p>
            <h2 className="text-xl font-semibold text-semantic-text-primary">Questions & answers</h2>
          </div>
          <button
            className="text-xs font-semibold text-semantic-legacy-brand-cocoa"
            onClick={() => setProduct((p) => ({ ...p, faq: [...p.faq, { question: '', answer: '' }] }))}
          >
            + Add question
          </button>
        </div>

        <div className="space-y-3">
          {product.faq.map((item, idx) => (
            <div key={idx} className="space-y-2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-3">
              <TextInput
                value={item.question}
                onChange={(v) =>
                  setProduct((p) => ({
                    ...p,
                    faq: p.faq.map((f, i) => (i === idx ? { ...f, question: v } : f)),
                  }))
                }
                placeholder="Question"
              />
              <TextArea
                value={item.answer}
                rows={2}
                onChange={(v) =>
                  setProduct((p) => ({
                    ...p,
                    faq: p.faq.map((f, i) => (i === idx ? { ...f, answer: v } : f)),
                  }))
                }
                placeholder="Answer"
              />
              <div className="flex justify-end">
                <button
                  className="inline-flex items-center gap-1 text-xs text-semantic-text-primary/70 hover:text-semantic-text-primary"
                  onClick={() => setProduct((p) => ({ ...p, faq: p.faq.filter((_, i) => i !== idx) }))}
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Save bar duplicate for mobile */}
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
    </AdminPageLayout>
  )
}
