# Admin Analytics subdomain

Purpose
- Admin analytics surfaces (dashboards, activity) at /admin/analytics and related routes.

Structure
- data/ — query/fetch adapters for analytics sources.
- logic/ — transformations/aggregations for charts and KPIs.
- hooks/ — view-model hooks feeding UI.
- ui/ — pages and components that render data; keep business logic in hooks/logic.

Notes
- Keep pages lean; prefer hooks for state and derived data.
