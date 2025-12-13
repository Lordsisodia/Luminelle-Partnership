export async function sendOrderConfirmation(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'orders@example.com'
  if (!apiKey) throw new Error('RESEND_API_KEY not set')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from, to, subject, html }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Resend error ${res.status}: ${text}`)
  }
  return res.json().catch(() => ({}))
}

export function renderOrderEmail(opts: { orderName: string; items: { title: string; qty: number; price: number }[]; total: number }) {
  const rows = opts.items.map(i => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f0dad4">${i.title} × ${i.qty}</td>
      <td style="padding:8px 0;border-bottom:1px solid #f0dad4;text-align:right">£${(i.price * i.qty).toFixed(2)}</td>
    </tr>`).join('')
  return `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
  <body style="margin:0;background:#fff7f5;font:14px -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#3a2b26">
  <div style="max-width:640px;margin:24px auto;padding:0 16px">
    <div style="background:#fff;border:1px solid #f0dad4;border-radius:16px;overflow:hidden">
      <div style="background:#5B3A2E;color:#fff;padding:16px 20px"><strong>Lumelle</strong></div>
      <div style="padding:20px">
        <h2 style="margin:0 0 8px">Thanks for your order ${opts.orderName}!</h2>
        <p style="margin:0 0 12px">We’re getting it ready to ship. Here’s a summary:</p>
        <table style="width:100%;border-collapse:collapse">${rows}
          <tr><td style="padding-top:8px"><strong>Total</strong></td><td style="padding-top:8px;text-align:right"><strong>£${opts.total.toFixed(2)}</strong></td></tr>
        </table>
        ${process.env.WEBSITE_URL ? `<p style=\"margin-top:16px\"><a href=\"${process.env.WEBSITE_URL}/account/orders/${encodeURIComponent(opts.orderName)}\" style=\"background:#5B3A2E;color:#fff;padding:10px 14px;border-radius:999px;text-decoration:none\">View your order</a></p>` : ''}
        <p style="margin-top:16px">We’ll email tracking once your order ships.</p>
        <p style="margin-top:16px;color:#7a6e69">— Lumelle</p>
      </div>
    </div>
  </div>
  </body></html>`
}

export function renderShipmentEmail(opts: { orderName: string; trackingCompany?: string; trackingNumber?: string; trackingUrl?: string; total?: number }) {
  const track = opts.trackingUrl ? `<p style="margin:12px 0"><a href="${opts.trackingUrl}" style="background:#5B3A2E;color:#fff;padding:10px 14px;border-radius:999px;text-decoration:none">Track shipment</a></p>` : ''
  return `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
  <body style="margin:0;background:#fff7f5;font:14px -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#3a2b26">
  <div style="max-width:640px;margin:24px auto;padding:0 16px">
    <div style="background:#fff;border:1px solid #f0dad4;border-radius:16px;overflow:hidden">
      <div style="background:#5B3A2E;color:#fff;padding:16px 20px"><strong>Lumelle</strong></div>
      <div style="padding:20px">
        <h2 style="margin:0 0 8px">Your order ${opts.orderName} has shipped!</h2>
        ${opts.trackingCompany || opts.trackingNumber ? `<p style="margin:0 0 8px">${opts.trackingCompany ?? ''} ${opts.trackingNumber ?? ''}</p>` : ''}
        ${track}
        ${typeof opts.total === 'number' ? `<p style="margin-top:8px">Total: £${opts.total.toFixed(2)}</p>` : ''}
        ${process.env.WEBSITE_URL ? `<p style=\"margin-top:12px\"><a href=\"${process.env.WEBSITE_URL}/account/orders/${encodeURIComponent(opts.orderName)}\" style=\"background:#5B3A2E;color:#fff;padding:10px 14px;border-radius:999px;text-decoration:none\">View your order</a></p>` : ''}
        <p style="margin-top:16px;color:#7a6e69">— Lumelle</p>
      </div>
    </div>
  </div>
  </body></html>`
}
