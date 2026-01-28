import type { ComponentType } from 'react'
import { NavLink } from 'react-router-dom'
import { navSizing } from './AdminSideNav.tokens'
import { getNavItemStateClasses } from './useNavItemStyles'
import { NavLabel } from './NavLabel'

type Props = {
  to: string
  label: string
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  onNavigate?: () => void
  showLabel: boolean
  inlineLabel?: boolean
}

export function NavUtilityItem({
  to,
  label,
  icon: Icon,
  onNavigate,
  showLabel,
  inlineLabel = false,
}: Props) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      aria-label={label}
      title={label}
      className={({ isActive }) =>
        [
          isActive ? 'active' : '',
          'relative group flex items-center rounded-2xl overflow-visible h-11 w-11 justify-center',
          navSizing.transition,
          getNavItemStateClasses({ isActive, activeClassName: undefined }),
        ].join(' ')
      }
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      <NavLabel label={label} showLabel={showLabel} inlineLabel={inlineLabel} />
    </NavLink>
  )
}
