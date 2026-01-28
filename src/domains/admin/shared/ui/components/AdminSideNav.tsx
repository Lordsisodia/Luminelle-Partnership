import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { adminNavSections, getAdminNavSectionFromPath } from '@admin/shared/data/adminNav'
import { getAdminNavList, subscribeAdminNavList, type AdminNavListItem } from '@admin/shared/application/adminNavLists'
import { componentMetaList } from '@admin/shared/data/componentMeta'
import { PAGES } from '@admin/pages/data/pages'
import { Bell, Settings } from 'lucide-react'
import { navSizing } from './AdminSideNav.tokens'
import { NavRailItem } from './NavRailItem'
import { NavUtilityItem } from './NavUtilityItem'
import ProfilePersonIcon from '@admin/shared/ui/icons/ProfilePersonIcon'

// Mode configuration
type NavMode = 'desktop' | 'drawer'

interface NavModeConfig {
  orientation: 'flex-row' | 'flex-col'
  railOrientation: 'flex-row' | 'flex-col'
  railWidth: string
  railPadding: string
  railBorder: 'border-b' | 'border-r'
  railOverflow: 'overflow-x-auto' | 'overflow-y-auto'
  railAlignment: 'items-center' | ''
  usesInlineLabels: boolean
}

const MODE_CONFIG: Record<NavMode, NavModeConfig> = {
  desktop: {
    orientation: 'flex-row',
    railOrientation: 'flex-col',
    railWidth: navSizing.railWidth,
    railPadding: navSizing.railPadding,
    railBorder: 'border-r',
    railOverflow: 'overflow-y-auto',
    railAlignment: 'items-center',
    usesInlineLabels: false,
  },
  drawer: {
    orientation: 'flex-col',
    railOrientation: 'flex-row',
    railWidth: '',
    railPadding: navSizing.drawerPadding,
    railBorder: 'border-b',
    railOverflow: 'overflow-x-auto',
    railAlignment: '',
    usesInlineLabels: true,
  },
}

function getModeConfig(mode: NavMode): NavModeConfig {
  return MODE_CONFIG[mode]
}

/**
 * Helper to check if we're in drawer mode
 */
function isDrawerMode(mode: NavMode): boolean {
  return mode === 'drawer'
}

/**
 * Helper to check if we should show expanded panel
 */
function shouldShowExpandedPanel(collapsed: boolean, mode: NavMode): boolean {
  return !collapsed || isDrawerMode(mode)
}

/**
 * Determines if labels should be shown based on mode and section
 * - Drawer mode: always use inline labels
 * - Desktop dashboard: show popout labels when not collapsed
 * - Other sections: no labels in desktop mode
 */
function shouldShowLabels(mode: NavMode, collapsed: boolean, sectionId: string): boolean {
  if (mode === 'drawer') return true
  if (sectionId === 'dashboard') return !collapsed
  return false
}

/**
 * Determines if inline labels should be used (vs popout)
 */
function useInlineLabels(mode: NavMode): boolean {
  return mode === 'drawer'
}

// Panel section configuration
type PanelLinkType = 'primary' | 'small' | 'cta' | 'disabled'

interface PanelLink {
  type: PanelLinkType
  to: string
  label: string
  description?: string
}

interface PanelSectionConfig {
  sectionId: string
  primaryLink?: PanelLink
  quickLinks?: PanelLink[]
  ctaLink?: PanelLink
  disabledItem?: string
}

