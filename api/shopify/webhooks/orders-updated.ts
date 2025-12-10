import { verifyWebhook } from "./_verify";
import { upsertOrder } from "../../../app/src/server/orders";
import { isProcessed, markProcessed } from "../../../app/src/server/webhooks";
import { renderOrderEmail, sendOrderConfirmation } from "../../../app/src/server/email";

import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { valid, body } = await verifyWebhook(req);
  if (!valid) return res.status(401).send("Invalid HMAC");
  const deliveryId = (req.headers['x-shopify-delivery-id'] || '') as string
  // The original instruction had a copy-paste error in the email section,
  // specifically `— if (!shop) return res.status(400).send("Missing shop");`.
  // I'm assuming the intent was to keep the shop check as it was,
  // and the email logic should be self-contained.
  // Also, the `isProcessed` check was removed in the instruction, so I'm removing it.
  // The `body` is now provided by `verifyWebhook`, so `req.json()` is not needed.
  const shop = (req.headers['x-shopify-shop-domain'] || body?.shop_domain || body?.domain) as string
  if (!shop) return res.status(400).send("Missing shop");
  await upsertOrder(shop, body);
  try {
    if (process.env.EMAIL_SEND === '1' && String(body?.financial_status).toLowerCase() === 'refunded' && body?.email) {
      const total = Number(body?.total_price || 0)
      const html = `<!doctype html><meta charset="utf-8" /><div style="font:14px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#2e2a27"><h2 style="margin:0 0 8px">Your order ${body?.name || '#' + body?.id} was refunded</h2><p>We have processed your refund. If you have questions, just reply to this email.</p><p style=\"margin-top:8px\">Refunded amount: £${total.toFixed(2)}</p><p style=\"margin-top:16px;color:#7a6e69\">— Lumelle</p></div>`
      await sendOrderConfirmation(body.email, `Refund processed for order ${body?.name || body?.id}`, html)
    }
  } catch (e) {
    console.error('Failed to send order confirmation', e)
  }
  if (deliveryId) await markProcessed(deliveryId)
  return res.status(200).send("OK");
}
