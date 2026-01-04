// Preview Edge Function (draft, staging) - Deno style
// Not deployed yet; keep in docs until we wire staging.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

const ALLOWED_ROLES = ["admin"];
const DRAFT_STATUSES = ["draft", "in_review"];

function hasRole(jwt: any) {
  const roles = jwt?.app_metadata?.roles || [];
  return roles.some((r: string) => ALLOWED_ROLES.includes(r));
}

function signDraftUrl(bucket: string, path: string, expires = 600) {
  return supabase.storage.from(bucket).createSignedUrl(path, expires);
}

export default async (req: Request) => {
  try {
    const authHeader = req.headers.get("Authorization") || "";
    const jwt = parseJwt(authHeader.replace("Bearer ", ""));
    if (!hasRole(jwt)) return new Response("Forbidden", { status: 403 });

    const url = new URL(req.url);
    const type = url.searchParams.get("type"); // page | product | blog
    const slug = url.searchParams.get("slug");
    if (!type || !slug) return new Response("Bad Request", { status: 400 });

    let data = null;
  if (type === "page") data = await fetchPage(slug);
  if (type === "product") data = await fetchProduct(slug);
  if (type === "blog") data = await fetchBlog(slug);
  if (!data) return new Response("Not Found", { status: 404 });

    // Sign any draft-media references
    data = await signMedia(data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response("Error", { status: 500 });
  }
};

async function fetchPage(slug: string) {
  const { data: page } = await supabase
    .from("cms_pages")
    .select("*, cms_sections(*)")
    .eq("slug", slug)
    .in("status", DRAFT_STATUSES)
    .single();
  return page;
}

async function fetchProduct(handle: string) {
  const { data: product } = await supabase
    .from("cms_products")
    .select("*, cms_product_media(*)")
    .eq("handle", handle)
    .in("status", DRAFT_STATUSES)
    .single();
  return product;
}

async function fetchBlog(slug: string) {
  const { data: blog } = await supabase
    .from("cms_blogs")
    .select("*, cms_blog_blocks(*)")
    .eq("slug", slug)
    .in("status", DRAFT_STATUSES)
    .single();
  return blog;
}

async function signMedia(payload: any) {
  // sign section images
  if (payload.cms_sections) {
    for (const s of payload.cms_sections) {
      const img = s?.data?.image;
      if (img?.path && img.path.startsWith("draft/")) {
        const { data } = await signDraftUrl("draft-media", img.path);
        if (data?.signedUrl) s.data.image.signedUrl = data.signedUrl;
      }
    }
  }
  // product media
  if (payload.cms_product_media) {
    for (const m of payload.cms_product_media) {
      if (m.path?.startsWith("draft/")) {
        const { data } = await signDraftUrl("draft-media", m.path);
        if (data?.signedUrl) m.signedUrl = data.signedUrl;
      }
    }
  }
  // blog hero
  if (payload.hero_media_path?.startsWith("draft/")) {
    const { data } = await signDraftUrl("draft-media", payload.hero_media_path);
    if (data?.signedUrl) payload.hero_media_signed = data.signedUrl;
  }
  // blog blocks images
  if (payload.blog_blocks) {
    for (const b of payload.cms_blog_blocks) {
      if (b.type === "image" && b.data?.path?.startsWith("draft/")) {
        const { data } = await signDraftUrl("draft-media", b.data.path);
        if (data?.signedUrl) b.data.signedUrl = data.signedUrl;
      }
    }
  }
  return payload;
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
