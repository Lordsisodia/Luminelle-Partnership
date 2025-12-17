-- Store remaining iframe titles / templates for PDP embeds.

insert into public.cms_globals(key, data)
values ('pdp_defaults', '{}'::jsonb)
on conflict (key) do nothing;

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{featureCalloutsStory}',
    coalesce(data->'featureCalloutsStory', '{}'::jsonb) || jsonb_build_object(
      'videoTitle', 'Lumelle creator video'
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{featuredTikTok}',
    coalesce(data->'featuredTikTok', '{}'::jsonb) || jsonb_build_object(
      'iframeTitleTemplate', '{name} TikTok embed'
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

