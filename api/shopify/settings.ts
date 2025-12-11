import { requireInternalAuth } from "../_lib/internalAuth";
import { getPgPool } from "../_lib/db";

export default async function handler(req: Request) {
  const auth = requireInternalAuth(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.message }), {
      status: auth.status,
      headers: { "content-type": "application/json" },
    });
  }
  const pool = getPgPool();
  await pool.query(
    'CREATE TABLE IF NOT EXISTS "ShopSettings" (shop text PRIMARY KEY, public_message text, updated_at timestamptz DEFAULT now())',
  );

  if (req.method === "GET") {
    const url = new URL(req.url);
    const shop = url.searchParams.get("shop");
    if (!shop) {
      return new Response(JSON.stringify({ error: "Missing shop" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    const { rows } = await pool.query(
      'SELECT public_message FROM "ShopSettings" WHERE shop = $1',
      [shop],
    );
    return new Response(
      JSON.stringify({ publicMessage: rows[0]?.public_message ?? "" }),
      { headers: { "content-type": "application/json" } },
    );
  }

  if (req.method === "POST") {
    const body = await req.json().catch(() => ({}));
    const shop = body.shop as string | undefined;
    const publicMessage = String(body.publicMessage || "");
    if (!shop) {
      return new Response(JSON.stringify({ error: "Missing shop" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    await pool.query(
      'INSERT INTO "ShopSettings" (shop, public_message) VALUES ($1, $2) ON CONFLICT (shop) DO UPDATE SET public_message = excluded.public_message, updated_at = now()',
      [shop, publicMessage],
    );
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "content-type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
}

