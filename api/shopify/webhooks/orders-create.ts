import { verifyWebhook } from "./_verify";
import { upsertOrder } from "../../_lib/orders";
import { renderOrderEmail, sendOrderConfirmation } from "../../_lib/email";
import { isProcessed, markProcessed } from "../../_lib/webhooks";

import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { valid, body } = await verifyWebhook(req);
  if (!valid) return res.status(401).send("Invalid HMAC");
  const deliveryId = (req.headers['x-shopify-delivery-id'] || '') as string
  if (deliveryId && (await isProcessed(deliveryId))) return res.status(200).send('OK')
  const shop = (req.headers['x-shopify-shop-domain'] || body?.shop_domain || body?.domain) as string
  if (!shop) return res.status(400).send("Missing shop");
  await upsertOrder(shop, body);
  // Optional email confirmation via Resend if enabled and we have an email
  try {
    if (process.env.EMAIL_SEND === '1' && body?.email) {
      const items = (Array.isArray(body?.line_items) ? body.line_items : []).map((it: any) => ({
        title: it.title,
        qty: Number(it.quantity || 1),
        price: Number(it.price || 0),
      }))
      const total = Number(body?.total_price || 0)
      const html = renderOrderEmail({ orderName: body?.name || String(body?.id), items, total })
      await sendOrderConfirmation(body.email, `Order ${body?.name || body?.id} confirmed`, html)
    }
  } catch (e) {
    console.error('Order email failed', e)
  }
  if (deliveryId) await markProcessed(deliveryId)
  return new Response("OK");
}
