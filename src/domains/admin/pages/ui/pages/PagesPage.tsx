import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AdminPageLayout } from '@admin/shared/ui/layouts'
import { Clock3, FileText, ShieldCheck, Sparkles } from 'lucide-react'
import { setAdminNavList } from '@admin/shared/application/adminNavLists'

type PageSection = {
  title: string
  body: string
  hint?: string
}

type AdminPage = {
  slug: string
  /**
   * Public-facing route for the page.
   * Note: this is not always `/${slug}` (e.g. slug "brand-story" is served at `/brand`).
   */
  publicPath: string
  title: string
  type: 'Marketing' | 'Story' | 'Legal'
  status: 'Published' | 'Draft' | 'In review'
  updatedAt: string
  publishedAt?: string
  summary: string
  hero: {
    eyebrow: string
    heading: string
    subheading: string
    cta: string
    badge?: string
  }
  sections: PageSection[]
  seo: { title: string; description: string }
  notes?: string
  tone?: string
}

const PAGES: AdminPage[] = [
  {
    slug: 'creators',
    publicPath: '/creators',
    title: 'Creators',
    type: 'Marketing',
    status: 'Published',
    updatedAt: 'Dec 14, 2025',
    publishedAt: 'Dec 12, 2025',
    summary: 'Spotlight featured partners, UGC reels, and the submission CTA.',
    hero: {
      eyebrow: 'Community',
      heading: 'Real creators. Real routines.',
      subheading: 'See how stylists and founders use Lumelle daily — practical swaps, rituals, and no-retouch receipts.',
      cta: 'View creator lineup',
      badge: 'Updated weekly',
    },
    sections: [
      { title: 'Featured carousel', body: '3 hero creators with 30s video loops + quick stats.' },
      { title: 'Routine blocks', body: 'Step cards (product, why it matters, time stamp).' },
      { title: 'Submission CTA', body: '“Want to collab?” form entry with review SLA badge.' },
    ],
    seo: {
      title: 'Lumelle Creators | Routines that actually work',
      description: 'Meet the bar-raising creators using Lumelle. Watch their routines and shop their kits.',
    },
    tone: 'Warm, first-person, proof-first',
  },
  {
    slug: 'brand-story',
    publicPath: '/brand',
    title: 'Brand Story',
    type: 'Story',
    status: 'Published',
    updatedAt: 'Dec 11, 2025',
    publishedAt: 'Dec 11, 2025',
    summary: 'Mission, founding story, materials promise, and team strip.',
    hero: {
      eyebrow: 'Why Lumelle',
      heading: 'Built for restless hair optimists.',
      subheading: 'From late-night prototypes to a material-first line that respects your time and texture.',
      cta: 'Read our story',
      badge: 'Brand',
    },
    sections: [
      { title: 'Timeline', body: 'Milestones with product and community highlights.' },
      { title: 'Materials promise', body: 'Recycled satin, traceable cotton, clean ink.' },
      { title: 'Team strip', body: '4 portraits with one-line superpowers.' },
    ],
    seo: {
      title: 'About Lumelle | Purpose-built hair tools',
      description: 'Our founding story, materials promise, and the team building better hair days.',
    },
    tone: 'Narrative, confident, concise',
  },
  {
    slug: 'landing',
    publicPath: '/',
    title: 'Landing Page',
    type: 'Marketing',
    status: 'Published',
    updatedAt: 'Dec 15, 2025',
    publishedAt: 'Dec 15, 2025',
    summary: 'Hero, value stack, social proof, before/after grid, and FAQ.',
    hero: {
      eyebrow: 'New drop',
      heading: 'Your no-heat routine, simplified.',
      subheading: 'Wake up to smooth, frizz-minimal hair with the 3-piece Overnight Set.',
      cta: 'Shop the set',
      badge: 'A/B: Variant B live',
    },
    sections: [
      { title: 'Value stack', body: '3 tiles: frictionless, fabric-safe, dermatologist reviewed.' },
      { title: 'Proof wall', body: 'UGC grid + press logos + 4.8 rating pill.' },
      { title: 'FAQ', body: '8 questions, collapsible, last updated Dec 10.' },
    ],
    seo: {
      title: 'Lumelle Overnight Set | Heatless, effort-light hair',
      description: 'Skip hot tools. Sleep-in satin kit with 4.8-star reviews and dermatologist notes.',
    },
    tone: 'Direct response, skimmable',
  },
  {
    slug: 'terms',
    publicPath: '/terms',
    title: 'Terms & Conditions',
    type: 'Legal',
    status: 'Published',
    updatedAt: 'Dec 01, 2025',
    publishedAt: 'Dec 01, 2025',
    summary: 'Purchasing, shipping, returns, arbitration, and jurisdiction.',
    hero: {
      eyebrow: 'Legal',
      heading: 'Terms that stay readable.',
      subheading: 'Plain-language policies for shopping, returns, subscriptions, and promotions.',
      cta: 'View terms',
    },
    sections: [
      { title: 'Purchases & subscriptions', body: 'Billing cadence, renewals, and promo stacking.' },
      { title: 'Returns & exchanges', body: '30-day window, condition rules, prepaid label flow.' },
      { title: 'Arbitration & venue', body: 'Binding arbitration; California law; San Francisco venue.' },
    ],
    seo: {
      title: 'Lumelle Terms & Conditions',
      description: 'Purchase rules, subscriptions, returns, and dispute resolution in plain language.',
    },
    notes: 'Lock edits to Legal role. Versioned with effective date banner.',
    tone: 'Neutral, precise',
  },
  {
    slug: 'privacy',
    publicPath: '/privacy',
    title: 'Privacy Policy',
    type: 'Legal',
    status: 'Published',
    updatedAt: 'Nov 27, 2025',
    publishedAt: 'Nov 27, 2025',
    summary: 'Data collection, cookies, analytics, deletion and access requests.',
    hero: {
      eyebrow: 'Privacy',
      heading: 'Your data, clearly managed.',
      subheading: 'What we collect, why we collect it, and how to opt-out or delete your data.',
      cta: 'Read privacy policy',
    },
    sections: [
      { title: 'Data collected', body: 'Checkout, analytics, support logs; no biometric data.' },
      { title: 'Controls', body: 'Delete/export request form, cookie preferences, email opt-outs.' },
      { title: 'Vendors', body: 'Shopify, Supabase, Clerk, PostHog — DPIAs on file.' },
    ],
    seo: {
      title: 'Lumelle Privacy Policy',
      description: 'How Lumelle collects, uses, and protects personal data plus your control options.',
    },
    notes: 'Show “Effective date” and last audit badge.',
    tone: 'Assuring, specific',
  },
]

