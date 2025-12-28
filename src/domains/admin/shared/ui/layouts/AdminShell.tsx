import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuthContext as useAuth } from '@platform/auth/providers/AuthContext'
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
  ShoppingBag,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
} from 'lucide-react'

type NavItem = {
  label: string
  to: string
  group: 'Core' | 'Content' | 'Tools'
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { group: 'Core', label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { group: 'Core', label: 'Orders', to: '/admin/orders', icon: ShoppingBag },
  { group: 'Content', label: 'Products', to: '/admin/products', icon: Boxes },
  { group: 'Content', label: 'Product content', to: '/admin/content', icon: FileText },
  { group: 'Content', label: 'Pages', to: '/admin/pages', icon: FileText },
  { group: 'Content', label: 'Components', to: '/admin/components', icon: PanelsTopLeft },
  { group: 'Content', label: 'Media', to: '/admin/media', icon: ImageIcon },
  { group: 'Content', label: 'Blogs', to: '/admin/blogs', icon: PenLine },
  { group: 'Tools', label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
  { group: 'Tools', label: 'Activity', to: '/admin/activity', icon: History },
  { group: 'Tools', label: 'Settings', to: '/admin/settings', icon: Settings },
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
      aria-label={collapsed ? label : undefined}
      title={collapsed ? label : undefined}
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
          <span className="truncate text-semantic-text-primary/90 group-[.active]:text-semantic-text-primary">{label}</span>
          {trailing}
        </>
      )}
    </NavLink>
  )
}

