// Resend email template prototype (touch 1).
type Props = { restoreUrl: string; checkoutUrl?: string }

export function Touch1Email({ restoreUrl, checkoutUrl }: Props) {
  const cta = checkoutUrl || restoreUrl
  return (
    <html>
      <body style={{ fontFamily: 'Inter, Arial, sans-serif', padding: '24px', color: '#111' }}>
        <h2>Your cart is waiting</h2>
        <p>Pick up where you left off. We saved your items for you.</p>
        <p>
          <a href={cta} style={{ padding: '12px 18px', background: '#111', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}>
            Resume checkout
          </a>
        </p>
        <p>If you didn’t mean to leave, you can ignore this email.</p>
      </body>
    </html>
  )
}
