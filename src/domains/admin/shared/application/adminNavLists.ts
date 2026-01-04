export type AdminNavListItem = {
  label: string
  to: string
}

export type AdminNavListKey = 'products' | 'pages' | 'blogPosts' | 'components'

const STORAGE_PREFIX = 'admin:navList:'

function storageKey(key: AdminNavListKey) {
  return `${STORAGE_PREFIX}${key}`
}

function safeParseJson<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function getAdminNavList(key: AdminNavListKey): AdminNavListItem[] {
  if (typeof window === 'undefined') return []
  const parsed = safeParseJson<{ v: number; items: AdminNavListItem[] }>(sessionStorage.getItem(storageKey(key)))
  const items = Array.isArray(parsed?.items) ? parsed!.items : []
  return items.filter((i) => Boolean(i && typeof i.label === 'string' && typeof i.to === 'string'))
}

export function setAdminNavList(key: AdminNavListKey, items: AdminNavListItem[]) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(storageKey(key), JSON.stringify({ v: 1, items }))
  window.dispatchEvent(new CustomEvent('admin:navListUpdated', { detail: { key } }))
}

export function subscribeAdminNavList(key: AdminNavListKey, cb: () => void) {
  if (typeof window === 'undefined') return () => {}
  const handler = (e: Event) => {
    const detailKey = (e as CustomEvent)?.detail?.key as AdminNavListKey | undefined
    if (!detailKey || detailKey === key) cb()
  }
  window.addEventListener('admin:navListUpdated', handler as any)
  window.addEventListener('storage', handler as any)
  return () => {
    window.removeEventListener('admin:navListUpdated', handler as any)
    window.removeEventListener('storage', handler as any)
  }
}
