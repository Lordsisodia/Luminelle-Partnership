// Shopify -> Supabase ingest (draft, staging). Not executed; reference only.
import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL_ADMIN!;
const SUPABASE_ANON = process.env.VITE_SUPABASE_ANON_KEY_ADMIN!;
const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

async function main() {
  const products = await fetchProducts();
  for (const p of products) {
    await upsertProduct(p);
    await upsertMedia(p);
  }
  console.log("Ingest complete");
}

async function fetchProducts() {
  const query = `
  {
    products(first: 10) {
      edges {
        node {
          id
          handle
          title
          description
          tags
          images(first: 5) { edges { node { originalSrc altText } } }
          priceRange { minVariantPrice { amount } }
        }
      }
    }
  }`;
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2023-07/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  return json.data.products.edges.map((e: any) => e.node);
}

async function upsertProduct(p: any) {
  const { error } = await supabase.from("products").upsert({
    handle: p.handle,
    title: p.title,
    short_desc: p.description?.slice(0, 200),
    long_desc: p.description,
    price: p.priceRange?.minVariantPrice?.amount,
    tags: p.tags,
    status: "draft",
  });
  if (error) console.error("product upsert error", p.handle, error);
}

async function upsertMedia(p: any) {
  // placeholder: download each image, convert to WebP client-side, upload to product-media bucket
  // then insert product_media rows. Omitted here to keep reference-only.
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
