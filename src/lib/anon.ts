const STORAGE_KEY = 'lumelle_anon_id'

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `anon_${Math.random().toString(36).slice(2, 10)}`
}

export const getAnonId = () => {
  if (typeof window === 'undefined') return null
  const existing = window.localStorage.getItem(STORAGE_KEY)
  if (existing) return existing
  const next = generateId()
  window.localStorage.setItem(STORAGE_KEY, next)
  return next
}
