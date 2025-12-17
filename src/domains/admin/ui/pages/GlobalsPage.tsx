import { useAuth, useUser } from '@clerk/clerk-react'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AdminPageLayout } from '@admin/ui/layouts'
import { CheckCircle2, Save } from 'lucide-react'
import { createSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'
import { decodeClerkJwtPayload, normalizeJwtRoles } from '@admin/logic/clerkJwt'

type CmsGlobalKey = 'pdp_defaults' | 'pdp_reviews' | 'pdp_tiktok_stories'

const PDP_KEYS: CmsGlobalKey[] = ['pdp_defaults', 'pdp_reviews', 'pdp_tiktok_stories']

const safeJsonStringify = (value: unknown, fallback: '{}' | '[]') => {
  try {
    if (value == null) return fallback
    return JSON.stringify(value, null, 2)
  } catch {
    return fallback
  }
}

const parseJson = (
  label: string,
  raw: string,
  fallback: unknown,
): { ok: true; value: unknown } | { ok: false; error: string } => {
  const trimmed = raw.trim()
  if (!trimmed) return { ok: true, value: fallback }
  try {
    return { ok: true, value: JSON.parse(trimmed) as unknown }
  } catch {
    return { ok: false, error: `${label} is not valid JSON.` }
  }
}

function Card({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="space-y-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">{title}</div>
          {subtitle ? <div className="mt-2 text-sm text-semantic-text-primary/70">{subtitle}</div> : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
      {children}
    </section>
  )
}

function TextArea({
  value,
  onChange,
  rows = 14,
}: {
  value: string
  onChange: (val: string) => void
  rows?: number
}) {
  return (
    <textarea
      className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 font-mono text-[12px] text-semantic-text-primary shadow-sm focus:border-semantic-legacy-brand-cocoa focus:outline-none"
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
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

export default function GlobalsPage() {
  const { getToken } = useAuth()
  const { user } = useUser()

  const [loading, setLoading] = useState(true)
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [roleDebug, setRoleDebug] = useState<string[]>([])
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)

  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [snapshots, setSnapshots] = useState<Record<string, string>>({})

  const supabaseHost = useMemo(() => {
    const raw = import.meta.env.VITE_SUPABASE_URL as string | undefined
    if (!raw) return null
    try {
      return new URL(raw).host
    } catch {
      return raw
    }
  }, [])

  const loadGlobals = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const token = await getToken({ template: 'supabase' }).catch(() => null)
      if (!token) {
        setError('Missing Clerk JWT template `supabase` token. Check Clerk → JWT Templates.')
        setDrafts({})
        setSnapshots({})
        return
      }

      const payload = decodeClerkJwtPayload(token)
      setRoleDebug(normalizeJwtRoles(payload?.app_metadata?.roles))

      const client = createSupabaseClient(token)
      if (!client) {
        setError('Supabase is not configured in this environment (missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).')
        setDrafts({})
        setSnapshots({})
        return
      }

      const { data, error: fetchErr } = await client.from('cms_globals').select('key, data, updated_at').in('key', PDP_KEYS)
      if (fetchErr) {
        setError(fetchErr.message)
        setDrafts({})
        setSnapshots({})
        return
      }

      const byKey = new Map<string, any>()
      for (const row of data ?? []) {
        byKey.set(String((row as any).key), (row as any).data)
      }

      const nextDrafts: Record<string, string> = {}
      for (const key of PDP_KEYS) {
        const v = byKey.get(key)
        const fallback = key === 'pdp_defaults' ? '{}' : '[]'
        nextDrafts[key] = safeJsonStringify(v, fallback as '{}' | '[]')
      }

      setDrafts(nextDrafts)
      setSnapshots(nextDrafts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load globals.')
      setDrafts({})
      setSnapshots({})
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => {
    void loadGlobals()
  }, [loadGlobals])

  const saveGlobal = useCallback(
    async (key: CmsGlobalKey) => {
      const raw = drafts[key] ?? ''
      const fallback = key === 'pdp_defaults' ? {} : []
      const parsed = parseJson(key, raw, fallback)
      if (!parsed.ok) {
        setError(parsed.error)
        return
      }

      setSavingKey(key)
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

        const { error: upsertErr } = await client.from('cms_globals').upsert(
          {
            key,
            data: parsed.value,
            updated_at: new Date().toISOString(),
          } as any,
          { onConflict: 'key' },
        )

        if (upsertErr) {
          setError(upsertErr.message)
          return
        }

        setSnapshots((prev) => ({ ...prev, [key]: raw }))
        setLastSavedAt(new Date())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save global.')
      } finally {
        setSavingKey(null)
      }
    },
    [drafts, getToken],
  )

  const isDirty = (key: CmsGlobalKey) => (drafts[key] ?? '') !== (snapshots[key] ?? '')

  return (
    <AdminPageLayout
      title="Globals"
      subtitle="Edit Product Page global copy stored in Supabase (cms_globals). Storefront doesn’t read from Supabase yet; this is for the admin editor + future wiring."
      actions={
        <div className="flex items-center gap-2">
          <Pill>Supabase: {supabaseHost || 'Not configured'}</Pill>
          <Pill>{user?.primaryEmailAddress?.emailAddress || user?.id || '—'}</Pill>
          <Pill>Roles: {roleDebug.length ? roleDebug.join(', ') : '—'}</Pill>
          {lastSavedAt ? (
            <span className="flex items-center gap-1 text-xs text-semantic-text-primary/70">
              <CheckCircle2 className="h-4 w-4 text-green-600" /> Saved {lastSavedAt.toLocaleTimeString()}
            </span>
          ) : null}
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

      <Card
        title="PDP keys"
        subtitle="These three keys cover all Product Detail Page copy (excluding top nav/footer)."
        actions={
          <button
            className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-4 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60 disabled:opacity-60"
            onClick={loadGlobals}
            disabled={loading}
          >
            {loading ? 'Loading…' : 'Reload'}
          </button>
        }
      >
        <div className="flex flex-wrap gap-2 text-xs">
          {PDP_KEYS.map((k) => (
            <span
              key={k}
              className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1 font-semibold text-semantic-text-primary/80"
            >
              {k}
            </span>
          ))}
        </div>
      </Card>

      <Card
        title="pdp_defaults"
        subtitle="Headings + microcopy used across all product pages (nav items, price block labels, SEO templates, spin wheel copy, etc)."
        actions={
          <button
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
              savingKey === 'pdp_defaults' || loading || !isDirty('pdp_defaults')
                ? 'cursor-not-allowed bg-semantic-text-primary/10 text-semantic-text-primary/50'
                : 'bg-semantic-legacy-brand-cocoa text-white hover:opacity-90'
            }`}
            onClick={() => saveGlobal('pdp_defaults')}
            disabled={savingKey !== null || loading || !isDirty('pdp_defaults')}
          >
            <Save className="h-4 w-4" />
            {savingKey === 'pdp_defaults' ? 'Saving…' : 'Save'}
          </button>
        }
      >
        <TextArea value={drafts.pdp_defaults ?? ''} onChange={(v) => setDrafts((prev) => ({ ...prev, pdp_defaults: v }))} rows={18} />
      </Card>

      <Card
        title="pdp_reviews"
        subtitle="Default review cards used in the PDP carousel."
        actions={
          <button
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
              savingKey === 'pdp_reviews' || loading || !isDirty('pdp_reviews')
                ? 'cursor-not-allowed bg-semantic-text-primary/10 text-semantic-text-primary/50'
                : 'bg-semantic-legacy-brand-cocoa text-white hover:opacity-90'
            }`}
            onClick={() => saveGlobal('pdp_reviews')}
            disabled={savingKey !== null || loading || !isDirty('pdp_reviews')}
          >
            <Save className="h-4 w-4" />
            {savingKey === 'pdp_reviews' ? 'Saving…' : 'Save'}
          </button>
        }
      >
        <TextArea value={drafts.pdp_reviews ?? ''} onChange={(v) => setDrafts((prev) => ({ ...prev, pdp_reviews: v }))} rows={14} />
      </Card>

      <Card
        title="pdp_tiktok_stories"
        subtitle="TikTok story cards shown on the PDP Featured TikTok section."
        actions={
          <button
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition ${
              savingKey === 'pdp_tiktok_stories' || loading || !isDirty('pdp_tiktok_stories')
                ? 'cursor-not-allowed bg-semantic-text-primary/10 text-semantic-text-primary/50'
                : 'bg-semantic-legacy-brand-cocoa text-white hover:opacity-90'
            }`}
            onClick={() => saveGlobal('pdp_tiktok_stories')}
            disabled={savingKey !== null || loading || !isDirty('pdp_tiktok_stories')}
          >
            <Save className="h-4 w-4" />
            {savingKey === 'pdp_tiktok_stories' ? 'Saving…' : 'Save'}
          </button>
        }
      >
        <TextArea
          value={drafts.pdp_tiktok_stories ?? ''}
          onChange={(v) => setDrafts((prev) => ({ ...prev, pdp_tiktok_stories: v }))}
          rows={14}
        />
      </Card>
    </AdminPageLayout>
  )
}
