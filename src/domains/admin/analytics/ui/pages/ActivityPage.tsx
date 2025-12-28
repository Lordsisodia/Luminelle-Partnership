import { AdminPageLayout } from '@admin/shared/ui/layouts'

export default function ActivityPage() {
  return (
    <AdminPageLayout
      title="Activity log"
      subtitle="Planned: audit trail of edits and publishes (cms_audits + cms_versions)."
    >
      <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="text-sm font-semibold text-semantic-text-primary">Not wired yet</div>
        <p className="mt-2 text-sm text-semantic-text-primary/70">
          This will show a chronological list of changes (who changed what, when) and link to version snapshots for
          rollback.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            { label: 'Entity types', value: 'page, section, product, blog, globals' },
            { label: 'Actions', value: 'create, update, publish, rollback' },
            { label: 'Filters', value: 'actor, entity, date range' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
                {item.label}
              </div>
              <div className="mt-2 text-sm text-semantic-text-primary/80">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </AdminPageLayout>
  )
}
