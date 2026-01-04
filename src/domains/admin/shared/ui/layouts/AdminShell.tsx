import { useEffect, useMemo, useRef, useState, createContext } from 'react'
import type { ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuthContext as useAuth } from '@platform/auth/providers/AuthContext'
import { Avatar } from '@ui/components/Avatar'
import AdminSideNav from '@admin/shared/ui/components/AdminSideNav'
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
  UserRound,
} from 'lucide-react'

export const TopBarActionsContext = createContext<{ setTopActions: (node: ReactNode | null) => void } | null>(null)

export default function AdminShell() {
  const [topActions, setTopActions] = useState<ReactNode | null>(null)
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
      products: { label: 'Catalog', to: '/admin/products' },
      pages: { label: 'Pages', to: '/admin/pages' },
      blogs: { label: 'Blogs', to: '/admin/blogs' },
      media: { label: 'Media', to: '/admin/media' },
      analytics: { label: 'Analytics', to: '/admin/analytics' },
      activity: { label: 'Activity', to: '/admin/activity' },
      orders: { label: 'Orders', to: '/admin/orders' },
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
    setTopActions(null)
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

  const headerAvatar = user?.avatarUrl ? (
    <img
      src={user.avatarUrl}
      alt={user.fullName || user.email || 'Avatar'}
      className="h-8 w-8 rounded-full object-cover shadow-sm ring-1 ring-white/60"
    />
  ) : (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-white/60">
      <Avatar name={user?.fullName || user?.email || 'Admin'} size={28} />
    </span>
  )

  const hasTopActions = Boolean(topActions)

  return (
    <TopBarActionsContext.Provider value={{ setTopActions }}>
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
            collapsed ? 'w-16' : 'w-72'
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

            <AdminSideNav collapsed={collapsed} productCount={productCount} />
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
            <div className={`flex items-center gap-3 ${hasTopActions ? 'flex-1 justify-between' : ''}`}>
              {topActions}
              <NavLink
                to="/admin/profile"
                aria-label={`Open profile for ${displayName}`}
                title={`Profile • ${displayName}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 backdrop-blur-md text-semantic-text-primary shadow-sm hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/30 focus:ring-offset-2 focus:ring-offset-brand-porcelain"
              >
                <span className="sr-only">Profile</span>
                {headerAvatar}
              </NavLink>
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
              <AdminSideNav
                collapsed={false}
                productCount={productCount}
                onNavigate={() => setDrawerOpen(false)}
                mode="drawer"
              />

              <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
                  {signedIn ? 'Signed in' : 'Signed out'}
                </div>
                <div className="mt-2 text-sm font-semibold">{displayName}</div>
                <div className="mt-3 flex flex-wrap gap-2">
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
            <Outlet context={{ setTopActions }} />
          </main>
        </div>
        </div>
      </div>
    </TopBarActionsContext.Provider>
  )
}
