// Publish Edge Function (draft, staging) - Deno style
// Wraps publish with snapshot + audit; cache-bust via version param.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);
const ALLOWED_ROLES = ["admin"];

export default async (req: Request) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  const authHeader = req.headers.get("Authorization") || "";
  const jwt = parseJwt(authHeader.replace("Bearer ", ""));
  if (!hasRole(jwt)) return new Response("Forbidden", { status: 403 });

  const body = await req.json();
  const { entity_type, entity_id } = body;
  if (!entity_type || !entity_id) return new Response("Bad Request", { status: 400 });

  const client = supabase;
  const snap = await snapshot(client, entity_type, entity_id);
  if (!snap) return new Response("Not Found", { status: 404 });

  const { error: publishErr } = await publish(client, entity_type, entity_id, jwt.sub);
  if (publishErr) return new Response("Publish error", { status: 500 });

  await recordVersion(client, entity_type, entity_id, snap, jwt.sub);
  await recordAudit(client, jwt.sub, "publish", entity_type, entity_id);

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

function hasRole(jwt: any) {
  const roles = jwt?.app_metadata?.roles || [];
  return roles.some((r: string) => ALLOWED_ROLES.includes(r));
}

async function snapshot(client: any, type: string, id: string) {
  const table = tableFor(type);
  const { data } = await client.from(table).select("*").eq("id", id).single();
  return data;
}

async function publish(client: any, type: string, id: string, userId: string) {
  const table = tableFor(type);
  return client
    .from(table)
    .update({ status: "published", published_at: new Date().toISOString(), updated_by: userId })
    .eq("id", id);
}

async function recordVersion(client: any, type: string, id: string, snapshot: any, userId: string) {
  return client.from("versions").insert({
    entity_type: type,
    entity_id: id,
    snapshot,
    created_by: userId,
  });
}

async function recordAudit(client: any, userId: string, action: string, type: string, id: string) {
  return client.from("audits").insert({
    actor: userId,
    action,
    entity_type: type,
    entity_id: id,
  });
}

function tableFor(type: string) {
  if (type === "page") return "cms_pages";
  if (type === "product") return "cms_products";
  if (type === "blog") return "cms_blogs";
  throw new Error("Unknown entity type");
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (_) {
    return {};
  }
}
