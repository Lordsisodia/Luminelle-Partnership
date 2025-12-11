import type { ReactNode } from 'react'
import { GlobalHeader } from '@ui/components/GlobalHeader'
import { GlobalFooter } from '@ui/components/GlobalFooter'

type AdminLayoutProps = {
  children: ReactNode
  title: string
  subtitle?: string
}

export const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-brand-porcelain text-brand-cocoa">
      <GlobalHeader
        promoMessages={[{ label: 'Admin console' }]}
        activePromo={0}
        onOpenMenu={() => {}}
        primaryLabel=""
      />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa/60">Admin</p>
          <h1 className="font-heading text-3xl text-brand-cocoa">{title}</h1>
          {subtitle ? <p className="text-brand-cocoa/70">{subtitle}</p> : null}
        </header>
        <div className="mt-6 space-y-6">{children}</div>
      </main>
      <GlobalFooter supportEmail="support@lumelle.com" />
    </div>
  )
}

export default AdminLayout
