# Admin Analytics
Purpose: Dashboards and activity views for operators.

Routes:
- /admin/analytics (main KPIs), /admin/activity (event feed).

Data sources:
- Supabase analytics tables (tbd), event stream, product metrics.

Key modules:
- data/ (queries), logic/ (aggregations), hooks/ (view models), ui/pages (AnalyticsPage, ActivityPage, DashboardPage).

Roadmap:
- Wire real data sources, define KPI owners, add time-range controls.
