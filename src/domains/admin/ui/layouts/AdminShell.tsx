import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { setNoIndexNoFollow } from '@/lib/seo'
import { useAuth } from '@auth/ui/providers/AuthContext'
import { Avatar } from '@ui/components/Avatar'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  FileText,
  Boxes,
  PenLine,
  Image as ImageIcon,
  PanelsTopLeft,
  BarChart3,
  History,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

type NavItem = {
  label: string
  to: string
  group: 'Core' | 'Content' | 'Tools'
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { group: 'Core', label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { group: 'Content', label: 'Products', to: '/admin/products', icon: Boxes },
  { group: 'Content', label: 'Pages', to: '/admin/pages', icon: FileText },
  { group: 'Content', label: 'Components', to: '/admin/components', icon: PanelsTopLeft },
  { group: 'Content', label: 'Media', to: '/admin/media', icon: ImageIcon },
  { group: 'Content', label: 'Blogs', to: '/admin/blogs', icon: PenLine },
  { group: 'Tools', label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
  { group: 'Tools', label: 'Activity', to: '/admin/activity', icon: History },
]

function NavItemLink({
  to,
  label,
  icon: Icon,
  onNavigate,
  collapsed,
  trailing,
}: {
  to: string
  label: string
  icon: LucideIcon
  onNavigate?: () => void
  collapsed?: boolean
  trailing?: React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'group flex w-full items-center rounded-xl px-3 py-2 text-sm font-semibold transition overflow-hidden',
          isActive
            ? 'bg-white text-semantic-text-primary shadow-sm ring-1 ring-semantic-legacy-brand-blush/60 shadow-[inset_3px_0_0_0_rgba(187,125,109,0.7)]'
            : 'text-semantic-text-primary/80 hover:bg-white/70 hover:text-semantic-text-primary',
          collapsed ? 'justify-center' : 'justify-start gap-2 pr-2',
        ].join(' ')
      }
    >
      <Icon className="h-4 w-4 shrink-0 text-semantic-text-primary/70 group-[.active]:text-semantic-text-primary" aria-hidden="true" />
      {collapsed ? null : (
        <>
          <span className="ml-2 truncate text-semantic-text-primary/90 group-[.active]:text-semantic-text-primary">{label}</span>
          {trailing}
        </>
      )}
    </NavLink>
  )
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 block h-[2px] w-full rounded bg-semantic-text-primary transition-transform duration-200 ${open ? 'translate-y-[7px] rotate-45' : 'translate-y-0 rotate-0'}`}
      />
      <span
        className={`absolute left-0 block h-[2px] w-full rounded bg-semantic-text-primary transition-opacity duration-150 ${open ? 'opacity-0' : 'opacity-100'} translate-y-[7px]`}
      />
      <span
        className={`absolute left-0 block h-[2px] w-full rounded bg-semantic-text-primary transition-transform duration-200 ${open ? '-translate-y-[7px] -rotate-45' : 'translate-y-[14px] rotate-0'}`}
      />
    </span>
  )
}

export default function AdminShell() {
  const { user, signedIn, signOut } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const [productCount, setProductCount] = useState<string | null>(null)

  const toTitleCase = (value: string) =>
    value
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

  const breadcrumb = useMemo(() => {
    const path = location.pathname.replace(/\/+$/, '')
    if (path === '/admin') return [{ label: 'Dashboard', to: '/admin' }]
    const parts = path.split('/').filter(Boolean) // e.g. ['admin','products','lumelle-shower-cap']
    const items: { label: string; to?: string }[] = []
    const sectionMap: Record<string, { label: string; to: string }> = {
      products: { label: 'Products', to: '/admin/products' },
      pages: { label: 'Pages', to: '/admin/pages' },
      blogs: { label: 'Blogs', to: '/admin/blogs' },
      media: { label: 'Media', to: '/admin/media' },
      analytics: { label: 'Analytics', to: '/admin/analytics' },
      activity: { label: 'Activity', to: '/admin/activity' },
      content: { label: 'Product content', to: '/admin/content' },
      components: { label: 'Components', to: '/admin/components' },
      globals: { label: 'Components', to: '/admin/components' },
    }
    if (parts[0] === 'admin') {
      items.push({ label: 'Dashboard', to: '/admin' })
      const section = parts[1]
      if (section) {
        const mapped = sectionMap[section] ?? { label: toTitleCase(section), to: `/admin/${section}` }
        items.push(mapped)
      }
      if (parts[2]) {
        const pretty = toTitleCase(decodeURIComponent(parts.slice(2).join('-')))
        items.push({ label: pretty })
      } else if (section === 'products') {
        // Fallback to last-viewed product label if stored
        const cachedHandle = sessionStorage.getItem('admin:lastProductHandle')
        const cachedTitle = sessionStorage.getItem('admin:lastProductTitle')
        if (cachedHandle || cachedTitle) {
          items.push({ label: toTitleCase(decodeURIComponent(cachedTitle || cachedHandle || '')) })
        }
      }
    }
    return items
  }, [location.pathname])

  useEffect(() => {
    setNoIndexNoFollow()
  }, [])

  useEffect(() => {
    const readCount = () => setProductCount(sessionStorage.getItem('admin:productCount'))
    readCount()
    const handler = (e: StorageEvent) => {
      if (e.key === 'admin:productCount') readCount()
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const grouped = useMemo(() => {
    const groups: Record<string, NavItem[]> = { Core: [], Content: [], Tools: [] }
    for (const item of navItems) groups[item.group].push(item)
    return groups as Record<NavItem['group'], NavItem[]>
  }, [])

  return (
    <div className="min-h-screen bg-brand-porcelain text-semantic-text-primary">
      <div className="flex min-h-screen w-full">
        {/* Desktop sidebar */}
        <aside
          className={`sticky top-0 hidden h-screen shrink-0 border-r border-semantic-legacy-brand-blush/60 bg-brand-porcelain p-2 md:block transition-[width] duration-200 ${
            collapsed ? 'w-16' : 'w-80'
          }`}
        >
          <div className="flex h-full flex-col gap-3">
            <div
              className={`rounded-2xl ${
                collapsed
                  ? 'flex h-10 items-center justify-center px-1'
                : 'relative flex items-center justify-between border border-semantic-legacy-brand-blush/60 bg-white px-4 py-3'
              }`}
            >
              {!collapsed && (
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#f3cfc5] text-[13px] font-semibold leading-none text-semantic-legacy-brand-cocoa font-serif">
                    L
                  </span>
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold uppercase tracking-[0.01em] text-semantic-text-primary font-serif">
                      LUMELLE™
                    </div>
                    <div className="text-xs text-semantic-text-primary/70">Admin console</div>
                  </div>
                </div>
              )}
              <button
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onClick={() => setCollapsed((v) => !v)}
                className={`${
                  collapsed
                    ? 'h-7 w-7 rounded-full border border-semantic-legacy-brand-blush/60 bg-white shadow-sm hover:bg-brand-porcelain'
                    : 'absolute -right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border border-semantic-legacy-brand-blush/60 bg-white shadow-sm hover:bg-brand-porcelain'
                }`}
              >
                {collapsed ? <ChevronRight className="mx-auto h-4 w-4 text-semantic-text-primary" /> : <ChevronLeft className="mx-auto h-4 w-4 text-semantic-text-primary" />}
              </button>
            </div>

            <nav className="flex-1 space-y-4 overflow-y-auto pr-1 min-h-0">
              {(['Core', 'Content', 'Tools'] as const).map((group) => (
                <div key={group}>
                  {!collapsed && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/50 bg-brand-porcelain px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/70 shadow-sm">
                      {group}
                    </div>
                  )}
                  <div className={`mt-2 space-y-1 ${collapsed ? 'px-0' : ''}`}>
                    {grouped[group].map((item) => (
                      <NavItemLink
                        key={item.to}
                        to={item.to}
                        label={item.label}
                        icon={item.icon}
                        collapsed={collapsed}
                        trailing={
                          !collapsed && item.to === '/admin/products' && productCount ? (
                            <span className="ml-auto inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-[#f9e9e4] px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary/90 whitespace-nowrap">
                              {productCount}
                            </span>
                          ) : null
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div
              className={`mt-auto ${
                collapsed ? 'flex items-center justify-center rounded-full p-2' : 'rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 shadow-sm'
              }`}
            >
              <div className={`flex items-center ${collapsed ? '' : 'gap-3'}`}>
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName || user.email || 'Avatar'}
                    className={`h-10 w-10 rounded-full object-cover shadow-sm ${collapsed ? '' : 'border border-semantic-legacy-brand-blush/80'}`}
                  />
                ) : (
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${collapsed ? '' : 'border border-semantic-legacy-brand-blush/80'} bg-white shadow-sm`}>
                    <Avatar name={user?.fullName || user?.email || 'Admin'} size={36} />
                  </span>
                )}
                {!collapsed && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
                      Signed in
                    </div>
                    <div className="text-sm font-semibold">{user?.fullName || user?.email || 'Admin'}</div>
                    {user?.email ? <div className="text-xs text-semantic-text-primary/70">{user.email}</div> : null}
                  </div>
                )}
              </div>
              {!collapsed && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 px-3 py-1.5 text-xs font-semibold text-semantic-text-primary"
                  >
                    View storefront
                  </a>
                  {signedIn ? (
                    <button
                      onClick={signOut}
                      className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Sign out
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Top bar with burger */}
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-semantic-legacy-brand-blush/60 bg-brand-porcelain/95 px-4 py-3 backdrop-blur">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-semantic-text-primary/80">
              {breadcrumb.map((item, idx) => {
                const isLast = idx === breadcrumb.length - 1
                return (
                  <span key={item.label} className="flex items-center gap-2">
                    {idx > 0 && <span className="text-semantic-text-primary/50">/</span>}
                    {isLast || !item.to ? (
                      <span className="text-semantic-text-primary">{item.label}</span>
                    ) : (
                      <NavLink to={item.to} className="hover:text-semantic-text-primary text-semantic-text-primary/80">
                        {item.label}
                      </NavLink>
                    )}
                  </span>
                )
              })}
            </nav>
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold">Admin</div>
              <span className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-1 text-[11px] text-semantic-text-primary/70">
                {import.meta.env.MODE}
              </span>
            </div>
          </header>

          {/* Mobile/overlay drawer */}
          <div
            id="admin-drawer"
            className={`fixed inset-y-0 left-0 z-40 w-72 max-w-[80vw] transform bg-white shadow-xl transition-transform duration-200 md:hidden ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <div className="flex items-center justify-between border-b border-semantic-legacy-brand-blush/60 px-4 py-3">
              <div>
                <div className="text-sm font-semibold">Lumelle admin</div>
                <div className="text-xs text-semantic-text-primary/70">{user?.email || 'Signed in'}</div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 bg-brand-porcelain px-2 py-1 text-[11px] font-semibold text-semantic-text-primary"
              >
                Close
              </button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-60px)]">
              {(['Core', 'Content', 'Tools'] as const).map((group) => (
                <div key={group}>
                  <div className="px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
                    {group}
                  </div>
                  <div className="mt-2 space-y-1">
                    {grouped[group].map((item) => (
                      <NavItemLink
                        key={item.to}
                        to={item.to}
                        label={item.label}
                        icon={item.icon}
                        onNavigate={() => setDrawerOpen(false)}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
                  Signed in
                </div>
                <div className="mt-2 text-sm font-semibold">{user?.fullName || user?.email || 'Admin'}</div>
                {user?.email ? (
                  <div className="mt-1 text-xs text-semantic-text-primary/70">{user.email}</div>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href="/"
                    className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 px-3 py-1.5 text-xs font-semibold text-semantic-text-primary"
                    onClick={() => setDrawerOpen(false)}
                  >
                    View storefront
                  </a>
                  {signedIn ? (
                    <button
                      onClick={() => {
                        setDrawerOpen(false)
                        signOut()
                      }}
                      className="inline-flex items-center rounded-full bg-semantic-legacy-brand-cocoa px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Sign out
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Overlay when drawer is open */}
          {drawerOpen ? (
            <button
              aria-label="Close navigation"
              className="fixed inset-0 z-30 bg-black/25 md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
          ) : null}

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
