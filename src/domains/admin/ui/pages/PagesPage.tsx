import { useAuth, useUser } from '@clerk/clerk-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AdminPageLayout } from '@admin/ui/layouts'
import { createSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'
import { decodeClerkJwtPayload, normalizeJwtRoles } from '@admin/logic/clerkJwt'

type CmsPage = {
  id: string
  slug: string
  title: string
  status: 'draft' | 'in_review' | 'published' | 'archived' | string
  updated_at: string
  published_at: string | null
}

const FEATURED_SLUGS = ['home', 'landing', 'product-1', 'product-one', 'product-2', 'product-two']

export default function PagesPage() {
  const { getToken } = useAuth()
  const { user } = useUser()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pages, setPages] = useState<CmsPage[]>([])
  const [total, setTotal] = useState<number | null>(null)

  const [newSlug, setNewSlug] = useState('')
  const [newTitle, setNewTitle] = useState('')

  const [roleDebug, setRoleDebug] = useState<string[]>([])
  const [previewDebug, setPreviewDebug] = useState<{ loading: boolean; result?: unknown; error?: string }>({
    loading: false,
  })

  const supabaseHost = useMemo(() => {
    const raw = import.meta.env.VITE_SUPABASE_URL as string | undefined
    if (!raw) return null
    try {
      return new URL(raw).host
    } catch {
      return raw
    }
  }, [])

  const visiblePages = useMemo(() => pages.filter((p) => !p.slug.startsWith('admin')), [pages])

  const featuredPages = useMemo(
    () => visiblePages.filter((p) => FEATURED_SLUGS.includes(p.slug)),
    [visiblePages]
  )
  const otherPages = useMemo(() => visiblePages.filter((p) => !FEATURED_SLUGS.includes(p.slug)), [visiblePages])

  const formatDateTime = useCallback((value: string | null | undefined) => {
    if (!value) return '—'
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return String(value)
    return d.toLocaleString()
  }, [])

  const loadPages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const token = await getToken({ template: 'supabase' }).catch(() => null)
      if (!token) {
        setError('Missing Clerk JWT template `supabase` token. Check Clerk → JWT Templates.')
        setPages([])
        setTotal(null)
        return
      }

      const payload = decodeClerkJwtPayload(token)
      setRoleDebug(normalizeJwtRoles(payload?.app_metadata?.roles))

      const client = createSupabaseClient(token)
      if (!client) {
        setError('Supabase is not configured in this environment (missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).')
        setPages([])
        setTotal(null)
        return
      }

      const { data, error: fetchErr, count } = await client
        .from('cms_pages')
        .select('id, slug, title, status, updated_at, published_at', { count: 'exact' })
        .order('updated_at', { ascending: false })
        .limit(100)

      if (fetchErr) {
        setError(fetchErr.message)
        setPages([])
        setTotal(null)
        return
      }

      setPages((data ?? []) as CmsPage[])
      setTotal(typeof count === 'number' ? count : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load pages.')
      setPages([])
      setTotal(null)
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    void loadPages()
  }, [loadPages])

  const createPage = useCallback(async () => {
    const slug = newSlug.trim()
    const title = newTitle.trim()
    if (!slug || !title) return
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
      setError('Slug must be lowercase and may only contain letters, numbers, and hyphens.')
      return
    }
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

      const { error: insertErr } = await client.from('cms_pages').insert({ slug, title })
      if (insertErr) {
        setError(insertErr.message)
        return
      }

      setNewSlug('')
      setNewTitle('')
      await loadPages()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create page.')
    } finally {
      setSaving(false)
    }
  }, [getToken, loadPages, newSlug, newTitle])

  const testPreviewContent = useCallback(async () => {
    setPreviewDebug({ loading: true })
    try {
      const token = await getToken({ template: 'supabase' }).catch(() => null)
      if (!token) {
        setPreviewDebug({ loading: false, error: 'Missing Clerk JWT template `supabase` token.' })
        return
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
      if (!supabaseUrl) {
        setPreviewDebug({ loading: false, error: 'Missing VITE_SUPABASE_URL.' })
        return
      }
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
      if (!supabaseAnonKey) {
        setPreviewDebug({ loading: false, error: 'Missing VITE_SUPABASE_ANON_KEY.' })
        return
      }

      const slug = pages.find((p) => !p.slug.startsWith('admin'))?.slug || pages[0]?.slug || 'home'
      const url = `${supabaseUrl.replace(/\/$/, '')}/functions/v1/preview-content?type=page&slug=${encodeURIComponent(slug)}`

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, apikey: supabaseAnonKey } })
      const text = await res.text()
      if (!res.ok) {
        setPreviewDebug({ loading: false, error: `preview-content ${res.status}: ${text}` })
        return
      }
      let parsed: unknown = text
      try {
        parsed = JSON.parse(text) as unknown
      } catch {
        // keep raw text
      }
      setPreviewDebug({ loading: false, result: parsed })
    } catch (err) {
      setPreviewDebug({ loading: false, error: err instanceof Error ? err.message : 'Failed to call preview-content.' })
    }
  }, [getToken, pages])

  return (
    <AdminPageLayout
      title="Pages"
      subtitle="Pages + sections are stored in Supabase (cms_pages + cms_sections). This screen verifies Clerk role claims and RLS end-to-end."
    >
      <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Connection check</div>
            <div className="mt-2 text-sm text-semantic-text-primary/80">
              Supabase: {supabaseHost || 'Not configured'} · Table: <span className="font-mono text-[12px]">cms_pages</span>
            </div>
            <div className="mt-1 text-xs text-semantic-text-primary/60">
              Clerk user: {user?.primaryEmailAddress?.emailAddress || user?.id || '—'} · Roles: {roleDebug.length ? roleDebug.join(', ') : '—'}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-4 py-2 text-sm font-semibold text-semantic-text-primary"
              onClick={loadPages}
              disabled={loading}
            >
              {loading ? 'Loading…' : 'Reload'}
            </button>
            <button
              className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-4 py-2 text-sm font-semibold text-semantic-text-primary disabled:opacity-60"
              onClick={testPreviewContent}
              disabled={loading || previewDebug.loading || !isSupabaseConfigured}
              title="Calls Supabase Edge Function preview-content to verify Clerk JWT role claims."
            >
              {previewDebug.loading ? 'Testing…' : 'Test preview'}
            </button>
          </div>
        </div>

        {!isSupabaseConfigured ? (
          <div className="mt-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 text-sm text-semantic-text-primary/80">
            Supabase is not configured for the frontend (missing <span className="font-mono text-[12px]">VITE_SUPABASE_URL</span> /{' '}
            <span className="font-mono text-[12px]">VITE_SUPABASE_ANON_KEY</span>).
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            {error}
          </div>
        ) : null}

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">RLS status</div>
            <div className="mt-2 text-sm text-semantic-text-primary/80">
              {loading ? 'Checking…' : error ? 'Blocked (see error)' : 'OK (admin role can read cms_pages)'}
            </div>
            <div className="mt-1 text-xs text-semantic-text-primary/60">
              Rows visible: {loading ? '…' : total === null ? '—' : total}
            </div>
          </div>

          <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Next</div>
            <div className="mt-2 text-sm text-semantic-text-primary/80">
              After this list, we wire page detail: sections reorder + preview/publish.
            </div>
            <div className="mt-3 grid gap-2 text-xs text-semantic-text-primary/70">
              <div>• Detail route: <span className="font-mono text-[12px]">/admin/pages/:slug</span></div>
              <div>• Tables: <span className="font-mono text-[12px]">cms_sections</span>, <span className="font-mono text-[12px]">cms_versions</span>, <span className="font-mono text-[12px]">cms_audits</span></div>
            </div>
          </div>
        </div>

        {previewDebug.error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            {previewDebug.error}
          </div>
        ) : null}

        {typeof previewDebug.result !== 'undefined' ? (
          <div className="mt-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/40 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
              preview-content result
            </div>
            <pre className="mt-2 max-h-64 overflow-auto rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3 text-[12px] text-semantic-text-primary">
              {JSON.stringify(previewDebug.result, null, 2)}
            </pre>
          </div>
        ) : null}
      </section>

      <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Create page</div>
            <div className="mt-2 text-sm text-semantic-text-primary/80">Adds a new draft page row in <span className="font-mono text-[12px]">cms_pages</span>.</div>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[220px_1fr_auto]">
          <div>
            <label className="text-xs font-semibold text-semantic-text-primary/70">Slug</label>
            <input
              className="mt-1 w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
              placeholder="e.g. home"
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              autoComplete="off"
            />
            <div className="mt-1 text-[11px] text-semantic-text-primary/60">Lowercase letters/numbers/hyphens.</div>
          </div>
          <div>
            <label className="text-xs font-semibold text-semantic-text-primary/70">Title</label>
            <input
              className="mt-1 w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
              placeholder="Home"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="flex items-end">
            <button
              className="rounded-full bg-semantic-legacy-brand-cocoa px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
              onClick={createPage}
              disabled={saving || loading || !newSlug.trim() || !newTitle.trim()}
            >
              {saving ? 'Creating…' : 'Create'}
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Pages</div>
            <div className="mt-2 text-sm text-semantic-text-primary/80">
              {loading ? 'Loading…' : total === null ? `${visiblePages.length} loaded` : `${total} total (showing ${visiblePages.length})`}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 text-sm text-semantic-text-primary/80">
            Loading pages…
          </div>
        ) : visiblePages.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 text-sm text-semantic-text-primary/80">
            No pages found.
          </div>
        ) : (
          <div className="mt-4 grid gap-4">
            {featuredPages.length ? (
              <div className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60">
                <div className="border-b border-semantic-legacy-brand-blush/40 bg-brand-porcelain/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/70">
                  Key pages
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-brand-porcelain/50 text-left text-[12px] text-semantic-text-primary/70">
                    <tr>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Slug</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {featuredPages.map((p) => (
                      <tr key={p.id} className="border-t border-semantic-legacy-brand-blush/40">
                        <td className="px-4 py-3 font-semibold text-semantic-text-primary">{p.title}</td>
                        <td className="px-4 py-3 font-mono text-[12px] text-semantic-text-primary/80">{p.slug}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 px-2 py-1 text-[12px] font-semibold text-semantic-text-primary">
                            {p.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-semantic-text-primary/70">{formatDateTime(p.updated_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {otherPages.length ? (
              <div className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60">
                <div className="border-b border-semantic-legacy-brand-blush/40 bg-brand-porcelain/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/70">
                  Other pages
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-brand-porcelain/50 text-left text-[12px] text-semantic-text-primary/70">
                    <tr>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Slug</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {otherPages.map((p) => (
                      <tr key={p.id} className="border-t border-semantic-legacy-brand-blush/40">
                        <td className="px-4 py-3 font-semibold text-semantic-text-primary">{p.title}</td>
                        <td className="px-4 py-3 font-mono text-[12px] text-semantic-text-primary/80">{p.slug}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 px-2 py-1 text-[12px] font-semibold text-semantic-text-primary">
                            {p.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-semantic-text-primary/70">{formatDateTime(p.updated_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        )}
      </section>
    </AdminPageLayout>
  )
}
