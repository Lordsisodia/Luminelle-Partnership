import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { Seo } from '@/components/Seo'
import { SUPPORT_EMAIL } from '@/config/constants'

type Action = {
  label: string
  to: string
  variant?: 'primary' | 'secondary'
}

type TemporarilyUnavailablePageProps = {
  subtitle: string
  eyebrow?: string
  title: string
  description: ReactNode
  actions?: Action[]
  showSupportEmail?: boolean
}

export const TemporarilyUnavailablePage = ({
  subtitle,
  eyebrow = 'Heads up',
  title,
  description,
  actions = [
    { label: 'Back to home', to: '/', variant: 'primary' },
    { label: 'View cart', to: '/cart', variant: 'secondary' },
  ],
  showSupportEmail = true,
}: TemporarilyUnavailablePageProps) => {
  return (
    <>
      <Seo title={subtitle} description={title} />
      <MarketingLayout navItems={[]} subtitle={subtitle}>
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-semantic-text-primary">{title}</h1>
            <div className="mt-4 text-sm leading-relaxed text-semantic-text-primary/70">{description}</div>

            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <RouterLink
                  key={`${action.to}-${action.label}`}
                  to={action.to}
                  className={
                    action.variant === 'secondary'
                      ? 'inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-6 py-3 text-sm font-semibold text-semantic-text-primary'
                      : 'inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-sm font-semibold text-white'
                  }
                >
                  {action.label}
                </RouterLink>
              ))}
            </div>

            {showSupportEmail ? (
              <p className="mt-10 text-xs text-semantic-text-primary/60">
                Need help? Email{' '}
                <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
                  {SUPPORT_EMAIL}
                </a>
                .
              </p>
            ) : null}
          </div>
        </section>
      </MarketingLayout>
    </>
  )
}

export default TemporarilyUnavailablePage
