# First Experiment Spec — Hero CTA Copy/Style

- Key: `hero_cta_copy`
- Variants:
  - control: current copy/style
  - bold: shorter copy + primary style
- Traffic split: 50/50 (staging first)
- Targeting: all users, all devices
- Metrics:
  - Primary: purchase conversion (purchases / exposures)
  - Secondary: click-through on hero CTA; add_to_cart; begin_checkout
  - Guardrails: bounce rate, LCP > keep under existing threshold
- Start: after staging validation
- End: run to min sample for +5–7% MDE or 14 days, whichever later
- Decision rule: p<0.05, lift>0, no guardrail breach
- Rollout: set split to 100/0 for winner; pause experiment
- QA steps:
  - Verify exposures logged once per session
  - Verify CTA click logs `event` with experiment context
  - Check SRM after first 24h
