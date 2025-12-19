import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminPageLayout } from '@admin/ui/layouts'
import {
  componentDefaults,
  componentMetaList,
  getComponentMeta,
  type ComponentKey,
  type FooterConfig,
  type HeaderConfig,
  type NavConfig,
  type PromoConfig,
  type SpinWheelConfig,
  type AnnouncementConfig,
  type CtaRibbonConfig,
  type TrustStripConfig,
  type NewsletterModalConfig,
} from '@admin/data/componentMeta'
import { PublicHeader } from '@ui/components/PublicHeader'
import { GlobalFooter } from '@ui/components/GlobalFooter'
import { AnnouncementBar } from '@ui/components/AnnouncementBar'
import { CtaRibbon } from '@ui/components/CtaRibbon'
import { TrustStrip } from '@ui/components/TrustStrip'
import { NewsletterModal } from '@ui/components/NewsletterModal'
import { DrawerProvider } from '@ui/providers/DrawerProvider'

type PreviewSize = 'desktop' | 'tablet' | 'mobile'

const previewWidths: Record<PreviewSize, string> = {
  desktop: '1200px',
  tablet: '900px',
  mobile: '420px',
}

function useComponentKey(): ComponentKey | null {
  const { key } = useParams()
  const validKeys = componentMetaList.map((m) => m.key)
  return validKeys.includes(key as ComponentKey) ? (key as ComponentKey) : null
}

function PlaceholderField({ label, note }: { label: string; note?: string }) {
  return (
    <div className="space-y-2 rounded-xl border border-dashed border-semantic-legacy-brand-blush/60 bg-white/85 px-4 py-3 shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]">
      <div className="text-sm font-semibold text-semantic-text-primary">{label}</div>
      {note ? <div className="text-xs text-semantic-text-primary/70">{note}</div> : null}
    </div>
  )
}

