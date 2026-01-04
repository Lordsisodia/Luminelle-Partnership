# POC notes — ILLA Builder admin/bulk-ops primitives (internal tools builder)

Repo: `illacloud/illa-builder` (Apache-2.0)

Goal (2 days): evaluate ILLA Builder as an accelerator for Lumelle admin surfaces (Returns Ops, bulk actions) and extract:
- the “page + canvas + widgets” architecture (how an app is composed)
- how actions/resources are modeled and executed (REST/GraphQL/DB connectors)
- collaboration / presence patterns (rooms, share, collaborators)
- what it would take to embed vs run as a separate internal app

Guardrails:
- This is a tooling accelerator POC, not a long-term dependency decision yet.
- Security posture matters: RBAC must ultimately be enforced on *our API* (not in the UI builder alone).

---

## Concrete file pointers (high signal)

### App composition (builder shell)
- `apps/builder/src/page/App/index.tsx`
  - Uses router params (`useParams`) to get `appId`
  - Composes the main builder surface from modules:
    - `PageNavBar`
    - `CanvasPanel`
    - `ActionEditor` (bottom panel)
  - Calls `Connection.joinRoom/leaveRoom(\"app\", appId)` (collaboration/presence room concept)

### Canvas (UI layout / widgets)
- `apps/builder/src/page/App/Module/CanvasPanel/index.tsx`
  - Canvas panel container; composes the “DotPanel”/canvas area
  - Primary entrypoint for reading the widget/render pipeline

### “Data workspace” (pages/actions/resources tree)
- `apps/builder/src/page/App/Module/DataWorkspace/index.tsx`
- `apps/builder/src/page/App/Module/DataWorkspace/components/ActionSpaceTree/index.tsx`
  - Reads action list and selected action from Redux selectors
  - Dispatches selection changes into config slice
- `apps/builder/src/page/App/Module/DataWorkspace/components/PageSpaceTree/index.tsx`
  - Generates pages via `generatePageConfig()` and dispatches `addPageNodeWithSortOrderReducer`
  - Shows how pages/subpages are modeled and navigated

### Action editor (queries/actions execution surface)
- `apps/builder/src/page/App/Module/ActionEditor/index.tsx`
  - Pulls action list from Redux and renders editor “when actions exist”
  - Includes tracking hooks and focus management

### Navigation + collaboration controls
- `apps/builder/src/page/App/Module/PageNavBar/index.tsx`
  - Includes components like `CollaboratorsList`, `ShareAppButton`, deploy controls, etc.

---

## Mapping → Lumelle admin primitives

### Returns Ops internal tool (target POC)

We should validate whether ILLA can support:
- list view with server-side filter/search
- bulk select + bulk action confirmations
- detail view with activity timeline + action panel

Boundary:
- ILLA calls our Admin API.
- Authorization must be enforced on the Admin API:
  - roles: `ops_agent`, `ops_manager`, `admin`
  - audit every bulk action (later can feed Retraced)

---

## POC plan (2 days)

Day 1:
- Bring up ILLA locally (docker/self-host path per README).
- Create a mocked Returns Ops API with 3 endpoints:
  - `GET /returns?status=&q=` (list)
  - `POST /returns/bulk` (approve/deny/store-credit)
  - `GET /returns/{id}` (detail)
- Build the list view + bulk select + bulk action UI.

Day 2:
- Validate “safe bulk actions” UX:
  - preview/dry-run pattern (if possible)
  - confirmation copy + affected-count display
  - failure handling per row vs whole batch
- Validate collaboration posture:
  - does app room/presence translate into operator safety (who is editing what)?
- Produce a decision note:
  - `adopt as accelerator` vs `reject (too heavy/risky)` vs `deepen`

---

## Risks + mitigations

- Risk: security posture / access control drift.
  - Mitigation: API-enforced RBAC + audit logs; treat ILLA as a client.
- Risk: long-term lock-in of UI logic.
  - Mitigation: keep API contracts explicit; treat builder apps as replaceable shells.
- Risk: performance for large datasets.
  - Mitigation: enforce server-side pagination/filtering; avoid client-side full loads.

