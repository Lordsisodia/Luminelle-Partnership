// Rollback Edge Function (draft, staging) - Deno style
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
  const { entity_type, entity_id, version_id } = body;
  if (!entity_type || !entity_id || !version_id) return new Response("Bad Request", { status: 400 });

  const { data: version } = await supabase
    .from("versions")
    .select("snapshot")
    .eq("id", version_id)
    .single();
  if (!version) return new Response("Not Found", { status: 404 });

  const table = tableFor(entity_type);
  const { error } = await supabase.from(table).update(version.snapshot).eq("id", entity_id);
  if (error) return new Response("Rollback error", { status: 500 });

  await supabase.from("audits").insert({
    actor: jwt.sub,
    action: "rollback",
    entity_type,
    entity_id,
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

function hasRole(jwt: any) {
  const roles = jwt?.app_metadata?.roles || [];
  return roles.some((r: string) => ALLOWED_ROLES.includes(r));
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
