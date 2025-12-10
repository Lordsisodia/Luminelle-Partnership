export default async function handler(_req: Request) {
  const headers = new Headers({ Location: '/account/orders' })
  headers.append('Set-Cookie', 'cust_at=; Path=/; Max-Age=0')
  headers.append('Set-Cookie', 'cust_rt=; Path=/; Max-Age=0')
  return new Response(null, { status: 302, headers })
}

