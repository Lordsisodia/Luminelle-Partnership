import { NavLink } from 'react-router-dom'
import type { ComponentType } from 'react'
import { navSizing } from './AdminSideNav.tokens'
import { getNavItemStateClasses } from './useNavItemStyles'
import { NavLabel } from './NavLabel'

type BaseProps = {
  to: string
  label: string
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  onNavigate?: () => void
  inlineLabel?: boolean
  showLabel?: boolean
  badge?: string | null
  activeClassName?: string
}

export function NavRailItem({
  to,
  label,
  icon: Icon,
  onNavigate,
  inlineLabel = false,
  showLabel = false,
  badge,
  activeClassName,
}: BaseProps) {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      onClick={onNavigate}
      aria-label={label}
      title={label}
      className={({ isActive }) =>
        [
          isActive ? 'active' : '',
          'relative group flex h-11 w-11 items-center justify-center rounded-2xl overflow-visible transition',
          getNavItemStateClasses({ isActive, activeClassName }),
        ].join(' ')
      }
    >
      <Icon className="h-4 w-4" aria-hidden />
      <NavLabel label={label} showLabel={showLabel} inlineLabel={inlineLabel} />
      {badge ? (
        <span className={`absolute inline-flex min-w-5 items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm ${navSizing.badgeOffset}`}>
          {badge}
        </span>
      ) : null}
    </NavLink>
  )
}
