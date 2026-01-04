// Resend email template prototype (touch 3 last call).
type Props = { restoreUrl: string; checkoutUrl?: string }

export function Touch3Email({ restoreUrl, checkoutUrl }: Props) {
  const cta = checkoutUrl || restoreUrl
  return (
    <html>
      <body style={{ fontFamily: 'Inter, Arial, sans-serif', padding: '24px', color: '#111' }}>
        <h2>Last call before your cart expires</h2>
        <p>Grab your items now—once it’s gone, it’s gone.</p>
        <p>
          <a href={cta} style={{ padding: '12px 18px', background: '#111', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}>
            Resume checkout
          </a>
        </p>
      </body>
    </html>
  )
}
