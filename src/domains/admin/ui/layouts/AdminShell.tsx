import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { setNoIndexNoFollow } from '@/lib/seo'
import { useAuth } from '@auth/ui/providers/AuthContext'

type NavItem = {
  label: string
  to: string
  group: 'Core' | 'Content' | 'Tools'
}

const navItems: NavItem[] = [
  { group: 'Core', label: 'Dashboard', to: '/admin' },
  { group: 'Content', label: 'Pages', to: '/admin/pages' },
  { group: 'Content', label: 'Products', to: '/admin/products' },
  { group: 'Content', label: 'Blogs', to: '/admin/blogs' },
  { group: 'Content', label: 'Media', to: '/admin/media' },
  { group: 'Content', label: 'Globals', to: '/admin/globals' },
  { group: 'Tools', label: 'Analytics', to: '/admin/analytics' },
  { group: 'Tools', label: 'Product content', to: '/admin/content' },
  { group: 'Tools', label: 'Activity', to: '/admin/activity' },
]

function NavItemLink({ to, label, onNavigate }: { to: string; label: string; onNavigate?: () => void }) {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition',
          isActive
            ? 'bg-white text-semantic-text-primary shadow-sm ring-1 ring-semantic-legacy-brand-blush/60'
            : 'text-semantic-text-primary/80 hover:bg-white/60 hover:text-semantic-text-primary',
        ].join(' ')
      }
    >
      <span>{label}</span>
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

  useEffect(() => {
    setNoIndexNoFollow()
  }, [])

  const grouped = useMemo(() => {
    const groups: Record<string, NavItem[]> = { Core: [], Content: [], Tools: [] }
    for (const item of navItems) groups[item.group].push(item)
    return groups as Record<NavItem['group'], NavItem[]>
  }, [])

  return (
    <div className="min-h-screen bg-brand-porcelain text-semantic-text-primary">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
        {/* Desktop sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-semantic-legacy-brand-blush/60 p-4 md:block">
          <div className="flex items-center justify-between rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4">
            <div>
              <div className="text-sm font-semibold text-semantic-text-primary">Lumelle</div>
              <div className="text-xs text-semantic-text-primary/70">Admin console</div>
            </div>
            <span className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-1 text-[11px] text-semantic-text-primary/70">
              {import.meta.env.MODE}
            </span>
          </div>

          <nav className="mt-4 space-y-4">
            {(['Core', 'Content', 'Tools'] as const).map((group) => (
              <div key={group}>
                <div className="px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
                  {group}
                </div>
                <div className="mt-2 space-y-1">
                  {grouped[group].map((item) => (
                    <NavItemLink key={item.to} to={item.to} label={item.label} />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
              Signed in
            </div>
            <div className="mt-2 text-sm font-semibold">{user?.fullName || user?.email || 'Admin'}</div>
            {user?.email ? <div className="mt-1 text-xs text-semantic-text-primary/70">{user.email}</div> : null}
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="/"
                className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 px-3 py-1.5 text-xs font-semibold text-semantic-text-primary"
              >
                View storefront
              </a>
              {signedIn ? (
                <button
                  onClick={signOut}
                  className="inline-flex items-center rounded-full bg-semantic-legacy-brand-cocoa px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Sign out
                </button>
              ) : null}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Top bar with burger */}
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-semantic-legacy-brand-blush/60 bg-brand-porcelain/95 px-4 py-3 backdrop-blur">
            <button
              onClick={() => setDrawerOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary"
              aria-expanded={drawerOpen}
              aria-controls="admin-drawer"
            >
              <BurgerIcon open={drawerOpen} />
              <span className="hidden sm:inline">Navigation</span>
            </button>
            <div className="text-sm font-semibold">Admin</div>
            <span className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-1 text-[11px] text-semantic-text-primary/70">
              {import.meta.env.MODE}
            </span>
          </header>

          {/* Mobile/overlay drawer */}
          <div
            id="admin-drawer"
            className={`fixed inset-y-0 left-0 z-40 w-72 translate-x-[-110%] transform bg-white shadow-xl transition-transform duration-200 md:hidden ${drawerOpen ? 'translate-x-0' : ''}`}
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

          {/* Overlay when drawer is open on mobile */}
          {drawerOpen ? (
            <button
              aria-label="Close navigation"
              className="fixed inset-0 z-20 bg-black/25 md:hidden"
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
