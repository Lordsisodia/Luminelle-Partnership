import { getPgPool } from "../_lib/db.js";

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const days = Math.min(parseInt(url.searchParams.get('days') || '30', 10), 365)
  const pool = getPgPool();
  const { rows } = await pool.query(
    `with attrs as (
       select (jsonb_array_elements(coalesce(raw->'note_attributes','[]'::jsonb))->>'name') as name,
              (jsonb_array_elements(coalesce(raw->'note_attributes','[]'::jsonb))->>'value') as value
         from "ShopOrders" where coalesce(processed_at, created_at) >= now() - ($1 || ' days')::interval
     )
     select value as utm_source, count(*)::int as orders
       from attrs
      where lower(name) = 'utm_source' and value is not null and value <> ''
      group by 1 order by orders desc limit 10`,
    [days]
  );
  return new Response(JSON.stringify(rows), { headers: { 'content-type': 'application/json' } });
}
