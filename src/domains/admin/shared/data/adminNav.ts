import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Boxes,
  FileText,
  PenLine,
  Image as ImageIcon,
  PanelsTopLeft,
  BarChart3,
  Settings,
} from 'lucide-react'

export type AdminNavSectionId =
  | 'dashboard'
  | 'catalog'
  | 'pages'
  | 'blogs'
  | 'media'
  | 'components'
  | 'analytics'
  | 'settings'

export type AdminNavSection = {
  id: AdminNavSectionId
  label: string
  icon: LucideIcon
  primaryTo: string
}

export const adminNavSections: AdminNavSection[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, primaryTo: '/admin' },
  { id: 'catalog', label: 'Catalog', icon: Boxes, primaryTo: '/admin/products' },
  { id: 'pages', label: 'Pages', icon: FileText, primaryTo: '/admin/pages' },
  { id: 'blogs', label: 'Blogs', icon: PenLine, primaryTo: '/admin/blogs' },
  { id: 'media', label: 'Media', icon: ImageIcon, primaryTo: '/admin/media' },
  { id: 'components', label: 'Components', icon: PanelsTopLeft, primaryTo: '/admin/components' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, primaryTo: '/admin/analytics' },
  { id: 'settings', label: 'Settings', icon: Settings, primaryTo: '/admin/settings' },
]

export function getAdminNavSectionFromPath(pathname: string): AdminNavSectionId {
  const path = pathname.replace(/\/+$/, '')
  if (path === '/admin') return 'dashboard'
  if (path.startsWith('/admin/products') || path.startsWith('/admin/preview/product')) return 'catalog'
  if (path.startsWith('/admin/pages')) return 'pages'
  if (path.startsWith('/admin/blogs')) return 'blogs'
  if (path.startsWith('/admin/media')) return 'media'
  if (path.startsWith('/admin/components') || path.startsWith('/admin/globals')) return 'components'
  if (path.startsWith('/admin/analytics') || path.startsWith('/admin/activity') || path.startsWith('/admin/orders'))
    return 'analytics'
  if (path.startsWith('/admin/settings')) return 'settings'
  return 'dashboard'
}

