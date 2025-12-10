import { getPgPool } from "../../app/src/server/db";

export async function getAdminToken(shop: string) {
  const pool = getPgPool();
  const { rows } = await pool.query('SELECT "accessToken" FROM "Session" WHERE id = $1 LIMIT 1', [
    `offline_${shop}`,
  ]);
  const token = rows[0]?.accessToken || rows[0]?.accesstoken;
  if (!token) throw new Error(`No admin token for ${shop}`);
  return token as string;
}

export async function adminGraphQL<T>(shop: string, token: string, query: string, variables?: Record<string, unknown>) {
  const version = process.env.SHOPIFY_API_VERSION || "2025-10";
  const res = await fetch(`https://${shop}/admin/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Admin GQL ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}

