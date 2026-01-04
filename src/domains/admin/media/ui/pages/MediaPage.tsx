import { useMemo, useState, useCallback, type ReactNode, useEffect, useRef } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  AlertTriangle,
  BadgeCheck,
  Check,
  FileImage,
  Filter,
  Grid as GridIcon,
  Monitor,
  ImageOff,
  List as ListIcon,
  Smartphone,
  Search,
  UploadCloud,
  Sparkles,
  X,
} from 'lucide-react'
import { AdminPageLayout } from '@admin/shared/ui/layouts'
import { HighlightCard } from '@admin/shared/ui/components'

type MediaStatus = 'ready' | 'draft' | 'needs-alt'

type Bucket = {
  id: string
  label: string
  description: string
  guardrails: {
    maxSizeMB: number
    maxWidth: number
    allowSvg: boolean
    signedUrls?: boolean
    webp: boolean
  }
}

type Breakpoint = 'desktop' | 'mobile'
type BreakpointFilter = 'all' | 'desktop' | 'mobile'
type SortOption = 'recent' | 'name' | 'size' | 'usage'

type MediaItem = {
  id: string
  name: string
  bucketId: string
  sizeMB: number
  width: number
  height: number
  mime: string
  type: 'image' | 'svg'
  status: MediaStatus
  altText?: string
  tags: string[]
  usageCount: number
  createdAt: string
  preview: string
  breakpoint: Breakpoint
}

type StatusFilter = 'all' | MediaStatus
type TypeFilter = 'all' | MediaItem['type']

function parseBoolParam(raw: string | null): boolean {
  if (!raw) return false
  return raw === '1' || raw.toLowerCase() === 'true'
}

function parseDensity(raw: string | null): 'cozy' | 'compact' {
  return raw === 'compact' ? 'compact' : 'cozy'
}

function parseStatusFilter(searchParams: URLSearchParams): StatusFilter {
  const next = (searchParams.get('status') ?? '').trim()
  if (next === 'ready' || next === 'draft' || next === 'needs-alt') return next

  // Back-compat: old boolean params (were ANDed, so both true produced empty results).
  const needsAlt = parseBoolParam(searchParams.get('needsAlt'))
  const draft = parseBoolParam(searchParams.get('draft'))
  if (needsAlt && !draft) return 'needs-alt'
  if (draft && !needsAlt) return 'draft'
  return 'all'
}

function parseGlobalBreakpointFilter(searchParams: URLSearchParams): BreakpointFilter {
  const next = (searchParams.get('bpGlobal') ?? '').trim()
  if (next === 'desktop' || next === 'mobile' || next === 'all') return next

  // Back-compat: old boolean params (were ANDed, so both true produced empty results).
  const desktop = parseBoolParam(searchParams.get('desktop'))
  const mobile = parseBoolParam(searchParams.get('mobile'))
  if (desktop && !mobile) return 'desktop'
  if (mobile && !desktop) return 'mobile'
  return 'all'
}

function parseTypeFilter(searchParams: URLSearchParams): TypeFilter {
  const next = (searchParams.get('type') ?? '').trim()
  if (next === 'image' || next === 'svg' || next === 'all') return next

  // Back-compat
  const svg = parseBoolParam(searchParams.get('svg'))
  return svg ? 'svg' : 'all'
}

const BUCKETS: Bucket[] = [
  {
    id: 'blog-media',
    label: 'Blogs',
    description: 'Hero and inline assets for articles',
    guardrails: { maxSizeMB: 25, maxWidth: 2500, allowSvg: false, webp: true },
  },
  {
    id: 'product-shower-cap',
    label: 'The Shower Cap Product',
    description: 'PDP/PLP imagery, press, and bundles',
    guardrails: { maxSizeMB: 25, maxWidth: 2500, allowSvg: false, webp: true },
  },
  {
    id: 'product-heatless-curler',
    label: 'The Heatless Curler Product',
    description: 'Lifestyle + detail shots for the curler set',
    guardrails: { maxSizeMB: 25, maxWidth: 2500, allowSvg: false, webp: true },
  },
  {
    id: 'product-other',
    label: 'Other Product Assets',
    description: 'Catch-all until a SKU gets its own bucket',
    guardrails: { maxSizeMB: 25, maxWidth: 2500, allowSvg: false, webp: true },
  },
  {
    id: 'landing-media',
    label: 'Landing Page',
    description: 'Hero banners, blocks, promos',
    guardrails: { maxSizeMB: 25, maxWidth: 3200, allowSvg: false, webp: true },
  },
  {
    id: 'draft-media',
    label: 'Draft / Private',
    description: 'Work-in-progress assets (signed URLs only)',
    guardrails: { maxSizeMB: 25, maxWidth: 2500, allowSvg: true, webp: true, signedUrls: true },
  },
]

const DEFAULT_BUCKET_VIEWS = Object.fromEntries(BUCKETS.map((b) => [b.id, 'grid'])) as Record<string, 'grid' | 'list'>
const DEFAULT_BUCKET_BREAKPOINTS = Object.fromEntries(BUCKETS.map((b) => [b.id, 'all'])) as Record<string, BreakpointFilter>
const DEFAULT_BUCKET_SORTS = Object.fromEntries(BUCKETS.map((b) => [b.id, 'recent'])) as Record<string, SortOption>
const BUCKET_ID_SET = new Set(BUCKETS.map((b) => b.id))

function parseBucketViewsParam(raw: string | null): Record<string, 'grid' | 'list'> {
  const next = { ...DEFAULT_BUCKET_VIEWS }
  if (!raw) return next
  for (const token of raw.split(',').map((t) => t.trim()).filter(Boolean)) {
    const [bucketId, view] = token.split(':').map((v) => v.trim())
    if (!bucketId || !BUCKET_ID_SET.has(bucketId)) continue
    if (view !== 'grid' && view !== 'list') continue
    next[bucketId] = view
  }
  return next
}

function parseBucketBreakpointsParam(raw: string | null): Record<string, BreakpointFilter> {
  const next = { ...DEFAULT_BUCKET_BREAKPOINTS }
  if (!raw) return next
  for (const token of raw.split(',').map((t) => t.trim()).filter(Boolean)) {
    const [bucketId, bp] = token.split(':').map((v) => v.trim())
    if (!bucketId || !BUCKET_ID_SET.has(bucketId)) continue
    if (bp !== 'all' && bp !== 'desktop' && bp !== 'mobile') continue
    next[bucketId] = bp
  }
  return next
}

function serializeBucketViewsParam(views: Record<string, 'grid' | 'list'>): string | null {
  const entries = Object.entries(views)
    .filter(([bucketId, view]) => BUCKET_ID_SET.has(bucketId) && view !== (DEFAULT_BUCKET_VIEWS[bucketId] ?? 'grid'))
    .sort(([a], [b]) => a.localeCompare(b))
  if (!entries.length) return null
  return entries.map(([bucketId, view]) => `${bucketId}:${view}`).join(',')
}

function serializeBucketBreakpointsParam(bps: Record<string, BreakpointFilter>): string | null {
  const entries = Object.entries(bps)
    .filter(([bucketId, bp]) => BUCKET_ID_SET.has(bucketId) && bp !== (DEFAULT_BUCKET_BREAKPOINTS[bucketId] ?? 'all'))
    .sort(([a], [b]) => a.localeCompare(b))
  if (!entries.length) return null
  return entries.map(([bucketId, bp]) => `${bucketId}:${bp}`).join(',')
}

function parseBucketSortsParam(raw: string | null): Record<string, SortOption> {
  const next = { ...DEFAULT_BUCKET_SORTS }
  if (!raw) return next
  for (const token of raw.split(',').map((t) => t.trim()).filter(Boolean)) {
    const [bucketId, sort] = token.split(':').map((v) => v.trim())
    if (!bucketId || !BUCKET_ID_SET.has(bucketId)) continue
    if (sort !== 'recent' && sort !== 'name' && sort !== 'size' && sort !== 'usage') continue
    next[bucketId] = sort
  }
  return next
}

