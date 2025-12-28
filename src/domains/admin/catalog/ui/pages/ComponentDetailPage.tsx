import { AdminPageLayout } from '@admin/shared/ui/layouts'
import { componentDefaults, componentMetaList, type ComponentKey } from '@admin/shared/data/componentMeta'
import { Link, useParams } from 'react-router-dom'

export default function ComponentDetailPage() {
  const { key } = useParams<{ key?: ComponentKey }>()
  const meta = key ? componentMetaList.find((m) => m.key === key) : null
  const defaults = key ? (componentDefaults as Record<string, unknown>)[key] : null

  if (!key || !meta) {
    return (
      <AdminPageLayout title="Component not found" subtitle="Pick a component from the list.">
        <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-sm">
          <p className="text-semantic-text-primary">
            Unknown component key: <span className="font-mono text-[12px]">{key ?? '(missing)'}</span>
          </p>
          <Link
            to="/admin/components"
            className="mt-4 inline-flex items-center rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white"
          >
            Back to Components
          </Link>
        </div>
      </AdminPageLayout>
    )
  }

  return (
    <AdminPageLayout title={meta.name} subtitle={`Key: ${meta.key}`}>
      <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-sm">
        <p className="text-semantic-text-primary">
          Component detail editing UI is temporarily stubbed while we stabilise the new folder structure.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            { label: 'Category', value: meta.category },
            { label: 'Used on', value: meta.usedOn.join(', ') },
            { label: 'Status', value: 'Not editable yet' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
                {item.label}
              </div>
              <div className="mt-2 text-sm text-semantic-text-primary/80">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/40 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/70">
            Default config (read-only)
          </div>
          <pre className="mt-3 overflow-auto rounded-xl border border-semantic-legacy-brand-blush/60 bg-white p-3 text-[12px] text-semantic-text-primary">
            {JSON.stringify(defaults ?? {}, null, 2)}
          </pre>
        </div>
      </div>
    </AdminPageLayout>
  )
}
