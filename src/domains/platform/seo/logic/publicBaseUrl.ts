import { env } from '@utils/env'

const DEFAULT_PUBLIC_BASE_URL = 'https://lumelle.com'

const normalizeBaseUrl = (value: string) => value.trim().replace(/\/+$/, '')

export const getPublicBaseUrl = () => {
  const configured = env('PUBLIC_BASE_URL')
  if (typeof configured === 'string' && configured.trim()) return normalizeBaseUrl(configured)
  if (typeof window !== 'undefined' && window.location?.origin) return normalizeBaseUrl(window.location.origin)
  return DEFAULT_PUBLIC_BASE_URL
}

export const toPublicUrl = (pathOrUrl: string) => {
  if (!pathOrUrl) return getPublicBaseUrl()
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return new URL(normalizedPath, getPublicBaseUrl()).toString()
}

