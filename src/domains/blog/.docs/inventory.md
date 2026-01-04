# Current Blog Inventory (from `src/content/blog.ts`)

| Slug | Title | Tag | Featured | Date |
| --- | --- | --- | --- | --- |
| lumelle-journal-launch | Welcome to the Lumelle Journal | Journal | Yes | 2025-12-05 |
| frizz-free-showers-seo | Frizz-free showers: the complete steam-proof routine for silk presses | How-to | No | 2025-12-05 |
| silk-press-shower-cap-guide | The ultimate shower-cap guide for silk presses | Frizz-free | Yes | 2025-11-10 |
| protective-styles-in-the-shower | Best shower caps for protective styles (braids, twists, locs) in 2025 | Protective styles | Yes | 2025-11-08 |
| gym-sauna-spa | Gym, sauna, spa: how to keep hair dry everywhere | Lifestyle | No | 2025-11-05 |
| why-satin-matters | Why satin matters: the science of friction, frizz, and liners | Science | No | 2025-11-03 |
| creator-tiktok-scripts | 5 TikTok scripts to show off your hair care routine | Creator tips | No | 2025-11-01 |
| travel-ready-hair-kit | Travel-ready hair kit: pack light, stay frizz-free | Travel | No | 2025-10-29 |
| wash-day-mistakes | Wash-day mistakes that cause frizz (and quick fixes) | How-to | No | 2025-10-27 |
| refresh-and-clean-cap | How to clean and refresh a luxury shower cap | Care | No | 2025-10-25 |
| steam-proof-bathroom | Steam-proof your bathroom in 10 minutes | Tips | No | 2025-10-20 |
| hairline-health-bands | Hairline health: gentle bands vs tight elastics | Science | No | 2025-10-18 |

## Notes
- Content lives in `src/content/blog.ts` as a typed array of `BlogPost`.
- `featured: true` controls which items show in the Featured grid on the index.
- Posts carry optional `sections` (structured body) and `faqs`; `body` is used as fallback prose.
- `ogImage` is optional; `cover` drives hero images/cards.
- Date strings are ISO; rendered with `toLocaleDateString` in the UI.