function serializeBucketSortsParam(sorts: Record<string, SortOption>): string | null {
  const entries = Object.entries(sorts)
    .filter(([bucketId, sort]) => BUCKET_ID_SET.has(bucketId) && sort !== (DEFAULT_BUCKET_SORTS[bucketId] ?? 'recent'))
    .sort(([a], [b]) => a.localeCompare(b))
  if (!entries.length) return null
  return entries.map(([bucketId, sort]) => `${bucketId}:${sort}`).join(',')
}

function areBucketViewMapsEqual(a: Record<string, 'grid' | 'list'>, b: Record<string, 'grid' | 'list'>): boolean {
  for (const bucket of BUCKETS) {
    if ((a[bucket.id] ?? 'grid') !== (b[bucket.id] ?? 'grid')) return false
  }
  return true
}

function areBucketBreakpointMapsEqual(a: Record<string, BreakpointFilter>, b: Record<string, BreakpointFilter>): boolean {
  for (const bucket of BUCKETS) {
    if ((a[bucket.id] ?? 'all') !== (b[bucket.id] ?? 'all')) return false
  }
  return true
}

function areBucketSortMapsEqual(a: Record<string, SortOption>, b: Record<string, SortOption>): boolean {
  for (const bucket of BUCKETS) {
    if ((a[bucket.id] ?? 'recent') !== (b[bucket.id] ?? 'recent')) return false
  }
  return true
}

