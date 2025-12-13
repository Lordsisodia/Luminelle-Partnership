import { verifyWebhook } from "./_verify.js";
import { getPgPool } from "../../_lib/db.js";
import { renderShipmentEmail, sendOrderConfirmation } from "../../_lib/email.js";

import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { valid, body } = await verifyWebhook(req);
  if (!valid) return res.status(401).send("Invalid HMAC");
  const deliveryId = (req.headers['x-shopify-delivery-id'] || '') as string
  const shop = (req.headers['x-shopify-shop-domain'] || body?.domain || body?.shop_domain) as string
  if (!shop) return res.status(400).send("Missing shop");
  // Fulfillment logic here
  if (deliveryId) {
    // Assuming markProcessed is defined elsewhere or will be added.
    // For now, we'll just acknowledge the delivery ID.
    // await markProcessed(deliveryId)
  }

  const orderId = Number(body?.order_id);
  const status = body?.status || 'success';
  const trackingNumber = body?.tracking_number || null;
  const trackingCompany = body?.tracking_company || null;
  const trackingUrl = body?.tracking_url || null;

  const pool = getPgPool();
  if (Number.isFinite(orderId)) {
    await pool.query(
      `UPDATE "ShopOrders" SET fulfillment_status = $1, updated_at = now(), raw = coalesce(raw, '{}'::jsonb) || $2::jsonb WHERE shop = $3 AND order_id = $4`,
      [
        status === 'success' ? 'fulfilled' : status,
        JSON.stringify({ tracking_company: trackingCompany, tracking_number: trackingNumber, tracking_url: trackingUrl }),
        shop,
        orderId,
      ]
    );

    // Optional: send shipment email if enabled
    try {
      if (process.env.EMAIL_SEND === '1') {
        const { rows } = await pool.query('SELECT email, name, total FROM "ShopOrders" WHERE shop=$1 AND order_id=$2 LIMIT 1', [shop, orderId])
        const rec = rows[0]
        if (rec?.email) {
          const html = renderShipmentEmail({ orderName: rec.name || '#' + orderId, trackingCompany, trackingNumber, trackingUrl, total: Number(rec.total || 0) })
          await sendOrderConfirmation(rec.email, `Your order ${rec.name || '#' + orderId} has shipped`, html)
        }
      }
    } catch (e) {
      console.error('Shipment email failed', e)
    }
  }
  return res.status(200).send("OK");
}
