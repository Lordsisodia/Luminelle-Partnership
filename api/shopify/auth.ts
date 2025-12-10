import { randomBytes } from "crypto";
import { buildMessageFromQuery, signHmac } from "./_lib/crypto";

function isValidShopDomain(shop?: string | null) {
  if (!shop) return false;
  return /^(?:[a-z0-9][a-z0-9-]*)\.myshopify\.com$/i.test(shop);
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const shop = url.searchParams.get("shop");
  const host = url.searchParams.get("host") || "";
  if (!isValidShopDomain(shop)) {
    return new Response("Invalid shop", { status: 400 });
  }

  const apiKey = process.env.SHOPIFY_API_KEY;
  const scopes = process.env.SCOPES || process.env.SHOPIFY_SCOPES || "read_products,write_products";
  const appUrl = process.env.SHOPIFY_APP_URL || url.origin;
  const callback = new URL("/api/shopify/auth/callback", appUrl).toString();

  const state = randomBytes(16).toString("hex");

  const authUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authUrl.searchParams.set("client_id", apiKey || "");
  authUrl.searchParams.set("scope", scopes);
  authUrl.searchParams.set("redirect_uri", callback);
  authUrl.searchParams.set("state", state);
  if (host) authUrl.searchParams.set("host", host);

  const res = new Response(null, { status: 302, headers: { Location: authUrl.toString() } });
  res.headers.append(
    "Set-Cookie",
    `shopify_state=${state}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=600`,
  );
  res.headers.append(
    "Set-Cookie",
    `shopify_shop=${shop}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=600`,
  );
  return res;
}

