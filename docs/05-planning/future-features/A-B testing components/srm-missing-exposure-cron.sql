-- SRM + missing-exposure checks (run daily via Supabase cron)
-- Adjust schema/table names as needed.

-- 1) Sample Ratio Mismatch per experiment (last 7 days)
with splits as (
  select key as experiment_key,
         (jsonb_array_elements(default_split)->>'variant') as variant,
         ((jsonb_array_elements(default_split)->>'weight')::float) as weight
  from experiments
  where status = 'live'
),
obs as (
  select experiment_key, variant, count(*) as exposures
  from experiment_exposures
  where occurred_at > now() - interval '7 days'
  group by 1,2
),
stats as (
  select s.experiment_key,
         s.variant,
         coalesce(o.exposures,0) as exposures,
         s.weight / nullif(sum(s.weight) over (partition by s.experiment_key),0) as expected_share,
         coalesce(o.exposures,0)::float / nullif(sum(o.exposures) over (partition by s.experiment_key),0) as observed_share
  from splits s
  left join obs o on o.experiment_key = s.experiment_key and o.variant = s.variant
)
select *
from stats
where abs(observed_share - expected_share) > 0.05; -- flag >5% deviation


-- 2) Missing exposure check: events without matching exposure in same session (last 7 days)
select ev.experiment_key,
       ev.session_id,
       count(*) as orphan_events
from events ev
left join experiment_exposures ex
  on ex.experiment_key = ev.experiment_key
 and ex.session_id = ev.session_id
where ev.experiment_key is not null
  and ev.occurred_at > now() - interval '7 days'
  and ex.id is null
group by 1,2
having count(*) > 0;
