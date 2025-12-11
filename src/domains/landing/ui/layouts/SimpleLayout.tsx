import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type SimpleLayoutProps = {
  title: string
  description?: string
  children: ReactNode
  ctaLabel?: string
  ctaHref?: string
}

export const SimpleLayout = ({
  title,
  description,
  children,
  ctaHref = '/',
  ctaLabel = 'Back to landing',
}: SimpleLayoutProps) => {
  return (
    <div className="min-h-screen bg-white px-4 py-8 text-brand-cocoa md:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <RouterLink
          to="/"
          className="font-heading text-sm font-semibold uppercase tracking-[0.35em] text-brand-cocoa/60"
        >
          Lumelle
        </RouterLink>
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-semibold text-brand-cocoa md:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="text-base text-brand-cocoa/75">{description}</p>
          ) : null}
        </div>
        <div className="space-y-6 text-base leading-relaxed text-brand-cocoa/80">
          {children}
        </div>
        <RouterLink
          to={ctaHref}
          className="inline-flex w-fit items-center rounded-full bg-brand-peach px-6 py-2.5 text-sm font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-peach/90"
        >
          {ctaLabel}
        </RouterLink>
      </div>
    </div>
  )
}

export default SimpleLayout
