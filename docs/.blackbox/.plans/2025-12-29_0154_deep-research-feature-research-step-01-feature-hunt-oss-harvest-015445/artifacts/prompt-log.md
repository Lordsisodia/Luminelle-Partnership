---
status: active
last_reviewed: 2025-12-29
owner: agent
---

# Prompt log (exact prompts used)

## Cycle 1 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 59 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 58 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 41 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 57 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to Step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 56 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to Step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 55 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to Step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 54 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to Step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 53 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to Step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 52 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to Step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 51 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to Step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 50 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to Step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 49 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to Step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 48 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to Step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 47 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to Step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 46 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 45 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 44 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 43 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 42 — 2025-12-30

```text
## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.
```

## Cycle 29 — 2025-12-30 10:12 UTC

```md
User prompt: "continue doing this"

Operating procedure: continue applying the build-vs-integrate rubric in
`artifacts/build-vs-integrate-agent.md` tranche-by-tranche and logging changes per autopilot rules.
```

## Cycle 30 — 2025-12-30 10:16 UTC

```md
User prompt: "conitue doing this"

Action taken: applied build-vs-integrate rubric to Tranche #5 (Analytics & QA) and extended the matrix with evidence-backed recommendations.
```

## Cycle 31 — 2025-12-30 10:19 UTC

```md
User prompt: "conitue doing this"

Action taken: applied build-vs-integrate rubric to Tranche #8 (Security & compliance) and extended the matrix with OSS authz + IdP vs custom surfaces decisions.
```

## Cycle 32 — 2025-12-30 10:24 UTC

```md
User prompt: "conitue doing this"

Action taken: applied build-vs-integrate rubric to Tranche #17 (Observability) and extended the matrix with OSS/hosted stack vs minimal custom ops surfaces decisions.
```

## Cycle 33 — 2025-12-30 10:28 UTC

```md
User prompt: "conitue doing this"

Action taken: applied build-vs-integrate rubric to Tranche #23 (Subscription ops) and extended the matrix with Shopify subscription primitives vs custom portal/policy UX decisions.
```

## Cycle 34 — 2025-12-30 10:31 UTC

```md
User prompt: "conitue doing this"

Action taken: applied build-vs-integrate rubric to Tranche #15 (Approvals & tasks) and extended the matrix with custom UX + OSS queues/schedulers + 3P comms decisions.
```

## Cycle 35 — 2025-12-30 10:35 UTC

```md
User prompt: "conitue doing this"

Action taken: applied build-vs-integrate rubric to Tranche #24 (Returns analytics + fraud gating) and extended the matrix with Shopify Return/Refund truth + custom risk/policy workbench + optional 3P IDV decisions.
```

## Cycle 36 — 2025-12-30 10:40 UTC

```md
User prompt: "conitue doing this"

Action taken: applied build-vs-integrate rubric to Tranche #18 (Admin IA) and extended the matrix with custom UX + OSS building blocks (search, command palette, tables) decisions.
```

## Cycle 37 — 2025-12-30 10:44 UTC

```md
User prompt: "conitue doing this"

Action taken: applied build-vs-integrate rubric to Tranche #20 (Merchandising rules) and extended the matrix with “Shopify catalog truth → external search layer + custom merch rules UI” decisions.
```

## Cycle 38 — 2025-12-30 10:48 UTC

```md
User prompt: "conitue doing this"

Action taken: applied build-vs-integrate rubric to Tranche #21 (Catalog governance) and extended the matrix with “Shopify catalog truth + custom QA/bulk UX + governed mutations” decisions.
```

## Cycle 39 — 2025-12-30 10:52 UTC

```md
User prompt: "conitue doing this"

Action taken: applied build-vs-integrate rubric to Tranche #22 (Promotions admin) and extended the matrix with Shopify discount primitives vs custom ops UX + measurement layer decisions.
```

## Cycle 40 — 2025-12-30 10:56 UTC

```md
User prompt: "conitue doing this"

Action taken: applied build-vs-integrate rubric to Tranche #19 (Data governance) and extended the matrix with custom governance workflows + OSS jobs + Shopify bulk export decisions.
```

## Cycle 28 — 2025-12-30 10:07 UTC

```md
User direction (build vs integrate):

- “I want you to go through all of these and figure out what is better to leverage through the API… determine whether it's better to connect to an open-source software or if we should actually just code it out. Let's design an agent to go through this and continue doing this.”

Autopilot prompt (used as operating procedure):

# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> \"Checkpoint: <1 line>\"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 27 — 2025-12-29 15:28 UTC

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 26 — 2025-12-29 15:18 UTC

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 25 — 2025-12-29 15:11 UTC

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 24 — 2025-12-29 15:02 UTC

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 23 — 2025-12-29 14:54 UTC

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 22 — 2025-12-29 14:43 UTC

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 20 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 19 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 18 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 17 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 16 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 15 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 2 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 3 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 4 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 5 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 6 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 7 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 8 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 9 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 10 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 11 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> "Checkpoint: <1 line>"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 12 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> \"Checkpoint: <1 line>\"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 13 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> \"Checkpoint: <1 line>\"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```

