/**
 * UI Archive Snapshot (2025-12-28)
 *
 * Source: `src/domains/admin/shared/ui/layouts/AdminShell.tsx` (~312–343)
 *
 * This is a *copy* of the brand pill UI markup + Tailwind classnames.
 * Keep it here as a reference in case the original gets refactored away.
 */

type AdminSidebarBrandPillProps = {
  collapsed: boolean
  onToggleCollapsed?: () => void
}

export function AdminSidebarBrandPill({ collapsed, onToggleCollapsed }: AdminSidebarBrandPillProps) {
  return (
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
        type="button"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={() => onToggleCollapsed?.()}
        className={`${
          collapsed
            ? 'h-7 w-7 rounded-full border border-semantic-legacy-brand-blush/60 bg-white shadow-sm hover:bg-brand-porcelain'
            : 'absolute -right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border border-semantic-legacy-brand-blush/60 bg-white shadow-sm hover:bg-brand-porcelain'
        }`}
      >
        {collapsed ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mx-auto h-4 w-4 text-semantic-text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mx-auto h-4 w-4 text-semantic-text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        )}
      </button>
    </div>
  )
}