function getPanelSectionConfig(
  sectionId: string,
  productItems: AdminNavListItem[],
  pageItems: Array<{ label: string; to: string }>,
  componentItems: Array<{ label: string; to: string }>
): PanelSectionConfig {
  const configs: Record<string, PanelSectionConfig> = {
    catalog: {
      sectionId: 'catalog',
      primaryLink: {
        type: 'primary',
        to: '/admin/products',
        label: 'All Products',
        description: 'Manage product pages and media.',
      },
      quickLinks: productItems.map((p) => ({
        type: 'small' as const,
        to: p.to,
        label: p.label,
      })),
      ctaLink: {
        type: 'cta',
        to: '/admin/products?new=1',
        label: 'Add New Product',
      },
    },
    pages: {
      sectionId: 'pages',
      primaryLink: {
        type: 'primary',
        to: '/admin/pages',
        label: 'All Pages',
        description: 'Manage site pages',
      },
      quickLinks: pageItems.slice(0, 10).map((p) => ({
        type: 'small' as const,
        to: p.to,
        label: p.label,
      })),
      ctaLink: {
        type: 'cta',
        to: '/admin/pages?request=1',
        label: 'Request New Page',
      },
    },
    blogs: {
      sectionId: 'blogs',
      primaryLink: {
        type: 'primary',
        to: '/admin/blogs',
        label: 'All Blog Posts',
        description: 'Write and edit posts',
      },
      quickLinks: [
        { type: 'small' as const, to: '/admin/blogs?view=archived', label: 'Archived' },
        { type: 'small' as const, to: '/admin/blogs?view=published', label: 'Published' },
        { type: 'small' as const, to: '/admin/blogs?view=draft', label: 'Draft' },
        { type: 'small' as const, to: '/admin/blogs?view=ideas', label: 'Ideas' },
        { type: 'small' as const, to: '/admin/blogs?view=seo-bank', label: 'SEO bank' },
      ],
    },
    media: {
      sectionId: 'media',
      primaryLink: {
        type: 'primary',
        to: '/admin/media',
        label: 'All Media',
        description: 'Browse and upload assets',
      },
      quickLinks: [
        { type: 'small' as const, to: '/admin/media?bucket=blog-media', label: 'Blog media' },
        { type: 'small' as const, to: '/admin/media?bucket=product-shower-cap', label: 'Shower cap media' },
        { type: 'small' as const, to: '/admin/media?bucket=product-heatless-curler', label: 'Heatless curler media' },
        { type: 'small' as const, to: '/admin/media?bucket=landing-media', label: 'Landing media' },
        { type: 'small' as const, to: '/admin/media?bucket=draft-media', label: 'Draft media' },
      ],
    },
    components: {
      sectionId: 'components',
      primaryLink: {
        type: 'primary',
        to: '/admin/components',
        label: 'All Components',
        description: 'Design and manage components',
      },
      quickLinks: componentItems.slice(0, 12).map((c) => ({
        type: 'small' as const,
        to: c.to,
        label: c.label,
      })),
    },
    analytics: {
      sectionId: 'analytics',
      primaryLink: {
        type: 'primary',
        to: '/admin/analytics',
        label: 'Analytics Dashboard',
        description: 'Track key store metrics',
      },
      quickLinks: [
        { type: 'small' as const, to: '/admin/orders', label: 'Orders' },
        { type: 'small' as const, to: '/admin/activity', label: 'Activity' },
      ],
      disabledItem: 'Page Analytics (coming soon)',
    },
    settings: {
      sectionId: 'settings',
      primaryLink: {
        type: 'primary',
        to: '/admin/settings',
        label: 'Settings',
        description: 'Review and adjust settings',
      },
      quickLinks: [
        { type: 'small' as const, to: '/admin/settings', label: 'General' },
        { type: 'small' as const, to: '/admin/settings#users', label: 'Users' },
        { type: 'small' as const, to: '/admin/settings#integrations', label: 'Integrations' },
      ],
    },
  }

  return configs[sectionId] || {
    sectionId,
    primaryLink: {
      type: 'primary',
      to: `/admin/${sectionId}`,
      label: sectionId.charAt(0).toUpperCase() + sectionId.slice(1),
    },
  }
}

// rail item components now imported from NavRailItem/NavUtilityItem

function SmallPillLink({ to, label, onNavigate }: { to: string; label: string; onNavigate?: () => void }) {
  const pillVariants = {
    base: `inline-flex w-full items-center justify-start whitespace-normal rounded-full border px-3 py-1 text-[12px] font-semibold text-left ${navSizing.transition}`,
    active: 'border-semantic-legacy-brand-blush/70 bg-white text-semantic-text-primary shadow-sm',
    inactive: 'border-semantic-legacy-brand-blush/60 bg-white text-semantic-text-primary/80 hover:bg-brand-porcelain/40',
  }

  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          pillVariants.base,
          isActive ? pillVariants.active : pillVariants.inactive,
        ].join(' ')
      }
    >
      <span>{label}</span>
    </NavLink>
  )
}

