import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AdminPageLayout } from '@admin/shared/ui/layouts'
import { componentMetaList, type ComponentMeta, type ComponentKey } from '@admin/shared/data/componentMeta'
import { setAdminNavList } from '@admin/shared/application/adminNavLists'
import {
  Megaphone,
  PanelsTopLeft,
  List,
  PanelLeft,
  Anchor,
  BadgePercent,
  AlertTriangle,
  Gift,
  ShieldCheck,
  Mail,
  type LucideIcon,
} from 'lucide-react'

const iconByKey: Record<ComponentKey, LucideIcon> = {
  promo: Megaphone,
  header: PanelsTopLeft,
  'nav-public': List,
  'nav-admin': PanelLeft,
  footer: Anchor,
  'spin-wheel': BadgePercent,
  announcement: AlertTriangle,
  'cta-ribbon': Gift,
  'trust-strip': ShieldCheck,
  'newsletter-modal': Mail,
}

const categoryTone: Record<ComponentMeta['category'], string> = {
  Core: 'bg-[#f6eee8] text-semantic-text-primary/80 border-semantic-legacy-brand-blush/60',
  Content: 'bg-[#f4f0ff] text-semantic-text-primary/80 border-[#d5c8ff]',
  Promos: 'bg-[#fff4e5] text-semantic-text-primary/80 border-[#ffd8a8]',
  Admin: 'bg-[#e8f3ff] text-semantic-text-primary/80 border-[#b8ddff]',
}

function ComponentCard({ meta }: { meta: ComponentMeta }) {
  const Icon = iconByKey[meta.key] ?? PanelsTopLeft
  return (
    <div className="group flex h-full flex-col gap-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-porcelain/70 text-semantic-text-primary">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-semantic-text-primary/60">Component</div>
            <div className="text-lg font-semibold text-semantic-text-primary">{meta.name}</div>
            <p className="text-sm text-semantic-text-primary/75">{meta.description}</p>
          </div>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${categoryTone[meta.category]} `}
        >
          {meta.category}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
        {meta.usedOn.map((chip) => (
          <span key={chip} className="rounded-full bg-brand-porcelain px-2.5 py-1 text-semantic-text-primary/80">
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <div className="inline-flex items-center gap-2 text-xs text-semantic-text-primary/65">
          <span className="h-2 w-2 rounded-full bg-semantic-text-primary/30" aria-hidden />
          <span>Not saved yet</span>
        </div>
        <Link
          to={`/admin/components/${meta.key}`}
          className="inline-flex items-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-soft"
        >
          Edit
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}

export default function ComponentsPage() {
  useEffect(() => {
    // Feed the sidebar nav panel with the current component set.
    // (This page uses a static `componentMetaList`, so we can set it once.)
    setAdminNavList(
      'components',
      componentMetaList.map((m) => ({
        label: m.name,
        to: `/admin/components/${m.key}`,
      })),
    )
  }, [])

  return (
    <AdminPageLayout
      title="Components"
      subtitle="Preview and configure shared UI pieces. Saving/publishing coming soon — this is layout-only."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {componentMetaList.map((meta) => (
          <ComponentCard key={meta.key} meta={meta} />
        ))}
      </div>
    </AdminPageLayout>
  )
}
