import type { ReactNode } from 'react'

type AdminPageLayoutProps = {
  title?: string | null
  subtitle?: string | null
  actions?: ReactNode
  children: ReactNode
}

export function AdminPageLayout({ title, subtitle, actions, children }: AdminPageLayoutProps) {
  const hasHeader = Boolean(title) || Boolean(subtitle) || Boolean(actions)
  const paddingTopClassName = hasHeader ? 'pt-8' : 'pt-4'

  return (
    <div className={`mx-auto w-full px-4 pb-10 ${paddingTopClassName} md:px-10`}>
      {hasHeader ? (
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            {title ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
                  Admin
                </p>
                <div>
                  <h1 className="font-heading text-3xl text-semantic-text-primary">{title}</h1>
                  {subtitle ? <p className="mt-2 text-semantic-text-primary/70">{subtitle}</p> : null}
                </div>
              </>
            ) : null}
            {!title && subtitle ? <p className="text-semantic-text-primary/70">{subtitle}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </header>
      ) : null}
      <div className={hasHeader ? 'mt-6 space-y-6' : 'space-y-6'}>{children}</div>
    </div>
  )
}

export default AdminPageLayout
