import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AdminPageLayout from '@admin/ui/layouts/AdminPageLayout'
import { ArrowUpRight, Filter, Plus, RefreshCw } from 'lucide-react'
import clsx from 'clsx'
import { blogPosts } from '@/content/blog'

type BlogRow = {
  title: string
  slug: string
  status: 'draft' | 'published' | 'scheduled' | 'archived'
  views: number
  reads: number
  likes: number
  comments: number
  tags: string[]
  author: string
  updatedAt: string
  publishAt?: string
}

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString())
const pct = (n: number) => `${(n * 100).toFixed(1)}%`

function StatusPill({ status }: { status: BlogRow['status'] }) {
  const map: Record<BlogRow['status'], string> = {
    draft: 'border border-semantic-legacy-brand-blush/70 text-semantic-text-primary',
    published: 'bg-semantic-legacy-brand-cocoa text-white',
    scheduled: 'border border-amber-300 text-amber-700 bg-amber-50',
    archived: 'border border-gray-300 text-gray-600',
  }
  return (
    <span className={clsx('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', map[status])}>
      {status}
    </span>
  )
}

function Toolbar() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-sm font-semibold text-semantic-text-primary hover:bg-brand-porcelain">
        <RefreshCw className="h-4 w-4" />
        Reload
      </button>
      <button className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-sm font-semibold text-semantic-text-primary hover:bg-brand-porcelain">
        <Filter className="h-4 w-4" />
        Filters
      </button>
      <button className="inline-flex items-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa px-4 py-1.5 text-sm font-semibold text-white hover:brightness-95">
        <Plus className="h-4 w-4" />
        New blog
      </button>
    </div>
  )
}

