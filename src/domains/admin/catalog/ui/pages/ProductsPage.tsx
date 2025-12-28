import { useAuth } from '@clerk/clerk-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useBeforeUnload, useBlocker, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AdminPageLayout } from '@admin/shared/ui/layouts'
import { Copy, Save } from 'lucide-react'
import { createSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'
import { productConfigs } from '@client/shop/products/data/product-config'
import { canonicalizeProductHandle } from '@client/shop/products/data/product-handle-aliases'
import ProductsLayout from '@admin/catalog/ui/layouts/ProductsLayout'
import ProductCard, { type AdminMediaItem, type AdminProduct } from '@admin/catalog/ui/cards/ProductCard'
import { Field, Pill, TextInput } from '@admin/catalog/ui/components/FormPrimitives'
import EssentialsSection from '@admin/catalog/ui/sections/EssentialsSection'
import FaqSection from '@admin/catalog/ui/sections/FaqSection'
import FeaturedTikTokSection from '@admin/catalog/ui/sections/FeaturedTikTokSection'
import {
  PRODUCTS_EDITOR_SCROLL_SECTION_IDS,
  PRODUCTS_EDITOR_TO_PREVIEW_SECTION,
  PRODUCTS_PREVIEW_TO_EDITOR_SECTION,
} from '@admin/catalog/ui/preview/productsPreviewScrollSync'
import IPhonePreviewCard from '@admin/shared/ui/preview/IPhonePreviewCard'
import useBidirectionalPreviewScrollSync from '@admin/shared/hooks/useBidirectionalPreviewScrollSync'
const CONFIG_HANDLES = new Set(Object.values(productConfigs).map((cfg) => cfg.handle))
const PREVIEW_DEVICE_PERSIST_KEY = 'admin:previewDevice'
const PREVIEW_SYNC_PERSIST_KEY = 'admin:previewSync'

// Some products use a route key that differs from their canonical handle (e.g. `shower-cap` -> `lumelle-shower-cap`).
// Keep admin URLs stable by preferring the product config key when available.
const PRODUCT_HANDLE_TO_ROUTE_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(productConfigs).map(([key, cfg]) => [cfg.handle, key]),
)
const getProductConfig = (handle: string) => {
  const direct = (productConfigs as any)[handle]
  if (direct) return direct
  return Object.values(productConfigs).find((cfg) => cfg.handle === handle)
}
const resolveCanonicalConfiguredHandle = (handle: string) => {
  // Support both:
  // - canonical handles (e.g. `lumelle-shower-cap`)
  // - config route keys (e.g. `shower-cap`)
  const viaConfigKey = productConfigs[handle]?.handle ?? handle
  return canonicalizeProductHandle(viaConfigKey)
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
const PROOF_DEFAULTS = [
  { label: 'Proven', body: 'Protects hair' },
  { label: 'Dispatch', body: '48 hrs ship time' },
  { label: 'Guarantee', body: 'Free returns in 30 days' },
]
const BENEFIT_COUNT = 4
const ESSENTIAL_COUNT = 4
const FAQ_COUNT = 4
const JUMP_TO_SECTION_IDS = [
  'admin-editor-hero',
  'admin-editor-hero-badge',
  'admin-editor-hero-gallery',
  'admin-editor-hero-text',
  'admin-editor-hero-price-reviews',
  'admin-editor-sign',
  'admin-editor-care',
  'admin-editor-proof',
  'admin-editor-details',
  'admin-editor-benefits',
  'admin-editor-essentials',
  'admin-editor-featured-tiktok',
  'admin-editor-faq',
] as const
type JumpToSectionId = (typeof JUMP_TO_SECTION_IDS)[number]
type ProductsEditorSectionId = (typeof PRODUCTS_EDITOR_SCROLL_SECTION_IDS)[number]

function parseJumpToSectionId(value: string | null | undefined): JumpToSectionId | null {
  const v = (value ?? '').trim()
  if (!v) return null
  return (JUMP_TO_SECTION_IDS as readonly string[]).includes(v) ? (v as JumpToSectionId) : null
}

function parseMediaIdx(value: string | null | undefined): number | null {
  const v = (value ?? '').trim()
  if (!v) return null
  const n = Number(v)
  if (!Number.isFinite(n) || !Number.isInteger(n)) return null
  if (n < 0) return null
  return n
}

type PreviewDevice = 'phone' | 'tablet' | 'desktop'

function parsePreviewDevice(value: string | null | undefined): PreviewDevice {
  const v = (value ?? '').trim()
  return v === 'tablet' || v === 'desktop' || v === 'phone' ? v : 'phone'
}

function parsePreviewSync(value: string | null | undefined): boolean {
  const v = (value ?? '').trim().toLowerCase()
  if (v === '0' || v === 'false' || v === 'off' || v === 'no') return false
  if (v === '1' || v === 'true' || v === 'on' || v === 'yes') return true
  return true
}

const formatEditorSectionLabel = (id: string): string => {
  switch (id) {
    case 'admin-editor-hero':
      return 'Hero'
    case 'admin-editor-hero-badge':
      return 'Hero · Badge'
    case 'admin-editor-hero-gallery':
      return 'Hero · Gallery'
    case 'admin-editor-hero-text':
      return 'Hero · Text'
    case 'admin-editor-hero-price-reviews':
      return 'Hero · Price & Reviews'
    case 'admin-editor-sign':
      return 'Sign'
    case 'admin-editor-care':
      return 'Care'
    case 'admin-editor-proof':
      return 'Proof'
    case 'admin-editor-details':
      return 'Details'
    case 'admin-editor-details-heading':
      return 'Details · Heading'
    case 'admin-editor-details-tiktok':
      return 'Details · TikTok'
    case 'admin-editor-details-pills':
      return 'Details · Pills'
    case 'admin-editor-benefits':
      return 'Benefits'
    case 'admin-editor-essentials':
      return 'Essentials'
    case 'admin-editor-featured-tiktok':
      return 'Featured TikTok'
    case 'admin-editor-faq':
      return 'FAQ'
    default:
      break
  }

  const signMatch = id.match(/^admin-editor-sign-bullet-(\d+)$/)
  if (signMatch) return `Sign · Bullet ${signMatch[1]}`

  const careMatch = id.match(/^admin-editor-care-bullet-(\d+)$/)
  if (careMatch) return `Care · Bullet ${careMatch[1]}`

  const proofMatch = id.match(/^admin-editor-proof-item-(\d+)$/)
  if (proofMatch) return `Proof · Item ${proofMatch[1]}`

  const benefitMatch = id.match(/^admin-editor-benefits-bullet-(\d+)$/)
  if (benefitMatch) return `Benefits · Bullet ${benefitMatch[1]}`

  const essentialsMatch = id.match(/^admin-editor-essentials-item-(\d+)$/)
  if (essentialsMatch) return `Essentials · Point ${essentialsMatch[1]}`

  const faqMatch = id.match(/^admin-editor-faq-item-(\d+)$/)
  if (faqMatch) return `FAQ · Q&A ${faqMatch[1]}`

  return 'Section'
}

const formatAge = (deltaMs: number) => {
  const seconds = Math.max(0, Math.floor(deltaMs / 1000))
  if (seconds < 10) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function ProductsPage() {
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const { handle: routeHandle } = useParams<{ handle?: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [snapshots, setSnapshots] = useState<Record<string, string>>({})
  const [nowMs, setNowMs] = useState<number>(() => Date.now())
  const [activeEditorSectionId, setActiveEditorSectionId] = useState<JumpToSectionId>('admin-editor-hero')
  const [activePreviewEditorId, setActivePreviewEditorId] = useState<ProductsEditorSectionId>('admin-editor-hero')
  const activePreviewLabel = useMemo(() => formatEditorSectionLabel(activePreviewEditorId), [activePreviewEditorId])
  const [copiedEditorLink, setCopiedEditorLink] = useState(false)
  const editorLinkCopyResetRef = useRef<number | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [editingMediaIdx, setEditingMediaIdx] = useState<number | null>(null)
  const [productSearch, setProductSearch] = useState<string>(() => (searchParams.get('q') ?? '').trim())
  const product = selectedId ? products.find((p) => p.id === selectedId) : null
  const hasSelection = !!product && !loading
  const isConfigFallbackProduct = useMemo(() => {
    if (!product) return false
    // In config-fallback mode we synthesize products with `id === handle`.
    // A real CMS row should have a DB id, so this is a safe discriminator.
    return product.id === product.handle
  }, [product])
  const previewDevice = useMemo(() => {
    const raw = searchParams.get('device')
    if (raw) return parsePreviewDevice(raw)
    try {
      const stored = window.localStorage.getItem(PREVIEW_DEVICE_PERSIST_KEY)
      return parsePreviewDevice(stored)
    } catch {
      return 'phone'
    }
  }, [searchParams])
  const previewSyncEnabled = useMemo(() => {
    const raw = searchParams.get('sync')
    if (raw != null) return parsePreviewSync(raw)
    try {
      const stored = window.localStorage.getItem(PREVIEW_SYNC_PERSIST_KEY)
      return parsePreviewSync(stored)
    } catch {
      return true
    }
  }, [searchParams])

  // Keep URL in sync with persisted preview device (without forcing `device=phone`).
  useEffect(() => {
    if (searchParams.has('device')) return
    if (previewDevice === 'phone') return
    const next = new URLSearchParams(searchParams)
    next.set('device', previewDevice)
    setSearchParams(next, { replace: true })
  }, [previewDevice, searchParams, setSearchParams])

  // Keep URL in sync with persisted preview sync (without forcing `sync=1`).
  useEffect(() => {
    if (searchParams.has('sync')) return
    if (previewSyncEnabled) return
    const next = new URLSearchParams(searchParams)
    next.set('sync', '0')
    setSearchParams(next, { replace: true })
  }, [previewSyncEnabled, searchParams, setSearchParams])

  const handlePreviewDeviceChange = useCallback(
    (nextDevice: PreviewDevice) => {
      const next = new URLSearchParams(searchParams)
      if (nextDevice === 'phone') next.delete('device')
      else next.set('device', nextDevice)
      setSearchParams(next, { replace: true })
      try {
        window.localStorage.setItem(PREVIEW_DEVICE_PERSIST_KEY, nextDevice)
      } catch {
        // ignore
      }
    },
    [searchParams, setSearchParams],
  )
  const handlePreviewSyncChange = useCallback(
    (enabled: boolean) => {
      const next = new URLSearchParams(searchParams)
      if (enabled) next.delete('sync')
      else next.set('sync', '0')
      setSearchParams(next, { replace: true })
      try {
        window.localStorage.setItem(PREVIEW_SYNC_PERSIST_KEY, enabled ? '1' : '0')
      } catch {
        // ignore
      }
    },
    [searchParams, setSearchParams],
  )

  // Keyboard shortcuts: 1=phone, 2=tablet, 3=desktop (when not typing in a form field).
  useEffect(() => {
    if (!hasSelection) return

    const isEditableTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null
      if (!el) return false
      if (el.isContentEditable) return true
      const tag = el.tagName?.toLowerCase()
      return tag === 'input' || tag === 'textarea' || tag === 'select'
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isEditableTarget(e.target)) return

      if (e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault()
        handlePreviewSyncChange(!previewSyncEnabled)
        return
      }

      if (e.key === '1') {
        e.preventDefault()
        handlePreviewDeviceChange('phone')
      } else if (e.key === '2') {
        e.preventDefault()
        handlePreviewDeviceChange('tablet')
      } else if (e.key === '3') {
        e.preventDefault()
        handlePreviewDeviceChange('desktop')
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handlePreviewDeviceChange, handlePreviewSyncChange, hasSelection, previewSyncEnabled])

  useBidirectionalPreviewScrollSync({
    enabled: hasSelection && previewSyncEnabled,
    iframeRef,
    previewToEditor: PRODUCTS_PREVIEW_TO_EDITOR_SECTION,
    editorToPreview: PRODUCTS_EDITOR_TO_PREVIEW_SECTION,
    editorSectionIds: PRODUCTS_EDITOR_SCROLL_SECTION_IDS,
    editorScrollThrottleMs: 90,
    previewScrollThrottleMs: 90,
    suppressMs: 240,
    activationY: 200,
    editorScrollBehavior: 'smooth',
    previewScrollBehavior: 'smooth',
    editorScrollBlock: 'nearest',
    editorScrollMode: 'pin',
    editorScrollOffsetPx: 120,
  })
  useEffect(() => {
    if (product) {
      sessionStorage.setItem('admin:lastProductHandle', product.handle)
      sessionStorage.setItem('admin:lastProductTitle', product.title)
    }
  }, [product?.id, product?.handle, product?.title])
  useEffect(() => {
    setLastSavedAt(null)
    setEditingMediaIdx(null)
    setActivePreviewEditorId('admin-editor-hero')
  }, [product?.id])

  // URL -> state for list search (deep links / back-forward)
  useEffect(() => {
    setProductSearch((searchParams.get('q') ?? '').trim())
  }, [searchParams])

  // state -> URL for list search
  useEffect(() => {
    const next = new URLSearchParams(searchParams)
    const q = productSearch.trim()
    if (q) next.set('q', q)
    else next.delete('q')
    if (next.toString() === searchParams.toString()) return
    setSearchParams(next, { replace: true })
  }, [productSearch, searchParams, setSearchParams])

  // URL -> state for selected media item (deep links + back/forward).
  useEffect(() => {
    if (!routeHandle) return
    const desired = parseMediaIdx(searchParams.get('media'))
    if (!hasSelection) return
    if (desired == null) return
    const max = product?.media?.length ?? 0
    if (desired >= max) {
      const next = new URLSearchParams(searchParams)
      if (next.has('media')) {
        next.delete('media')
        setSearchParams(next, { replace: true })
      }
      return
    }
    if (editingMediaIdx !== desired) setEditingMediaIdx(desired)
  }, [editingMediaIdx, hasSelection, product?.media?.length, routeHandle, searchParams, setSearchParams])

  // URL -> state for editor section (deep links + back/forward).
  // We use query params (not hash) to avoid browser auto-scrolling/jank.
  useEffect(() => {
    if (!hasSelection) return
    const desired = parseJumpToSectionId(searchParams.get('section'))
    if (!desired) return
    if (desired === activeEditorSectionId) return

    setActiveEditorSectionId(desired)

    // Retry a few times to support deep links before the section DOM mounts.
    let cancelled = false
    let attempts = 0
    const tryScroll = () => {
      if (cancelled) return
      const el = document.getElementById(desired)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      attempts += 1
      if (attempts < 12) window.setTimeout(tryScroll, 60)
    }
    tryScroll()

    return () => {
      cancelled = true
    }
  }, [activeEditorSectionId, hasSelection, routeHandle, searchParams])

  // state -> URL for editor section (shareable URLs, no history spam).
  const desiredSearch = useMemo(() => {
    const next = new URLSearchParams(searchParams)

    const requestedSection = parseJumpToSectionId(searchParams.get('section'))

    // List route: strip editor-only params.
    if (!routeHandle) {
      if (next.has('section')) next.delete('section')
      if (next.has('media')) next.delete('media')
      return next
    }

    // Detail route, but product not loaded yet: preserve deep links.
    if (!hasSelection) return next

    // If URL requests a non-hero section but state is still at the default (hero), don't fight it.
    // This avoids deleting `?section=...` during the initial "load -> select" transition.
    if (activeEditorSectionId === 'admin-editor-hero' && requestedSection && requestedSection !== 'admin-editor-hero') {
      return next
    }

    if (activeEditorSectionId === 'admin-editor-hero') {
      if (next.has('section')) next.delete('section')
      return next
    }

    const current = next.get('section')
    if (current !== activeEditorSectionId) next.set('section', activeEditorSectionId)
    return next
  }, [activeEditorSectionId, hasSelection, routeHandle, searchParams])

  useEffect(() => {
    if (searchParams.toString() === desiredSearch.toString()) return
    setSearchParams(desiredSearch, { replace: true })
  }, [desiredSearch, searchParams, setSearchParams])

  const handleToggleEditingMediaIdx = useCallback(
    (idx: number) => {
      if (!hasSelection) return
      setEditingMediaIdx(idx)
      const next = new URLSearchParams(searchParams)
      // Keep the URL clean by omitting the default selection (0).
      if (idx === 0) next.delete('media')
      else next.set('media', String(idx))
      // User-driven selection: push history so back/forward works.
      setSearchParams(next, { replace: false })
    },
    [hasSelection, searchParams, setSearchParams],
  )

  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) => {
      const routeKey = PRODUCT_HANDLE_TO_ROUTE_KEY[p.handle] ?? p.handle
      const aliases = Array.isArray(p.alias_handles) ? p.alias_handles : []
      return (
        String(p.title ?? '').toLowerCase().includes(q) ||
        p.handle.toLowerCase().includes(q) ||
        routeKey.toLowerCase().includes(q) ||
        aliases.some((h) => String(h ?? '').toLowerCase().includes(q))
      )
    })
  }, [productSearch, products])

  useEffect(() => {
    sessionStorage.setItem('admin:productCount', String(products.length || ''))
    window.dispatchEvent(new Event('admin:productCountUpdated'))
  }, [products.length])
  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 15_000)
    return () => window.clearInterval(id)
  }, [])
  useEffect(() => {
    return () => {
      if (editorLinkCopyResetRef.current) window.clearTimeout(editorLinkCopyResetRef.current)
    }
  }, [])

  // Listen for the preview iframe scrollspy so we can softly highlight the corresponding editor card.
  useEffect(() => {
    if (!hasSelection) return

    const handler = (event: MessageEvent) => {
      // Security: only accept same-origin messages.
      if (event.origin !== window.location.origin) return

      const data = event.data as any
      if (data?.type !== 'admin-preview-active-section') return
      if (typeof data.sectionId !== 'string') return

      const editorId = PRODUCTS_PREVIEW_TO_EDITOR_SECTION[data.sectionId as keyof typeof PRODUCTS_PREVIEW_TO_EDITOR_SECTION]
      if (!editorId) return
      setActivePreviewEditorId(editorId as ProductsEditorSectionId)
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [hasSelection])

  // Keep URL `/admin/products/:handle` as the source of truth for which product is selected.
  useEffect(() => {
    if (loading) return
    if (!routeHandle) {
      if (selectedId) setSelectedId(null)
      return
    }
    if (!products.length) return

    // Canonicalize known alias handles so old bookmarks don't "lose" selection.
    const canonicalFromAlias = canonicalizeProductHandle(routeHandle)
    if (routeHandle !== canonicalFromAlias) {
      navigate(`/admin/products/${encodeURIComponent(canonicalFromAlias)}`, { replace: true })
      return
    }

    const match = products.find((p) => {
      const routeKey = PRODUCT_HANDLE_TO_ROUTE_KEY[p.handle] ?? p.handle
      return p.handle === routeHandle || routeKey === routeHandle
    })
    if (match) {
      const canonicalRouteKey = PRODUCT_HANDLE_TO_ROUTE_KEY[match.handle] ?? match.handle
      if (routeHandle !== canonicalRouteKey) {
        navigate(`/admin/products/${encodeURIComponent(canonicalRouteKey)}`, { replace: true })
        return
      }
      setSelectedId(match.id)
      return
    }
    setSelectedId(null)
    navigate('/admin/products', { replace: true })
  }, [loading, navigate, products, routeHandle, selectedId])

  const dirty = useMemo(() => {
    if (!product) return false
    return JSON.stringify(product) !== snapshots[product.id]
  }, [product, snapshots])

  // Warn before leaving the page entirely.
  useBeforeUnload(
    useCallback(
      (event) => {
        if (!dirty) return
        event.preventDefault()
        // Most browsers ignore custom messages; setting returnValue triggers the prompt.
        event.returnValue = ''
      },
      [dirty],
    ),
  )

  // Warn before navigating away (switching products, leaving /admin/products/*).
  // Allow query-param updates within the editor (deep links for section/media/device) without prompting.
  const navigationBlocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (!dirty) return false
    return currentLocation.pathname !== nextLocation.pathname
  })

  useEffect(() => {
    if (navigationBlocker.state !== 'blocked') return
    const confirmed = window.confirm('You have unsaved changes. Leave without saving?')
    if (confirmed) navigationBlocker.proceed()
    else navigationBlocker.reset()
  }, [navigationBlocker])
  const activeEditorSectionIdRef = useRef<string>('')
  useEffect(() => {
    activeEditorSectionIdRef.current = activeEditorSectionId
  }, [activeEditorSectionId])
  useEffect(() => {
    if (!hasSelection) return

    let raf = 0
    const activationY = 180

    const computeActive = () => {
      // "Pinned line" scrollspy: pick the last section whose top is above the activation line.
      let lastAbove: string | null = null
      let firstBelow: string | null = null

      for (const id of JUMP_TO_SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= activationY) lastAbove = id
        else if (!firstBelow) firstBelow = id
      }

      const next = (lastAbove ?? firstBelow) as JumpToSectionId | null
      if (!next) return
      if (activeEditorSectionIdRef.current === next) return
      activeEditorSectionIdRef.current = next
      setActiveEditorSectionId(next)
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        computeActive()
      })
    }

    computeActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [hasSelection])
  const scrollToEditorSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])
  const jumpFromPreviewToEditor = useCallback(() => {
    scrollToEditorSection(activePreviewEditorId)
  }, [activePreviewEditorId, scrollToEditorSection])
  const copyEditorLink = useCallback(() => {
    try {
      const url = new URL(window.location.href)
      if (activeEditorSectionId === 'admin-editor-hero') url.searchParams.delete('section')
      else url.searchParams.set('section', activeEditorSectionId)

      const write = async () => {
        try {
          await navigator.clipboard.writeText(url.toString())
          setCopiedEditorLink(true)
          if (editorLinkCopyResetRef.current) window.clearTimeout(editorLinkCopyResetRef.current)
          editorLinkCopyResetRef.current = window.setTimeout(() => setCopiedEditorLink(false), 1200)
        } catch {
          window.prompt('Copy editor URL:', url.toString())
        }
      }

      void write()
    } catch {
      window.prompt('Copy editor URL:', window.location.href)
    }
  }, [activeEditorSectionId])
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
  const parsedSpecs = useMemo(() => {
    if (!product) return {}
    try {
      const val = JSON.parse(product.specs_text)
      if (val && typeof val === 'object' && !Array.isArray(val)) return val as Record<string, unknown>
      return {}
    } catch {
      return {}
    }
  }, [product?.specs_text])
  const howBullets = useMemo(() => {
    const raw = (parsedSpecs as any).how
    const arr = Array.isArray(raw) ? raw : []
    const normalized = arr.map((item: any) => ({
      title: typeof item?.title === 'string' ? item.title : '',
      body: typeof item?.body === 'string' ? item.body : '',
    }))
    while (normalized.length < 3) normalized.push({ title: '', body: '' })
    return normalized.slice(0, 3)
  }, [parsedSpecs])
  const proofBullets = useMemo(() => {
    const raw = (parsedSpecs as any).proofStrip
    const arr = Array.isArray(raw) ? raw : PROOF_DEFAULTS
    const normalized = arr.map((item: any, idx: number) => ({
      label: typeof item?.label === 'string' ? item.label : PROOF_DEFAULTS[idx]?.label ?? '',
      body: typeof item?.body === 'string' ? item.body : '',
    }))
    while (normalized.length < 3) normalized.push({ label: PROOF_DEFAULTS[normalized.length]?.label ?? '', body: '' })
    return normalized.slice(0, 3)
  }, [parsedSpecs])
  const updateProofBullet = useCallback(
    (index: number, field: 'label' | 'body', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const current = Array.isArray(specsObj.proofStrip) ? specsObj.proofStrip.slice() : PROOF_DEFAULTS.slice()
        while (current.length < 3) current.push({ label: PROOF_DEFAULTS[current.length]?.label ?? '', body: '' })
        const next = current.slice(0, 3).map((item, idx) =>
          idx === index ? { ...item, [field]: value } : { label: item?.label ?? '', body: item?.body ?? '' },
        )
        return {
          ...p,
          specs_text: JSON.stringify({ ...specsObj, proofStrip: next }, null, 2),
        }
      })
    },
    [product, updateProduct],
  )
  const benefitBullets = useMemo(() => {
    const raw = (parsedSpecs as any).reasons
    const arr = Array.isArray(raw) ? raw : []
    const normalized = arr.map((item: any) => ({
      title: typeof item?.title === 'string' ? item.title : '',
      body: typeof item?.desc === 'string' ? item.desc : item?.body ?? '',
    }))
    while (normalized.length < BENEFIT_COUNT) normalized.push({ title: '', body: '' })
    return normalized.slice(0, BENEFIT_COUNT)
  }, [parsedSpecs])
  const updateBenefitBullet = useCallback(
    (index: number, field: 'title' | 'body', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const current = Array.isArray(specsObj.reasons) ? specsObj.reasons.slice() : []
        while (current.length < BENEFIT_COUNT) current.push({ title: '', desc: '' })
        const next = current.slice(0, BENEFIT_COUNT).map((item, idx) =>
          idx === index ? { ...item, [field === 'body' ? 'desc' : field]: value } : { title: item?.title ?? '', desc: item?.desc ?? '' },
        )
        return { ...p, specs_text: JSON.stringify({ ...specsObj, reasons: next }, null, 2) }
      })
    },
    [product, updateProduct],
  )
  const essentials = useMemo(() => {
    const raw = (parsedSpecs as any).essentials
    const arr = Array.isArray(raw) ? raw : []
    const normalized = arr.map((item: any) => ({
      title: typeof item?.title === 'string' ? item.title : '',
      body: typeof item?.body === 'string' ? item.body : '',
    }))
    while (normalized.length < ESSENTIAL_COUNT) normalized.push({ title: '', body: '' })
    return normalized.slice(0, ESSENTIAL_COUNT)
  }, [parsedSpecs])
  const updateEssential = useCallback(
    (index: number, field: 'title' | 'body', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const current = Array.isArray(specsObj.essentials) ? specsObj.essentials.slice() : []
        while (current.length < ESSENTIAL_COUNT) current.push({ title: '', body: '' })
        const next = current.slice(0, ESSENTIAL_COUNT).map((item, idx) =>
          idx === index ? { ...item, [field]: value } : { title: item?.title ?? '', body: item?.body ?? '' },
        )
        return { ...p, specs_text: JSON.stringify({ ...specsObj, essentials: next }, null, 2) }
      })
    },
    [product, updateProduct],
  )
  const faqs = useMemo(() => {
    const rawSpecsFaq = (parsedSpecs as any).faq
    let raw = Array.isArray(rawSpecsFaq) ? rawSpecsFaq : null
    if (!raw && product?.faq_text) {
      try {
        const parsed = JSON.parse(product.faq_text)
        if (Array.isArray(parsed)) raw = parsed
      } catch {
        raw = null
      }
    }
    const arr = Array.isArray(raw) ? raw : []
    const normalized = arr.map((item: any) => ({
      q: typeof item?.q === 'string' ? item.q : '',
      a: typeof item?.a === 'string' ? item.a : '',
    }))
    while (normalized.length < FAQ_COUNT) normalized.push({ q: '', a: '' })
    return normalized.slice(0, FAQ_COUNT)
  }, [parsedSpecs])
  const updateFaq = useCallback(
    (index: number, field: 'q' | 'a', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const current = Array.isArray(specsObj.faq) ? specsObj.faq.slice() : []
        while (current.length < FAQ_COUNT) current.push({ q: '', a: '' })
        const next = current.slice(0, FAQ_COUNT).map((item, idx) =>
          idx === index ? { ...item, [field]: value } : { q: item?.q ?? '', a: item?.a ?? '' },
        )
        return {
          ...p,
          specs_text: JSON.stringify({ ...specsObj, faq: next }, null, 2),
          faq_text: JSON.stringify(next, null, 2),
        }
      })
    },
    [product, updateProduct],
  )
  const featurePills = useMemo(() => {
    const raw = (parsedSpecs as any).featureCallouts?.pills
    const arr = Array.isArray(raw) ? raw : []
    while (arr.length < 2) arr.push('')
    return arr.slice(0, 2)
  }, [parsedSpecs])
  const featureCalloutsHeading = useMemo(() => {
    const raw = (parsedSpecs as any).featureCallouts?.heading
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw
    return {}
  }, [parsedSpecs])
  const updateFeatureHeading = useCallback(
    (field: 'title' | 'description', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const nextFeature = {
          ...(specsObj.featureCallouts || {}),
          heading: { ...(specsObj.featureCallouts?.heading || {}), [field]: value, eyebrow: 'Why you’ll love it' },
        }
        return { ...p, specs_text: JSON.stringify({ ...specsObj, featureCallouts: nextFeature }, null, 2) }
      })
    },
    [product, updateProduct],
  )
  const updateFeaturePill = useCallback(
    (index: number, value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const current = Array.isArray(specsObj.featureCallouts?.pills) ? specsObj.featureCallouts.pills.slice() : []
        while (current.length < 2) current.push('')
        const next = current.slice(0, 2).map((pill, idx) => (idx === index ? value : pill ?? ''))
        const nextFeature = { ...(specsObj.featureCallouts || {}), pills: next }
        return { ...p, specs_text: JSON.stringify({ ...specsObj, featureCallouts: nextFeature }, null, 2) }
      })
    },
    [product, updateProduct],
  )
  const featuredTikTokHeading = useMemo(() => {
    const cfg = product ? getProductConfig(product.handle) : null
    const defaults = (cfg as any)?.featuredTikTokHeading ?? {}
    const raw = (parsedSpecs as any).featuredTikTokHeading
    const override = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {}
    return { ...defaults, ...override }
  }, [parsedSpecs, product?.handle])
  const updateFeaturedTikTokHeading = useCallback(
    (field: 'eyebrow' | 'title' | 'description', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }

        const cfg = getProductConfig(p.handle)
        const defaults = (cfg as any)?.featuredTikTokHeading ?? {}
        const currentRaw = specsObj.featuredTikTokHeading
        const current =
          currentRaw && typeof currentRaw === 'object' && !Array.isArray(currentRaw) ? currentRaw : defaults
        const next = { ...current, [field]: value }

        return { ...p, specs_text: JSON.stringify({ ...specsObj, featuredTikTokHeading: next }, null, 2) }
      })
    },
    [product, updateProduct],
  )
  const updateCareBullet = useCallback(
    (index: number, field: 'title' | 'body', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const currentCare = Array.isArray(specsObj.care) ? specsObj.care.slice() : []
        while (currentCare.length < 3) currentCare.push({ title: '', body: '' })
        const nextCare = currentCare.slice(0, 3).map((item, idx) =>
          idx === index ? { ...item, [field]: value } : { title: item?.title ?? '', body: item?.body ?? '' },
        )
        return {
          ...p,
          specs_text: JSON.stringify({ ...specsObj, care: nextCare }, null, 2),
        }
      })
    },
    [product, updateProduct],
  )
  const updateHowBullet = useCallback(
    (index: number, field: 'title' | 'body', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const currentHow = Array.isArray(specsObj.how) ? specsObj.how.slice() : []
        while (currentHow.length < 3) currentHow.push({ title: '', body: '' })
        const nextHow = currentHow.slice(0, 3).map((item, idx) =>
          idx === index ? { ...item, [field]: value } : { title: item?.title ?? '', body: item?.body ?? '' },
        )
        return {
          ...p,
          specs_text: JSON.stringify({ ...specsObj, how: nextHow }, null, 2),
        }
      })
    },
    [product, updateProduct],
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
        .map(({ row, canonicalHandle, aliasHandles }) => {
          const id = String(row.id)
          const handle = canonicalHandle
          const cfg = getProductConfig(handle)
          const mediaFromDb = (mediaByProduct.get(id) ?? [])
            .slice()
            .sort((a, b) => a.sort - b.sort)
            .filter((m) => !String(m.path ?? '').startsWith('video://'))
          const media = mediaFromDb.length
            ? mediaFromDb
            : (cfg?.gallery ?? [])
                .filter((path) => !path.startsWith('video://'))
                .map((path, idx) => ({
                  path,
                  alt: `${cfg?.title ?? handle} image ${idx + 1}`,
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
            price: normalizeNumber(row.price),
            compare_at_price: normalizeNumber(row.compare_at_price),
            discount_percent_override: row.discount_percent_override == null ? null : Number(row.discount_percent_override),
            average_rating: normalizeNumber(row.average_rating),
            review_count: row.review_count == null ? null : Number(row.review_count),
            review_count_label: String(row.review_count_label ?? ''),
            badge: String(row.badge ?? ''),
            video_slot: String(row.video_slot ?? '').replace(/^video:\/\//i, ''),
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
          .filter((cfg) => CONFIG_HANDLES.has(cfg.handle))
          .map((cfg) => ({
            id: cfg.handle,
            handle: cfg.handle,
            alias_handles: [],
            title: (cfg as any).title ?? (cfg as any).defaultTitle ?? cfg.handle,
            short_desc: (cfg as any).hero?.description ?? (cfg as any).defaultSubtitle ?? '',
            long_desc: '',
            price: normalizeNumber((cfg as any).price?.value ?? (cfg as any).defaultPrice ?? null),
            compare_at_price: normalizeNumber((cfg as any).price?.compare_at ?? (cfg as any).compareAtPrice ?? null),
            discount_percent_override: null,
            average_rating: normalizeNumber((cfg as any).reviews?.average ?? (cfg as any).ratingValueOverride ?? null),
            review_count: normalizeNumber((cfg as any).reviews?.count ?? null),
            review_count_label: String((cfg as any).reviews?.label ?? (cfg as any).ratingCountLabelOverride ?? ''),
            badge: String((cfg as any).badge ?? ''),
            video_slot: String((cfg as any).videoSlot ?? '').replace(/^video:\/\//i, ''),
            care_label_override: '',
            hide_details_accordion: Boolean((cfg as any).hideDetailsAccordion ?? false),
            fallback_variant_id: String((cfg as any).fallbackVariantId ?? ''),
            fallback_item_id: String((cfg as any).fallbackItemId ?? ''),
            specs_text: safeJsonStringify((cfg as any).specs ?? [], '[]'),
            faq_text: safeJsonStringify((cfg as any).qa ?? [], '[]'),
            status: 'draft',
            updated_at: '',
            media: (cfg as any).gallery
              ? (cfg as any).gallery
                  .filter((src: string) => !String(src ?? '').startsWith('video://'))
                  .map((src: string, idx: number) => ({
                  id: `${cfg.handle}-${idx}`,
                  path: src,
                  alt: (cfg as any).defaultTitle ?? cfg.handle,
                  sort: idx,
                  is_primary: idx === 0,
                }))
              : [],
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
  // If no media loaded yet, seed from config gallery so admin sees images (not saved until user saves)
  useEffect(() => {
    if (!product || product.media.length > 0) return
    const cfg = getProductConfig(product.handle)
    if (!cfg?.gallery?.length) return
    const seeded = cfg.gallery
      .filter((path) => !path.startsWith('video://'))
      .map((path, idx) => ({
        path,
        alt: `${cfg.title || product.title || product.handle} image ${idx + 1}`,
        sort: idx,
        is_primary: idx === 0,
      }))
    updateProduct((p) => ({ ...p, media: seeded }))
  }, [product, updateProduct])
  // Ensure an image detail panel is open when media exists
  useEffect(() => {
    if (!product || !product.media.length) {
      setEditingMediaIdx(null)
      return
    }
    if (editingMediaIdx == null || editingMediaIdx >= product.media.length) {
      const desired = parseMediaIdx(searchParams.get('media'))
      if (desired != null && desired < product.media.length) return
      setEditingMediaIdx(0)
    }
  }, [product, editingMediaIdx, searchParams])
  const postDraftToPreview = useCallback(() => {
    if (!product || !iframeRef.current) return

    const images = product.media
      .map((m) => m.path)
      .filter(Boolean)
      .filter((src) => !src.startsWith('video://'))
    const normalizeVideoSlot = (value: string | null | undefined) => {
      const raw = (value ?? '').trim()
      if (!raw) return null
      if (raw.startsWith('video://')) return raw
      if (/^https?:\/\//i.test(raw) || raw.startsWith('//')) return `video://${raw}`
      return raw
    }
    const videoSlot = normalizeVideoSlot(product.video_slot)
    const gallery = videoSlot ? [...images, videoSlot] : images

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

    const targetOrigin = window.location.origin
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
          ratingCountLabel:
            product.review_count_label || (product.review_count != null ? String(product.review_count) : undefined),
          careLabelOverride: product.care_label_override,
          hideDetailsAccordion: product.hide_details_accordion,
          specs: parsedSpecs ?? undefined,
          faq: parsedFaq ?? undefined,
          gallery,
        },
      },
      targetOrigin,
    )
  }, [product])

  // Send draft to iframe preview for live render (preview page does not read Supabase yet).
  useEffect(() => {
    postDraftToPreview()
  }, [postDraftToPreview])

  const handlePreviewIframeLoad = useCallback(() => {
    // On iframe reload (e.g. switching device preview), resend the current draft a couple times
    // to avoid races with the preview app bootstrapping its message listeners.
    postDraftToPreview()
    window.setTimeout(() => postDraftToPreview(), 120)
  }, [postDraftToPreview])
  // Listen for height messages from iframe preview
  const handleSave = useCallback(async () => {
    if (!product) return
    setSaving(true)
    setError(null)
    try {
      if (product.id === product.handle) {
        setError(
          'This environment is in config-fallback mode (no `cms_products` rows found). Saving is disabled until products are seeded in Supabase.',
        )
        return
      }
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
      const { data: updatedRows, error: updateErr, count: updatedCount } = await client
        .from('cms_products')
        .update(updatePayload, { count: 'exact' })
        .eq('id', product.id)
        .select('id')
      if (updateErr) {
        setError(updateErr.message)
        return
      }
      const affected = updatedCount ?? updatedRows?.length ?? 0
      if (!affected) {
        setError('Nothing saved — product record not found. Reload and try again.')
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
  const saveStatusLabel = useMemo(() => {
    if (isConfigFallbackProduct) return 'Read-only (config fallback)'
    if (saving) return 'Saving…'
    if (!product) return ''
    if (dirty) return 'Unsaved changes'
    if (lastSavedAt) return `Saved ${formatAge(nowMs - lastSavedAt.getTime())}`
    return 'Saved'
  }, [dirty, isConfigFallbackProduct, lastSavedAt, nowMs, product, saving])

  // Keyboard shortcut: Cmd/Ctrl+S to save (prevents browser "Save page" dialog).
  useEffect(() => {
    if (!hasSelection) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) return
      if (event.key.toLowerCase() !== 's') return
      event.preventDefault()
      if (saving || !dirty) return
      void handleSave()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dirty, handleSave, hasSelection, saving])

  const mediaCount = product?.media?.length ?? 0
  const missingAltCount = product ? product.media.filter((m) => !m.alt?.trim()).length : 0
  const activeSectionClass =
    'ring-2 ring-semantic-legacy-brand-cocoa/15 ring-offset-2 ring-offset-brand-porcelain shadow-sm'
  const isHeroSectionActive = activeEditorSectionId === 'admin-editor-hero'
  const isHeroVisualsActive =
    activeEditorSectionId === 'admin-editor-hero-badge' || activeEditorSectionId === 'admin-editor-hero-gallery'
  const isHeroTextActive = activeEditorSectionId === 'admin-editor-hero-text'
  const isHeroPriceActive = activeEditorSectionId === 'admin-editor-hero-price-reviews'
  const isSignActive = activeEditorSectionId === 'admin-editor-sign'
  const isCareActive = activeEditorSectionId === 'admin-editor-care'
  const isProofActive = activeEditorSectionId === 'admin-editor-proof'
  const isDetailsActive = activeEditorSectionId === 'admin-editor-details'
  const isBenefitsActive = activeEditorSectionId === 'admin-editor-benefits'
  const isEssentialsActive = activeEditorSectionId === 'admin-editor-essentials'
  const isFeaturedTikTokActive = activeEditorSectionId === 'admin-editor-featured-tiktok'
  const isFaqActive = activeEditorSectionId === 'admin-editor-faq'
  const careBullets = useMemo(() => {
    const raw = (parsedSpecs as any).care
    const arr = Array.isArray(raw) ? raw : []
    const normalized = arr.map((item: any) => ({
      title: typeof item?.title === 'string' ? item.title : '',
      body: typeof item?.body === 'string' ? item.body : '',
    }))
    while (normalized.length < 3) normalized.push({ title: '', body: '' })
    return normalized.slice(0, 3)
  }, [parsedSpecs])
  const missingHeroSubtext = !product?.short_desc?.trim()
  const missingHeroPrice = product?.price == null
  const missingSignTitles = howBullets.filter((b) => !b.title.trim()).length
  const missingSignBodies = howBullets.filter((b) => !b.body.trim()).length
  const missingCareTitles = careBullets.filter((b) => !b.title.trim()).length
  const missingCareBodies = careBullets.filter((b) => !b.body.trim()).length
  const missingProofLabels = proofBullets.filter((b) => !b.label.trim()).length
  const missingProofBodies = proofBullets.filter((b) => !b.body.trim()).length
  const missingDetailsHeadingTitle = !String(featureCalloutsHeading.title ?? '').trim()
  const missingDetailsHeadingDesc = !String(featureCalloutsHeading.description ?? '').trim()
  const missingDetailsTikTokUrl = !product?.video_slot?.trim()
  const missingDetailsPills = featurePills.filter((pill) => !pill.trim()).length
  const missingBenefitTitles = benefitBullets.filter((b) => !b.title.trim()).length
  const missingBenefitBodies = benefitBullets.filter((b) => !b.body.trim()).length
  return (
    <AdminPageLayout title={null} subtitle={null} actions={null}>
      {!isSupabaseConfigured ? (
        <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 text-sm text-semantic-text-primary/80">
          Supabase is not configured for the frontend (missing <span className="font-mono text-[12px]">VITE_SUPABASE_URL</span> /{' '}
          <span className="font-mono text-[12px]">VITE_SUPABASE_ANON_KEY</span>).
        </div>
      ) : null}
      {hasSelection && isConfigFallbackProduct ? (
        <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 text-sm text-semantic-text-primary/80">
          This editor is showing <span className="font-semibold">config-fallback</span> product data because there are no{' '}
          <span className="font-mono text-[12px]">cms_products</span> rows in Supabase for this environment. Saving is disabled until the
          CMS is seeded.
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
	            <div className="flex items-center gap-2">
	              <Pill>
                  {filteredProducts.length}
                  {productSearch.trim() ? ` / ${products.length}` : ''} products
                </Pill>
                <input
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products…"
                  className="w-full max-w-[260px] rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary placeholder:text-semantic-text-primary/40 shadow-sm"
                />
                {productSearch.trim() ? (
                  <button
                    type="button"
                    onClick={() => setProductSearch('')}
                    className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary/70 shadow-sm hover:bg-brand-porcelain/60"
                  >
                    Clear
                  </button>
                ) : null}
            </div>
            <button
              className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60 disabled:opacity-60"
              onClick={loadProducts}
              disabled={loading}
            >
              Reload
            </button>
	          </div>
	          <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
	            {filteredProducts.map((p) => (
	              <ProductCard
	                key={p.id}
	                product={p}
	                onOpen={() => {
	                  const routeKey = PRODUCT_HANDLE_TO_ROUTE_KEY[p.handle] ?? p.handle
                    const qs = searchParams.toString()
	                  navigate(qs ? `/admin/products/${encodeURIComponent(routeKey)}?${qs}` : `/admin/products/${encodeURIComponent(routeKey)}`)
	                }}
	              />
	            ))}
	          </div>
	        </div>
      ) : (
	        <ProductsLayout
		          previewSlot={
		            <IPhonePreviewCard
		              iframeRef={iframeRef}
		              src={`/admin/preview/product/${encodeURIComponent(
		                PRODUCT_HANDLE_TO_ROUTE_KEY[product.handle] ?? product.handle,
		              )}`}
		              device={previewDevice}
		              onDeviceChange={handlePreviewDeviceChange}
		              activeSectionLabel={activePreviewLabel}
		              syncEnabled={previewSyncEnabled}
		              onSyncEnabledChange={handlePreviewSyncChange}
		              onJumpToEditorSection={jumpFromPreviewToEditor}
		              onCopyEditorLink={copyEditorLink}
		              hidden={!hasSelection}
		              onIframeLoad={handlePreviewIframeLoad}
		            />
		          }
		        >
          <div className="sticky top-24 z-20">
            <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/90 px-3 py-2 shadow-sm backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="truncate text-sm font-semibold text-semantic-text-primary">{product.title}</div>
                    <Pill>{product.status === 'live' ? 'Live' : 'Draft'}</Pill>
                  </div>
                  <div className="mt-1 text-xs font-semibold text-semantic-text-primary/70">
                    {saveStatusLabel}
                    {copiedEditorLink ? ' · Link copied' : ''}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    aria-label="Jump to section"
                    value={activeEditorSectionId}
                    onChange={(e) => {
                      const id = e.target.value
                      scrollToEditorSection(id)
                    }}
                    className="inline-flex h-8 rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 text-xs font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60 focus:outline-none"
                  >
                    <optgroup label="Hero">
                      <option value="admin-editor-hero">Hero</option>
                      <option value="admin-editor-hero-badge">Hero badge</option>
                      <option value="admin-editor-hero-gallery">Gallery</option>
                      <option value="admin-editor-hero-text">Hero text</option>
                      <option value="admin-editor-hero-price-reviews">Price & reviews</option>
                    </optgroup>
	                    <optgroup label="Sections">
	                      <option value="admin-editor-sign">Sign</option>
	                      <option value="admin-editor-care">Care</option>
	                      <option value="admin-editor-proof">Proof</option>
	                      <option value="admin-editor-details">Details</option>
	                      <option value="admin-editor-benefits">Benefits</option>
	                      <option value="admin-editor-essentials">Essentials</option>
	                      <option value="admin-editor-featured-tiktok">Featured TikTok</option>
	                      <option value="admin-editor-faq">FAQ</option>
	                    </optgroup>
                  </select>

                  <button
                    disabled={isConfigFallbackProduct || saving || !dirty || !product}
                    onClick={handleSave}
                    className={`inline-flex h-8 items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 text-xs font-semibold text-semantic-text-primary shadow-sm transition ${
                      isConfigFallbackProduct || saving || !dirty || !product ? 'opacity-60 cursor-not-allowed' : 'hover:bg-brand-porcelain/60'
                    }`}
                  >
                    <Save className="h-4 w-4" />
                    {isConfigFallbackProduct ? 'Read-only' : saving ? 'Saving…' : 'Save changes'}
                  </button>
                  <button
                    type="button"
                    aria-label="Copy editor link"
                    title="Copy editor link"
                    onClick={copyEditorLink}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-semantic-text-primary/60 hover:bg-brand-porcelain/60 hover:text-semantic-text-primary focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/25 focus:ring-offset-2 focus:ring-offset-brand-porcelain"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

		          <section
	            id="admin-editor-hero"
	            className={`scroll-mt-24 space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 transition-shadow ${
	              isHeroSectionActive || String(activePreviewEditorId ?? '').startsWith('admin-editor-hero') ? activeSectionClass : ''
	            }`}
	          >
              <div className="h-9 -mx-5 -mt-5 mb-4 rounded-t-2xl bg-semantic-legacy-brand-blush px-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary">Hero</span>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-semantic-text-primary/70">
                  <span className="text-semantic-text-primary/60">{mediaCount} images</span>
                  {missingAltCount ? (
                    <span className="text-semantic-legacy-brand-cocoa">{missingAltCount} missing alt</span>
                  ) : null}
                  {missingHeroSubtext ? <span className="text-semantic-legacy-brand-cocoa">Missing subtext</span> : null}
                  {missingHeroPrice ? <span className="text-semantic-legacy-brand-cocoa">Missing price</span> : null}
                </div>
              </div>
              {/* Pill + Gallery */}
	              <div
                  className={`rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 space-y-3 transition-shadow ${
                    isHeroVisualsActive ||
                    activePreviewEditorId === 'admin-editor-hero-badge' ||
                    activePreviewEditorId === 'admin-editor-hero-gallery'
                      ? activeSectionClass
                      : ''
                  }`}
                >
	                <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary">
                      Hero visuals
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold">
                      <span className="text-semantic-text-primary/60">{mediaCount} images</span>
                      {missingAltCount ? (
                        <span className="text-semantic-legacy-brand-cocoa">{missingAltCount} missing alt</span>
                      ) : null}
                    </div>
                  </div>
	                <div
                    id="admin-editor-hero-badge"
                    className={`scroll-mt-24 ${
                      activePreviewEditorId === 'admin-editor-hero-badge' ? activeSectionClass : ''
                    }`}
                  >
	                  <Field label="Hero badge">
	                    <TextInput
	                      value={product.badge}
	                      onChange={(v) => updateProduct((p) => ({ ...p, badge: v }))}
	                      placeholder="e.g. New heatless curler launched"
	                    />
	                  </Field>
	                </div>
	                <div
                    className={`space-y-3 rounded-xl border border-semantic-legacy-brand-blush/50 bg-brand-porcelain/40 p-3 ${
                      activePreviewEditorId === 'admin-editor-hero-gallery' ? activeSectionClass : ''
                    }`}
                  >
	                  <div className="flex items-center justify-between gap-2">
	                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary/80">Gallery</p>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 px-3 py-1.5 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  </div>
	                  <div id="admin-editor-hero-gallery" className="scroll-mt-24 flex items-center gap-2 overflow-x-auto pb-2 pr-2">
	                    {product.media.map((item, idx) => (
	                      <button
	                        key={`${item.path}-${idx}`}
	                        type="button"
                        className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border ${editingMediaIdx === idx ? 'border-semantic-legacy-brand-cocoa ring-2 ring-semantic-legacy-brand-cocoa/40' : 'border-semantic-legacy-brand-blush/60'}`}
                        onClick={() => handleToggleEditingMediaIdx(idx)}
                      >
                        <span className="absolute top-1 left-1 rounded-full bg-white/90 px-2 py-[1px] text-[10px] font-semibold text-semantic-text-primary shadow-sm">
                          {idx + 1}
                        </span>
                        {item.path ? (
                          <img src={item.path} alt="" className="h-full w-full object-cover" loading="lazy" />
                        ) : (
                          <div className="h-full w-full bg-white/60" />
                        )}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-semantic-legacy-brand-blush/70 bg-white text-sm font-semibold text-semantic-text-primary"
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
                      +
                    </button>
                  </div>
                  {editingMediaIdx != null && product.media[editingMediaIdx] ? (
                    <div className="space-y-2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2">
                      <p className="text-xs font-semibold text-semantic-text-primary/80">Image details</p>
                      <TextInput
                        value={product.media[editingMediaIdx].path}
                        onChange={(v) =>
                          updateProduct((p) => ({
                            ...p,
                            media: p.media.map((m, i) => (i === editingMediaIdx ? { ...m, path: v } : m)),
                          }))
                        }
                        placeholder="Image URL (/uploads/... or https://...)"
                      />
                      <TextInput
                        value={product.media[editingMediaIdx].alt}
                        onChange={(v) =>
                          updateProduct((p) => ({
                            ...p,
                            media: p.media.map((m, i) => (i === editingMediaIdx ? { ...m, alt: v } : m)),
                          }))
                        }
                        placeholder="Alt text"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60 disabled:opacity-50"
                          onClick={() => moveMedia(editingMediaIdx, Math.max(0, editingMediaIdx - 1))}
                          disabled={editingMediaIdx === 0}
                        >
                          Move up
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60 disabled:opacity-50"
                          onClick={() => moveMedia(editingMediaIdx, Math.min(product.media.length - 1, editingMediaIdx + 1))}
                          disabled={editingMediaIdx === product.media.length - 1}
                        >
                          Move down
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
                          onClick={() =>
                            updateProduct((p) => ({
                              ...p,
                              media: p.media
                                .filter((_, i) => i !== editingMediaIdx)
                                .map((m, i) => ({ ...m, sort: i, is_primary: i === 0 })),
                            }))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : null}
	                </div>
	              </div>
	              {/* Title & Subtext */}
	              <div
                  id="admin-editor-hero-text"
                  className={`scroll-mt-24 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 space-y-3 transition-shadow ${
                    isHeroTextActive || activePreviewEditorId === 'admin-editor-hero-text' ? activeSectionClass : ''
                  }`}
                >
	                <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary">
                      Hero text
                    </div>
                    {!product.short_desc?.trim() ? (
                      <div className="text-[11px] font-semibold text-semantic-legacy-brand-cocoa">Missing subtext</div>
                    ) : null}
                  </div>
	                <Field label="Title">
                  <TextInput value={product.title} onChange={(v) => updateProduct((p) => ({ ...p, title: v }))} />
                </Field>
                <Field label="Subtext / hero description">
                  <TextInput value={product.short_desc} onChange={(v) => updateProduct((p) => ({ ...p, short_desc: v }))} />
	                </Field>
	              </div>
	              {/* Price & Reviews */}
	              <div
                  id="admin-editor-hero-price-reviews"
                  className={`scroll-mt-24 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 space-y-3 transition-shadow ${
                    isHeroPriceActive || activePreviewEditorId === 'admin-editor-hero-price-reviews'
                      ? activeSectionClass
                      : ''
                  }`}
                >
	                <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary">
                      Price & Reviews
                    </div>
                    {product.price == null ? (
                      <div className="text-[11px] font-semibold text-semantic-legacy-brand-cocoa">Missing price</div>
                    ) : null}
                  </div>
	                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Price">
                    <TextInput
                      value={product.price == null ? '' : String(product.price)}
                      onChange={(v) => updateProduct((p) => ({ ...p, price: normalizeNumber(v) }))}
                      placeholder="e.g. 14.99"
                    />
                  </Field>
                  <Field label="Compare at">
                    <TextInput
                      value={product.compare_at_price == null ? '' : String(product.compare_at_price)}
                      onChange={(v) => updateProduct((p) => ({ ...p, compare_at_price: normalizeNumber(v) }))}
                      placeholder="e.g. 19.99"
                    />
                  </Field>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Average rating">
                    <TextInput
                      value={product.average_rating == null ? '' : String(product.average_rating)}
                      onChange={(v) => updateProduct((p) => ({ ...p, average_rating: normalizeNumber(v) }))}
                      placeholder="e.g. 4.8"
                    />
                  </Field>
                  <Field label="Review count">
                    <TextInput
                      value={product.review_count == null ? '' : String(product.review_count)}
                      onChange={(v) => updateProduct((p) => ({ ...p, review_count: v ? Number(v) : null }))}
                      placeholder="e.g. 100"
                    />
                  </Field>
                </div>
              </div>
            </section>
	            <section
	              id="admin-editor-sign"
	              className={`scroll-mt-24 space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 transition-shadow ${
	                isSignActive || String(activePreviewEditorId ?? '').startsWith('admin-editor-sign') ? activeSectionClass : ''
	              }`}
	            >
              <div className="h-9 -mx-5 -mt-5 mb-4 rounded-t-2xl bg-semantic-legacy-brand-blush px-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary">
                  Your sign to try this
                </span>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-semantic-text-primary/70">
                  <span className="text-semantic-text-primary/60">3 bullets</span>
                  {missingSignTitles ? (
                    <span className="text-semantic-legacy-brand-cocoa">{missingSignTitles} missing titles</span>
                  ) : null}
                  {missingSignBodies ? (
                    <span className="text-semantic-legacy-brand-cocoa">{missingSignBodies} missing subtext</span>
                  ) : null}
                </div>
              </div>
	              <div className="space-y-3">
                {howBullets.map((bullet, idx) => {
                  const sectionId = `admin-editor-sign-bullet-${idx + 1}`
                  const isActive = activePreviewEditorId === sectionId
                  return (
                    <div
                      key={idx}
                      id={sectionId}
                      className={`scroll-mt-24 space-y-2 rounded-xl border border-semantic-legacy-brand-blush/50 bg-brand-porcelain/40 p-3 ${
                        isActive ? activeSectionClass : ''
                      }`}
                    >
                      <span className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary">
                        Bullet {idx + 1}
                      </span>
                      <TextInput
                        value={bullet.title}
                        onChange={(v) => updateHowBullet(idx, 'title', v)}
                        placeholder="Title"
                      />
                      <TextInput
                        value={bullet.body}
                        onChange={(v) => updateHowBullet(idx, 'body', v)}
                        placeholder="Subtext"
                      />
                    </div>
                  )
                })}
              </div>
            </section>
	            <section
	              id="admin-editor-care"
	              className={`scroll-mt-24 space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 transition-shadow ${
	                isCareActive || String(activePreviewEditorId ?? '').startsWith('admin-editor-care') ? activeSectionClass : ''
	              }`}
	            >
              <div className="h-9 -mx-5 -mt-5 mb-4 rounded-t-2xl bg-semantic-legacy-brand-blush px-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary">
                  Care & materials
                </span>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-semantic-text-primary/70">
                  <span className="text-semantic-text-primary/60">3 bullets</span>
                  {missingCareTitles ? (
                    <span className="text-semantic-legacy-brand-cocoa">{missingCareTitles} missing titles</span>
                  ) : null}
                  {missingCareBodies ? (
                    <span className="text-semantic-legacy-brand-cocoa">{missingCareBodies} missing subtext</span>
                  ) : null}
                </div>
              </div>
              <div className="space-y-3">
                {careBullets.map((bullet, idx) => {
                  const sectionId = `admin-editor-care-bullet-${idx + 1}`
                  const isActive = activePreviewEditorId === sectionId
                  return (
                    <div
                      key={idx}
                      id={sectionId}
                      className={`scroll-mt-24 space-y-2 rounded-xl border border-semantic-legacy-brand-blush/50 bg-brand-porcelain/40 p-3 ${
                        isActive ? activeSectionClass : ''
                      }`}
                    >
                      <span className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary">
                        Care bullet {idx + 1}
                      </span>
                      <TextInput
                        value={bullet.title}
                        onChange={(v) => updateCareBullet(idx, 'title', v)}
                        placeholder="Title"
                      />
                      <TextInput
                        value={bullet.body}
                        onChange={(v) => updateCareBullet(idx, 'body', v)}
                        placeholder="Subtext"
                      />
                    </div>
                  )
                })}
              </div>
            </section>
	            <section
	              id="admin-editor-proof"
	              className={`scroll-mt-24 space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 transition-shadow ${
	                isProofActive || String(activePreviewEditorId ?? '').startsWith('admin-editor-proof') ? activeSectionClass : ''
	              }`}
	            >
              <div className="h-9 -mx-5 -mt-5 mb-4 rounded-t-2xl bg-semantic-legacy-brand-blush px-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary">
                  Proof strip
                </span>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-semantic-text-primary/70">
                  <span className="text-semantic-text-primary/60">3 items</span>
                  {missingProofLabels ? (
                    <span className="text-semantic-legacy-brand-cocoa">{missingProofLabels} missing labels</span>
                  ) : null}
                  {missingProofBodies ? (
                    <span className="text-semantic-legacy-brand-cocoa">{missingProofBodies} missing copy</span>
                  ) : null}
                </div>
              </div>
              <div className="space-y-3">
                {proofBullets.map((bullet, idx) => {
                  const sectionId = `admin-editor-proof-item-${idx + 1}`
                  const isActive = activePreviewEditorId === sectionId
                  return (
                    <div
                      key={idx}
                      id={sectionId}
                      className={`scroll-mt-24 space-y-2 rounded-xl border border-semantic-legacy-brand-blush/50 bg-brand-porcelain/40 p-3 ${
                        isActive ? activeSectionClass : ''
                      }`}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <div className="w-full sm:w-44">
                          <TextInput
                            value={bullet.label}
                            onChange={(v) => updateProofBullet(idx, 'label', v)}
                            placeholder="Label (e.g. Proven)"
                          />
                        </div>
                        <div className="flex-1">
                          <TextInput
                            value={bullet.body}
                            onChange={(v) => updateProofBullet(idx, 'body', v)}
                            placeholder="Copy (e.g. Protects hair)"
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
	            <section
	              id="admin-editor-details"
	              className={`scroll-mt-24 space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 transition-shadow ${
	                isDetailsActive || String(activePreviewEditorId ?? '').startsWith('admin-editor-details') ? activeSectionClass : ''
	              }`}
	            >
              <div className="h-9 -mx-5 -mt-5 mb-4 rounded-t-2xl bg-semantic-legacy-brand-blush px-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary">
                  Why you’ll love it
                </span>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-semantic-text-primary/70">
                  {missingDetailsHeadingTitle ? (
                    <span className="text-semantic-legacy-brand-cocoa">Missing heading title</span>
                  ) : null}
                  {missingDetailsHeadingDesc ? (
                    <span className="text-semantic-legacy-brand-cocoa">Missing heading subtext</span>
                  ) : null}
                  {missingDetailsTikTokUrl ? (
                    <span className="text-semantic-text-primary/60">No TikTok URL</span>
                  ) : (
                    <span className="text-semantic-text-primary/60">TikTok set</span>
                  )}
                  {missingDetailsPills ? (
                    <span className="text-semantic-legacy-brand-cocoa">{missingDetailsPills} empty pill</span>
                  ) : null}
                </div>
              </div>
	              <div className="space-y-3">
	                <div
	                  id="admin-editor-details-heading"
	                  className={`scroll-mt-24 space-y-2 rounded-xl border border-semantic-legacy-brand-blush/50 bg-brand-porcelain/40 p-3 ${
                      activePreviewEditorId === 'admin-editor-details-heading' ? activeSectionClass : ''
                    }`}
	                >
	                  <span className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary">
	                    Heading
	                  </span>
	                  <p className="text-sm font-semibold text-semantic-text-primary">Title</p>
                  <TextInput value={featureCalloutsHeading.title ?? ''} onChange={(v) => updateFeatureHeading('title', v)} placeholder="Why you’ll love it title" />
	                  <p className="text-sm font-semibold text-semantic-text-primary">Subtext</p>
	                  <TextInput value={featureCalloutsHeading.description ?? ''} onChange={(v) => updateFeatureHeading('description', v)} placeholder="Subtext / description" />
	                </div>
	                <div
	                  id="admin-editor-details-tiktok"
	                  className={`scroll-mt-24 space-y-2 rounded-xl border border-semantic-legacy-brand-blush/50 bg-brand-porcelain/40 p-3 ${
                      activePreviewEditorId === 'admin-editor-details-tiktok' ? activeSectionClass : ''
                    }`}
	                >
	                  <span className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary">
	                    TikTok embed
	                  </span>
	                  <p className="text-sm font-semibold text-semantic-text-primary">TikTok embed URL</p>
                  <TextInput
                    value={product.video_slot.replace(/^video:\/\//i, '')}
                    onChange={(v) => updateProduct((p) => ({ ...p, video_slot: v.replace(/^video:\/\//i, '') }))}
                    placeholder="TikTok embed URL"
                  />
                  {product.video_slot.replace(/^video:\/\//i, '').trim() ? (
                    <div className="overflow-hidden rounded-xl border border-semantic-legacy-brand-blush/60 bg-black/80">
                      <iframe
                        src={product.video_slot.replace(/^video:\/\//i, '')}
                        title="TikTok preview"
                        className="block h-[420px] w-full"
                        allow="encrypted-media; fullscreen; clipboard-write"
                        scrolling="no"
                      />
                    </div>
	                  ) : (
	                    <div className="rounded-xl border border-dashed border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 px-3 py-3 text-sm text-semantic-text-primary/70">Add a TikTok embed URL to preview it here.</div>
	                  )}
	                </div>
	                <div
	                  id="admin-editor-details-pills"
	                  className={`scroll-mt-24 space-y-2 rounded-xl border border-semantic-legacy-brand-blush/50 bg-brand-porcelain/40 p-3 ${
                      activePreviewEditorId === 'admin-editor-details-pills' ? activeSectionClass : ''
                    }`}
	                >
	                  <span className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary">
	                    Pills
	                  </span>
	                  <div className="space-y-2">
                    {featurePills.map((pill, idx) => (
                      <div key={idx} className="space-y-1">
                        <p className="text-sm font-semibold text-semantic-text-primary">{`Pill ${idx + 1}`}</p>
                        <TextInput value={pill} onChange={(v) => updateFeaturePill(idx, v)} placeholder={idx === 0 ? 'Pill 1 (e.g. Creator-tested frizz defense)' : 'Pill 2 (e.g. Stays fresh fast)'} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
	            <section
	              id="admin-editor-benefits"
	              className={`scroll-mt-24 space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 transition-shadow ${
	                isBenefitsActive || String(activePreviewEditorId ?? '').startsWith('admin-editor-benefits') ? activeSectionClass : ''
	              }`}
	            >
              <div className="h-9 -mx-5 -mt-5 mb-4 rounded-t-2xl bg-semantic-legacy-brand-blush px-4 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary">
                  Benefits
                </span>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-semantic-text-primary/70">
                  <span className="text-semantic-text-primary/60">{BENEFIT_COUNT} bullets</span>
                  {missingBenefitTitles ? (
                    <span className="text-semantic-legacy-brand-cocoa">{missingBenefitTitles} missing titles</span>
                  ) : null}
                  {missingBenefitBodies ? (
                    <span className="text-semantic-legacy-brand-cocoa">{missingBenefitBodies} missing subtext</span>
                  ) : null}
                </div>
              </div>
              <div className="space-y-3">
                {benefitBullets.map((bullet, idx) => {
                  const sectionId = `admin-editor-benefits-bullet-${idx + 1}`
                  const isActive = activePreviewEditorId === sectionId
                  return (
                    <div
                      key={idx}
                      id={sectionId}
                      className={`scroll-mt-24 space-y-2 rounded-xl border border-semantic-legacy-brand-blush/50 bg-brand-porcelain/40 p-3 ${
                        isActive ? activeSectionClass : ''
                      }`}
                    >
                      <span className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary">
                        Benefit {idx + 1}
                      </span>
                      <TextInput
                        value={bullet.title}
                        onChange={(v) => updateBenefitBullet(idx, 'title', v)}
                        placeholder="Title"
                      />
                      <TextInput
                        value={bullet.body}
                        onChange={(v) => updateBenefitBullet(idx, 'body', v)}
                        placeholder="Subtext"
                      />
                    </div>
                  )
                })}
              </div>
            </section>
	            <EssentialsSection
	              id="admin-editor-essentials"
	              items={essentials}
	              onChange={updateEssential}
	              highlight={isEssentialsActive || String(activePreviewEditorId ?? '').startsWith('admin-editor-essentials')}
	              activeAnchorId={activePreviewEditorId}
	            />
	            <FeaturedTikTokSection
	              id="admin-editor-featured-tiktok"
	              heading={featuredTikTokHeading}
	              onChange={updateFeaturedTikTokHeading}
	              highlight={isFeaturedTikTokActive || activePreviewEditorId === 'admin-editor-featured-tiktok'}
	            />
	            <FaqSection
	              id="admin-editor-faq"
	              items={faqs}
	              onChange={updateFaq}
	              highlight={isFaqActive || String(activePreviewEditorId ?? '').startsWith('admin-editor-faq')}
	              activeAnchorId={activePreviewEditorId}
	            />
        </ProductsLayout>
      )}
    </AdminPageLayout>
  )
}
