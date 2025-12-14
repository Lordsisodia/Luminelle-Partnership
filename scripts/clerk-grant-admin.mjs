const email = process.argv[2]
const role = process.argv[3] || 'admin'

if (!email || email === '-h' || email === '--help') {
  console.error('Usage: node scripts/clerk-grant-admin.mjs <email> [role]')
  console.error('Example: CLERK_SECRET_KEY=sk_test_... node scripts/clerk-grant-admin.mjs fuzeheritage@gmail.com')
  process.exit(email ? 0 : 1)
}

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY || process.env.CLERK_API_KEY
if (!CLERK_SECRET_KEY) {
  console.error('Missing CLERK_SECRET_KEY env var (or CLERK_API_KEY).')
  console.error('Get it from Clerk Dashboard → API keys → Secret key.')
  process.exit(1)
}

const clerkApiBase = 'https://api.clerk.com/v1'

const authHeaders = {
  Authorization: `Bearer ${CLERK_SECRET_KEY}`,
  'Content-Type': 'application/json',
}

const safeJson = async (res) => {
  const text = await res.text()
  try {
    return { ok: true, json: JSON.parse(text), text }
  } catch {
    return { ok: false, json: null, text }
  }
}

const normalizeRoles = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value.map(String).map((s) => s.trim()).filter(Boolean)
  if (typeof value === 'string') return [value.trim()].filter(Boolean)
  return []
}

const main = async () => {
  const listUrl = `${clerkApiBase}/users?email_address=${encodeURIComponent(email)}`
  const listRes = await fetch(listUrl, { headers: authHeaders })
  if (!listRes.ok) {
    const parsed = await safeJson(listRes)
    throw new Error(`Clerk list users failed (${listRes.status}): ${parsed.ok ? JSON.stringify(parsed.json) : parsed.text}`)
  }

  const users = await listRes.json()
  if (!Array.isArray(users) || users.length === 0) {
    throw new Error(`No Clerk user found for email ${email}`)
  }

  if (users.length > 1) {
    console.warn(`Warning: multiple users matched ${email}. Using the first user id: ${users[0]?.id}`)
  }

  const user = users[0]
  const userId = user?.id
  if (!userId) throw new Error(`Unexpected Clerk response (missing user.id)`)

  const publicMetadata = user?.public_metadata && typeof user.public_metadata === 'object' ? user.public_metadata : {}
  const existing = normalizeRoles(publicMetadata.roles)
  const next = Array.from(new Set([...existing, role]))

  const patchRes = await fetch(`${clerkApiBase}/users/${encodeURIComponent(userId)}`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify({
      public_metadata: {
        ...publicMetadata,
        roles: next,
      },
    }),
  })

  if (!patchRes.ok) {
    const parsed = await safeJson(patchRes)
    throw new Error(`Clerk update user failed (${patchRes.status}): ${parsed.ok ? JSON.stringify(parsed.json) : parsed.text}`)
  }

  console.log(`✅ Granted role "${role}" to ${email}`)
  console.log(`User: ${userId}`)
  console.log(`public_metadata.roles: ${JSON.stringify(next)}`)
  console.log('')
  console.log('Next:')
  console.log('- Ensure Clerk JWT template "supabase" includes app_metadata.roles from user.public_metadata.roles')
  console.log('- Sign out/in, then open /admin/pages and confirm "Roles: admin"')
}

main().catch((err) => {
  console.error('❌', err instanceof Error ? err.message : err)
  process.exit(1)
})
