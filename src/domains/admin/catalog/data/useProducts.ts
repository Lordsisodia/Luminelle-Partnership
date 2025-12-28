import { useMemo, useState } from 'react'
import { createSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'
import { decodeClerkJwtPayload, normalizeJwtRoles } from '@admin/shared/logic/clerkJwt'
import { productConfigs } from '@client/shop/products/data/product-config'
import { canonicalizeProductHandle } from '@client/shop/products/data/product-handle-aliases'
import type { AdminProduct } from '../ui/cards/ProductCard'

type Return = {
  products: AdminProduct[]
  setProducts: React.Dispatch<React.SetStateAction<AdminProduct[]>>
  loading: boolean
  error: string | null
  setError: (v: string | null) => void
  fetchProducts: (token: string | null, routeHandle?: string) => Promise<{ roleDebug: string[]; snapshots: Record<string, string> }>
}

const CONFIG_HANDLES = new Set(Object.values(productConfigs).map((cfg) => cfg.handle))
const resolveCanonicalConfiguredHandle = (handle: string) => {
  // Support both:
  // - canonical handles (e.g. `lumelle-shower-cap`)
  // - config route keys (e.g. `shower-cap`)
  const viaConfigKey = productConfigs[handle]?.handle ?? handle
  return canonicalizeProductHandle(viaConfigKey)
}

export function useProducts(): Return {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async (token: string | null, _routeHandle?: string) => {
    const roleDebug: string[] = []
    if (!isSupabaseConfigured || !token) {
      setLoading(false)
      return { roleDebug, snapshots: {} }
    }
    setLoading(true)
    setError(null)
    const payload = decodeClerkJwtPayload(token)
    const roles = normalizeJwtRoles(payload?.app_metadata?.roles)
    roleDebug.push(...roles)
    const client = createSupabaseClient(token)
    if (!client) {
      setError('Supabase is not configured in this environment (missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).')
      setProducts([])
      return { roleDebug, snapshots: {} }
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
      return { roleDebug, snapshots: {} }
    }

    const byCanonical = new Map<string, { row: any; aliasHandles: Set<string> }>()
    for (const row of productRows ?? []) {
      const rawHandle = String((row as any).handle ?? '').trim()
      if (!rawHandle) continue

      const canonical = resolveCanonicalConfiguredHandle(rawHandle)
      if (!canonical || !CONFIG_HANDLES.has(canonical)) continue

      const isCanonicalRow = rawHandle === canonical
      const existing = byCanonical.get(canonical)
      if (!existing) {
        byCanonical.set(canonical, { row, aliasHandles: new Set(isCanonicalRow ? [] : [rawHandle]) })
        continue
      }

      if (!isCanonicalRow) {
        existing.aliasHandles.add(rawHandle)
        continue
      }

      // Prefer the row whose handle already matches the canonical handle.
      const existingRaw = String((existing.row as any).handle ?? '').trim()
      if (existingRaw !== canonical) {
        if (existingRaw) existing.aliasHandles.add(existingRaw)
        existing.row = row
        continue
      }

      // Both are canonical rows — prefer latest updated_at as a tie-break.
      const existingTs = Date.parse(String((existing.row as any).updated_at ?? '')) || 0
      const currentTs = Date.parse(String((row as any).updated_at ?? '')) || 0
      if (currentTs > existingTs) existing.row = row
    }

    const filtered = Array.from(byCanonical.entries()).map(([canonicalHandle, entry]) => ({
      canonicalHandle,
      aliasHandles: Array.from(entry.aliasHandles).filter((h) => h && h !== canonicalHandle),
      row: entry.row,
    }))

    const productIds = filtered.map((entry) => entry.row.id as string)
    const mediaByProduct = new Map<string, AdminProduct['media']>()

    if (productIds.length) {
      const { data: mediaRows, error: mediaErr } = await client
        .from('cms_product_media')
        .select('id, product_id, path, alt, sort, is_primary, status')
        .in('product_id', productIds)
        .order('sort', { ascending: true })
      if (mediaErr) {
        setError(mediaErr.message)
        setProducts([])
        return { roleDebug, snapshots: {} }
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
      .map(({ row, canonicalHandle, aliasHandles }) => {
        const id = String(row.id)
        const handle = canonicalHandle
        const cfg = productConfigs[handle] ?? Object.values(productConfigs).find((c) => c.handle === handle)
        const mediaFromDb = (mediaByProduct.get(id) ?? []).slice().sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
        const media =
          mediaFromDb.length > 0
            ? mediaFromDb
            : (cfg?.gallery ?? []).map((path, idx) => ({
                id: `${handle}-${idx}`,
                path,
                alt: `${(cfg as any)?.title ?? handle} image ${idx + 1}`,
                sort: idx,
                is_primary: idx === 0,
              }))
        return {
          id,
          handle,
          alias_handles: aliasHandles,
          title: String(row.title ?? ''),
          short_desc: String(row.short_desc ?? ''),
          long_desc: String(row.long_desc ?? ''),
          price: row.price == null ? null : Number(row.price),
          compare_at_price: row.compare_at_price == null ? null : Number(row.compare_at_price),
          discount_percent_override: row.discount_percent_override == null ? null : Number(row.discount_percent_override),
          average_rating: row.average_rating == null ? null : Number(row.average_rating),
          review_count: row.review_count == null ? null : Number(row.review_count),
          review_count_label: String(row.review_count_label ?? ''),
          badge: String(row.badge ?? ''),
          video_slot: String(row.video_slot ?? ''),
          care_label_override: String(row.care_label_override ?? ''),
          hide_details_accordion: Boolean(row.hide_details_accordion),
          fallback_variant_id: String(row.fallback_variant_id ?? ''),
          fallback_item_id: String(row.fallback_item_id ?? ''),
          specs_text: JSON.stringify(row.specs ?? {}, null, 2),
          faq_text: JSON.stringify(row.faq ?? [], null, 2),
          status: String(row.status ?? 'draft'),
          updated_at: String(row.updated_at ?? ''),
          media,
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title))

    // Fallback to in-repo config if DB empty
    if (!nextProducts.length) {
      nextProducts = Object.values(productConfigs)
        .filter((cfg) => CONFIG_HANDLES.has(cfg.handle))
        .map((cfg) => ({
          id: cfg.handle,
          handle: cfg.handle,
          alias_handles: [],
          title: (cfg as any).title ?? (cfg as any).defaultTitle ?? cfg.handle,
          short_desc: (cfg as any).hero?.description ?? (cfg as any).defaultSubtitle ?? '',
          long_desc: '',
          price: (cfg as any).price?.value ?? (cfg as any).defaultPrice ?? null,
          compare_at_price: (cfg as any).price?.compare_at ?? (cfg as any).compareAtPrice ?? null,
          discount_percent_override: null,
          average_rating: (cfg as any).reviews?.average ?? (cfg as any).ratingValueOverride ?? null,
          review_count: (cfg as any).reviews?.count ?? null,
          review_count_label: String((cfg as any).reviews?.label ?? (cfg as any).ratingCountLabelOverride ?? ''),
          badge: String((cfg as any).badge ?? ''),
          video_slot: (cfg as any).videoSlot ?? '',
          care_label_override: '',
          hide_details_accordion: Boolean((cfg as any).hideDetailsAccordion ?? false),
          fallback_variant_id: String((cfg as any).fallbackVariantId ?? ''),
          fallback_item_id: String((cfg as any).fallbackItemId ?? ''),
          specs_text: JSON.stringify((cfg as any).specs ?? {}, null, 2),
          faq_text: JSON.stringify((cfg as any).qa ?? [], null, 2),
          status: 'draft',
          updated_at: '',
          media: (cfg as any).gallery
            ? (cfg as any).gallery.map((src: string, idx: number) => ({
                id: `${cfg.handle}-${idx}`,
                path: src,
                alt: (cfg as any).title ?? cfg.handle,
                sort: idx,
                is_primary: idx === 0,
              }))
            : [],
        }))
        .sort((a, b) => a.title.localeCompare(b.title))
    }

    setProducts(nextProducts)
    sessionStorage.setItem('admin:productCount', String(nextProducts.length || ''))
    const snapshots = Object.fromEntries(nextProducts.map((p) => [p.id, JSON.stringify(p)]))
    setLoading(false)
    return { roleDebug, snapshots }
  }

  const memoError = useMemo(() => error, [error])

  return { products, setProducts, loading, error: memoError, setError, fetchProducts }
}

export default useProducts
