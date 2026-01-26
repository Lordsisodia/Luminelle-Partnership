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

// rail item components now imported from NavRailItem/NavUtilityItem

function SmallPillLink({ to, label, onNavigate }: { to: string; label: string; onNavigate?: () => void }) {
  const pillVariants = {
    base: 'inline-flex w-full items-center justify-start whitespace-normal rounded-full border px-3 py-1 text-[12px] font-semibold text-left transition',
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
          'flex w-full items-center justify-between gap-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3 text-sm font-semibold text-semantic-text-primary shadow-sm transition',
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
      className="inline-flex w-full items-center justify-center rounded-2xl bg-semantic-legacy-brand-cocoa px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
    >
      {label}
    </NavLink>
  )
}

function DisabledRow({ label }: { label: string }) {
  return (
    <div className="flex w-full items-center rounded-xl px-3 py-2 text-sm font-semibold text-semantic-text-primary/50">
      {label}
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
  mode?: 'desktop' | 'drawer'
}) {
  const location = useLocation()
  const activeId = useMemo(() => getAdminNavSectionFromPath(location.pathname), [location.pathname])
  const activeSection = adminNavSections.find((section) => section.id === activeId) ?? adminNavSections[0]
  const showUtilityLabels = activeSection.id === 'dashboard' && !(mode === 'desktop' && collapsed)
  const showSectionLabels = activeSection.id === 'dashboard' && !(mode === 'desktop' && collapsed)

  const productItems = useAdminNavList('products')
  const pageItems = useMemo(() => PAGES.map((p) => ({ label: p.title, to: `/admin/pages/${p.slug}` })), [])
  const componentItems = useMemo(() => componentMetaList.map((m) => ({ label: m.name, to: `/admin/components/${m.key}` })), [])


  const profileRailItem = (
    <NavUtilityItem
      to="/admin/profile"
      label="Profile"
      icon={ProfilePersonIcon}
      onNavigate={onNavigate}
      showLabel={showUtilityLabels}
      inlineLabel={mode === 'drawer'}
    />
  )
  const settingsRailItem = (
    <NavUtilityItem
      to="/admin/settings"
      label="Settings"
      icon={Settings}
      onNavigate={onNavigate}
      showLabel={showUtilityLabels}
      inlineLabel={mode === 'drawer'}
    />
  )
  const notificationsRailItem = (
    <NavUtilityItem
      to="/admin/activity"
      label="Notifications"
      icon={Bell}
      onNavigate={onNavigate}
      showLabel={showUtilityLabels}
      inlineLabel={mode === 'drawer'}
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
          showLabel={showSectionLabels}
          inlineLabel={mode === 'drawer'}
        />
      )
    })

  // Desktop collapsed: only show the icon rail (no inner divider / “empty” right panel).
  if (mode === 'desktop' && collapsed) {
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
        mode === 'drawer' ? 'flex-col' : 'flex-row',
      ].join(' ')}
    >
      {/* Icon rail */}
      <nav
        aria-label="Admin navigation"
        className={[
          'shrink-0 border-semantic-legacy-brand-blush/60 bg-brand-porcelain',
          mode === 'drawer'
            ? `flex flex-row ${navSizing.railGap} overflow-x-auto border-b ${navSizing.drawerPadding}`
            : `flex ${navSizing.railWidth} flex-col border-r ${navSizing.railPadding}`,
        ].join(' ')}
      >
        {mode === 'drawer' ? (
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
        )}
      </nav>

      {/* Expanded panel */}
      {collapsed && mode !== 'drawer' ? null : (
        <div className="flex min-w-0 flex-1 flex-col gap-3 overflow-visible p-2 w-[clamp(19.5rem,30vw,26rem)] max-w-full">
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            {activeSection.id === 'catalog' ? (
              <div className="space-y-3">
                <NavLink
                  to="/admin/products"
                  onClick={onNavigate}
                  className="group relative flex w-full items-start gap-3 rounded-2xl border border-semantic-legacy-brand-blush/70 bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="text-[13px] font-semibold leading-tight text-semantic-text-primary">All Products</div>
                    <div className="text-[12px] leading-snug text-semantic-text-primary/70">
                      Manage product pages and media.
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="ml-auto inline-flex h-5 w-5 items-center justify-center text-semantic-text-primary/70 transition group-hover:translate-x-0.5 group-hover:text-semantic-text-primary"
                  >
                    →
                  </span>
                </NavLink>

                <div className="flex flex-wrap gap-2 max-w-full">
                  {productItems.map((p) => (
                    <SmallPillLink key={p.to} to={p.to} label={p.label} onNavigate={onNavigate} />
                  ))}
                </div>
                <div className="pt-1">
                  <CtaPanelButton to="/admin/products?new=1" label="Add New Product" onNavigate={onNavigate} />
                </div>
              </div>
            ) : activeSection.id === 'pages' ? (
              <div className="space-y-3">
                <PrimaryPanelLink
                  to="/admin/pages"
                  label="All Pages"
                  description="Manage site pages"
                  onNavigate={onNavigate}
                />
                <div className="flex flex-wrap gap-2">
                  {pageItems.slice(0, 10).map((p) => (
                    <SmallPillLink key={p.to} to={p.to} label={p.label} onNavigate={onNavigate} />
                  ))}
                </div>
                <div className="pt-1">
                  <CtaPanelButton to="/admin/pages?request=1" label="Request New Page" onNavigate={onNavigate} />
                </div>
              </div>
            ) : activeSection.id === 'blogs' ? (
              <div className="space-y-3">
                <PrimaryPanelLink
                  to="/admin/blogs"
                  label="All Blog Posts"
                  description="Write and edit posts"
                  onNavigate={onNavigate}
                />
                <div className="flex flex-wrap gap-2">
                  <SmallPillLink to="/admin/blogs?view=archived" label="Archived" onNavigate={onNavigate} />
                  <SmallPillLink to="/admin/blogs?view=published" label="Published" onNavigate={onNavigate} />
                  <SmallPillLink to="/admin/blogs?view=draft" label="Draft" onNavigate={onNavigate} />
                  <SmallPillLink to="/admin/blogs?view=ideas" label="Ideas" onNavigate={onNavigate} />
                  <SmallPillLink to="/admin/blogs?view=seo-bank" label="SEO bank" onNavigate={onNavigate} />
                </div>
              </div>
            ) : activeSection.id === 'media' ? (
              <div className="space-y-3">
                <PrimaryPanelLink
                  to="/admin/media"
                  label="All Media"
                  description="Browse and upload assets"
                  onNavigate={onNavigate}
                />
                <div className="flex flex-wrap gap-2">
                  <SmallPillLink to="/admin/media?bucket=blog-media" label="Blog media" onNavigate={onNavigate} />
                  <SmallPillLink to="/admin/media?bucket=product-shower-cap" label="Shower cap media" onNavigate={onNavigate} />
                  <SmallPillLink to="/admin/media?bucket=product-heatless-curler" label="Heatless curler media" onNavigate={onNavigate} />
                  <SmallPillLink to="/admin/media?bucket=landing-media" label="Landing media" onNavigate={onNavigate} />
                  <SmallPillLink to="/admin/media?bucket=draft-media" label="Draft media" onNavigate={onNavigate} />
                </div>
              </div>
            ) : activeSection.id === 'components' ? (
              <div className="space-y-3">
                <PrimaryPanelLink
                  to="/admin/components"
                  label="All Components"
                  description="Design and manage components"
                  onNavigate={onNavigate}
                />
                <div className="flex flex-wrap gap-2">
                  {componentItems.slice(0, 12).map((c) => (
                    <SmallPillLink key={c.to} to={c.to} label={c.label} onNavigate={onNavigate} />
                  ))}
                </div>
              </div>
            ) : activeSection.id === 'analytics' ? (
              <div className="space-y-3">
                <PrimaryPanelLink
                  to="/admin/analytics"
                  label="Analytics Dashboard"
                  description="Track key store metrics"
                  onNavigate={onNavigate}
                />
                <div className="flex flex-wrap gap-2">
                  <SmallPillLink to="/admin/orders" label="Orders" onNavigate={onNavigate} />
                  <SmallPillLink to="/admin/activity" label="Activity" onNavigate={onNavigate} />
                </div>
                <DisabledRow label="Page Analytics (coming soon)" />
              </div>
            ) : activeSection.id === 'settings' ? (
              <div className="space-y-3">
                <PrimaryPanelLink
                  to="/admin/settings"
                  label="Settings"
                  description="Review and adjust settings"
                  onNavigate={onNavigate}
                />
                <div className="flex flex-wrap gap-2">
                  <SmallPillLink to="/admin/settings" label="General" onNavigate={onNavigate} />
                  <SmallPillLink to="/admin/settings#users" label="Users" onNavigate={onNavigate} />
                  <SmallPillLink to="/admin/settings#integrations" label="Integrations" onNavigate={onNavigate} />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <PrimaryPanelLink to={activeSection.primaryTo} label={activeSection.label} onNavigate={onNavigate} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSideNav
