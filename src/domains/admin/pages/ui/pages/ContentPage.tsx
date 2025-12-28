import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminPageLayout } from '@admin/shared/ui/layouts'

type Field = { key: string; value: string }

export default function ContentPage() {
  const navigate = useNavigate()
  const { handle: routeHandle } = useParams<{ handle?: string }>()
  const [fields, setFields] = useState<Field[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [handle, setHandle] = useState(routeHandle ?? 'shower-cap')

  const [pass, setPass] = useState<string>(sessionStorage.getItem('lumelle_admin_pass') || '')
  const authHeader = pass ? { Authorization: `Bearer ${pass}` } : undefined

  const load = async (nextHandle: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/sections/get?handle=${encodeURIComponent(nextHandle)}`, { headers: { 'content-type': 'application/json', ...(authHeader as any) } })
      const j = await res.json()
      setFields(j.fields || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const nextHandle = routeHandle ?? 'shower-cap'
    if (!routeHandle) {
      navigate(`/admin/content/${encodeURIComponent(nextHandle)}`, { replace: true })
      return
    }
    setHandle(nextHandle)
    void load(nextHandle)
  }, [routeHandle])

  const setField = (k: string, v: string) => {
    setFields((prev) => {
      const next = [...prev]
      const i = next.findIndex((f) => f.key === k)
      if (i >= 0) next[i] = { key: k, value: v }
      else next.push({ key: k, value: v })
      return next
    })
  }

  const save = async () => {
    setSaving(true)
    try {
      const fieldsObj = Object.fromEntries(fields.map((f) => [f.key, parseMaybeJSON(f.value)]))
      sessionStorage.setItem('lumelle_admin_pass', pass)
      await fetch(`/api/admin/sections/update?handle=${encodeURIComponent(handle)}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(authHeader as any) },
        body: JSON.stringify({ fields: fieldsObj }),
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminPageLayout title="Product content" subtitle="Edit landing/PDP copy blocks (Shopify metafield-backed).">
      <div className="flex flex-wrap gap-2">
        <input className="rounded-xl border border-semantic-legacy-brand-blush/60 px-3 py-2 text-sm" value={handle} onChange={(e) => setHandle(e.target.value)} />
        <button
          className="rounded-full border border-semantic-legacy-brand-blush/60 px-4 py-2 text-sm font-semibold text-semantic-text-primary"
          onClick={() => {
            const next = handle.trim()
            if (!next) return
            if (routeHandle === next) {
              void load(next)
              return
            }
            navigate(`/admin/content/${encodeURIComponent(next)}`)
          }}
        >
          Load
        </button>
        <input className="rounded-xl border border-semantic-legacy-brand-blush/60 px-3 py-2 text-sm" type="password" placeholder="Admin pass" value={pass} onChange={(e) => setPass(e.target.value)} />
      </div>
      {loading ? (
        <div className="mt-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-6 text-semantic-text-primary/80">Loading…</div>
      ) : (
        <div className="mt-6 grid gap-4">
          {['heroSubtitle','essentials','reasons','how','care','faq','gallery'].map((k) => (
            <div key={k} className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">{k}</div>
              <textarea
                className="mt-2 w-full rounded-xl border border-semantic-legacy-brand-blush/60 p-2 font-mono text-[12px]"
                rows={k === 'heroSubtitle' ? 2 : 6}
                value={fields.find((f) => f.key === k)?.value || ''}
                onChange={(e) => setField(k, e.target.value)}
                placeholder={k === 'heroSubtitle' ? 'Short text' : 'JSON'}
              />
            </div>
          ))}
          <div>
            <button className="rounded-full bg-semantic-legacy-brand-cocoa px-5 py-2 text-sm font-semibold text-white" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
          </div>
        </div>
      )}
    </AdminPageLayout>
  )
}

function parseMaybeJSON(v: string): any {
  const trimmed = (v || '').trim()
  if (!trimmed) return ''
  try { return JSON.parse(trimmed) } catch { return v }
}
