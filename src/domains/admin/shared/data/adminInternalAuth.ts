export const ADMIN_PASS_SESSION_KEY = 'lumelle_admin_pass'

export function getAdminPass(): string {
  try {
    return sessionStorage.getItem(ADMIN_PASS_SESSION_KEY) || ''
  } catch {
    return ''
  }
}

export function setAdminPass(pass: string) {
  try {
    sessionStorage.setItem(ADMIN_PASS_SESSION_KEY, pass)
  } catch {
    // ignore (non-browser / storage blocked)
  }
}

export function getAdminAuthHeaders(pass?: string): Record<string, string> {
  const token = (pass ?? getAdminPass()).trim()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