export default function AdminShell() {
  const { user, signedIn, signOut } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement | null>(null)
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const drawerToggleRef = useRef<HTMLButtonElement | null>(null)
  const lastDrawerOpenerRef = useRef<HTMLElement | null>(null)
  const location = useLocation()
  const [productCount, setProductCount] = useState<string | null>(null)

  const toTitleCase = (value: string) =>
    value
      .split(/[-_]/)
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
      orders: { label: 'Orders', to: '/admin/orders' },
      content: { label: 'Product content', to: '/admin/content' },
      components: { label: 'Components', to: '/admin/components' },
      globals: { label: 'Components', to: '/admin/components' },
      settings: { label: 'Settings', to: '/admin/settings' },
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
      }
    }
    return items
  }, [location.pathname])

  useEffect(() => {
    if (!userMenuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setUserMenuOpen(false)
    }

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null
      if (!target) return
      if (userMenuRef.current && userMenuRef.current.contains(target)) return
      setUserMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('mousedown', onMouseDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', onMouseDown)
    }
  }, [userMenuOpen])

  useEffect(() => {
    if (!collapsed) setUserMenuOpen(false)
  }, [collapsed])

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer) return

    const setInert = (value: boolean) => {
      // `inert` is supported in modern browsers but not typed everywhere yet.
      try {
        ;(drawer as any).inert = value
      } catch {
        // Ignore if the browser doesn't support `inert`.
      }
      if (value) drawer.setAttribute('inert', '')
      else drawer.removeAttribute('inert')
    }

    // Closed drawers should not be reachable by keyboard focus.
    setInert(!drawerOpen)

    if (drawerOpen) {
      // Focus the first interactive element in the drawer.
      requestAnimationFrame(() => {
        const first = drawer.querySelector<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        ;(first ?? drawer).focus()
      })
      return
    }

    // Restore focus to the opener if focus was inside the drawer when it closed.
    if (document.activeElement && drawer.contains(document.activeElement)) {
      ;(lastDrawerOpenerRef.current ?? drawerToggleRef.current)?.focus()
    }
  }, [drawerOpen])

  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.preventDefault()
      setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  const handleDrawerKeyDown = (e: React.KeyboardEvent) => {
    if (!drawerOpen) return
    if (e.key !== 'Tab') return

    const drawer = drawerRef.current
    if (!drawer) return

    const focusables = Array.from(
      drawer.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute('inert') && el.getAttribute('aria-hidden') !== 'true')

    if (!focusables.length) {
      e.preventDefault()
      drawer.focus()
      return
    }

    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (e.shiftKey) {
      if (!active || active === first || active === drawer) {
        e.preventDefault()
        last.focus()
      }
      return
    }

    if (active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  useEffect(() => {
    const readCount = () => setProductCount(sessionStorage.getItem('admin:productCount'))
    readCount()
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'admin:productCount') readCount()
    }
    const handleCustom = () => readCount()

    window.addEventListener('storage', handleStorage)
    window.addEventListener('admin:productCountUpdated', handleCustom)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('admin:productCountUpdated', handleCustom)
    }
  }, [])

  const grouped = useMemo(() => {
    const groups: Record<string, NavItem[]> = { Core: [], Content: [], Tools: [] }
    for (const item of navItems) groups[item.group].push(item)
    return groups as Record<NavItem['group'], NavItem[]>
  }, [])

  const displayName = user?.fullName || (user?.email ? user.email.split('@')[0] : 'Admin')
  const avatar = user?.avatarUrl ? (
    <img
      src={user.avatarUrl}
      alt={user.fullName || user.email || 'Avatar'}
      className={`h-10 w-10 rounded-full object-cover shadow-sm ${collapsed ? '' : 'border border-semantic-legacy-brand-blush/80'}`}
    />
  ) : (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${collapsed ? '' : 'border border-semantic-legacy-brand-blush/80'} bg-white shadow-sm`}
    >
      <Avatar name={user?.fullName || user?.email || 'Admin'} size={36} />
    </span>
  )

  return (
    <div className="min-h-screen bg-brand-porcelain text-semantic-text-primary">
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <a
        href="#main-content"
        onClick={() => {
          const target = document.getElementById('main-content')
          if (target instanceof HTMLElement) target.focus()
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded-full bg-white px-4 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft ring-1 ring-semantic-legacy-brand-blush/60"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen w-full">
        {/* Desktop sidebar */}
        <aside
          className={`sticky top-0 hidden h-screen shrink-0 border-r border-semantic-legacy-brand-blush/60 bg-brand-porcelain p-2 md:block transition-[width] duration-200 ${
            collapsed ? 'w-16' : 'w-48'
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

            <div className="mt-auto space-y-2">
              {!collapsed ? (
                <NavLink
                  to="/"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-xs font-semibold text-semantic-text-primary shadow-sm hover:bg-white/70"
                >
                  View storefront
                </NavLink>
              ) : null}

              <div
                className={`${
                  collapsed
                    ? 'flex items-center justify-center rounded-full p-2'
                    : 'rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 shadow-sm'
                }`}
              >
                {collapsed ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      type="button"
                      aria-label="Account menu"
                      aria-haspopup="menu"
                      aria-expanded={userMenuOpen}
                      title={`${signedIn ? 'Signed in' : 'Signed out'} · ${displayName}`}
                      onClick={() => setUserMenuOpen((v) => !v)}
                      className="inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/30 focus:ring-offset-2 focus:ring-offset-brand-porcelain"
                    >
                      {avatar}
                    </button>

                    {userMenuOpen ? (
                      <div className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-xl">
                        <div className="px-3 py-2">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
                            {signedIn ? 'Signed in' : 'Signed out'}
                          </div>
                          <div className="mt-0.5 truncate text-sm font-semibold text-semantic-text-primary">
                            {displayName}
                          </div>
                        </div>

                        <div className="h-px bg-semantic-legacy-brand-blush/40" aria-hidden="true" />

                        <NavLink
                          to="/"
                          className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          View storefront
                        </NavLink>

                        {signedIn ? (
                          <button
                            type="button"
                            className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
                            onClick={() => {
                              setUserMenuOpen(false)
                              signOut()
                            }}
                          >
                            Sign out
                          </button>
                        ) : (
                          <NavLink
                            to="/sign-in"
                            className="flex w-full items-center px-3 py-2 text-left text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Sign in
                          </NavLink>
                        )}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex min-w-0 items-start gap-3">
                    {avatar}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
                        {signedIn ? 'Signed in' : 'Signed out'}
                      </div>
                      <div className="truncate text-sm font-semibold">{displayName}</div>
                    </div>

                    {signedIn ? (
                      <button
                        type="button"
                        aria-label="Sign out"
                        title="Sign out"
                        onClick={signOut}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa text-white shadow-sm hover:bg-semantic-legacy-brand-cocoa/90"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                      </button>
                    ) : (
                      <NavLink
                        to="/sign-in"
                        className="inline-flex h-9 items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-4 text-xs font-semibold text-white shadow-sm hover:bg-semantic-legacy-brand-cocoa/90"
                      >
                        Sign in
                      </NavLink>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Top bar with burger */}
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-semantic-legacy-brand-blush/60 bg-brand-porcelain/95 px-4 py-3 backdrop-blur">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label={drawerOpen ? 'Close navigation' : 'Open navigation'}
                aria-controls="admin-drawer"
                aria-expanded={drawerOpen}
                ref={drawerToggleRef}
                onClick={(e) => {
                  lastDrawerOpenerRef.current = e.currentTarget
                  setDrawerOpen((v) => !v)
                }}
                className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60 focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/30"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </button>
              <nav
                aria-label="Breadcrumb"
                className="min-w-0 flex items-center gap-2 text-xs font-semibold text-semantic-text-primary/80"
              >
                {breadcrumb.map((item, idx) => {
                  const isLast = idx === breadcrumb.length - 1
                  return (
                    <span key={item.label} className="flex min-w-0 items-center gap-2">
                      {idx > 0 && <span className="shrink-0 text-semantic-text-primary/50">/</span>}
                      {isLast || !item.to ? (
                        <span className="truncate text-semantic-text-primary">{item.label}</span>
                      ) : (
                        <NavLink
                          to={item.to}
                          className="truncate hover:text-semantic-text-primary text-semantic-text-primary/80"
                        >
                          {item.label}
                        </NavLink>
                      )}
                    </span>
                  )
                })}
              </nav>
            </div>
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
            ref={drawerRef}
            role="dialog"
            aria-label="Admin navigation"
            aria-modal={drawerOpen ? true : undefined}
            aria-hidden={!drawerOpen}
            tabIndex={-1}
            onKeyDown={handleDrawerKeyDown}
            className={`fixed inset-y-0 left-0 z-40 w-72 max-w-[80vw] transform bg-white shadow-xl transition-transform duration-200 md:hidden ${drawerOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none invisible'}`}
          >
            <div className="flex items-center justify-between border-b border-semantic-legacy-brand-blush/60 px-4 py-3">
              <div>
                <div className="text-sm font-semibold">Lumelle admin</div>
                <div className="text-xs text-semantic-text-primary/70">{displayName}</div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 bg-brand-porcelain px-2 py-1 text-[11px] font-semibold text-semantic-text-primary focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/30 focus:ring-offset-2 focus:ring-offset-brand-porcelain"
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
                  {signedIn ? 'Signed in' : 'Signed out'}
                </div>
                <div className="mt-2 text-sm font-semibold">{displayName}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <NavLink
                    to="/"
                    className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 px-3 py-1.5 text-xs font-semibold text-semantic-text-primary"
                    onClick={() => setDrawerOpen(false)}
                  >
                    View storefront
                  </NavLink>
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
                  ) : (
                    <NavLink
                      to="/sign-in"
                      className="inline-flex items-center rounded-full bg-semantic-legacy-brand-cocoa px-3 py-1.5 text-xs font-semibold text-white"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Sign in
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Overlay when drawer is open */}
          {drawerOpen ? (
            <button
              type="button"
              aria-label="Close navigation"
              className="fixed inset-0 z-30 bg-black/25 md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
          ) : null}

          <main id="main-content" tabIndex={-1} className="min-w-0 focus:outline-none">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
