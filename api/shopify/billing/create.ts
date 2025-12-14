import { ensureShopifySessionTable, getPgPool } from "../../_lib/db.js";

const API_VERSION = process.env.SHOPIFY_API_VERSION || "2025-01";

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const shop = url.searchParams.get("shop");
  const host = url.searchParams.get("host") || "";
  if (!shop) return new Response("Missing shop", { status: 400 });

  const pool = getPgPool();
  await ensureShopifySessionTable()
  const { rows } = await pool.query('SELECT accesstoken FROM "Session" WHERE id = $1 LIMIT 1', [
    `offline_${shop}`,
  ]);
  const token = rows[0]?.accesstoken;
  if (!token) return new Response("No session", { status: 401 });

  const mutation = `#graphql\nmutation CreateSub($name: String!, $returnUrl: URL!, $lineItems: [AppSubscriptionLineItemInput!]!, $test: Boolean!) {\n  appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: $test) {\n    confirmationUrl\n    userErrors { field message }\n  }\n}`;

  const returnUrl = new URL("/shopify/app", url.origin);
  if (host) returnUrl.searchParams.set("host", host);
  returnUrl.searchParams.set("shop", shop);

  const gq = await fetch(`https://${shop}/admin/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        name: "Lumelle Basic",
        returnUrl: returnUrl.toString(),
        test: true,
        lineItems: [
          { plan: { appRecurringPricingDetails: { price: { amount: 9.99, currencyCode: "USD" }, interval: "EVERY_30_DAYS" } } },
        ],
      },
    }),
  });
  if (!gq.ok) return new Response("GraphQL error", { status: 502 });
  const data = await gq.json();
  const urlRedirect = data?.data?.appSubscriptionCreate?.confirmationUrl;
  if (!urlRedirect) return new Response(JSON.stringify(data), { status: 500, headers: { "content-type": "application/json" } });

  return new Response(null, { status: 302, headers: { Location: urlRedirect } });
}
