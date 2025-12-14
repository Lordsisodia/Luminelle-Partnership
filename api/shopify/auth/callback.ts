import type { VercelRequest, VercelResponse } from '@vercel/node'

import { buildMessageFromQuery, signHmac, safeCompare } from "../_lib/crypto.js";
import { ensureShopifySessionTable, getPgPool } from "../../_lib/db.js";

function bad(res: VercelResponse, status = 400, msg = "Bad request") {
  return res.status(status).send(msg)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = new URL(req.url!, `http://${req.headers.host}`);

  const shop = url.searchParams.get("shop");
  const code = url.searchParams.get("code");
  const hmac = url.searchParams.get("hmac");
  const host = url.searchParams.get("host") || "";
  const state = url.searchParams.get("state");

  const cookies = Object.fromEntries(
    ((req.headers.cookie || "") as string)
      .split(";")
      .map((c) => c.trim().split("=") as [string, string])
      .filter(([k]) => k)
  );

  if (!shop || !code || !hmac || !state) return bad(res);
  if (!cookies["shopify_state"] || cookies["shopify_state"] !== state) return bad(res, 401, "Invalid state");

  // Verify HMAC from query
  const message = buildMessageFromQuery(url);
  const expected = signHmac(message, process.env.SHOPIFY_API_SECRET || "");
  if (!safeCompare(hmac, expected)) return bad(res, 401, "Invalid HMAC");

  // Exchange code for token
  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_API_KEY,
      client_secret: process.env.SHOPIFY_API_SECRET,
      code,
    }),
  });
  if (!tokenRes.ok) return bad(res, 502, "Token exchange failed");
  const tokenJson = (await tokenRes.json()) as { access_token: string; scope?: string };

  // Persist offline session (simple model)
  const pool = getPgPool();
  await ensureShopifySessionTable()
  await pool.query(
    'INSERT INTO "Session" (id, shop, state, isonline, scope, accesstoken) VALUES ($1,$2,$3,$4,$5,$6)\n     ON CONFLICT (id) DO UPDATE SET accesstoken = excluded.accesstoken, scope = excluded.scope',
    [`offline_${shop}`, shop, state, false, tokenJson.scope || null, tokenJson.access_token],
  );

  // Register shop-specific webhooks for customers and app/uninstalled
  const webhookUrlBase = url.origin;
  async function createWebhook(topic: string, callbackPath: string) {
    const mutation = `#graphql\nmutation WebhookCreate($topic: WebhookSubscriptionTopic!, $callbackUrl: URL!) {\n  webhookSubscriptionCreate(topic: $topic, webhookSubscription: {callbackUrl: $callbackUrl, format: JSON}) {\n    userErrors { field message }\n    webhookSubscription { id }\n  }\n}`;
    await fetch(`https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION || '2025-10'}/graphql.json`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': tokenJson.access_token,
      },
      body: JSON.stringify({ query: mutation, variables: { topic, callbackUrl: `${webhookUrlBase}${callbackPath}` } }),
    });
  }

  const hostPath = host ? `?host=${encodeURIComponent(host)}&shop=${encodeURIComponent(shop)}` : `?shop=${encodeURIComponent(shop)}`;
  try {
    await createWebhook('CUSTOMERS_CREATE', '/api/shopify/webhooks/customers-create');
    await createWebhook('CUSTOMERS_UPDATE', '/api/shopify/webhooks/customers-update');
    await createWebhook('CUSTOMERS_DELETE', '/api/shopify/webhooks/customers-delete');
    await createWebhook('APP_UNINSTALLED', '/api/shopify/webhooks/app-uninstalled');
    await createWebhook('ORDERS_CREATE', '/api/shopify/webhooks/orders-create');
    await createWebhook('ORDERS_UPDATED', '/api/shopify/webhooks/orders-updated');
    await createWebhook('FULFILLMENTS_CREATE', '/api/shopify/webhooks/fulfillments-create');
  } catch (e) {
    console.error('Webhook subscription create failed', e);
  }

  // Clear short-lived cookies
  res.setHeader('Set-Cookie', [
    "shopify_state=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0",
    "shopify_shop=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0",
  ])
  res.setHeader('Location', `/shopify/app${hostPath}`)
  return res.status(302).send('')
}
