# Prompt Log

Append-only log of the exact prompt(s) used per cycle / work session.

## 2025-12-30

- 2025-12-30 23:18 — Resume + next-steps run (Codex CLI): fix missing logs, complete Step 0003, then close Tier‑B evidence gaps for Andie Swim + Uniqlo and regenerate summaries.
- 2025-12-30 23:23 — Added Andie Swim + Uniqlo Tier‑B seeds, captured snapshots, regenerated reports, and updated Tier‑A checklist sections.
- 2025-12-30 23:35 — Generated per-store rollups + patterns synthesis from the Tier‑B pack and promoted the strongest new evidence into canonical docs (benchmark + checklist + backlog mapping).
- 2025-12-31 05:34 — Hardened label parsing across scripts and scaffolded a Top‑25 manual audit folder with preflight injected from the Tier‑B funnel pack.
- 2025-12-31 05:55 — Generated Top‑25 audit briefs (targets + signals + “extra captures”) to accelerate Tier‑A screenshot audits.
- 2025-12-31 05:59 — Added Top‑25 audit scorecard + guide (validated) to support scoring automation after Tier‑A screenshots.
- 2025-12-31 06:01 — Scaffolded Top‑25 evidence folders + per-store CHECKLIST.md files and generated a Top‑25 pattern capture checklist for screenshot→pattern→backlog updates.
- 2025-12-31 06:06 — Added a Top‑25 Batch‑01 Tier‑A audit queue and linked it from the audit dashboard.
- 2025-12-31 06:09 — Added Batch‑02 and Batch‑03 Tier‑A audit queues and linked them from the audit dashboard.
- 2025-12-31 06:16 — Fixed remaining evidence-path references (Batch‑02/03 + plan output index) and validated `postprocess_store_audit.py` end-to-end via `--dry-run` for `andie-swim` (pipeline ready; reports generated).
- 2025-12-31 06:21 — Updated operator docs: added postprocess commands + evidence links to the Top‑25 audit dashboard and refreshed the evidence capture guide to use `<active-run>` paths + current run example.
- 2025-12-31 06:32 — Generated a Top‑100 women’s fashion “store cards” markdown view from the scored matrix and linked it from the benchmarking README.
- 2025-12-31 06:35 — Generated a feature→exemplar index (women’s fashion + cross‑niche) and linked it from the benchmarking README.
- 2025-12-31 06:38 — Generated a segment-level “top 3 model stores per segment” summary and linked it from the benchmarking README.
- 2025-12-31 06:41 — Generated a Top‑50 apparel-first expansion queue (next 25 beyond the current Top‑25 audit set) and linked it from the benchmarking README.
- 2025-12-31 06:50 — Converted Top‑25 Tier‑B rollups into (1) a Tier‑A audit ROI map and (2) a Top‑25 evidence-led backlog shortlist; linked both from the benchmark hub / audit docs.
- 2025-12-31 06:55 — Generated an evidence-linked “Top 10 MVP backlog” for women’s fashion (explicitly flags items that still require Tier‑A screenshots) and linked it from the benchmark hub.
- 2025-12-31 06:57 — Wrote a one-page executive summary (what we learned + evidence tiers + recommended next actions) and linked it from the benchmarking hub.

## 2025-12-31

- 2025-12-31 09:08 — Cycle: cart/checkout Tier‑B supplement + express checkout prevalence scan. Prompt used (verbatim):

```text
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

- 2025-12-31 19:27 — Cycle: Tier‑A cart add‑to‑cart automation + cart shipping threshold evidence capture. Prompt used (verbatim):

```text
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

## 2025-12-31 14:35 (Cycle: delivery estimate capture)

```text
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

## 2025-12-31 13:45 (Cycle: Tier‑A returns portal evidence)

```text
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

- 2025-12-31 12:08 — Cycle: capture extra Tier‑B snapshots for wishlist/back‑in‑stock pages and update pattern cards to use stronger primary evidence. Prompt used (verbatim):

```text
Okay, this is what we need to do:
 
  1. Figure out your next steps
  2. At the end of each step, determine if you want to continue
 
  I give you complete free will to continue gathering, analyzing, and organizing this data in whatever steps you
  want. However, do not ask me for input; I want you to figure it all out yourself using extra reasoning.
```

- 2025-12-31 11:59 — Cycle: promote new pattern cards into the Top‑25 evidence-led backlog shortlist. Prompt used (verbatim):

```text
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

- 2025-12-31 09:11 — Continue autonomously. Prompt used (verbatim):

```text
Okay, this is what we need to do:
 
  1. Figure out your next steps
  2. At the end of each step, determine if you want to continue
 
  I give you complete free will to continue gathering, analyzing, and organizing this data in whatever steps you
  want. However, do not ask me for input; I want you to figure it all out yourself using extra reasoning.
```

- 2025-12-31 10:37 — Cycle: close remaining pattern-card gaps (wishlist, back-in-stock, shipping threshold) using Tier‑B evidence. Prompt used (verbatim):

```text
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
