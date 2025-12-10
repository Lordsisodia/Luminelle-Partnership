import { getPgPool } from "../../app/src/server/db";

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const days = Math.min(parseInt(url.searchParams.get('days') || '30', 10), 365);
  const pool = getPgPool();
  const { rows } = await pool.query(
    `select date_trunc('day', coalesce(processed_at, created_at))::date as day,
            coalesce(sum(total),0)::numeric as revenue,
            count(*)::int as orders
       from "ShopOrders"
      where coalesce(processed_at, created_at) >= now() - ($1 || ' days')::interval
      group by 1 order by 1 asc`,
    [days],
  );
  return new Response(JSON.stringify(rows), { headers: { 'content-type': 'application/json' } });
}

