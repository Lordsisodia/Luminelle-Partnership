-- Store PDP error copy so the page can be fully CMS-driven (excluding top nav/footer).

insert into public.cms_globals(key, data)
values ('pdp_defaults', '{}'::jsonb)
on conflict (key) do nothing;

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{spinWheel}',
    coalesce(data->'spinWheel', '{}'::jsonb) || jsonb_build_object(
      'errors', jsonb_build_object(
        'generic', 'Something went wrong. Please try again.'
      )
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

