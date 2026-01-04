import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { blogPosts } from '@/content/blog'

function getPostSortDate(post: { reviewed?: string; date?: string }) {
  const raw = post.reviewed || post.date || ''
  const t = raw ? new Date(`${raw}T00:00:00Z`).getTime() : 0
  return Number.isFinite(t) ? t : 0
}

function QuickLink({
  to,
  label,
  subtitle,
}: {
  to: string
  label: string
  subtitle?: string
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'block rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 shadow-sm transition',
          isActive ? 'ring-1 ring-semantic-legacy-brand-blush/60' : 'hover:bg-white/70',
        ].join(' ')
      }
    >
      <div className="text-sm font-semibold text-semantic-text-primary">{label}</div>
      {subtitle ? <div className="mt-0.5 text-xs text-semantic-text-primary/65">{subtitle}</div> : null}
    </NavLink>
  )
}

export default function AdminBlogNavPanel() {
  const [query, setQuery] = useState('')

  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => getPostSortDate(b) - getPostSortDate(a))
  }, [])

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sortedPosts
    return sortedPosts.filter((p) => `${p.title} ${p.slug}`.toLowerCase().includes(q))
  }, [query, sortedPosts])

  return (
    <div className="space-y-4">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/50 bg-brand-porcelain px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/70 shadow-sm">
          Quick links
        </div>
        <div className="mt-2 grid gap-2">
          <QuickLink to="/admin/blogs" label="All blog posts" subtitle="List, filter, and open any post." />
          <QuickLink to="/admin/blogs?status=published" label="Published" subtitle="Show only published posts." />
          <QuickLink to="/admin/blogs?status=draft" label="Drafts" subtitle="Show posts still in progress." />
          <QuickLink to="/blog" label="View public blog" subtitle="Open the live /blog index." />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/50 bg-brand-porcelain px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/70 shadow-sm">
            Posts
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/50">
            {filteredPosts.length}/{sortedPosts.length}
          </span>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title or slug…"
          className="mt-2 w-full rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm shadow-sm"
        />

        <div className="mt-2 space-y-1">
          {filteredPosts.map((p) => (
            <NavLink
              key={p.slug}
              to={`/admin/blogs/${p.slug}`}
              className={({ isActive }) =>
                [
                  'group flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition overflow-hidden',
                  isActive
                    ? 'bg-white text-semantic-text-primary shadow-sm ring-1 ring-semantic-legacy-brand-blush/60 shadow-[inset_3px_0_0_0_rgba(187,125,109,0.7)]'
                    : 'text-semantic-text-primary/80 hover:bg-white/70 hover:text-semantic-text-primary',
                ].join(' ')
              }
            >
              <span className="truncate">{p.title}</span>
              <span className="shrink-0 text-[11px] font-semibold text-semantic-text-primary/45">{(p.reviewed || p.date || '').slice(5)}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