const MOCK_MEDIA: MediaItem[] = [
  // Blog covers (desktop)
  {
    id: 'blog-cover-1',
    name: 'do-shower-caps-really-protect-hair.webp',
    bucketId: 'blog-media',
    sizeMB: 0.018,
    width: 1200,
    height: 800,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Woman wearing a shower cap in a light bathroom',
    tags: ['cover', 'seo'],
    usageCount: 3,
    createdAt: '2024-12-12',
    preview: '/uploads/blog/covers/do-shower-caps-really-protect-hair.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'blog-cover-2',
    name: 'how-to-protect-hair-while-sleeping.webp',
    bucketId: 'blog-media',
    sizeMB: 0.072,
    width: 1200,
    height: 800,
    mime: 'image/webp',
    type: 'image',
    status: 'needs-alt',
    tags: ['cover', 'sleep'],
    usageCount: 0,
    createdAt: '2024-12-10',
    preview: '/uploads/blog/covers/how-to-protect-hair-while-sleeping.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'blog-cover-3',
    name: 'how-to-make-heatless-curls-last-longer.webp',
    bucketId: 'blog-media',
    sizeMB: 0.063,
    width: 1200,
    height: 800,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler set laid on a bed with a model smiling',
    tags: ['cover', 'heatless'],
    usageCount: 2,
    createdAt: '2024-12-05',
    preview: '/uploads/blog/covers/how-to-make-heatless-curls-last-longer.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'blog-cover-4',
    name: 'satin-vs-silk-for-hair.webp',
    bucketId: 'blog-media',
    sizeMB: 0.068,
    width: 1200,
    height: 800,
    mime: 'image/webp',
    type: 'image',
    status: 'needs-alt',
    tags: ['cover', 'education'],
    usageCount: 1,
    createdAt: '2024-12-03',
    preview: '/uploads/blog/covers/satin-vs-silk-for-hair.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'blog-cover-5',
    name: 'best-shower-cap-for-frizz-prone-hair.webp',
    bucketId: 'blog-media',
    sizeMB: 0.053,
    width: 1200,
    height: 800,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Shower cap on marble counter with product props',
    tags: ['cover', 'seo'],
    usageCount: 1,
    createdAt: '2024-12-02',
    preview: '/uploads/blog/covers/best-shower-cap-for-frizz-prone-hair.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'blog-cover-6',
    name: 'how-to-stop-frizz-in-the-shower.webp',
    bucketId: 'blog-media',
    sizeMB: 0.023,
    width: 1200,
    height: 800,
    mime: 'image/webp',
    type: 'image',
    status: 'needs-alt',
    tags: ['cover', 'how-to'],
    usageCount: 0,
    createdAt: '2024-12-02',
    preview: '/uploads/blog/covers/how-to-stop-frizz-in-the-shower.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'blog-cover-7',
    name: 'how-to-reduce-frizz-without-heat.webp',
    bucketId: 'blog-media',
    sizeMB: 0.126,
    width: 1200,
    height: 800,
    mime: 'image/webp',
    type: 'image',
    status: 'needs-alt',
    tags: ['cover', 'how-to'],
    usageCount: 0,
    createdAt: '2024-12-02',
    preview: '/uploads/blog/covers/how-to-reduce-frizz-without-heat.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'blog-cover-8',
    name: 'is-satin-good-for-your-hair.webp',
    bucketId: 'blog-media',
    sizeMB: 0.029,
    width: 1200,
    height: 800,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Satin pillow and hair care items flatlay',
    tags: ['cover', 'education'],
    usageCount: 1,
    createdAt: '2024-12-01',
    preview: '/uploads/blog/covers/is-satin-good-for-your-hair.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'blog-cover-9',
    name: 'how-to-protect-a-blow-dry-in-the-shower.webp',
    bucketId: 'blog-media',
    sizeMB: 0.056,
    width: 1200,
    height: 800,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Woman with blow-dry protected under shower cap',
    tags: ['cover', 'how-to'],
    usageCount: 1,
    createdAt: '2024-12-02',
    preview: '/uploads/blog/covers/how-to-protect-a-blow-dry-in-the-shower.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'blog-cover-10',
    name: 'do-heatless-curlers-work.webp',
    bucketId: 'blog-media',
    sizeMB: 0.028,
    width: 1200,
    height: 800,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Heatless curlers on a vanity surface',
    tags: ['cover', 'heatless'],
    usageCount: 1,
    createdAt: '2024-12-06',
    preview: '/uploads/blog/covers/do-heatless-curlers-work.webp',
    breakpoint: 'desktop',
  },

  // Product: Shower Cap (desktop)
  {
    id: 'scap-hero',
    name: 'hero-desktop.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.044,
    width: 2400,
    height: 1350,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Shower cap hero scene with packaging',
    tags: ['hero', 'desktop'],
    usageCount: 4,
    createdAt: '2024-12-01',
    preview: '/uploads/luminele/hero-desktop.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-main',
    name: 'product-main.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.075,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Shower cap product main packshot',
    tags: ['pdp', 'packshot'],
    usageCount: 5,
    createdAt: '2024-12-02',
    preview: '/uploads/luminele/product-main.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-steam',
    name: 'steam-shield-new.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.024,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'draft',
    tags: ['packshot', 'press'],
    usageCount: 1,
    createdAt: '2024-12-15',
    preview: '/uploads/luminele/steam-shield-new.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-feature-1',
    name: 'product-feature-01.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.076,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Feature callout of shower cap material',
    tags: ['feature'],
    usageCount: 2,
    createdAt: '2024-12-04',
    preview: '/uploads/luminele/product-feature-01.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-feature-2',
    name: 'product-feature-02.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.059,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Shower cap waterproof lining detail',
    tags: ['feature', 'detail'],
    usageCount: 1,
    createdAt: '2024-12-04',
    preview: '/uploads/luminele/product-feature-02.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-feature-3',
    name: 'product-feature-03.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.079,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Close-up of cap exterior texture',
    tags: ['feature', 'detail'],
    usageCount: 1,
    createdAt: '2024-12-04',
    preview: '/uploads/luminele/product-feature-03.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-feature-4',
    name: 'product-feature-04.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.056,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Elastic band detail on shower cap',
    tags: ['feature', 'detail'],
    usageCount: 1,
    createdAt: '2024-12-04',
    preview: '/uploads/luminele/product-feature-04.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-feature-5',
    name: 'product-feature-05.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.059,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Interior lining and stitching detail',
    tags: ['feature', 'detail'],
    usageCount: 1,
    createdAt: '2024-12-04',
    preview: '/uploads/luminele/product-feature-05.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-feature-6',
    name: 'product-feature-06.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.084,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Packaging flatlay with shower cap',
    tags: ['feature', 'flatlay'],
    usageCount: 1,
    createdAt: '2024-12-04',
    preview: '/uploads/luminele/product-feature-06.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-feature-7',
    name: 'product-feature-07.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.074,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Shower cap folded view',
    tags: ['feature', 'detail'],
    usageCount: 1,
    createdAt: '2024-12-04',
    preview: '/uploads/luminele/product-feature-07.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-hero-main',
    name: 'hero-main.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.045,
    width: 1200,
    height: 1698,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Primary hero vertical crop of shower cap',
    tags: ['hero', 'desktop'],
    usageCount: 2,
    createdAt: '2024-12-01',
    preview: '/uploads/luminele/hero-main.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-2nd-photo',
    name: 'shower-cap-02.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.059,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Secondary lifestyle shot of shower cap',
    tags: ['lifestyle', 'desktop'],
    usageCount: 2,
    createdAt: '2024-12-02',
    preview: '/uploads/luminele/shower-cap-02.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-3rd-photo',
    name: 'shower-cap-03.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.059,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Third lifestyle shot of shower cap',
    tags: ['lifestyle', 'desktop'],
    usageCount: 2,
    createdAt: '2024-12-02',
    preview: '/uploads/luminele/shower-cap-03.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-4th-photo',
    name: 'shower-cap-04.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.076,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Fourth lifestyle shot of shower cap',
    tags: ['lifestyle', 'desktop'],
    usageCount: 2,
    createdAt: '2024-12-02',
    preview: '/uploads/luminele/shower-cap-04.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-5th-photo',
    name: 'shower-cap-05.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.059,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Fifth lifestyle shot of shower cap',
    tags: ['lifestyle', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-02',
    preview: '/uploads/luminele/shower-cap-05.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-6th-photo',
    name: 'shower-cap-06.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.059,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Sixth lifestyle shot of shower cap',
    tags: ['lifestyle', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-02',
    preview: '/uploads/luminele/shower-cap-06.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-7th-photo',
    name: 'shower-cap-07.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.074,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Seventh lifestyle shot of shower cap',
    tags: ['lifestyle', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-02',
    preview: '/uploads/luminele/shower-cap-07.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'scap-8th-photo',
    name: 'shower-cap-08.webp',
    bucketId: 'product-shower-cap',
    sizeMB: 0.074,
    width: 1200,
    height: 1200,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Eighth lifestyle shot of shower cap',
    tags: ['lifestyle', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-02',
    preview: '/uploads/luminele/shower-cap-08.webp',
    breakpoint: 'desktop',
  },

  // Product: Heatless Curler (desktop + mobile variants)
  {
    id: 'curler-hero-desktop',
    name: 'curler-hero-1280.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.101,
    width: 1280,
    height: 1280,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler set flatlay hero',
    tags: ['hero', 'desktop'],
    usageCount: 3,
    createdAt: '2024-12-06',
    preview: '/uploads/curler/1-1280.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-hero-mobile',
    name: 'curler-hero-640.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.037,
    width: 640,
    height: 640,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler set flatlay hero mobile',
    tags: ['hero', 'mobile'],
    usageCount: 3,
    createdAt: '2024-12-06',
    preview: '/uploads/curler/1-640.webp',
    breakpoint: 'mobile',
  },
  {
    id: 'curler-step-desktop',
    name: 'curler-step-4-1280.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.074,
    width: 1280,
    height: 1280,
    mime: 'image/webp',
    type: 'image',
    status: 'needs-alt',
    tags: ['how-to', 'desktop'],
    usageCount: 2,
    createdAt: '2024-12-08',
    preview: '/uploads/curler/4-1280.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-step-mobile',
    name: 'curler-step-4-640.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.032,
    width: 640,
    height: 640,
    mime: 'image/webp',
    type: 'image',
    status: 'needs-alt',
    tags: ['how-to', 'mobile'],
    usageCount: 2,
    createdAt: '2024-12-08',
    preview: '/uploads/curler/4-640.webp',
    breakpoint: 'mobile',
  },
  {
    id: 'curler-lifestyle-desktop',
    name: 'curler-6-1280.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.092,
    width: 1280,
    height: 1280,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Model resting on couch wearing curler set',
    tags: ['lifestyle', 'desktop'],
    usageCount: 4,
    createdAt: '2024-12-03',
    preview: '/uploads/curler/6-1280.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-lifestyle-mobile',
    name: 'curler-3-640.avif',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.02,
    width: 640,
    height: 640,
    mime: 'image/avif',
    type: 'image',
    status: 'ready',
    altText: 'Model lounging with curler set (mobile crop)',
    tags: ['lifestyle', 'mobile'],
    usageCount: 2,
    createdAt: '2024-12-03',
    preview: '/uploads/curler/3-640.avif',
    breakpoint: 'mobile',
  },
  // Additional curler variants
  {
    id: 'curler-step2-desktop',
    name: 'curler-2-1280.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.085,
    width: 1280,
    height: 1280,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler set step two flatlay',
    tags: ['how-to', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-07',
    preview: '/uploads/curler/2-1280.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-step2-mobile',
    name: 'curler-2-640.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.035,
    width: 640,
    height: 640,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler set step two mobile crop',
    tags: ['how-to', 'mobile'],
    usageCount: 1,
    createdAt: '2024-12-07',
    preview: '/uploads/curler/2-640.webp',
    breakpoint: 'mobile',
  },
  {
    id: 'curler-step3-desktop',
    name: 'curler-3-1280.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.082,
    width: 1280,
    height: 1280,
    mime: 'image/webp',
    type: 'image',
    status: 'needs-alt',
    tags: ['how-to', 'desktop'],
    usageCount: 0,
    createdAt: '2024-12-07',
    preview: '/uploads/curler/3-1280.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-step5-desktop',
    name: 'curler-5-1280.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.075,
    width: 1280,
    height: 1280,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler step five outcome',
    tags: ['how-to', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-07',
    preview: '/uploads/curler/5-1280.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-step5-mobile',
    name: 'curler-5-640.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.033,
    width: 640,
    height: 640,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler step five mobile crop',
    tags: ['how-to', 'mobile'],
    usageCount: 1,
    createdAt: '2024-12-07',
    preview: '/uploads/curler/5-640.webp',
    breakpoint: 'mobile',
  },
  {
    id: 'curler-step6-mobile',
    name: 'curler-6-640.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.038,
    width: 640,
    height: 640,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler lifestyle mobile crop',
    tags: ['lifestyle', 'mobile'],
    usageCount: 1,
    createdAt: '2024-12-03',
    preview: '/uploads/curler/6-640.webp',
    breakpoint: 'mobile',
  },
  {
    id: 'curler-step7-mobile',
    name: 'curler-7-640.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.031,
    width: 640,
    height: 640,
    mime: 'image/webp',
    type: 'image',
    status: 'needs-alt',
    tags: ['how-to', 'mobile'],
    usageCount: 0,
    createdAt: '2024-12-09',
    preview: '/uploads/curler/7-640.webp',
    breakpoint: 'mobile',
  },
  {
    id: 'curler-step8-desktop',
    name: 'curler-8-1280.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.075,
    width: 1280,
    height: 1280,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler final look flatlay',
    tags: ['hero', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-09',
    preview: '/uploads/curler/8-1280.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-step8-mobile',
    name: 'curler-8-640.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.031,
    width: 640,
    height: 640,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler final look mobile crop',
    tags: ['hero', 'mobile'],
    usageCount: 1,
    createdAt: '2024-12-09',
    preview: '/uploads/curler/8-640.webp',
    breakpoint: 'mobile',
  },
  // Curler square (960x960) variants
  {
    id: 'curler-square-1',
    name: '1.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.067,
    width: 960,
    height: 960,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler square hero 1',
    tags: ['square', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-06',
    preview: '/uploads/curler/1.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-square-2',
    name: '2.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.059,
    width: 960,
    height: 960,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler square hero 2',
    tags: ['square', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-06',
    preview: '/uploads/curler/2.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-square-3',
    name: '3.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.056,
    width: 960,
    height: 960,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler square hero 3',
    tags: ['square', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-06',
    preview: '/uploads/curler/3.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-square-4',
    name: '4.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.052,
    width: 960,
    height: 960,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler square hero 4',
    tags: ['square', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-06',
    preview: '/uploads/curler/4.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-square-5',
    name: '5.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.053,
    width: 960,
    height: 960,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler square hero 5',
    tags: ['square', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-06',
    preview: '/uploads/curler/5.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-square-6',
    name: '6.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.064,
    width: 960,
    height: 960,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler square hero 6',
    tags: ['square', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-06',
    preview: '/uploads/curler/6.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-square-7',
    name: '7.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.051,
    width: 960,
    height: 960,
    mime: 'image/webp',
    type: 'image',
    status: 'needs-alt',
    tags: ['square', 'desktop'],
    usageCount: 0,
    createdAt: '2024-12-06',
    preview: '/uploads/curler/7.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'curler-square-8',
    name: '8.webp',
    bucketId: 'product-heatless-curler',
    sizeMB: 0.051,
    width: 960,
    height: 960,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Curler square hero 8',
    tags: ['square', 'desktop'],
    usageCount: 1,
    createdAt: '2024-12-06',
    preview: '/uploads/curler/8.webp',
    breakpoint: 'desktop',
  },

  // Landing / hero (mixed)
  {
    id: 'landing-holiday',
    name: 'holiday-hero.webp',
    bucketId: 'landing-media',
    sizeMB: 0.073,
    width: 1200,
    height: 2076,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Holiday themed bathroom set with product lineup',
    tags: ['hero', 'landing'],
    usageCount: 1,
    createdAt: '2024-12-05',
    preview: '/uploads/luminele/page9-image.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'landing-photo-3v2',
    name: 'photo-for-page-3v2.webp',
    bucketId: 'landing-media',
    sizeMB: 0.073,
    width: 1200,
    height: 2076,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Lifestyle vertical shot for landing block',
    tags: ['hero', 'landing'],
    usageCount: 1,
    createdAt: '2024-12-05',
    preview: '/uploads/luminele/photo-for-page-3v2.webp',
    breakpoint: 'desktop',
  },
  {
    id: 'landing-hero-mobile',
    name: 'hero-main-960.webp',
    bucketId: 'landing-media',
    sizeMB: 0.044,
    width: 1200,
    height: 1698,
    mime: 'image/webp',
    type: 'image',
    status: 'ready',
    altText: 'Mobile hero crop with product stack',
    tags: ['hero', 'mobile'],
    usageCount: 1,
    createdAt: '2024-12-05',
    preview: '/uploads/luminele/hero-main-960.webp',
    breakpoint: 'mobile',
  },

  // Draft / brand misc
  {
    id: 'draft-logo',
    name: 'new-logo.svg',
    bucketId: 'draft-media',
    sizeMB: 0.2,
    width: 512,
    height: 512,
    mime: 'image/svg+xml',
    type: 'svg',
    status: 'draft',
    tags: ['logo'],
    usageCount: 0,
    createdAt: '2024-12-16',
    preview: '/images/avatar-rachel-320.webp',
    breakpoint: 'desktop',
  },
]

export default function MediaPage() {
  const navigate = useNavigate()
  const { assetId, bucketId } = useParams<{ assetId?: string; bucketId?: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const bucketFocusRaw = (searchParams.get('bucket') ?? '').trim()
  const bucketFocus = bucketFocusRaw && BUCKET_ID_SET.has(bucketFocusRaw) ? bucketFocusRaw : ''
  const [search, setSearch] = useState(() => searchParams.get('q') ?? '')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(() => parseStatusFilter(searchParams))
  const [globalBreakpoint, setGlobalBreakpoint] = useState<BreakpointFilter>(() => parseGlobalBreakpointFilter(searchParams))
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(() => parseTypeFilter(searchParams))
  const [unusedOnly, setUnusedOnly] = useState(() => parseBoolParam(searchParams.get('unused')))
  const [oversizeOnly, setOversizeOnly] = useState(() => parseBoolParam(searchParams.get('oversize')))
  const [density, setDensity] = useState<'cozy' | 'compact'>(() => parseDensity(searchParams.get('density')))
  const [bucketViews, setBucketViews] = useState<Record<string, 'grid' | 'list'>>(() => parseBucketViewsParam(searchParams.get('views')))
  const [bucketSorts, setBucketSorts] = useState<Record<string, SortOption>>(() => parseBucketSortsParam(searchParams.get('sort')))
  const [bucketBreakpoints, setBucketBreakpoints] = useState<Record<string, BreakpointFilter>>(() => parseBucketBreakpointsParam(searchParams.get('bp')))
  const [uploadBucketId, setUploadBucketId] = useState<string | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<MediaItem | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const filtersWrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!filtersOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFiltersOpen(false)
    }

    const onMouseDown = (e: MouseEvent) => {
      const root = filtersWrapRef.current
      if (!root) return
      if (!(e.target instanceof Node)) return
      if (!root.contains(e.target)) setFiltersOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onMouseDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [filtersOpen])

  // URL -> state (shareable filters)
  useEffect(() => {
    setSearch(searchParams.get('q') ?? '')
    setStatusFilter(parseStatusFilter(searchParams))
    setGlobalBreakpoint(parseGlobalBreakpointFilter(searchParams))
    setTypeFilter(parseTypeFilter(searchParams))
    setUnusedOnly(parseBoolParam(searchParams.get('unused')))
    setOversizeOnly(parseBoolParam(searchParams.get('oversize')))
    setDensity(parseDensity(searchParams.get('density')))
    setBucketViews((prev) => {
      const next = parseBucketViewsParam(searchParams.get('views'))
      return areBucketViewMapsEqual(prev, next) ? prev : next
    })
    setBucketBreakpoints((prev) => {
      const next = parseBucketBreakpointsParam(searchParams.get('bp'))
      return areBucketBreakpointMapsEqual(prev, next) ? prev : next
    })
    setBucketSorts((prev) => {
      const next = parseBucketSortsParam(searchParams.get('sort'))
      return areBucketSortMapsEqual(prev, next) ? prev : next
    })
  }, [searchParams])

  // state -> URL (keep query clean by omitting defaults)
  const desiredSearch = useMemo(() => {
    const next = new URLSearchParams()
    if (search.trim()) next.set('q', search.trim())
    if (statusFilter !== 'all') next.set('status', statusFilter)
    if (globalBreakpoint !== 'all') next.set('bpGlobal', globalBreakpoint)
    if (typeFilter !== 'all') next.set('type', typeFilter)
    if (unusedOnly) next.set('unused', '1')
    if (oversizeOnly) next.set('oversize', '1')
    if (density !== 'cozy') next.set('density', density)
    if (bucketFocus) next.set('bucket', bucketFocus)
    const viewsParam = serializeBucketViewsParam(bucketViews)
    if (viewsParam) next.set('views', viewsParam)
    const bpParam = serializeBucketBreakpointsParam(bucketBreakpoints)
    if (bpParam) next.set('bp', bpParam)
    const sortParam = serializeBucketSortsParam(bucketSorts)
    if (sortParam) next.set('sort', sortParam)
    return next
  }, [
    bucketBreakpoints,
    bucketSorts,
    bucketViews,
    bucketFocus,
    density,
    globalBreakpoint,
    oversizeOnly,
    search,
    statusFilter,
    typeFilter,
    unusedOnly,
  ])

  const visibleBuckets = useMemo(() => {
    if (!bucketFocus) return BUCKETS
    return BUCKETS.filter((b) => b.id === bucketFocus)
  }, [bucketFocus])

  useEffect(() => {
    if (searchParams.toString() === desiredSearch.toString()) return
    setSearchParams(desiredSearch, { replace: true })
  }, [desiredSearch, searchParams, setSearchParams])

  // Route `/admin/media/:assetId` -> open asset sheet
  useEffect(() => {
    if (!assetId) {
      if (selectedAsset) setSelectedAsset(null)
      return
    }

    const match = MOCK_MEDIA.find((item) => item.id === assetId) ?? null
    if (!match) {
      setSelectedAsset(null)
      const qs = searchParams.toString()
      navigate(qs ? `/admin/media?${qs}` : '/admin/media', { replace: true })
      return
    }

    setSelectedAsset(match)
  }, [assetId, navigate, searchParams, selectedAsset])

  // Route `/admin/media/upload/:bucketId` -> open upload drawer
  useEffect(() => {
    if (!bucketId) {
      if (uploadBucketId) setUploadBucketId(null)
      return
    }

    const exists = BUCKETS.some((b) => b.id === bucketId)
    if (!exists) {
      setUploadBucketId(null)
      const qs = searchParams.toString()
      navigate(qs ? `/admin/media?${qs}` : '/admin/media', { replace: true })
      return
    }

    setUploadBucketId(bucketId)
  }, [bucketId, navigate, searchParams, uploadBucketId])

  const baseFilteredMedia = useMemo(() => {
    return MOCK_MEDIA.filter((item) => {
      const matchesSearch = search
        ? `${item.name} ${item.altText ?? ''} ${item.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase())
        : true
      const statusGate = statusFilter === 'all' ? true : item.status === statusFilter
      const breakpointGate = globalBreakpoint === 'all' ? true : item.breakpoint === globalBreakpoint
      const typeGate = typeFilter === 'all' ? true : item.type === typeFilter
      const unusedGate = unusedOnly ? item.usageCount === 0 : true
      return matchesSearch && statusGate && breakpointGate && typeGate && unusedGate
    })
  }, [globalBreakpoint, search, statusFilter, typeFilter, unusedOnly])

  const bucketStats = useMemo(() => {
    return visibleBuckets.map((bucket) => {
      const items = baseFilteredMedia.filter((m) => m.bucketId === bucket.id)
      const needsAlt = items.filter((m) => m.status === 'needs-alt').length
      return {
        bucket,
        count: items.length,
        needsAlt,
        totalSize: items.reduce((sum, m) => sum + m.sizeMB, 0),
        latest: items[0]?.createdAt,
      }
    })
  }, [baseFilteredMedia, visibleBuckets])

  const handleToggleView = (bucketId: string, view: 'grid' | 'list') => {
    setBucketViews((prev) => ({ ...prev, [bucketId]: view }))
  }

  const handleOpenUpload = (nextBucketId: string) => {
    const qs = searchParams.toString()
    navigate(
      qs ? `/admin/media/upload/${encodeURIComponent(nextBucketId)}?${qs}` : `/admin/media/upload/${encodeURIComponent(nextBucketId)}`,
    )
  }
  const handleCloseUpload = () => {
    const qs = searchParams.toString()
    navigate(qs ? `/admin/media?${qs}` : '/admin/media')
  }

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('all')
    setGlobalBreakpoint('all')
    setTypeFilter('all')
    setUnusedOnly(false)
    setOversizeOnly(false)
  }

  const sortItemsFn = useCallback(
    (option: SortOption, a: MediaItem, b: MediaItem) => {
      switch (option) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'size':
          return b.sizeMB - a.sizeMB
        case 'usage':
          return b.usageCount - a.usageCount
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    },
    [],
  )

  const totalAssets = baseFilteredMedia.length
  const needsAltCount = baseFilteredMedia.filter((m) => m.status === 'needs-alt').length
  const totalSizeMB = baseFilteredMedia.reduce((sum, m) => sum + m.sizeMB, 0)

  return (
    <AdminPageLayout
      title={null}
      subtitle={null}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleOpenUpload('blog-media')}
            className="inline-flex items-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:shadow-lg"
          >
            <UploadCloud className="h-4 w-4" />
            Upload
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/70 bg-white px-4 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60">
            <Filter className="h-4 w-4" />
            Bulk actions
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <HighlightCard
          title="Media library"
          description="Buckets-first view with guarded uploads. Mocked UI — no live storage yet."
          metricValue={`${totalAssets}`}
          metricLabel={`${needsAltCount} need alt • ${totalSizeMB.toFixed(2)} MB total`}
          buttonText="Upload"
          onButtonClick={() => handleOpenUpload('blog-media')}
          icon={<UploadCloud className="h-5 w-5" />}
          color="violet"
          className="max-w-full"
        />

        <div className="flex flex-col gap-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-semantic-text-primary/50" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search filename, tag, alt text"
                className="w-64 rounded-full border border-semantic-legacy-brand-blush/70 bg-brand-porcelain/40 py-2 pl-9 pr-3 text-sm outline-none ring-semantic-legacy-brand-cocoa/40 focus:ring"
              />
              {search ? (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-semantic-text-primary/50 hover:bg-white"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="relative" ref={filtersWrapRef}>
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/70 bg-brand-porcelain/60 px-4 py-2 text-xs font-semibold text-semantic-text-primary/80 hover:bg-white"
                aria-haspopup="dialog"
                aria-expanded={filtersOpen}
              >
                <Filter className="h-4 w-4" />
                Filters
                {(() => {
                  const count =
                    (search.trim() ? 1 : 0) +
                    (statusFilter !== 'all' ? 1 : 0) +
                    (globalBreakpoint !== 'all' ? 1 : 0) +
                    (typeFilter !== 'all' ? 1 : 0) +
                    (unusedOnly ? 1 : 0) +
                    (oversizeOnly ? 1 : 0)
                  return count > 0 ? (
                    <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-semantic-legacy-brand-blush/70 px-2 text-[11px] font-bold text-semantic-legacy-brand-cocoa">
                      {count}
                    </span>
                  ) : null
                })()}
              </button>

              {filtersOpen ? (
                <div
                  role="dialog"
                  aria-label="Filters"
                  className="absolute left-0 top-full z-30 mt-2 w-[340px] rounded-2xl border border-semantic-legacy-brand-blush/70 bg-white p-4 shadow-xl"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-semantic-text-primary">Filters</div>
                    <button
                      onClick={() => setFiltersOpen(false)}
                      className="inline-flex items-center justify-center rounded-full p-2 text-semantic-text-primary/60 hover:bg-brand-porcelain/70 hover:text-semantic-text-primary"
                      aria-label="Close filters"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-3">
                    <label className="grid gap-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-semantic-text-primary/60">Status</span>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                        className="rounded-xl border border-semantic-legacy-brand-blush/70 bg-brand-porcelain/50 px-3 py-2 text-sm text-semantic-text-primary outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/30"
                      >
                        <option value="all">All</option>
                        <option value="needs-alt">Needs alt</option>
                        <option value="draft">Draft</option>
                        <option value="ready">Ready</option>
                      </select>
                    </label>

                    <label className="grid gap-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-semantic-text-primary/60">Breakpoint</span>
                      <select
                        value={globalBreakpoint}
                        onChange={(e) => setGlobalBreakpoint(e.target.value as BreakpointFilter)}
                        className="rounded-xl border border-semantic-legacy-brand-blush/70 bg-brand-porcelain/50 px-3 py-2 text-sm text-semantic-text-primary outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/30"
                      >
                        <option value="all">All</option>
                        <option value="desktop">Desktop</option>
                        <option value="mobile">Mobile</option>
                      </select>
                    </label>

                    <label className="grid gap-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-semantic-text-primary/60">Type</span>
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
                        className="rounded-xl border border-semantic-legacy-brand-blush/70 bg-brand-porcelain/50 px-3 py-2 text-sm text-semantic-text-primary outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/30"
                      >
                        <option value="all">All</option>
                        <option value="image">Images</option>
                        <option value="svg">SVG</option>
                      </select>
                    </label>

                    <div className="flex flex-col gap-2">
                      <label className="flex items-center justify-between gap-3 rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/40 px-3 py-2">
                        <span className="text-sm font-semibold text-semantic-text-primary/80">Unused only</span>
                        <input
                          type="checkbox"
                          checked={unusedOnly}
                          onChange={(e) => setUnusedOnly(e.target.checked)}
                          className="h-4 w-4 accent-semantic-legacy-brand-cocoa"
                        />
                      </label>
                      <label className="flex items-center justify-between gap-3 rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/40 px-3 py-2">
                        <span className="text-sm font-semibold text-semantic-text-primary/80">Oversized only</span>
                        <input
                          type="checkbox"
                          checked={oversizeOnly}
                          onChange={(e) => setOversizeOnly(e.target.checked)}
                          className="h-4 w-4 accent-semantic-legacy-brand-cocoa"
                        />
                      </label>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={clearFilters}
                        className="inline-flex items-center gap-1 rounded-full border border-semantic-legacy-brand-blush/80 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary/70 hover:bg-brand-porcelain/60"
                      >
                        <X className="h-3 w-3" /> Clear all
                      </button>
                      <span className="text-[11px] text-semantic-text-primary/60">Active filters show below</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DensityToggle value={density} onChange={setDensity} />
          </div>
        </div>

        {(() => {
          const active: { id: string; label: string; onClear: () => void; icon?: ReactNode }[] = []
          if (search.trim()) active.push({ id: 'q', label: `Search: “${search.trim()}”`, onClear: () => setSearch('') })
          if (statusFilter !== 'all') {
            active.push({
              id: 'status',
              label: `Status: ${statusFilter === 'needs-alt' ? 'Needs alt' : statusFilter === 'draft' ? 'Draft' : 'Ready'}`,
              onClear: () => setStatusFilter('all'),
            })
          }
          if (globalBreakpoint !== 'all') {
            active.push({
              id: 'bp',
              label: `Breakpoint: ${globalBreakpoint === 'desktop' ? 'Desktop' : 'Mobile'}`,
              onClear: () => setGlobalBreakpoint('all'),
              icon: globalBreakpoint === 'desktop' ? <Monitor className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />,
            })
          }
          if (typeFilter !== 'all') {
            active.push({
              id: 'type',
              label: `Type: ${typeFilter === 'svg' ? 'SVG' : 'Images'}`,
              onClear: () => setTypeFilter('all'),
            })
          }
          if (unusedOnly) active.push({ id: 'unused', label: 'Unused', onClear: () => setUnusedOnly(false), icon: <Sparkles className="h-4 w-4" /> })
          if (oversizeOnly) active.push({ id: 'oversize', label: 'Oversized', onClear: () => setOversizeOnly(false) })

          if (active.length === 0) return null

          return (
            <div className="flex flex-wrap items-center gap-2">
              {active.map((f) => (
                <ActiveFilterChip key={f.id} label={f.label} icon={f.icon} onClear={f.onClear} />
              ))}
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-full border border-semantic-legacy-brand-blush/80 bg-white px-3 py-1 text-xs font-semibold text-semantic-text-primary/70 hover:bg-brand-porcelain/60"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            </div>
          )
        })()}

        <div className="text-xs text-semantic-text-primary/60">Mocked data — actions are non-destructive</div>

        <div className="space-y-5">
          {visibleBuckets.map((bucket) => {
            const itemsPre = baseFilteredMedia.filter((m) => m.bucketId === bucket.id)
            const scoped = itemsPre.filter((m) => {
              const bp = bucketBreakpoints[bucket.id] ?? 'all'
              if (bp === 'desktop') return m.breakpoint === 'desktop'
              if (bp === 'mobile') return m.breakpoint === 'mobile'
              return true
            })
            const items = scoped
              .filter((m) => (oversizeOnly ? isOversize(m, bucket) : true))
              .sort((a, b) => sortItemsFn(bucketSorts[bucket.id] ?? 'recent', a, b))
            const view = bucketViews[bucket.id] ?? 'grid'
            const stats = bucketStats.find((s) => s.bucket.id === bucket.id)
            const desktopCount = itemsPre.filter((i) => i.breakpoint === 'desktop').length
            const mobileCount = itemsPre.filter((i) => i.breakpoint === 'mobile').length
            return (
              <section
                key={bucket.id}
                id={bucket.id}
                className="rounded-2xl border border-semantic-legacy-brand-blush/70 bg-white/80 p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-legacy-brand-cocoa">
                      {bucket.label}
                    </span>
                    <div className="mt-1 text-sm text-semantic-text-primary/70">{bucket.description}</div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-semantic-text-primary/70">
                      <Badge label={`${stats?.count ?? 0} file${(stats?.count ?? 0) === 1 ? '' : 's'}`} tone="brand" />
                      <Badge label={`${stats?.needsAlt ?? 0} need alt`} tone={(stats?.needsAlt ?? 0) > 0 ? 'warning' : 'muted'} />
                      <Badge label={`${(stats?.totalSize ?? 0).toFixed(1)} MB`} tone="muted" />
                      <BadgeWithIcon label={`${desktopCount} desktop`} icon={<Monitor className="h-3 w-3" />} />
                      <BadgeWithIcon label={`${mobileCount} mobile`} icon={<Smartphone className="h-3 w-3" />} />
                      <Badge label={`≤${bucket.guardrails.maxSizeMB}MB`} tone="muted" />
                      <Badge label={`≤${bucket.guardrails.maxWidth}px`} tone="muted" />
                      {bucket.guardrails.allowSvg ? <Badge label="SVG ok" tone="brand" /> : null}
                      {bucket.guardrails.signedUrls ? <Badge label="Signed URLs" tone="warning" /> : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <SortSelect
                      value={bucketSorts[bucket.id]}
                      onChange={(v) => setBucketSorts((prev) => ({ ...prev, [bucket.id]: v }))}
                    />
                    <BreakpointToggle
                      value={bucketBreakpoints[bucket.id]}
                      onChange={(v) => setBucketBreakpoints((prev) => ({ ...prev, [bucket.id]: v }))}
                    />
                    <ViewToggle active={view} onChange={(v) => handleToggleView(bucket.id, v)} />
                    <button
                      onClick={() => handleOpenUpload(bucket.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-semantic-legacy-brand-cocoa hover:bg-semantic-legacy-brand-blush/20"
                    >
                      <UploadCloud className="h-4 w-4" />
                      Upload
                    </button>
                  </div>
                </div>

                  {items.length === 0 ? (
                    <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-semantic-legacy-brand-blush/60 bg-brand-porcelain/40 px-4 py-6 text-sm text-semantic-text-primary/70">
                      <div>
                        <div className="font-semibold text-semantic-text-primary">No assets yet</div>
                        <p className="text-sm">Drop files here or use upload to seed this bucket.</p>
                      </div>
                      <UploadCloud className="h-6 w-6 text-semantic-legacy-brand-cocoa" />
                    </div>
                  ) : view === 'grid' ? (
                    <div
                      className={`mt-4 grid ${
                        density === 'compact'
                          ? 'gap-2 sm:grid-cols-3 lg:grid-cols-4'
                          : 'gap-3 sm:grid-cols-2 lg:grid-cols-3'
                      }`}
                    >
                      {items.map((item) => (
                        <MediaCard
                          key={item.id}
                          item={item}
                          onSelect={() => {
                            const qs = searchParams.toString()
                            navigate(qs ? `/admin/media/${encodeURIComponent(item.id)}?${qs}` : `/admin/media/${encodeURIComponent(item.id)}`)
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`mt-4 divide-y divide-semantic-legacy-brand-blush/50 border border-semantic-legacy-brand-blush/60 rounded-xl ${
                        density === 'compact' ? 'text-sm' : ''
                      }`}
                    >
                      {items.map((item) => (
                        <MediaRow
                          key={item.id}
                          item={item}
                          onSelect={() => {
                            const qs = searchParams.toString()
                            navigate(qs ? `/admin/media/${encodeURIComponent(item.id)}?${qs}` : `/admin/media/${encodeURIComponent(item.id)}`)
                          }}
                          density={density}
                        />
                      ))}
                    </div>
                  )}
                </section>
              )
          })}
        </div>
      </div>

      {/* End main media content wrapper */}
      </div>

      <UploadDrawer
        open={Boolean(uploadBucketId)}
        bucketId={uploadBucketId}
        onClose={handleCloseUpload}
      />

      <AssetSheet
        asset={selectedAsset}
        onClose={() => {
          const qs = searchParams.toString()
          navigate(qs ? `/admin/media?${qs}` : '/admin/media')
        }}
      />
    </AdminPageLayout>
  )
}

function isOversize(item: MediaItem, bucket: Bucket) {
  return item.width > bucket.guardrails.maxWidth || item.sizeMB > bucket.guardrails.maxSizeMB
}

function formatSize(sizeMB: number) {
  if (sizeMB < 1) {
    const kb = Math.round(sizeMB * 1024)
    return `${kb} KB`
  }
  return `${sizeMB.toFixed(1)} MB`
}

function ActiveFilterChip({
  label,
  icon,
  onClear,
}: {
  label: string
  icon?: ReactNode
  onClear: () => void
}) {
  return (
    <button
      onClick={onClear}
      className="inline-flex items-center gap-1 rounded-full border border-semantic-legacy-brand-blush/70 bg-brand-porcelain/50 px-3 py-1 text-xs font-semibold text-semantic-text-primary/80 hover:bg-white"
      aria-label={`Remove filter: ${label}`}
    >
      {icon}
      <span>{label}</span>
      <X className="ml-1 h-3 w-3 text-semantic-text-primary/60" />
    </button>
  )
}

function SortSelect({
  value,
  onChange,
}: {
  value?: SortOption
  onChange: (v: SortOption) => void
}) {
  return (
    <select
      value={value ?? 'recent'}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="rounded-full border border-semantic-legacy-brand-blush/70 bg-brand-porcelain/60 px-3 py-2 text-xs font-semibold text-semantic-text-primary/80 outline-none"
    >
      <option value="recent">Recent</option>
      <option value="name">Name</option>
      <option value="size">Size</option>
      <option value="usage">Usage</option>
    </select>
  )
}

function BreakpointToggle({
  value,
  onChange,
}: {
  value?: BreakpointFilter
  onChange: (v: BreakpointFilter) => void
}) {
  const current = value ?? 'all'
  return (
    <div className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/70 bg-brand-porcelain/60 p-1">
      {(['all', 'desktop', 'mobile'] as BreakpointFilter[]).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition ${
            current === v ? 'bg-white shadow-soft text-semantic-text-primary' : 'text-semantic-text-primary/60 hover:text-semantic-text-primary'
          }`}
        >
          {v === 'desktop' ? <Monitor className="h-4 w-4" /> : null}
          {v === 'mobile' ? <Smartphone className="h-4 w-4" /> : null}
          {v === 'all' ? 'All' : v === 'desktop' ? 'Desktop' : 'Mobile'}
        </button>
      ))}
    </div>
  )
}

function DensityToggle({
  value,
  onChange,
}: {
  value: 'cozy' | 'compact'
  onChange: (v: 'cozy' | 'compact') => void
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/70 bg-brand-porcelain/60 p-1">
      {(['cozy', 'compact'] as const).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
            value === v ? 'bg-white shadow-soft text-semantic-text-primary' : 'text-semantic-text-primary/60 hover:text-semantic-text-primary'
          }`}
        >
          {v === 'cozy' ? 'Comfortable' : 'Compact'}
        </button>
      ))}
    </div>
  )
}

function UsageChip({ count }: { count: number }) {
  return (
    <div className="group relative inline-flex">
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
          count > 0
            ? 'bg-semantic-legacy-brand-blush/50 text-semantic-legacy-brand-cocoa'
            : 'bg-brand-porcelain text-semantic-text-primary/70'
        }`}
      >
        {count} use{count === 1 ? '' : 's'}
      </span>
      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-48 -translate-x-1/2 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3 text-[11px] text-semantic-text-primary shadow-xl group-hover:block">
        <div className="font-semibold text-semantic-text-primary">Usage (mock)</div>
        <p className="mt-1 text-semantic-text-primary/70">
          Later: show real references (PDP, blog, landing). For now this is illustrative.
        </p>
      </div>
    </div>
  )
}

function MediaCard({ item, onSelect }: { item: MediaItem; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="group flex flex-col overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white text-left shadow-soft transition hover:-translate-y-0.5 hover:border-semantic-legacy-brand-cocoa"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-porcelain">
        <img
          src={item.preview}
          alt={item.altText ?? item.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute left-2 top-2 flex gap-2 text-[10px] font-semibold uppercase tracking-wide">
          <Badge label={item.status === 'ready' ? 'Ready' : item.status === 'draft' ? 'Draft' : 'Needs alt'}
            tone={item.status === 'ready' ? 'success' : item.status === 'draft' ? 'muted' : 'warning'}
          />
          {item.type === 'svg' ? <Badge label="SVG" tone="brand" /> : null}
        </div>
        <div className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[11px] text-semantic-text-primary">
          {item.width}×{item.height}
        </div>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-sm font-semibold text-semantic-text-primary line-clamp-1">{item.name}</div>
            <div className="text-xs text-semantic-text-primary/60">{item.mime}</div>
          </div>
          <div className="text-xs font-semibold text-semantic-text-primary/70">{formatSize(item.sizeMB)}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-semantic-text-primary/70">
          <Badge label={`${item.usageCount} uses`} tone={item.usageCount > 0 ? 'brand' : 'muted'} />
          <UsageChip count={item.usageCount} />
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-brand-porcelain px-2 py-1 text-[11px] text-semantic-text-primary">
              {tag}
            </span>
          ))}
          {item.status === 'needs-alt' ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-[11px] font-semibold text-orange-700">
              <AlertTriangle className="h-3 w-3" /> Alt required
            </span>
          ) : null}
        </div>
      </div>
    </button>
  )
}

function MediaRow({ item, onSelect, density }: { item: MediaItem; onSelect: () => void; density: 'cozy' | 'compact' }) {
  const [editingAlt, setEditingAlt] = useState(false)
  const [altDraft, setAltDraft] = useState(item.altText ?? '')
  const [saved, setSaved] = useState(false)

  const handleSaveAlt = () => {
    setEditingAlt(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 1200)
  }

  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center gap-3 bg-white px-3 ${density === 'compact' ? 'py-2.5' : 'py-3'} text-left transition hover:bg-brand-porcelain/40`}
    >
      <div className="h-14 w-20 overflow-hidden rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain">
        <img src={item.preview} alt={item.altText ?? item.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-semantic-text-primary">
          {item.name}
          <Badge label={item.status} tone={item.status === 'ready' ? 'success' : item.status === 'draft' ? 'muted' : 'warning'} />
        </div>
        <div className="text-xs text-semantic-text-primary/60">
          {item.mime} · {item.width}×{item.height} · {formatSize(item.sizeMB)}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 text-xs text-semantic-text-primary/70">
        <UsageChip count={item.usageCount} />
        {editingAlt ? (
          <div className="flex items-center gap-1">
            <input
              value={altDraft}
              onChange={(e) => setAltDraft(e.target.value)}
              className="w-40 rounded border border-semantic-legacy-brand-blush/70 px-2 py-1 text-xs outline-none"
              placeholder="Alt text"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleSaveAlt()
              }}
              className="rounded-full bg-semantic-legacy-brand-cocoa px-2 py-1 text-[11px] font-semibold text-white"
            >
              <Check className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setEditingAlt(true)
            }}
            className="rounded-full border border-semantic-legacy-brand-blush/70 px-2 py-1 text-[11px] font-semibold text-semantic-text-primary/80 hover:bg-brand-porcelain/60"
          >
            {item.altText ? 'Edit alt' : 'Add alt'}
          </button>
        )}
        {saved ? <span className="text-[10px] text-emerald-600">Saved (mock)</span> : null}
      </div>
    </button>
  )
}

function ViewToggle({
  active,
  onChange,
}: {
  active: 'grid' | 'list'
  onChange: (view: 'grid' | 'list') => void
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/70 bg-brand-porcelain/60 p-1 text-semantic-text-primary">
      <button
        onClick={() => onChange('grid')}
        className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${
          active === 'grid' ? 'bg-white shadow-soft' : 'opacity-60 hover:opacity-100'
        }`}
      >
        <GridIcon className="h-4 w-4" /> Grid
      </button>
      <button
        onClick={() => onChange('list')}
        className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${
          active === 'list' ? 'bg-white shadow-soft' : 'opacity-60 hover:opacity-100'
        }`}
      >
        <ListIcon className="h-4 w-4" /> List
      </button>
    </div>
  )
}

function Badge({ label, tone }: { label: string; tone?: 'brand' | 'warning' | 'success' | 'muted' }) {
  const toneClass =
    tone === 'warning'
      ? 'bg-orange-50 text-orange-700 border-orange-200'
      : tone === 'success'
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : tone === 'brand'
          ? 'bg-semantic-legacy-brand-blush/40 text-semantic-legacy-brand-cocoa border-semantic-legacy-brand-blush'
          : 'bg-brand-porcelain text-semantic-text-primary/70 border-semantic-legacy-brand-blush/60'

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold ${toneClass}`}>
      {tone === 'success' ? <BadgeCheck className="h-3 w-3" /> : null}
      {tone === 'muted' ? <FileImage className="h-3 w-3" /> : null}
      {tone === 'warning' ? <AlertTriangle className="h-3 w-3" /> : null}
      {label}
    </span>
  )
}

function BadgeWithIcon({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-semantic-legacy-brand-blush/60 bg-brand-porcelain px-2 py-1 text-[11px] font-semibold text-semantic-text-primary/80">
      {icon}
      {label}
    </span>
  )
}

function UploadDrawer({ open, bucketId, onClose }: { open: boolean; bucketId: string | null; onClose: () => void }) {
  if (!open || !bucketId) return null
  const bucket = BUCKETS.find((b) => b.id === bucketId)
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col border-l border-semantic-legacy-brand-blush/80 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-semantic-legacy-brand-blush/60 px-5 py-4">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-semantic-text-primary/60">Upload</div>
            <div className="text-sm font-semibold text-semantic-text-primary">
              {bucket?.label ?? 'Bucket'}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-transparent p-2 text-semantic-text-primary/70 hover:border-semantic-legacy-brand-blush/60"
            aria-label="Close upload drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <div className="rounded-2xl border border-dashed border-semantic-legacy-brand-blush/80 bg-brand-porcelain/50 px-4 py-6 text-center">
            <UploadCloud className="mx-auto h-8 w-8 text-semantic-legacy-brand-cocoa" />
            <p className="mt-2 text-sm font-semibold text-semantic-text-primary">Drop files or click to pick</p>
            <p className="text-xs text-semantic-text-primary/70">
              Client-side validations only (mocked). We will auto-convert to WebP where allowed.
            </p>
          </div>
          <div className="space-y-2 text-xs text-semantic-text-primary/70">
            <div className="flex items-center gap-2">
              <Badge label={`≤${bucket?.guardrails.maxSizeMB}MB`} tone="muted" />
              <Badge label={`≤${bucket?.guardrails.maxWidth}px`} tone="muted" />
              {bucket?.guardrails.allowSvg ? <Badge label="SVG allowed" tone="brand" /> : null}
              <Badge label="Alt text required before publish" tone="warning" />
            </div>
            <ul className="list-disc space-y-1 pl-4">
              <li>Collect: alt text, tags, draft vs ready.</li>
              <li>Show per-file progress + WebP conversion step (simulated).</li>
              <li>Keep drawer open to add more files before closing.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-xs text-semantic-text-primary/70">
            <div className="font-semibold text-semantic-text-primary">Mock queue</div>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-brand-porcelain/60 px-3 py-2">
                <div className="flex items-center gap-2 text-sm text-semantic-text-primary">
                  <FileImage className="h-4 w-4" /> sample-file.webp
                </div>
                <span className="text-[11px] font-semibold text-semantic-legacy-brand-cocoa">Ready to start</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-brand-porcelain/60 px-3 py-2">
                <div className="flex items-center gap-2 text-sm text-semantic-text-primary">
                  <FileImage className="h-4 w-4" /> hero-banner.png
                </div>
                <span className="text-[11px] font-semibold text-orange-700">Needs alt text</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-semantic-legacy-brand-blush/60 px-5 py-4">
          <button className="w-full rounded-full bg-semantic-legacy-brand-cocoa px-4 py-3 text-sm font-semibold text-white shadow-soft hover:shadow-lg transition">
            Simulate upload
          </button>
          <p className="mt-2 text-center text-[11px] text-semantic-text-primary/60">This is a stub. Wiring to storage comes later.</p>
        </div>
      </div>
    </div>
  )
}

function AssetSheet({ asset, onClose }: { asset: MediaItem | null; onClose: () => void }) {
  if (!asset) return null
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-xl flex-col border-l border-semantic-legacy-brand-blush/80 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-semantic-legacy-brand-blush/60 px-5 py-4">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-semantic-text-primary/60">Details</div>
            <div className="text-sm font-semibold text-semantic-text-primary">{asset.name}</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-transparent p-2 text-semantic-text-primary/70 hover:border-semantic-legacy-brand-blush/60"
            aria-label="Close asset details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain">
            <img src={asset.preview} alt={asset.altText ?? asset.name} className="w-full" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 text-sm text-semantic-text-primary/80">
            <Field label="Bucket" value={asset.bucketId} />
            <Field label="Status" value={asset.status} />
            <Field label="Size" value={`${asset.sizeMB.toFixed(1)}MB`} />
            <Field label="Dimensions" value={`${asset.width}×${asset.height}`} />
            <Field label="Type" value={asset.mime} />
            <Field label="Usage" value={`${asset.usageCount} reference${asset.usageCount === 1 ? '' : 's'}`} />
            <Field label="Created" value={asset.createdAt} />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Alt text</div>
            <div className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 px-3 py-2 text-sm text-semantic-text-primary">
              {asset.altText ?? 'Not set yet. Required before publishing.'}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">Tags</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {asset.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brand-porcelain px-3 py-1 text-xs text-semantic-text-primary">
                  {tag}
                </span>
              ))}
              {asset.tags.length === 0 ? (
                <span className="text-sm text-semantic-text-primary/60">No tags yet.</span>
              ) : null}
            </div>
          </div>
          <div className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 px-3 py-2 text-sm text-semantic-text-primary">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
              <ImageOff className="h-4 w-4" /> Usage tracing (planned)
            </div>
            <p className="mt-2 text-sm text-semantic-text-primary/80">
              Later we surface where this asset is referenced (PDP, landing blocks, blog posts) and warn before delete.
            </p>
          </div>
        </div>
        <div className="border-t border-semantic-legacy-brand-blush/60 px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-full border border-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-semantic-legacy-brand-cocoa hover:bg-semantic-legacy-brand-blush/20">
              Replace (mock)
            </button>
            <button className="rounded-full border border-semantic-legacy-brand-blush/60 px-4 py-2 text-sm font-semibold text-semantic-text-primary/80 hover:bg-brand-porcelain/60">
              Copy URL
            </button>
            <button className="ml-auto rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-soft hover:shadow-lg">
              Mark ready
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 px-3 py-2">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary/60">{label}</div>
      <div className="text-sm text-semantic-text-primary">{value}</div>
    </div>
  )
}
