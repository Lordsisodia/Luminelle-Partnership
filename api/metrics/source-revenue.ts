import { getPgPool } from "../../app/src/server/db";

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const days = Math.min(parseInt(url.searchParams.get('days') || '30', 10), 365)
  const pool = getPgPool();
  const { rows } = await pool.query(
    `with attrs as (
       select (jsonb_array_elements(coalesce(raw->'note_attributes','[]'::jsonb))->>'name') as name,
              (jsonb_array_elements(coalesce(raw->'note_attributes','[]'::jsonb))->>'value') as value,
              total, coalesce(processed_at, created_at) as ts
         from "ShopOrders"
     )
     select value as utm_source,
            coalesce(sum(total),0)::numeric as revenue,
            count(*)::int as orders
       from attrs
      where lower(name) = 'utm_source' and value is not null and value <> ''
        and ts >= now() - ($1 || ' days')::interval
      group by 1
      order by revenue desc limit 10`,
    [days]
  );
  return new Response(JSON.stringify(rows), { headers: { 'content-type': 'application/json' } });
}
