import { navSizing } from './AdminSideNav.tokens'

export interface NavItemStyleOptions {
  isActive: boolean
  activeClassName?: string
}

/**
 * Returns the appropriate className for nav item active/inactive states
 */
export function getNavItemStateClasses({ isActive, activeClassName }: NavItemStyleOptions) {
  return isActive
    ? activeClassName ?? 'bg-white text-semantic-text-primary shadow-sm ring-1 ring-semantic-legacy-brand-blush/60'
    : 'text-semantic-text-primary/70 hover:bg-white/70 hover:text-semantic-text-primary'
}

/**
 * Returns the transition classes for nav items
 */
export function getNavItemTransitionClasses() {
  return navSizing.transition
}
