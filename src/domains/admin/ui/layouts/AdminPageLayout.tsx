import type { ReactNode } from 'react'

type AdminPageLayoutProps = {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}

export function AdminPageLayout({ title, subtitle, actions, children }: AdminPageLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 md:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
            Admin
          </p>
          <div>
            <h1 className="font-heading text-3xl text-semantic-text-primary">{title}</h1>
            {subtitle ? <p className="mt-2 text-semantic-text-primary/70">{subtitle}</p> : null}
          </div>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </header>
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  )
}

export default AdminPageLayout

