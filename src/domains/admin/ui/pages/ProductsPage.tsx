import { useAuth, useUser } from '@clerk/clerk-react'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AdminPageLayout } from '@admin/ui/layouts'
import { ArrowDown, ArrowUp, CheckCircle2, Save, Star, Trash2 } from 'lucide-react'
import { createSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'
import { decodeClerkJwtPayload, normalizeJwtRoles } from '@admin/logic/clerkJwt'
import { productConfigs } from '@/domains/products/data/product-config'

type AdminMediaItem = {
  id?: string
  path: string
  alt: string
  sort: number
  is_primary: boolean
}

type AdminProduct = {
  id: string
  handle: string
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

const CONFIG_HANDLES = new Set(Object.values(productConfigs).map((cfg) => cfg.handle))
const ADMIN_HIDDEN_HANDLES = new Set<string>(['satin-overnight-curler-set'])

const getProductConfig = (handle: string) => {
  const direct = (productConfigs as any)[handle]
  if (direct) return direct
  return Object.values(productConfigs).find((cfg) => cfg.handle === handle)
}

const normalizeNumber = (value: unknown): number | null => {
  if (value == null || value === '') return null
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return null
  return n
}

const safeJsonStringify = (value: unknown, fallback: '{}' | '[]' = '{}') => {
  try {
    if (value == null) return fallback
    return JSON.stringify(value, null, 2)
  } catch {
    return fallback
  }
}

const parseJsonField = <T,>(
  label: string,
  raw: string,
  fallback: T,
): { ok: true; value: T } | { ok: false; error: string } => {
  const trimmed = raw.trim()
  if (!trimmed) return { ok: true, value: fallback }
  try {
    return { ok: true, value: JSON.parse(trimmed) as T }
  } catch {
    return { ok: false, error: `${label} is not valid JSON.` }
  }
}

function Field({ label, description, children }: { label: string; description?: string; children: ReactNode }) {
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
  placeholder,
}: {
  value: string
  onChange: (val: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <textarea
      className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 font-mono text-[12px] text-semantic-text-primary shadow-sm focus:border-semantic-legacy-brand-cocoa focus:outline-none"
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={false}
    />
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-porcelain px-2.5 py-1 text-[11px] font-semibold text-semantic-text-primary/80">
      {children}
    </span>
  )
}

const prettyTitle = (raw: string) =>
  raw
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase())

function ProductCard({ product, onOpen }: { product: AdminProduct; onOpen: () => void }) {
  const cfg = getProductConfig(product.handle)
  const hero =
    product.media.find((m) => m.is_primary)?.path ??
    product.media[0]?.path ??
    cfg?.gallery?.[0] ??
    cfg?.featureCallouts?.mediaSrc ??
    null

  const price = product.price ?? cfg?.defaultPrice ?? 0
  const compareAtPrice = product.compare_at_price ?? cfg?.compareAtPrice ?? null
  const hasDiscount = compareAtPrice != null && compareAtPrice > price
  const pctOff =
    hasDiscount && compareAtPrice
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
      : product.discount_percent_override ?? cfg?.discountPercentOverride ?? null

  const title = prettyTitle(product.title || cfg?.defaultTitle || cfg?.title || product.handle)
  const subtitle = product.short_desc || cfg?.defaultSubtitle || cfg?.hero?.description || ''
  const avgRating = product.average_rating ?? cfg?.ratingValueOverride ?? null
  const ratingLabel =
    product.review_count_label ||
    (product.review_count != null ? String(product.review_count) : undefined) ||
    cfg?.ratingCountLabelOverride ||
    null

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
            <Pill>{product.handle}</Pill>
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
            <span className="text-semantic-text-primary/60">Updated</span>
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

export default function ProductsPage() {
  const { getToken } = useAuth()
  const { user } = useUser()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [roleDebug, setRoleDebug] = useState<string[]>([])

  const [products, setProducts] = useState<AdminProduct[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [snapshots, setSnapshots] = useState<Record<string, string>>({})

  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [iframeHeight, setIframeHeight] = useState(844)

  const product = selectedId ? products.find((p) => p.id === selectedId) : null
  const hasSelection = !!product && !loading

  const dirty = useMemo(() => {
    if (!product) return false
    return JSON.stringify(product) !== snapshots[product.id]
  }, [product, snapshots])

  const updateProduct = useCallback(
    (updater: (p: AdminProduct) => AdminProduct) => {
      if (!product) return
      setProducts((prev) => prev.map((p) => (p.id === product.id ? updater(p) : p)))
    },
    [product],
  )

  const moveMedia = useCallback(
    (fromIdx: number, toIdx: number) => {
      updateProduct((p) => {
        const next = p.media.slice()
        const [moved] = next.splice(fromIdx, 1)
        next.splice(toIdx, 0, moved)
        return { ...p, media: next.map((m, idx) => ({ ...m, sort: idx, is_primary: idx === 0 })) }
      })
    },
    [updateProduct],
  )

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const token = await getToken({ template: 'supabase' }).catch(() => null)
      if (!token) {
        setError('Missing Clerk JWT template `supabase` token. Check Clerk → JWT Templates.')
        setProducts([])
        setSelectedId(null)
        setSnapshots({})
        return
      }

      const payload = decodeClerkJwtPayload(token)
      setRoleDebug(normalizeJwtRoles(payload?.app_metadata?.roles))

      const client = createSupabaseClient(token)
      if (!client) {
        setError('Supabase is not configured in this environment (missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).')
        setProducts([])
        setSelectedId(null)
        setSnapshots({})
        return
      }

      const { data: productRows, error: productsErr } = await client
        .from('cms_products')
        .select(
          [
            'id',
            'handle',
            'title',
            'short_desc',
            'long_desc',
            'price',
            'compare_at_price',
            'discount_percent_override',
            'average_rating',
            'review_count',
            'review_count_label',
            'badge',
            'video_slot',
            'care_label_override',
            'hide_details_accordion',
            'fallback_variant_id',
            'fallback_item_id',
            'specs',
            'faq',
            'status',
            'updated_at',
          ].join(','),
        )
        .order('updated_at', { ascending: false })

      if (productsErr) {
        setError(productsErr.message)
        setProducts([])
        setSelectedId(null)
        setSnapshots({})
        return
      }

      const filtered = (productRows ?? []).filter((row: any) => {
        const handle = String(row.handle ?? '')
        return Boolean(handle) && CONFIG_HANDLES.has(handle) && !ADMIN_HIDDEN_HANDLES.has(handle)
      })

      const productIds = filtered.map((row: any) => row.id as string)
      const mediaByProduct = new Map<string, AdminMediaItem[]>()

      if (productIds.length) {
        const { data: mediaRows, error: mediaErr } = await client
          .from('cms_product_media')
          .select('id, product_id, path, alt, sort, is_primary, status')
          .in('product_id', productIds)
          .order('sort', { ascending: true })

        if (mediaErr) {
          setError(mediaErr.message)
          setProducts([])
          setSelectedId(null)
          setSnapshots({})
          return
        }

        for (const row of mediaRows ?? []) {
          const pid = String((row as any).product_id)
          const list = mediaByProduct.get(pid) ?? []
          list.push({
            id: String((row as any).id),
            path: String((row as any).path ?? ''),
            alt: String((row as any).alt ?? ''),
            sort: Number((row as any).sort ?? 0),
            is_primary: Boolean((row as any).is_primary),
          })
          mediaByProduct.set(pid, list)
        }
      }

      let nextProducts: AdminProduct[] = filtered
        .map((row: any) => {
          const id = String(row.id)
          const handle = String(row.handle)
          const cfg = getProductConfig(handle)
          const mediaFromDb = (mediaByProduct.get(id) ?? []).slice().sort((a, b) => a.sort - b.sort)
          const media = mediaFromDb.length
            ? mediaFromDb
            : (cfg?.gallery ?? []).map((path, idx) => ({
                path,
                alt: `${cfg?.title ?? handle} image ${idx + 1}`,
                sort: idx,
                is_primary: idx === 0,
              }))
          return {
            id,
            handle,
            title: String(row.title ?? ''),
            short_desc: String(row.short_desc ?? ''),
            long_desc: String(row.long_desc ?? ''),
            price: normalizeNumber(row.price),
            compare_at_price: normalizeNumber(row.compare_at_price),
            discount_percent_override: row.discount_percent_override == null ? null : Number(row.discount_percent_override),
            average_rating: normalizeNumber(row.average_rating),
            review_count: row.review_count == null ? null : Number(row.review_count),
            review_count_label: String(row.review_count_label ?? ''),
            badge: String(row.badge ?? ''),
            video_slot: String(row.video_slot ?? ''),
            care_label_override: String(row.care_label_override ?? ''),
            hide_details_accordion: Boolean(row.hide_details_accordion),
            fallback_variant_id: String(row.fallback_variant_id ?? ''),
            fallback_item_id: String(row.fallback_item_id ?? ''),
            specs_text: safeJsonStringify(row.specs, '{}'),
            faq_text: safeJsonStringify(row.faq, '[]'),
            status: String(row.status ?? 'draft'),
            updated_at: String(row.updated_at ?? ''),
            media,
          }
        })
        .sort((a, b) => a.title.localeCompare(b.title))

      // Fallback to in-repo product config when Supabase has no rows yet (common on fresh envs)
      if (!nextProducts.length) {
        nextProducts = Object.values(productConfigs)
          .filter((cfg) => CONFIG_HANDLES.has(cfg.handle) && !ADMIN_HIDDEN_HANDLES.has(cfg.handle))
          .map((cfg) => ({
            id: cfg.handle,
            handle: cfg.handle,
            title: cfg.title ?? cfg.handle,
            short_desc: cfg.hero?.description ?? '',
            long_desc: '',
            price: normalizeNumber((cfg as any).price?.value ?? null),
            compare_at_price: normalizeNumber((cfg as any).price?.compare_at ?? null),
            discount_percent_override: null,
            average_rating: normalizeNumber((cfg as any).reviews?.average ?? null),
            review_count: normalizeNumber((cfg as any).reviews?.count ?? null),
            review_count_label: String((cfg as any).reviews?.label ?? ''),
            badge: String((cfg as any).badge ?? ''),
            video_slot: '',
            care_label_override: '',
            hide_details_accordion: false,
            fallback_variant_id: '',
            fallback_item_id: '',
            specs_text: '{}',
            faq_text: '[]',
            status: 'draft',
            updated_at: '',
            media: [],
          }))
          .sort((a, b) => a.title.localeCompare(b.title))
      }

      setProducts(nextProducts)
      setSelectedId((prev) => (prev && nextProducts.some((p) => p.id === prev) ? prev : null))
      setSnapshots(Object.fromEntries(nextProducts.map((p) => [p.id, JSON.stringify(p)])))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products.')
      setProducts([])
      setSelectedId(null)
      setSnapshots({})
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    void loadProducts()
  }, [loadProducts])

  // Lazy-load Cloudinary upload widget
  const loadCloudinaryWidget = async () => {
    if (typeof window === 'undefined') return null
    const w = window as any
    if (w.cloudinary?.createUploadWidget) return w.cloudinary
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Cloudinary widget'))
      document.body.appendChild(script)
    })
    return (window as any).cloudinary
  }

  const handleUpload = async () => {
    if (!product) return
    const cld = await loadCloudinaryWidget()
    if (!cld) return

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY as string
    if (!cloudName || !uploadPreset || !apiKey) {
      setError('Cloudinary env missing (VITE_CLOUDINARY_CLOUD_NAME / VITE_CLOUDINARY_UPLOAD_PRESET / VITE_CLOUDINARY_API_KEY).')
      return
    }

    cld
      .createUploadWidget(
        {
          cloudName,
          uploadPreset,
          apiKey,
          folder: `products/${product.handle}`,
          cropping: false,
          multiple: true,
          showAdvancedOptions: false,
          sources: ['local', 'camera', 'url'],
          maxFiles: 10,
          uploadSignature: async (cb: any, paramsToSign: any) => {
            const res = await fetch('/api/cloudinary/sign', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ folder: paramsToSign.folder }),
            })
            const data = await res.json()
            cb(data)
          },
        },
        (err: any, result: any) => {
          if (err) return
          if (result?.event !== 'success') return
          const url = String(result.info.secure_url ?? '')
          if (!url) return

          updateProduct((p) => {
            const nextSort = p.media.length
            return {
              ...p,
              media: [
                ...p.media,
                {
                  path: url,
                  alt: `${p.title} image ${p.media.length + 1}`,
                  sort: nextSort,
                  is_primary: p.media.length === 0,
                },
              ],
            }
          })
        },
      )
      .open()
  }

  // Send draft to iframe preview for live mobile render (storefront does not read Supabase yet).
  useEffect(() => {
    if (!product || !iframeRef.current) return
    const images = product.media.map((m) => m.path).filter(Boolean)
    const gallery = product.video_slot ? [...images, product.video_slot] : images

    const parsedSpecs = (() => {
      try {
        const v = JSON.parse(product.specs_text) as unknown
        if (!v || typeof v !== 'object' || Array.isArray(v)) return null
        return v
      } catch {
        return null
      }
    })()

    const parsedFaq = (() => {
      try {
        const v = JSON.parse(product.faq_text) as unknown
        if (!Array.isArray(v)) return null
        return v
      } catch {
        return null
      }
    })()

    iframeRef.current.contentWindow?.postMessage(
      {
        type: 'admin-draft-product',
        handle: product.handle,
        payload: {
          productTitle: product.title,
          productDesc: product.short_desc,
          price: product.price,
          compareAtPrice: product.compare_at_price,
          discountPercentOverride: product.discount_percent_override,
          badge: product.badge,
          ratingValue: product.average_rating,
          ratingCountLabel: product.review_count_label || (product.review_count != null ? String(product.review_count) : undefined),
          careLabelOverride: product.care_label_override,
          hideDetailsAccordion: product.hide_details_accordion,
          specs: parsedSpecs ?? undefined,
          faq: parsedFaq ?? undefined,
          gallery,
        },
      },
      '*',
    )
  }, [product])

  // Listen for height messages from iframe preview
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'pdpHeight' && typeof event.data.height === 'number') {
        setIframeHeight(Math.min(Math.max(event.data.height, 844), 1400))
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  const handleSave = useCallback(async () => {
    if (!product) return
    setSaving(true)
    setError(null)
    try {
      const token = await getToken({ template: 'supabase' }).catch(() => null)
      if (!token) {
        setError('Missing Clerk JWT template `supabase` token.')
        return
      }
      const client = createSupabaseClient(token)
      if (!client) {
        setError('Supabase is not configured in this environment.')
        return
      }

      const parsedSpecs = parseJsonField<Record<string, unknown>>('Specs JSON', product.specs_text, {})
      if (!parsedSpecs.ok) {
        setError(parsedSpecs.error)
        return
      }

      const parsedFaq = parseJsonField<unknown[]>('FAQ JSON', product.faq_text, [])
      if (!parsedFaq.ok) {
        setError(parsedFaq.error)
        return
      }
      if (!Array.isArray(parsedFaq.value)) {
        setError('FAQ JSON must be an array.')
        return
      }

      const updatePayload: Record<string, unknown> = {
        title: product.title,
        short_desc: product.short_desc || null,
        long_desc: product.long_desc || null,
        price: product.price,
        compare_at_price: product.compare_at_price,
        discount_percent_override: product.discount_percent_override,
        average_rating: product.average_rating,
        review_count: product.review_count,
        review_count_label: product.review_count_label || null,
        badge: product.badge || null,
        video_slot: product.video_slot || null,
        care_label_override: product.care_label_override || null,
        hide_details_accordion: product.hide_details_accordion,
        fallback_variant_id: product.fallback_variant_id || null,
        fallback_item_id: product.fallback_item_id || null,
        specs: parsedSpecs.value,
        faq: parsedFaq.value,
      }

      const { error: updateErr } = await client.from('cms_products').update(updatePayload).eq('id', product.id)
      if (updateErr) {
        setError(updateErr.message)
        return
      }

      const { data: existingMedia, error: existingErr } = await client
        .from('cms_product_media')
        .select('path')
        .eq('product_id', product.id)

      if (existingErr) {
        setError(existingErr.message)
        return
      }

      const existingPaths = new Set((existingMedia ?? []).map((m: any) => String(m.path)))
      const nextPaths = new Set(product.media.map((m) => m.path.trim()).filter(Boolean))
      const removed = Array.from(existingPaths).filter((p) => !nextPaths.has(p))

      if (removed.length) {
        const { error: delErr } = await client
          .from('cms_product_media')
          .delete()
          .eq('product_id', product.id)
          .in('path', removed)
        if (delErr) {
          setError(delErr.message)
          return
        }
      }

      const normalizedMedia = product.media
        .map((m, idx) => ({
          product_id: product.id,
          path: m.path.trim(),
          alt: m.alt ?? '',
          sort: idx,
          is_primary: idx === 0,
          status: 'draft',
        }))
        .filter((m) => Boolean(m.path))

      if (normalizedMedia.length) {
        const { error: upsertErr } = await client
          .from('cms_product_media')
          .upsert(normalizedMedia, { onConflict: 'product_id,path' })
        if (upsertErr) {
          setError(upsertErr.message)
          return
        }
      }

      setSnapshots((prev) => ({ ...prev, [product.id]: JSON.stringify(product) }))
      setLastSavedAt(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product.')
    } finally {
      setSaving(false)
    }
  }, [getToken, product])

  return (
    <AdminPageLayout
      title="Products"
      subtitle="Edits are saved to Supabase (cms_products + cms_product_media). Storefront still reads from in-repo config for now."
      actions={
        <div className="flex items-center gap-2">
          <Pill>{products.length} products</Pill>
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
      {!isSupabaseConfigured ? (
        <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 text-sm text-semantic-text-primary/80">
          Supabase is not configured for the frontend (missing <span className="font-mono text-[12px]">VITE_SUPABASE_URL</span> /{' '}
          <span className="font-mono text-[12px]">VITE_SUPABASE_ANON_KEY</span>).
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">{error}</div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 text-sm text-semantic-text-primary/70">
          Loading products…
        </div>
      ) : null}

      {!hasSelection ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Products</div>
            <button
              className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60 disabled:opacity-60"
              onClick={loadProducts}
              disabled={loading}
            >
              Reload
            </button>
          </div>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={() => setSelectedId(p.id)} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
                onClick={() => setSelectedId(null)}
              >
                ← Back to products
              </button>
              <div className="text-sm font-semibold text-semantic-text-primary/80">{product.title}</div>
              <Pill>Handle: {product.handle}</Pill>
            </div>

            <section className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Hero</p>
              <Field label="Title" description="cms_products.title">
                <TextInput value={product.title} onChange={(v) => updateProduct((p) => ({ ...p, title: v }))} />
              </Field>
              <Field label="Subtext / hero description" description="cms_products.short_desc">
                <TextInput value={product.short_desc} onChange={(v) => updateProduct((p) => ({ ...p, short_desc: v }))} />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Price" description="cms_products.price">
                  <TextInput
                    value={product.price == null ? '' : String(product.price)}
                    onChange={(v) => updateProduct((p) => ({ ...p, price: normalizeNumber(v) }))}
                    placeholder="e.g. 14.99"
                  />
                </Field>
                <Field label="Compare at" description="cms_products.compare_at_price">
                  <TextInput
                    value={product.compare_at_price == null ? '' : String(product.compare_at_price)}
                    onChange={(v) => updateProduct((p) => ({ ...p, compare_at_price: normalizeNumber(v) }))}
                    placeholder="e.g. 19.99"
                  />
                </Field>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Discount % override" description="cms_products.discount_percent_override (optional)">
                  <TextInput
                    value={product.discount_percent_override == null ? '' : String(product.discount_percent_override)}
                    onChange={(v) => updateProduct((p) => ({ ...p, discount_percent_override: v ? Number(v) : null }))}
                    placeholder="e.g. 20"
                  />
                </Field>
                <Field label="Promo badge" description="cms_products.badge (optional)">
                  <TextInput
                    value={product.badge}
                    onChange={(v) => updateProduct((p) => ({ ...p, badge: v }))}
                    placeholder="e.g. Buy 2, save 10%"
                  />
                </Field>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Average rating" description="cms_products.average_rating (0–5)">
                  <TextInput
                    value={product.average_rating == null ? '' : String(product.average_rating)}
                    onChange={(v) => updateProduct((p) => ({ ...p, average_rating: normalizeNumber(v) }))}
                    placeholder="e.g. 4.8"
                  />
                </Field>
                <Field label="Review count" description="cms_products.review_count">
                  <TextInput
                    value={product.review_count == null ? '' : String(product.review_count)}
                    onChange={(v) => updateProduct((p) => ({ ...p, review_count: v ? Number(v) : null }))}
                    placeholder="e.g. 100"
                  />
                </Field>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Review count label" description="cms_products.review_count_label (e.g. 100+)">
                  <TextInput
                    value={product.review_count_label}
                    onChange={(v) => updateProduct((p) => ({ ...p, review_count_label: v }))}
                    placeholder="e.g. 100+"
                  />
                </Field>
                <Field label="Video slot" description="cms_products.video_slot (use video://https://...)">
                  <TextInput
                    value={product.video_slot}
                    onChange={(v) => updateProduct((p) => ({ ...p, video_slot: v }))}
                    placeholder="video://https://www.tiktok.com/embed/v2/..."
                  />
                </Field>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Care label override" description="cms_products.care_label_override (optional)">
                  <TextInput
                    value={product.care_label_override}
                    onChange={(v) => updateProduct((p) => ({ ...p, care_label_override: v }))}
                    placeholder="e.g. What's included"
                  />
                </Field>
                <Field label="Hide details accordion" description="cms_products.hide_details_accordion">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-4 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
                    onClick={() => updateProduct((p) => ({ ...p, hide_details_accordion: !p.hide_details_accordion }))}
                  >
                    {product.hide_details_accordion ? 'Yes (hidden)' : 'No (visible)'}
                  </button>
                </Field>
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Identifiers</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Fallback variant ID" description="cms_products.fallback_variant_id (Shopify gid)">
                  <TextInput
                    value={product.fallback_variant_id}
                    onChange={(v) => updateProduct((p) => ({ ...p, fallback_variant_id: v }))}
                    placeholder="gid://shopify/ProductVariant/..."
                  />
                </Field>
                <Field label="Fallback item ID" description="cms_products.fallback_item_id">
                  <TextInput
                    value={product.fallback_item_id}
                    onChange={(v) => updateProduct((p) => ({ ...p, fallback_item_id: v }))}
                    placeholder="satin-overnight-curler-set"
                  />
                </Field>
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">PDP sections (JSON)</p>
              <Field
                label="Specs JSON"
                description="Stored in cms_products.specs (essentials, reasons, how, care, featureCallouts, featuredTikTokHeading)."
              >
                <TextArea
                  rows={14}
                  value={product.specs_text}
                  onChange={(v) => updateProduct((p) => ({ ...p, specs_text: v }))}
                  placeholder='{"essentials":[{"title":"","body":""}]}'
                />
              </Field>
              <Field label="FAQ JSON" description="Stored in cms_products.faq as an array of { q, a } objects.">
                <TextArea
                  rows={12}
                  value={product.faq_text}
                  onChange={(v) => updateProduct((p) => ({ ...p, faq_text: v }))}
                  placeholder='[{"q":"Will it fit my hair?","a":"Yes..."}]'
                />
              </Field>
            </section>

            <section className="space-y-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Gallery images</p>
                <button
                  type="button"
                  className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 px-3 py-1.5 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
                  onClick={handleUpload}
                >
                  Upload to Cloudinary
                </button>
              </div>
              <div className="space-y-2">
                {product.media.map((item, idx) => (
                  <div
                    key={`${item.path}-${idx}`}
                    className="flex items-center gap-3 rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 px-3 py-2"
                  >
                    {item.path ? <img src={item.path} alt="" className="h-14 w-14 rounded-lg object-cover" loading="lazy" /> : <div className="h-14 w-14 rounded-lg bg-white/60" />}
                    <div className="flex flex-1 flex-col gap-2">
                      <TextInput
                        value={item.path}
                        onChange={(v) =>
                          updateProduct((p) => ({
                            ...p,
                            media: p.media.map((m, i) => (i === idx ? { ...m, path: v } : m)),
                          }))
                        }
                        placeholder="Image URL (/uploads/... or https://...)"
                      />
                      <TextInput
                        value={item.alt}
                        onChange={(v) =>
                          updateProduct((p) => ({
                            ...p,
                            media: p.media.map((m, i) => (i === idx ? { ...m, alt: v } : m)),
                          }))
                        }
                        placeholder="Alt text"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white p-1 text-semantic-text-primary hover:bg-brand-porcelain/60 disabled:opacity-50"
                        onClick={() => moveMedia(idx, Math.max(0, idx - 1))}
                        disabled={idx === 0}
                        aria-label="Move up"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white p-1 text-semantic-text-primary hover:bg-brand-porcelain/60 disabled:opacity-50"
                        onClick={() => moveMedia(idx, Math.min(product.media.length - 1, idx + 1))}
                        disabled={idx === product.media.length - 1}
                        aria-label="Move down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      className="inline-flex items-center gap-1 text-xs text-semantic-text-primary/70 hover:text-semantic-text-primary"
                      onClick={() =>
                        updateProduct((p) => ({
                          ...p,
                          media: p.media
                            .filter((_, i) => i !== idx)
                            .map((m, i) => ({ ...m, sort: i, is_primary: i === 0 })),
                        }))
                      }
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
                  onClick={() =>
                    updateProduct((p) => ({
                      ...p,
                      media: [
                        ...p.media,
                        {
                          path: '',
                          alt: '',
                          sort: p.media.length,
                          is_primary: p.media.length === 0,
                        },
                      ],
                    }))
                  }
                >
                  + Add media URL
                </button>
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
              style={{ height: iframeHeight, display: 'block' }}
              scrolling="yes"
            />
          </div>
        </div>
      )}
    </AdminPageLayout>
  )
}
