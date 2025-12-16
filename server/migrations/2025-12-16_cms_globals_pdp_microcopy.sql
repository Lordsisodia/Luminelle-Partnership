-- Add remaining PDP microcopy (labels, loading states, accessibility strings)
-- to cms_globals.pdp_defaults without creating dozens of extra tables.
--
-- This is intentionally a JSONB merge so we can evolve copy without schema churn.

-- Ensure pdp_defaults exists (older environments)
insert into public.cms_globals(key, data)
values ('pdp_defaults', '{}'::jsonb)
on conflict (key) do nothing;

update public.cms_globals
set
  data = (
    data
    -- Marketing layout bits used on PDP
    || jsonb_build_object(
      'marketingLayout',
      coalesce(data->'marketingLayout', '{}'::jsonb) || jsonb_build_object(
        'subtitle', 'Product'
      )
    )
  ),
  updated_at = now()
where key = 'pdp_defaults';

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{priceBlock}',
    coalesce(data->'priceBlock', '{}'::jsonb) || jsonb_build_object(
      'shareAriaLabel', 'Share product',
      'jumpToReviewsAriaLabel', 'Jump to reviews',
      'addingLabel', 'Adding...',
      'processingLabel', 'Processing...'
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{bottomCta}',
    coalesce(data->'bottomCta', '{}'::jsonb) || jsonb_build_object(
      'addingLabel', 'Adding…',
      'processingLabel', 'Processing…'
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{heroMedia}',
    coalesce(data->'heroMedia', '{}'::jsonb) || jsonb_build_object(
      'productVideoTitle', 'Lumelle product video',
      'mainImageAlt', 'Lumelle product detail',
      'videoThumbSrc', '/uploads/luminele/product-feature-03.webp',
      'videoThumbAlt', 'Video',
      'thumbnailAriaLabelTemplate', 'Show media {index}'
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{featureCalloutsStory}',
    coalesce(data->'featureCalloutsStory', '{}'::jsonb) || jsonb_build_object(
      'loadingLabel', 'Loading…'
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{faqSection}',
    coalesce(data->'faqSection', '{}'::jsonb) || jsonb_build_object(
      'customerReviewLabel', 'Customer review',
      'noAnswersMatchCopy', 'No answers matched that search—reset the filter or send us a quick WhatsApp message.',
      'defaultCtaHref', 'https://wa.me/message/lumellecaps',
      'defaultCtaLabel', 'Chat with WhatsApp concierge'
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
      'loadingLabel', 'Loading…',
      'watchOnTikTokLabel', 'Watch on TikTok',
      'scrollLeftAriaLabel', 'Scroll videos left',
      'scrollRightAriaLabel', 'Scroll videos right',
      'goToSlideAriaLabelTemplate', 'Go to TikTok slide {index}',
      'statusLineTemplate', 'Showing TikTok slide {active} of {total}'
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

update public.cms_globals
set
  data = jsonb_set(
    data,
    '{spinWheelPrompt}',
    coalesce(data->'spinWheelPrompt', '{}'::jsonb) || jsonb_build_object(
      'enabled', true,
      'ctaLabel', 'Spin to win',
      'dismissAriaLabel', 'Dismiss spin to win',
      'closeAriaLabel', 'Close spin wheel'
    ),
    true
  ),
  updated_at = now()
where key = 'pdp_defaults';

