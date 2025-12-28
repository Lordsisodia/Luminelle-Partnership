import { AdminPageLayout } from '@admin/shared/ui/layouts'

export default function SettingsPage() {
  return (
    <AdminPageLayout
      title="Settings"
      subtitle="Planned: feature flags, integrations, and org configuration (placeholder)."
    >
      <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="text-sm font-semibold text-semantic-text-primary">Not wired yet</div>
        <p className="mt-2 text-sm text-semantic-text-primary/70">
          This page will centralize operational settings like feature flags, API keys/integrations, shipping rules, and admin preferences.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-semantic-text-primary/80 md:grid-cols-2">
          <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            Feature flags (staged rollouts, kill switches)
          </li>
          <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            Integrations (Shopify, Supabase, email, analytics)
          </li>
          <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            Admin preferences (default preview device, density)
          </li>
          <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            Audit trail for settings changes
          </li>
        </ul>
      </div>
    </AdminPageLayout>
  )
}