const STATUS_COLORS: Record<AdminPage['status'], string> = {
  Published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Draft: 'bg-amber-50 text-amber-700 border-amber-200',
  'In review': 'bg-blue-50 text-blue-700 border-blue-200',
}

const getSlugPath = (page: Pick<AdminPage, 'slug'>) => `/${page.slug}`

export default function PagesPage() {
  const { slug } = useParams<{ slug?: string }>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedSlug, setSelectedSlug] = useState<string | null>(slug ?? null)
  const [query, setQuery] = useState<string>(() => (searchParams.get('q') ?? '').trim())
  const [typeFilter, setTypeFilter] = useState<string>(() => (searchParams.get('type') ?? 'all').trim() || 'all')
  const [statusFilter, setStatusFilter] = useState<string>(() => (searchParams.get('status') ?? 'all').trim() || 'all')

  // URL -> state for list filters (deep links / back-forward)
  useEffect(() => {
    setQuery((searchParams.get('q') ?? '').trim())
    const rawType = (searchParams.get('type') ?? 'all').trim() || 'all'
    const rawStatus = (searchParams.get('status') ?? 'all').trim() || 'all'
    setTypeFilter(rawType === 'Marketing' || rawType === 'Story' || rawType === 'Legal' ? rawType : 'all')
    setStatusFilter(rawStatus === 'Published' || rawStatus === 'Draft' || rawStatus === 'In review' ? rawStatus : 'all')
  }, [searchParams])

  // state -> URL for list filters (shareable URLs, keep query clean by omitting defaults)
  const desiredSearch = useMemo(() => {
    const next = new URLSearchParams()
    if (query.trim()) next.set('q', query.trim())
    if (typeFilter !== 'all') next.set('type', typeFilter)
    if (statusFilter !== 'all') next.set('status', statusFilter)
    return next
  }, [query, statusFilter, typeFilter])

  useEffect(() => {
    if (searchParams.toString() === desiredSearch.toString()) return
    setSearchParams(desiredSearch, { replace: true })
  }, [desiredSearch, searchParams, setSearchParams])

  // keep state in sync with URL slug
  useEffect(() => {
    setSelectedSlug(slug ?? null)
  }, [slug])

  // Redirect unknown slugs back to the list (prevents stale `/admin/pages/:slug` URLs)
  useEffect(() => {
    if (!slug) return
    const exists = PAGES.some((p) => p.slug === slug)
    if (!exists) {
      const qs = searchParams.toString()
      navigate(qs ? `/admin/pages?${qs}` : '/admin/pages', { replace: true })
    }
  }, [navigate, searchParams, slug])

  // Fix breadcrumb last item to show current page title when deep-linked
  useEffect(() => {
    if (!selectedSlug) return
    const title = PAGES.find((p) => p.slug === selectedSlug)?.title
    if (!title) return
    document.title = `Pages · ${title}`
  }, [selectedSlug])

  useEffect(() => {
    setAdminNavList(
      'pages',
      PAGES.map((p) => ({
        label: p.title,
        to: `/admin/pages/${p.slug}`,
      })),
    )
  }, [])
  const selected = useMemo(() => (selectedSlug ? PAGES.find((p) => p.slug === selectedSlug) : null), [selectedSlug])
  const listQs = searchParams.toString()
  const filteredPages = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PAGES.filter((page) => {
      if (typeFilter !== 'all' && page.type !== typeFilter) return false
      if (statusFilter !== 'all' && page.status !== statusFilter) return false
      if (!q) return true
      return (
        page.title.toLowerCase().includes(q) ||
        page.slug.toLowerCase().includes(q) ||
        page.publicPath.toLowerCase().includes(q) ||
        page.summary.toLowerCase().includes(q)
      )
    })
  }, [query, statusFilter, typeFilter])

  return (
    <AdminPageLayout
      title="Pages"
      subtitle="Pick a page to open its detail preview/editor."
    >
      <div className="grid gap-6 items-start w-full">
        {!selected ? (
	        <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-sm">
	          <div className="flex flex-wrap items-center justify-between gap-3">
	            <div>
	              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Pages</div>
	            </div>
	            <div className="flex gap-2 text-xs font-semibold text-semantic-text-primary/70">
	              <span className="rounded-full bg-brand-porcelain px-3 py-1">{filteredPages.length} results</span>
	            </div>
	          </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, slug, or /route"
                className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm text-semantic-text-primary placeholder:text-semantic-text-primary/40 md:w-[260px]"
              />
              <button
                type="button"
                onClick={() => setStatusFilter((prev) => (prev === 'Published' ? 'all' : 'Published'))}
                className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                  statusFilter === 'Published'
                    ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-legacy-brand-cocoa'
                    : 'border-semantic-legacy-brand-blush/60 bg-brand-porcelain text-semantic-text-primary/70 hover:bg-brand-porcelain/70'
                }`}
              >
                Published
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter((prev) => (prev === 'Legal' ? 'all' : 'Legal'))}
                className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                  typeFilter === 'Legal'
                    ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-legacy-brand-cocoa'
                    : 'border-semantic-legacy-brand-blush/60 bg-brand-porcelain text-semantic-text-primary/70 hover:bg-brand-porcelain/70'
                }`}
              >
                Legal
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter((prev) => (prev === 'Story' ? 'all' : 'Story'))}
                className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                  typeFilter === 'Story'
                    ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-legacy-brand-cocoa'
                    : 'border-semantic-legacy-brand-blush/60 bg-brand-porcelain text-semantic-text-primary/70 hover:bg-brand-porcelain/70'
                }`}
              >
                Story
              </button>
              {(query.trim() || typeFilter !== 'all' || statusFilter !== 'all') ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setTypeFilter('all')
                    setStatusFilter('all')
                  }}
                  className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1 text-xs font-semibold text-semantic-text-primary/70 hover:bg-brand-porcelain/60"
                >
                  Clear
                </button>
              ) : null}
            </div>

	          <div className="mt-4 space-y-3">
              {filteredPages.length === 0 ? (
                <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 text-sm text-semantic-text-primary/70">
                  No pages match these filters.
                </div>
              ) : null}
	            {filteredPages.map((page) => (
	              <button
	                key={page.slug}
	                onClick={() => navigate(listQs ? `/admin/pages/${page.slug}?${listQs}` : `/admin/pages/${page.slug}`)}
	                className="group relative flex w-full flex-col justify-between rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
	              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-semantic-text-primary">{page.title}</div>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${STATUS_COLORS[page.status]}`}
                  >
                    {page.status}
                  </span>
                </div>
	                <div className="mt-1 flex items-center gap-2 text-[12px] text-semantic-text-primary/70">
	                  <FileText className="h-3.5 w-3.5" />
	                  <span className="font-mono text-[11px]">{page.publicPath}</span>
	                  {getSlugPath(page) !== page.publicPath ? (
	                    <span className="text-[11px] text-semantic-text-primary/55">
	                      slug <span className="font-mono">{page.slug}</span>
	                    </span>
	                  ) : null}
	                  <span>• {page.type}</span>
	                </div>
                <p className="mt-2 text-sm text-semantic-text-primary/80 line-clamp-3">{page.summary}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-semantic-text-primary/70">
                  <span className="rounded-full bg-brand-porcelain/80 px-2.5 py-1 font-semibold">Sections: {page.sections.length}</span>
                  {page.tone ? (
                    <span className="rounded-full bg-brand-porcelain/60 px-2.5 py-1 font-semibold">Tone: {page.tone}</span>
                  ) : null}
                  {page.hero.badge ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 font-semibold text-semantic-text-primary shadow-sm">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" /> {page.hero.badge}
                    </span>
                  ) : null}
                </div>
                {page.notes ? (
                  <div className="mt-2 inline-flex items-center gap-2 text-[12px] font-semibold text-semantic-text-primary/80">
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                    <span>{page.notes}</span>
                  </div>
                ) : null}
                <div className="mt-3 flex items-center gap-2 text-[12px] text-semantic-text-primary/60">
                  <Clock3 className="h-3.5 w-3.5" />
                  <span>Updated {page.updatedAt}</span>
                  {page.publishedAt ? <span>• Published {page.publishedAt}</span> : null}
                </div>
              </button>
            ))}
          </div>
        </section>
        ) : (
	        <section className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-sm">
	          <div className="flex items-center justify-between gap-3">
	            <div className="flex items-center gap-3">
	              <button
	                type="button"
	                onClick={() => navigate(listQs ? `/admin/pages?${listQs}` : '/admin/pages')}
	                className="hidden rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary shadow-sm transition hover:bg-brand-porcelain/60 sm:inline-flex"
	              >
	                Back to pages
	              </button>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Page detail</div>
	                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-semantic-text-primary/80">
	                  <span className="font-semibold">{selected.title}</span>
	                  <span className="text-semantic-text-primary/50">•</span>
	                  <span className="font-mono text-[12px]">{selected.publicPath}</span>
	                  {getSlugPath(selected) !== selected.publicPath ? (
	                    <span className="text-[11px] text-semantic-text-primary/55">
	                      slug <span className="font-mono">{selected.slug}</span>
	                    </span>
	                  ) : null}
	                  <span className="text-semantic-text-primary/50">•</span>
	                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">{selected.type}</span>
	                  {selected.tone ? <span className="rounded-full bg-brand-porcelain px-2.5 py-1 text-[11px] font-semibold text-semantic-text-primary/80">Tone: {selected.tone}</span> : null}
	                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-semibold ${STATUS_COLORS[selected.status]}`}
              >
                {selected.status}
              </span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.95fr]">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4 shadow-inner">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-semantic-text-primary shadow-sm">
                    {selected.hero.eyebrow}
                    {selected.hero.badge ? (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-brand-porcelain/70 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        {selected.hero.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-semibold leading-tight text-semantic-text-primary md:text-2xl">{selected.hero.heading}</div>
                    <p className="text-sm text-semantic-text-primary/80 md:text-base">{selected.hero.subheading}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow">
                    {selected.hero.cta}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/70">Sections</div>
                  <span className="rounded-full bg-brand-porcelain px-3 py-1 text-[11px] font-semibold text-semantic-text-primary/80">{selected.sections.length} blocks</span>
                </div>
                <div className="mt-3 grid gap-3">
                  {selected.sections.map((section, idx) => (
                    <div
                      key={section.title}
                      className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/40 px-3 py-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-semantic-text-primary">{section.title}</div>
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-semantic-text-primary shadow-sm">
                          {idx + 1}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-semantic-text-primary/75">{section.body}</p>
                      {section.hint ? <p className="mt-1 text-[12px] text-semantic-text-primary/60">Hint: {section.hint}</p> : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/30 p-4">
	                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/70">Summary</div>
	                <p className="mt-2 text-sm text-semantic-text-primary/85">{selected.summary}</p>
	                <div className="mt-3 grid gap-2 text-[12px] text-semantic-text-primary/70">
	                  <div className="flex items-center gap-2">
	                    <FileText className="h-3.5 w-3.5" />
	                    <span className="font-mono text-[11px]">{selected.publicPath}</span>
	                    {getSlugPath(selected) !== selected.publicPath ? (
	                      <span className="text-[11px] text-semantic-text-primary/55">
	                        slug <span className="font-mono">{selected.slug}</span>
	                      </span>
	                    ) : null}
	                  </div>
	                  <div className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" /> <span>Updated {selected.updatedAt}</span> {selected.publishedAt ? <span className="text-semantic-text-primary/60">• Published {selected.publishedAt}</span> : null}</div>
	                  {selected.notes ? (
	                    <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[12px] font-semibold text-semantic-text-primary shadow-sm">
	                      <ShieldCheck className="h-4 w-4 text-blue-600" />
	                      <span>{selected.notes}</span>
	                    </div>
	                  ) : null}
	                </div>
              </div>

              <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/70">SEO</div>
                <div className="mt-2 space-y-2">
                  <div>
                    <div className="text-xs font-semibold text-semantic-text-primary/80">Title</div>
                    <p className="text-sm text-semantic-text-primary">{selected.seo.title}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-semantic-text-primary/80">Description</div>
                    <p className="text-sm text-semantic-text-primary/80">{selected.seo.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}
      </div>
    </AdminPageLayout>
  )
}
