export const env = (key: string): string | undefined => {
  // Vite injects env vars prefixed with VITE_ and also plain ones when using import.meta.env
  const value = import.meta.env[key as never] || import.meta.env[`VITE_${key}` as never]
  if (typeof value === 'string') return value
  return undefined
}
