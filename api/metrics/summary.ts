import { getPgPool } from "../../app/src/server/db";

export default async function handler(_req: Request) {
  const pool = getPgPool();
  const [{ rows: orows }, { rows: crows }] = await Promise.all([
    pool.query('SELECT count(*)::int as count, coalesce(sum(total),0)::numeric as revenue FROM "ShopOrders"'),
    pool.query('SELECT count(*)::int as customers FROM "ShopCustomers"'),
  ]);
  const totalOrders = orows[0]?.count || 0;
  const totalRevenue = Number(orows[0]?.revenue || 0);
  const { rows: last } = await pool.query(
    'SELECT coalesce(sum(total),0)::numeric as revenue, count(*)::int as count FROM "ShopOrders" WHERE created_at >= now() - interval \'30 days\'',
  );
  const lastRevenue = Number(last[0]?.revenue || 0);
  const lastCount = last[0]?.count || 0;
  const aov30 = lastCount ? lastRevenue / lastCount : 0;
  return new Response(
    JSON.stringify({ totalOrders, totalRevenue, customers: crows[0]?.customers || 0, last30: { orders: lastCount, revenue: lastRevenue, aov: aov30 } }),
    { headers: { 'content-type': 'application/json' } },
  );
}