function PrimaryPanelLink({
  to,
  label,
  description,
  onNavigate,
}: {
  to: string
  label: string
  description?: string
  onNavigate?: () => void
}) {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          `flex w-full items-center justify-between gap-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm ${navSizing.transition}`,
          isActive ? 'ring-1 ring-semantic-legacy-brand-blush/60' : 'hover:bg-brand-porcelain/60',
        ].join(' ')
      }
    >
      <div className="min-w-0 flex-1">
        <span className="block truncate">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-[12px] font-medium leading-snug text-semantic-text-primary/70">{description}</span>
        ) : null}
      </div>
      <span className="text-xs text-semantic-text-primary/60 shrink-0" aria-hidden>
        →
      </span>
    </NavLink>
  )
}

function CtaPanelButton({ to, label, onNavigate }: { to: string; label: string; onNavigate?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={`inline-flex w-full items-center justify-center rounded-2xl bg-semantic-legacy-brand-cocoa px-4 py-3 text-sm font-semibold text-white shadow-sm ${navSizing.transition} hover:brightness-95`}
    >
      {label}
    </NavLink>
  )
}

function DisabledRow({ label }: { label: string }) {
  return (
    <div
      className={[
        'flex w-full items-center rounded-xl px-3 py-2 text-sm font-semibold',
        // Visual hierarchy for disabled state
        'border border-dashed border-semantic-text-primary/20',
        'bg-semantic-text-primary/5 text-semantic-text-primary/50',
        // Subtle cursor indication
        'cursor-not-allowed',
      ].join(' ')}
      title="This feature is coming soon"
    >
      {label}
    </div>
  )
}

// Panel section renderer
function PanelSection({ config, onNavigate }: { config: PanelSectionConfig; onNavigate?: () => void }) {
  return (
    <div className={navSizing.sectionSpacing}>
      {/* Primary link */}
      {config.primaryLink && config.primaryLink.type === 'primary' && (
        <PrimaryPanelLink
          to={config.primaryLink.to}
          label={config.primaryLink.label}
          description={config.primaryLink.description}
          onNavigate={onNavigate}
        />
      )}

      {/* Catalog special case: enhanced primary link */}
      {config.primaryLink && config.primaryLink.type === 'primary' && config.sectionId === 'catalog' && (
        <NavLink
          to={config.primaryLink.to}
          onClick={onNavigate}
          className={`group relative flex w-full items-start gap-3 rounded-2xl border border-semantic-legacy-brand-blush/70 bg-white px-4 py-4 text-left shadow-sm ${navSizing.transition} hover:-translate-y-0.5 hover:shadow-md`}
        >
          <div className="min-w-0 flex-1 space-y-1">
            <div className="text-[13px] font-semibold leading-tight text-semantic-text-primary">{config.primaryLink.label}</div>
            {config.primaryLink.description && (
              <div className="text-[12px] leading-snug text-semantic-text-primary/70">
                {config.primaryLink.description}
              </div>
            )}
          </div>
          <span
            aria-hidden
            className={`ml-auto inline-flex h-5 w-5 items-center justify-center text-semantic-text-primary/70 ${navSizing.transition} group-hover:translate-x-0.5 group-hover:text-semantic-text-primary`}
          >
            →
          </span>
        </NavLink>
      )}

      {/* Quick links */}
      {config.quickLinks && config.quickLinks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {config.quickLinks.map((link, index) => (
            <SmallPillLink key={`${link.to}-${index}`} to={link.to} label={link.label} onNavigate={onNavigate} />
          ))}
        </div>
      )}

      {/* CTA link */}
      {config.ctaLink && (
        <div className="pt-1">
          <CtaPanelButton to={config.ctaLink.to} label={config.ctaLink.label} onNavigate={onNavigate} />
        </div>
      )}

      {/* Disabled item */}
      {config.disabledItem && <DisabledRow label={config.disabledItem} />}
    </div>
  )
}

function useAdminNavList(key: 'products' | 'pages' | 'blogPosts' | 'components') {
  const [items, setItems] = useState<AdminNavListItem[]>(() => getAdminNavList(key))
  useEffect(() => {
    return subscribeAdminNavList(key, () => setItems(getAdminNavList(key)))
  }, [key])
  return items
}

