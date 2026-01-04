// Resend email template prototype (touch 2 with discount).
type Props = { restoreUrl: string; checkoutUrl?: string; discountCode?: string }

export function Touch2Email({ restoreUrl, checkoutUrl, discountCode }: Props) {
  const cta = checkoutUrl || restoreUrl
  return (
    <html>
      <body style={{ fontFamily: 'Inter, Arial, sans-serif', padding: '24px', color: '#111' }}>
        <h2>Take 10% off—just for coming back</h2>
        {discountCode && <p>Your code: <strong>{discountCode}</strong></p>}
        <p>
          <a href={cta} style={{ padding: '12px 18px', background: '#111', color: '#fff', textDecoration: 'none', borderRadius: '6px' }}>
            Resume checkout
          </a>
        </p>
        <p>We’ll hold your cart for a bit longer.</p>
      </body>
    </html>
  )
}