export default function ComponentDetailPage() {
  const key = useComponentKey()
  const navigate = useNavigate()

  const meta = key ? getComponentMeta(key) : null
  const defaults = key ? componentDefaults[key] : null
  const headerDefaults = componentDefaults.header as HeaderConfig
  const promoDefaults = componentDefaults.promo as PromoConfig

  const previewLabel = useMemo(() => meta?.name ?? 'Component', [meta])
  const [previewSize, setPreviewSize] = useState<PreviewSize>('mobile')
  const [promoActive, setPromoActive] = useState(0)

  // Auto-rotate promo messages in preview to mimic live behavior.
  useEffect(() => {
    if (key !== 'promo') return
    const msgs = (defaults as PromoConfig | null)?.messages ?? []
    if (!msgs.length) return
    const id = window.setInterval(() => {
      setPromoActive((idx) => (idx + 1) % msgs.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [key, defaults])

  const renderPreview = () => {
    if (!key || !defaults) return null
    switch (key) {
      case 'promo': {
        const cfg = defaults as PromoConfig
        return (
          <DrawerProvider>
            <div className="rounded-xl border border-semantic-legacy-brand-blush/50 bg-white overflow-hidden" style={{ maxHeight: '42px' }}>
              {/* Render the actual PublicHeader; we clip to the promo strip height so we keep the real component in sync with app changes. */}
              <PublicHeader
                promoMessages={cfg.messages}
                activePromo={promoActive % cfg.messages.length}
                subtitle={headerDefaults.subtitle}
                primaryLabel={headerDefaults.primaryLabel}
                onPrimaryAction={() => {}}
                onOpenMenu={() => {}}
              />
            </div>
          </DrawerProvider>
        )
      }
      case 'header': {
        const cfg = defaults as HeaderConfig
        return (
          <DrawerProvider>
            <div className="rounded-xl border border-semantic-legacy-brand-blush/50 bg-white">
              <PublicHeader
                promoMessages={promoDefaults.messages}
                activePromo={promoActive % promoDefaults.messages.length}
                subtitle={cfg.subtitle}
                primaryLabel={cfg.primaryLabel}
                onPrimaryAction={() => {}}
              />
            </div>
          </DrawerProvider>
        )
      }
      case 'nav-public': {
        const cfg = defaults as NavConfig
        return (
          <div className="rounded-xl border border-semantic-legacy-brand-blush/50 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-semantic-text-primary/60">Drawer Nav</div>
            <div className="mt-3 space-y-3">
              {cfg.sections.map((section) => (
                <div key={section.label} className="space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary/60">
                    {section.label}
                  </div>
                  <div className="divide-y divide-semantic-legacy-brand-blush/40 rounded-xl border border-semantic-legacy-brand-blush/60">
                    {section.items.map((item) => (
                      <div key={item.label} className="flex items-center justify-between px-3 py-2 text-sm text-semantic-text-primary">
                        <span>{item.label}</span>
                        <span className="text-xs text-semantic-text-primary/60">{item.href}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      case 'nav-admin': {
        const cfg = defaults as NavConfig
        return (
          <div className="rounded-xl border border-semantic-legacy-brand-blush/50 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-semantic-text-primary/60">Admin sidebar</div>
            <div className="mt-3 space-y-3">
              {cfg.sections.map((section) => (
                <div key={section.label} className="space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary/60">
                    {section.label}
                  </div>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.label} className="flex items-center gap-2 rounded-lg border border-semantic-legacy-brand-blush/60 px-3 py-2 text-sm text-semantic-text-primary">
                        <span>{item.label}</span>
                        <span className="text-[11px] text-semantic-text-primary/60">{item.href}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )
      }
      case 'footer': {
        const cfg = defaults as FooterConfig
        return (
          <div className="rounded-xl border border-semantic-legacy-brand-blush/50 bg-white">
            <GlobalFooter supportEmail={cfg.supportEmail} />
          </div>
        )
      }
      case 'spin-wheel': {
        const cfg = defaults as SpinWheelConfig
        return (
          <div className="rounded-xl border border-semantic-legacy-brand-blush/50 bg-white p-4 space-y-3 text-semantic-text-primary">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-semantic-text-primary/60">Spin the wheel</div>
            <div className="rounded-xl border border-dashed border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 text-center">
              <div className="text-lg font-semibold">{cfg.headline}</div>
              <div className="mt-1 text-sm text-semantic-text-primary/75">{cfg.subhead}</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {cfg.slices.map((slice) => (
                  <div key={slice.label} className="rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2">
                    <div className="font-semibold">{slice.label}</div>
                    <div className="text-xs text-semantic-text-primary/70">{slice.prize}</div>
                    <div className="text-[11px] text-semantic-text-primary/60">{slice.probability}%</div>
                  </div>
                ))}
              </div>
              <button className="mt-3 rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white">
                {cfg.ctaLabel}
              </button>
            </div>
          </div>
        )
      }
      case 'announcement': {
        const cfg = defaults as AnnouncementConfig
        return (
          <AnnouncementBar
            message={cfg.message}
            severity={cfg.severity}
            ctaLabel={cfg.ctaLabel}
            ctaHref={cfg.ctaHref}
            dismissible={cfg.dismissible}
          />
        )
      }
      case 'cta-ribbon': {
        const cfg = defaults as CtaRibbonConfig
        return (
          <CtaRibbon headline={cfg.headline} subtext={cfg.subtext} ctaLabel={cfg.ctaLabel} ctaHref={cfg.ctaHref} />
        )
      }
      case 'trust-strip': {
        const cfg = defaults as TrustStripConfig
        return (
          <TrustStrip badges={cfg.badges} background={cfg.background} />
        )
      }
      case 'newsletter-modal': {
        const cfg = defaults as NewsletterModalConfig
        return (
          <NewsletterModal
            headline={cfg.headline}
            body={cfg.body}
            placeholder={cfg.placeholder}
            consent={cfg.consent}
            ctaLabel={cfg.ctaLabel}
            success={cfg.success}
            triggerText={`Trigger: ${cfg.trigger.afterSeconds}s or exit intent`}
          />
        )
      }
      default:
        return null
    }
  }

  if (!key || !meta || !defaults) {
    return (
      <AdminPageLayout title="Component not found" subtitle="Choose another component from the list.">
        <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 text-semantic-text-primary">
          <p className="text-sm">The component you requested doesn’t exist.</p>
          <Link to="/admin/components" className="mt-3 inline-flex items-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white">
            Back to Components
          </Link>
        </div>
      </AdminPageLayout>
    )
  }

  return (
    <AdminPageLayout
      title={meta.name}
      subtitle={`${meta.description} • Visual-only stub — save/publish coming soon.`}
      actions={
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full border border-semantic-legacy-brand-blush/70 px-4 py-2 text-sm font-semibold text-semantic-text-primary" onClick={() => navigate('/admin/components')}>
            Back
          </button>
          <button className="rounded-full border border-semantic-legacy-brand-blush/70 px-4 py-2 text-sm font-semibold text-semantic-text-primary" disabled>
            Save draft (soon)
          </button>
          <button className="rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white" disabled>
            Reset to default
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
            <div>Preview • {previewLabel}</div>
            <div className="flex gap-2">
              {(['desktop', 'tablet', 'mobile'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPreviewSize(option)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                    option === previewSize
                      ? 'bg-semantic-legacy-brand-cocoa text-white'
                      : 'bg-brand-porcelain text-semantic-text-primary/80'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div
            className="mx-auto overflow-hidden rounded-xl border border-dashed border-semantic-legacy-brand-blush/50 bg-brand-porcelain/50"
            style={{ maxWidth: previewWidths[previewSize] }}
          >
            <div className="p-4">{renderPreview()}</div>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-[#fff7f3] p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-semantic-text-primary/60">Main fields</div>
          <div className="grid gap-3 md:grid-cols-2">
            {meta.key === 'promo' && (
              <>
                <PlaceholderField label="Messages (label + href)" note="Repeatable list" />
                <PlaceholderField label="Active index" />
                <PlaceholderField label="Rotation interval (ms)" />
                <PlaceholderField label="Colors" note="Background / foreground selectors" />
              </>
            )}

            {meta.key === 'header' && (
              <>
                <PlaceholderField label="Subtitle" />
                <PlaceholderField label="Primary CTA label + href" />
                <PlaceholderField label="Secondary CTA label + href" />
                <PlaceholderField label="Logo text" />
                <PlaceholderField label="Account button toggle" />
              </>
            )}

            {meta.key === 'nav-public' && (
              <>
                <PlaceholderField label="Sections" note="Accordion of groups; each has items" />
                <PlaceholderField label="Items" note="Label, href, icon, badge, visibility" />
              </>
            )}

            {meta.key === 'nav-admin' && (
              <>
                <PlaceholderField label="Sections" note="Core / Content / Tools" />
                <PlaceholderField label="Items" note="Label, href, icon, badge, visibility" />
              </>
            )}

            {meta.key === 'footer' && (
              <>
                <PlaceholderField label="Headline & body" />
                <PlaceholderField label="Support email" />
                <PlaceholderField label="Pills / badges" />
                <PlaceholderField label="Explore links" />
                <PlaceholderField label="Social links" />
                <PlaceholderField label="Newsletter mailto" />
              </>
            )}

            {meta.key === 'spin-wheel' && (
              <>
                <PlaceholderField label="Headline & subhead" />
                <PlaceholderField label="CTA label + href" />
                <PlaceholderField label="Wheel slices" note="Label, probability %, prize" />
                <PlaceholderField label="Appearance" note="Background + accent" />
                <PlaceholderField label="Behavior" note="Cooldown, entry limit, success/failure messages" />
                <PlaceholderField label="Triggers" note="Auto-open, delay, exit-intent" />
              </>
            )}

            {meta.key === 'announcement' && (
              <>
                <PlaceholderField label="Message" />
                <PlaceholderField label="Severity" note="info / warn / error" />
                <PlaceholderField label="CTA label + href" />
                <PlaceholderField label="Dismissible toggle" />
              </>
            )}

            {meta.key === 'cta-ribbon' && (
              <>
                <PlaceholderField label="Headline" />
                <PlaceholderField label="Subtext" />
                <PlaceholderField label="CTA label + href" />
                <PlaceholderField label="Show on" note="all / pdp / cart / landing" />
              </>
            )}

            {meta.key === 'trust-strip' && (
              <>
                <PlaceholderField label="Badges" note="Label + optional icon/tooltip" />
                <PlaceholderField label="Background color" />
              </>
            )}

            {meta.key === 'newsletter-modal' && (
              <>
                <PlaceholderField label="Headline & body" />
                <PlaceholderField label="Placeholder text" />
                <PlaceholderField label="Consent text" />
                <PlaceholderField label="CTA label" />
                <PlaceholderField label="Success message" />
                <PlaceholderField label="Trigger rules" note="Seconds + exit intent" />
              </>
            )}
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}
