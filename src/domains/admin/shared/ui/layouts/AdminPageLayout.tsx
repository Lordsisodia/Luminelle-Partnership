import { useContext, useEffect } from 'react'
import type { ReactNode } from 'react'
import { TopBarActionsContext } from './AdminShell'

type AdminPageLayoutProps = {
  title?: string | null
  subtitle?: ReactNode
  actions?: ReactNode
  eyebrow?: ReactNode | null
  children: ReactNode
}

export function AdminPageLayout({ title, subtitle, actions, eyebrow = null, children }: AdminPageLayoutProps) {
  const hasHeader = Boolean(title) || Boolean(subtitle) || Boolean(actions)
  const paddingTopClassName = hasHeader ? 'pt-5 md:pt-6' : 'pt-2'
  const topBarCtx = useContext(TopBarActionsContext)

  // Push actions into the global top bar when provided.
  useEffect(() => {
    topBarCtx?.setTopActions(actions ?? null)
    return () => topBarCtx?.setTopActions(null)
  }, [actions, topBarCtx])

  return (
    <div className={`mx-auto w-full px-4 pb-10 ${paddingTopClassName} md:px-6 lg:px-10`}>
      {hasHeader ? (
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1.5">
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/55">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <div className="space-y-1">
                <h1 className="font-heading text-2xl md:text-3xl text-semantic-text-primary/95">{title}</h1>
                {subtitle ? <p className="text-semantic-text-primary/70">{subtitle}</p> : null}
              </div>
            ) : null}
            {!title && subtitle ? <p className="text-semantic-text-primary/70">{subtitle}</p> : null}
          </div>
          {/* Actions rendered in top nav via context; keep inline fallback empty */}
        </header>
      ) : null}
      <div className={hasHeader ? 'mt-6 space-y-6' : 'space-y-6'}>{children}</div>
    </div>
  )
}

export default AdminPageLayout