export default function BlogsPage() {
  const [tagFilter, setTagFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [readsMin, setReadsMin] = useState<string>('0')
  const [sortReads, setSortReads] = useState<'asc' | 'desc' | 'none'>('none')
  const [likesMin, setLikesMin] = useState<string>('0')
  const [sortLikes, setSortLikes] = useState<'asc' | 'desc' | 'none'>('none')
  const [commentsMin, setCommentsMin] = useState<string>('0')
  const [sortComments, setSortComments] = useState<'asc' | 'desc' | 'none'>('none')
  const [ctrMin, setCtrMin] = useState<string>('0')
  const [sortPublish, setSortPublish] = useState<'desc' | 'asc'>('desc')
  const [tagOpen, setTagOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [readsOpen, setReadsOpen] = useState(false)
  const [likesOpen, setLikesOpen] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [ctrOpen, setCtrOpen] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)

  const rows: BlogRow[] = useMemo(
    () =>
      blogPosts.map((p) => ({
        title: p.title,
        slug: p.slug,
        status: (p as any).status ?? 'published',
        views: 0,
        reads: 0,
        likes: 0,
        comments: 0,
        tags: [p.tag, ...(p.tags || [])].filter(Boolean),
        author: p.author,
        updatedAt: (p.reviewed || p.date) + 'T00:00:00Z',
        publishAt: (p.date || '') + 'T00:00:00Z',
      })),
    [],
  )

  const tagOptions = useMemo(
    () => ['all', ...Array.from(new Set(rows.flatMap((r) => r.tags.filter(Boolean))))],
    [rows],
  )

  const statusOptions = ['all', 'draft', 'scheduled', 'published', 'archived']

  const filteredRows = useMemo(() => {
    const readsMinNum = Number(readsMin) || 0
    const likesMinNum = Number(likesMin) || 0
    const commentsMinNum = Number(commentsMin) || 0
    const base = rows.filter((r) => {
      if (tagFilter !== 'all' && !r.tags.includes(tagFilter)) return false
      if (statusFilter !== 'all' && r.status !== statusFilter) return false
      if (r.reads < readsMinNum) return false
      if (r.views && ctrMin) {
        const ctr = r.views ? r.reads / r.views : 0
        if (ctr < Number(ctrMin)) return false
      }
      if (r.likes < likesMinNum) return false
      if (r.comments < commentsMinNum) return false
      return true
    })
    const sorted = [...base].sort((a, b) => {
      if (sortPublish) {
        const aDate = a.publishAt ? new Date(a.publishAt).getTime() : 0
        const bDate = b.publishAt ? new Date(b.publishAt).getTime() : 0
        const cmp = bDate - aDate
        if (cmp !== 0) return sortPublish === 'desc' ? cmp : -cmp
      }
      if (sortReads !== 'none') {
        const cmp = (a.reads - b.reads) * (sortReads === 'desc' ? -1 : 1)
        if (cmp !== 0) return cmp
      }
      if (sortLikes !== 'none') {
        const cmp = (a.likes - b.likes) * (sortLikes === 'desc' ? -1 : 1)
        if (cmp !== 0) return cmp
      }
      if (sortComments !== 'none') {
        const cmp = (a.comments - b.comments) * (sortComments === 'desc' ? -1 : 1)
        if (cmp !== 0) return cmp
      }
      return 0
    })
    return sorted
  }, [rows, tagFilter, statusFilter, readsMin, likesMin, commentsMin, ctrMin, sortReads, sortLikes, sortComments, sortPublish])

  useEffect(() => {
    sessionStorage.setItem('admin:blogCount', String(rows.length))
  }, [rows.length])

  return (
    <AdminPageLayout
      title="Blogs"
      subtitle="Blog posts and metrics live in Supabase (cms_blogs + cms_blog_media)."
      actions={<Toolbar />}
    >
      <div className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[1300px]">
            <div className="hidden grid-cols-[1.6fr_1.1fr_0.7fr_0.7fr_0.7fr_0.7fr_0.7fr_0.7fr_0.5fr] items-center gap-4 border-b border-semantic-legacy-brand-blush/40 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-semantic-text-primary/70 md:grid">
              <span className="flex items-center gap-1">Title</span>
              <div className="relative flex items-center gap-1">
                <span>Tags</span>
                <button
                  onClick={() => setTagOpen((v) => !v)}
                  className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary bg-white"
                >
                  ▼
                </button>
                {tagOpen && (
                  <div className="absolute top-full left-0 z-10 mt-1 min-w-[160px] rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-2 shadow-lg">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-semantic-text-primary/60">Tags</div>
                    <div className="mt-2 space-y-1 text-sm">
                      {tagOptions.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setTagFilter(t)
                            setTagOpen(false)
                          }}
                          className={clsx(
                            'w-full rounded-lg px-2 py-1 text-left',
                            t === tagFilter ? 'bg-brand-porcelain font-semibold text-semantic-text-primary' : 'hover:bg-brand-porcelain/60',
                          )}
                        >
                          {t === 'all' ? 'All tags' : t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative flex items-center gap-1">
                <span>Status</span>
                <button
                  onClick={() => setStatusOpen((v) => !v)}
                  className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary bg-white"
                >
                  ▼
                </button>
                {statusOpen && (
                  <div className="absolute top-full left-0 z-10 mt-1 min-w-[160px] rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-2 shadow-lg">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-semantic-text-primary/60">Status</div>
                    <div className="mt-2 space-y-1 text-sm">
                      {statusOptions.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setStatusFilter(s)
                            setStatusOpen(false)
                          }}
                          className={clsx(
                            'w-full rounded-lg px-2 py-1 text-left',
                            s === statusFilter ? 'bg-brand-porcelain font-semibold text-semantic-text-primary' : 'hover:bg-brand-porcelain/60',
                          )}
                        >
                          {s === 'all' ? 'All' : s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative flex items-center gap-1">
                <span>Reads</span>
                <button
                  onClick={() => setReadsOpen((v) => !v)}
                  className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary bg-white"
                >
                  ▼
                </button>
                {readsOpen && (
                  <div className="absolute top-full left-0 z-10 mt-1 w-48 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3 shadow-lg space-y-2 text-sm">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-semantic-text-primary/60">Reads ≥</div>
                    <input
                      value={readsMin}
                      onChange={(e) => setReadsMin(e.target.value)}
                      type="number"
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                    />
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-semantic-text-primary/60">Sort</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortReads('desc')}
                        className={clsx(
                          'flex-1 rounded-lg border px-2 py-1',
                          sortReads === 'desc'
                            ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-text-primary font-semibold'
                            : 'border-semantic-legacy-brand-blush/60 hover:bg-brand-porcelain/60',
                        )}
                      >
                        High → Low
                      </button>
                      <button
                        onClick={() => setSortReads('asc')}
                        className={clsx(
                          'flex-1 rounded-lg border px-2 py-1',
                          sortReads === 'asc'
                            ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-text-primary font-semibold'
                            : 'border-semantic-legacy-brand-blush/60 hover:bg-brand-porcelain/60',
                        )}
                      >
                        Low → High
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setSortReads('none')
                        setReadsMin('0')
                      }}
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 px-2 py-1 text-sm hover:bg-brand-porcelain/60"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
              <div className="relative flex items-center gap-1">
                <span>CTR</span>
                <button
                  onClick={() => setCtrOpen((v) => !v)}
                  className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary bg-white"
                >
                  ▼
                </button>
                {ctrOpen && (
                  <div className="absolute top-full left-0 z-10 mt-1 w-48 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3 shadow-lg space-y-2 text-sm">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-semantic-text-primary/60">CTR ≥</div>
                    <input
                      value={ctrMin}
                      onChange={(e) => setCtrMin(e.target.value)}
                      type="number"
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                    />
                    <button
                      onClick={() => setCtrMin('0')}
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 px-2 py-1 text-sm hover:bg-brand-porcelain/60"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
              <div className="relative flex items-center gap-1">
                <span>Likes</span>
                <button
                  onClick={() => setLikesOpen((v) => !v)}
                  className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary bg-white"
                >
                  ▼
                </button>
                {likesOpen && (
                  <div className="absolute top-full left-0 z-10 mt-1 w-48 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3 shadow-lg space-y-2 text-sm">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-semantic-text-primary/60">Likes ≥</div>
                    <input
                      value={likesMin}
                      onChange={(e) => setLikesMin(e.target.value)}
                      type="number"
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                    />
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-semantic-text-primary/60">Sort</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortLikes('desc')}
                        className={clsx(
                          'flex-1 rounded-lg border px-2 py-1',
                          sortLikes === 'desc'
                            ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-text-primary font-semibold'
                            : 'border-semantic-legacy-brand-blush/60 hover:bg-brand-porcelain/60',
                        )}
                      >
                        High → Low
                      </button>
                      <button
                        onClick={() => setSortLikes('asc')}
                        className={clsx(
                          'flex-1 rounded-lg border px-2 py-1',
                          sortLikes === 'asc'
                            ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-text-primary font-semibold'
                            : 'border-semantic-legacy-brand-blush/60 hover:bg-brand-porcelain/60',
                        )}
                      >
                        Low → High
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setSortLikes('none')
                        setLikesMin('0')
                      }}
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 px-2 py-1 text-sm hover:bg-brand-porcelain/60"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
              <div className="relative flex items-center gap-1">
                <span>Comments</span>
                <button
                  onClick={() => setCommentsOpen((v) => !v)}
                  className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary bg-white"
                >
                  ▼
                </button>
                {commentsOpen && (
                  <div className="absolute top-full left-0 z-10 mt-1 w-52 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3 shadow-lg space-y-2 text-sm">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-semantic-text-primary/60">Comments ≥</div>
                    <input
                      value={commentsMin}
                      onChange={(e) => setCommentsMin(e.target.value)}
                      type="number"
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                    />
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-semantic-text-primary/60">Sort</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortComments('desc')}
                        className={clsx(
                          'flex-1 rounded-lg border px-2 py-1',
                          sortComments === 'desc'
                            ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-text-primary font-semibold'
                            : 'border-semantic-legacy-brand-blush/60 hover:bg-brand-porcelain/60',
                        )}
                      >
                        High → Low
                      </button>
                      <button
                        onClick={() => setSortComments('asc')}
                        className={clsx(
                          'flex-1 rounded-lg border px-2 py-1',
                          sortComments === 'asc'
                            ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-text-primary font-semibold'
                            : 'border-semantic-legacy-brand-blush/60 hover:bg-brand-porcelain/60',
                        )}
                      >
                        Low → High
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setSortComments('none')
                        setCommentsMin('0')
                      }}
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 px-2 py-1 text-sm hover:bg-brand-porcelain/60"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
              <div className="relative flex items-center gap-1">
                <span>Publish</span>
                <button
                  onClick={() => setPublishOpen((v) => !v)}
                  className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary bg-white"
                >
                  ▼
                </button>
                {publishOpen && (
                  <div className="absolute top-full left-0 z-10 mt-1 w-44 rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3 shadow-lg space-y-2 text-sm">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-semantic-text-primary/60">Sort publish</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortPublish('desc')}
                        className={clsx(
                          'flex-1 rounded-lg border px-2 py-1',
                          sortPublish === 'desc'
                            ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-text-primary font-semibold'
                            : 'border-semantic-legacy-brand-blush/60 hover:bg-brand-porcelain/60',
                        )}
                      >
                        Newest
                      </button>
                      <button
                        onClick={() => setSortPublish('asc')}
                        className={clsx(
                          'flex-1 rounded-lg border px-2 py-1',
                          sortPublish === 'asc'
                            ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain text-semantic-text-primary font-semibold'
                            : 'border-semantic-legacy-brand-blush/60 hover:bg-brand-porcelain/60',
                        )}
                      >
                        Oldest
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <span />
            </div>

            <div className="divide-y divide-semantic-legacy-brand-blush/40">
              {filteredRows.map((row) => {
                const ctr = row.views ? row.reads / row.views : 0
                return (
                  <div
                    key={row.slug}
                    className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-[1.6fr_1.1fr_0.7fr_0.7fr_0.7fr_0.7fr_0.7fr_0.7fr_0.5fr] md:items-center"
                  >
                    <div className="space-y-1">
                      <span
                        className="text-sm font-semibold text-semantic-text-primary leading-snug"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {row.title}
                      </span>
                      <div className="text-xs text-semantic-text-primary/60">/{row.slug}</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {row.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-brand-porcelain px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm font-semibold text-semantic-text-primary">
                      <StatusPill status={row.status} />
                    </div>
                    <div className="text-sm font-semibold text-semantic-text-primary">{fmt(row.reads)}</div>
                    <div className="text-sm font-semibold text-semantic-text-primary">{pct(ctr)}</div>
                    <div className="text-sm font-semibold text-semantic-text-primary">{fmt(row.likes)}</div>
                    <div className="text-sm font-semibold text-semantic-text-primary">{fmt(row.comments)}</div>
                    <div className="text-sm text-semantic-text-primary">{row.publishAt ? new Date(row.publishAt).toLocaleDateString() : '—'}</div>
                    <RouterLink
                      to={`/admin/blogs/${row.slug}`}
                      className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 text-semantic-text-primary hover:bg-brand-porcelain"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </RouterLink>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 px-4 py-6 text-sm text-semantic-text-primary/80">
        Next steps: hook this list to Supabase (cms_blogs), wire filters, and add blog detail page with live preview.
      </div>
    </AdminPageLayout>
  )
}
