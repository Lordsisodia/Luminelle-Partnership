import clsx from 'clsx'
import type { PropsWithChildren, ReactNode } from 'react'

export type CardProps = PropsWithChildren<{
  title?: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  className?: string
}> &
  React.HTMLAttributes<HTMLDivElement>

export function Card({ title, subtitle, actions, className, children, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-sm',
        className,
      )}
      {...rest}
    >
      {(title || actions || subtitle) && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-semantic-legacy-brand-blush/50 px-4 py-3">
          <div>
            {title ? <div className="text-sm font-semibold text-semantic-text-primary">{title}</div> : null}
            {subtitle ? <div className="text-xs text-semantic-text-primary/70">{subtitle}</div> : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  )
}

export default Card