## Cycle 14 — 2025-12-29 (local) — Autopilot prompt

```md
# 🤖 Autopilot Prompt (single prompt you can spam)

Paste this **unchanged** into any of the 4 research agents.

The agent will self-configure by reading `artifacts/feature-research-config.yaml` inside its plan folder.

---

## ✅ Autopilot: Feature Research (MD-first, self-directing)

You are running inside `docs/.blackbox/.plans/<this-run>/`.

### 🧭 First, locate your plan folder

You must identify your current plan folder path (the folder that contains `artifacts/feature-research-config.yaml`).

### 📌 Non-negotiable rules

- ⏱️ Work in **45 minute cycles** (unless the human changes it).
- 🧾 Evidence-first: every claim must include a URL or an evidence/snapshot file path.
- 🧱 Each cycle must update at least **one artifact file** in your plan folder.
- 🧠 Each cycle must write a **checkpoint step file** in `context/steps/` with real bullets (no `<fill>`).
- 🧼 Bullets only; keep each competitor/repo summary compact.
- ⚖️ License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown.

### 🗂️ Required logs (MD-first)

Maintain these files in your plan `artifacts/`:
- `agent-plan.md` — your plan + next 3 actions (update every cycle)
- `prompt-log.md` — append the exact prompt used for the cycle (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills you used (search, snapshot, extraction, ranking, license check)

If any of these are missing, create them (minimal headers) before starting work.

### 🧠 Cycle loop (repeat forever until stopped)

For each cycle:

1) 🧠 **Load context (max 5 min)**
   - read `artifacts/feature-research-config.yaml` to determine your role:
     - role is one of: `step-01`, `step-02`, `step-03`, `step-04`, `synthesis`
   - read `artifacts/start-here.md`
   - read `context/context.md` and the most recent step file in `context/steps/` (if present)

2) 🎯 **Choose next action (max 3 min)**
   - pick the highest leverage action that either:
     - closes a known gap (missing evidence / missing OSS mapping / missing proofs), OR
     - produces build-ready output (workflow + thin slice + evidence)
   - set an N limit:
     - step-02/03: N=3–6 competitors
     - step-04: N=3–5 OSS repos
     - step-01: 10–25 feature bullets + 3–8 OSS pointers
   - write the chosen action into `artifacts/agent-plan.md` (so humans can see it)

3) 🔎 **Execute (30–35 min)**
   - gather evidence quickly
   - update artifacts in place (don’t make new folders)
   - if a site blocks you, label it `blocked_evidence` and move on

4) 🧩 **Synthesize (5–10 min)**
   - add 3–7 durable insights to your plan `artifacts/summary.md`
   - ensure evidence links are present

5) 🧾 **Log + checkpoint (max 5 min)**
   - append to `artifacts/prompt-log.md`:
     - cycle number, timestamp, and the exact prompt used (this whole prompt)
   - append to `artifacts/output-index.md`:
     - list changed files + 1-line reason for each
   - append to `artifacts/skills-log.md`:
     - what skills were used and why (keep 3–7 bullets)
   - write a checkpoint step file using:
     - from `docs/`: `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<your-plan> \"Checkpoint: <1 line>\"`
     - then fill the step file with real bullets

### ✅ Role-specific focus (self-direct)

- If role = `step-01`:
  - build the feature universe + workflows + thin-slice scopes
  - keep OSS as pointers only (deep OSS belongs to step-04)

- If role = `step-02`:
  - deepen core competitors; update `artifacts/competitor-matrix.md` and `competitors/evidence/*.md`

- If role = `step-03`:
  - deepen adjacent competitors (platform primitives); update `artifacts/competitor-matrix.md` and evidence files

- If role = `step-04`:
  - deepen OSS repos into adoption plans + license notes; update `oss/entries/` + `artifacts/oss-candidates.md`

- If role = `synthesis`:
  - read `artifacts/next-actions.md` + `artifacts/gaps-report.md`
  - update the “single pane of glass” outputs (ranked features, thin slices, backlog) and keep deltas visible

### 🛑 Stop conditions

- Stop immediately if asked by a human.
- If you hit the timebox for the cycle: stop, log, checkpoint, and only then start the next cycle.

Now begin Cycle 1.
```