export function AdminSideNav({
  collapsed,
  productCount,
  onNavigate,
  mode = 'desktop',
}: {
  collapsed: boolean
  productCount?: string | null
  onNavigate?: () => void
  mode?: NavMode
}) {
  const location = useLocation()
  const activeId = useMemo(() => getAdminNavSectionFromPath(location.pathname), [location.pathname])
  const activeSection = adminNavSections.find((section) => section.id === activeId) ?? adminNavSections[0]
  const modeConfig = getModeConfig(mode)

  // Label visibility: use centralized helper
  const showLabels = shouldShowLabels(mode, collapsed, activeSection.id)
  const inlineLabels = useInlineLabels(mode)

  const productItems = useAdminNavList('products')
  const pageItems = useMemo(() => PAGES.map((p) => ({ label: p.title, to: `/admin/pages/${p.slug}` })), [])
  const componentItems = useMemo(() => componentMetaList.map((m) => ({ label: m.name, to: `/admin/components/${m.key}` })), [])


  const profileRailItem = (
    <NavUtilityItem
      to="/admin/profile"
      label="Profile"
      icon={ProfilePersonIcon}
      onNavigate={onNavigate}
      showLabel={showLabels}
      inlineLabel={inlineLabels}
    />
  )
  const settingsRailItem = (
    <NavUtilityItem
      to="/admin/settings"
      label="Settings"
      icon={Settings}
      onNavigate={onNavigate}
      showLabel={showLabels}
      inlineLabel={inlineLabels}
    />
  )
  const notificationsRailItem = (
    <NavUtilityItem
      to="/admin/activity"
      label="Notifications"
      icon={Bell}
      onNavigate={onNavigate}
      showLabel={showLabels}
      inlineLabel={inlineLabels}
    />
  )
  const railSeparator = (
    <div
      className={`my-1 h-px ${navSizing.dividerWidth} rounded-full ${navSizing.dividerColor}`}
      aria-hidden
    />
  )

  const sectionRailItems = adminNavSections
    .filter((section) => section.id !== 'settings')
    .map((section) => {
      const Icon = section.icon
      const badge = section.id === 'catalog' ? productCount : null
      return (
        <NavRailItem
          key={section.id}
          to={section.primaryTo}
          label={section.label}
          icon={Icon as any}
          onNavigate={onNavigate}
          badge={badge}
          showLabel={showLabels}
          inlineLabel={inlineLabels}
        />
      )
    })

  // Rail content based on mode
  const railContent = isDrawerMode(mode) ? (
    <>
      {sectionRailItems}
      <div
        className="mx-2 my-1 h-px flex-1 self-center rounded-full bg-semantic-text-primary/40"
        aria-hidden
      />
      {notificationsRailItem}
      {settingsRailItem}
      {profileRailItem}
    </>
  ) : (
    <>
      <div className="flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto">{sectionRailItems}</div>
      <div className={`mt-auto flex flex-col items-center ${navSizing.utilityClusterGap} ${navSizing.utilityClusterPadTop}`}>
        {railSeparator}
        {notificationsRailItem}
        {settingsRailItem}
        {profileRailItem}
      </div>
    </>
  )

  // Desktop collapsed: only show the icon rail (no inner divider / "empty" right panel).
  if (!isDrawerMode(mode) && collapsed) {
    return (
      <div className="flex min-h-0 flex-1 overflow-visible rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain">
        <nav
          aria-label="Admin navigation"
          className={`flex w-full flex-col bg-brand-porcelain ${navSizing.railPadding} overflow-visible`}
        >
          <div className="flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto">{sectionRailItems}</div>

          <div className={`mt-auto flex flex-col items-center ${navSizing.utilityClusterGap} ${navSizing.utilityClusterPadTop}`}>
            {railSeparator}
            {notificationsRailItem}
            {settingsRailItem}
            {profileRailItem}
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div
      className={[
        'flex min-h-0 flex-1 overflow-visible rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain',
        modeConfig.orientation,
      ].join(' ')}
    >
      {/* Icon rail */}
      <nav
        aria-label="Admin navigation"
        className={[
          'shrink-0 border-semantic-legacy-brand-blush/60 bg-brand-porcelain',
          `flex ${modeConfig.railWidth} ${modeConfig.railOrientation} ${modeConfig.railBorder} ${modeConfig.railPadding} ${modeConfig.railOverflow}`,
          modeConfig.railAlignment,
        ].join(' ')}
      >
        {railContent}
      </nav>

      {/* Expanded panel */}
      {shouldShowExpandedPanel(collapsed, mode) ? (
        <div className="flex min-w-0 flex-1 flex-col gap-3 overflow-visible p-2 w-[clamp(19.5rem,30vw,26rem)] max-w-full">
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <PanelSection
              config={getPanelSectionConfig(activeSection.id, productItems, pageItems, componentItems)}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AdminSideNav
