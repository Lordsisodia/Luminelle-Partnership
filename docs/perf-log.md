Date | URL | Device | LCP | INP | CLS | Passed? | Top issues | Fixes planned
2025-12-09 | https://lumelle.com/ | mobile | n/a | n/a | n/a | n/a | PSI quota exceeded (pagespeedonline) | Retry tomorrow or with API key
2025-12-09 | critical CSS (penthouse) | n/a | n/a | n/a | n/a | n/a | Error: css should not be empty when hitting live URL (likely needs local preview build) | Run against local preview per CRITICAL-CSS-PLAN.md
2025-12-09 | critical CSS preview attempt | n/a | n/a | n/a | n/a | n/a | Penthouse empty CSS even on local preview; vite preview terminated (code 143) | Needs further investigation; consider using --no-sandbox/adjust viewport or inspect /tmp/vite-preview.log
2025-12-09 | https://lumelle.com/ | mobile | n/a | n/a | n/a | n/a | PSI quota exceeded (shared project) | Provide personal PSI_API_KEY and rerun ./scripts/run-psi.sh
