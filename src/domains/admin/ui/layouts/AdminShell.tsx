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

export default function AdminShell() {
  const { user, signedIn, signOut } = useAuth()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

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
          {/* Mobile top bar */}
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-semantic-legacy-brand-blush/60 bg-brand-porcelain/95 px-4 py-3 backdrop-blur md:hidden">
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary"
              aria-expanded={mobileNavOpen}
              aria-controls="admin-mobile-nav"
            >
              Menu
            </button>
            <div className="text-sm font-semibold">Admin</div>
            <span className="rounded-full border border-semantic-legacy-brand-blush/60 px-2 py-1 text-[11px] text-semantic-text-primary/70">
              {import.meta.env.MODE}
            </span>
          </header>

          {mobileNavOpen ? (
            <div id="admin-mobile-nav" className="border-b border-semantic-legacy-brand-blush/60 bg-white p-3 md:hidden">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Lumelle admin</div>
                  <div className="text-xs text-semantic-text-primary/70">{user?.email || 'Signed in'}</div>
                </div>
                {signedIn ? (
                  <button
                    onClick={signOut}
                    className="inline-flex items-center rounded-full bg-semantic-legacy-brand-cocoa px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Sign out
                  </button>
                ) : null}
              </div>
              <div className="mt-3 space-y-1">
                {navItems.map((item) => (
                  <NavItemLink
                    key={item.to}
                    to={item.to}
                    label={item.label}
                    onNavigate={() => setMobileNavOpen(false)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

