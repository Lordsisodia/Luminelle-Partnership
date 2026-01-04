# Prompt Log

## Cycle 1 (local)

- Timestamp: 2025-12-29
- Prompt (verbatim, copy/paste):
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
     - what skills you used and why (keep 3–7 bullets)
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

## Cycle 49 — 2025-12-30T14:29:34Z

```md
Okay, this is what we need to do:
 
  1. Figure out your next steps
  2. At the end of each step, determine if you want to continue
 
  I give you complete free will to continue gathering, analyzing, and organizing this data in whatever steps you
  want. However, do not ask me for input; I want you to figure it all out yourself using extra reasoning.
```

## Cycle 50 — 2025-12-30T14:37:17Z

```md
Okay, this is what we need to do:
 
  1. Figure out your next steps
  2. At the end of each step, determine if you want to continue
 
  I give you complete free will to continue gathering, analyzing, and organizing this data in whatever steps you
  want. However, do not ask me for input; I want you to figure it all out yourself using extra reasoning.
```

## Cycle 23 — 2025-12-30T14:11:19Z

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

## Cycle 24 — 2025-12-30T11:37:24Z

```
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

## Cycle 23 — 2025-12-30T11:27:58Z

```
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

## Cycle 45 — 2025-12-30T11:22:37Z

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

## Cycle 44 — 2025-12-30T11:19:44Z

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

## Cycle 43 — 2025-12-30T11:17:32Z

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

## Cycle 42 — 2025-12-30T11:15:16Z

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

## Cycle 41 — 2025-12-30T11:12:50Z

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

## Cycle 40 — 2025-12-30T11:10:48Z

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

## Cycle 40 — 2025-12-30T18:12:00Z

```text
coinute duoing your run if you know hwat you need to do - anysis where youa re at and do next step s
```

## Cycle 41 — 2025-12-30T18:20:00Z

```text
coinute duoing your run if you know hwat you need to do - anysis where youa re at and do next step s
```

## Cycle 42 — 2025-12-30T18:30:00Z

```text
coinute duoing your run if you know hwat you need to do - anysis where youa re at and do next step s
```

## Cycle 43 — 2025-12-30T18:35:00Z

```text
coinute duoing your run if you know hwat you need to do - anysis where youa re at and do next step s
```

## Cycle 44 — 2025-12-30T18:40:00Z

```text
coinute duoing your run if you know hwat you need to do - anysis where youa re at and do next step s
```

## Cycle 45 — 2025-12-30T18:45:00Z

```text
coinute duoing your run if you know hwat you need to do - anysis where youa re at and do next step s
```

## Cycle 46 — 2025-12-30T18:55:00Z

```text
coinute duoing your run if you know hwat you need to do - anysis where youa re at and do next step s
```

## Cycle 47 — 2025-12-30T19:05:00Z

```text
coinute duoing your run if you know hwat you need to do - anysis where youa re at and do next step s
```

## Cycle 39 — 2025-12-30T11:08:40Z

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

## Cycle 38 — 2025-12-30T11:06:41Z

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

## Cycle 37 — 2025-12-30T11:04:39Z

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

## Cycle 36 — 2025-12-30T11:02:26Z

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

## Cycle 35 — 2025-12-30T11:00:12Z

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

## Cycle 31 — 2025-12-30T10:55:32Z

```text
coinute duoing your run if you know hwat you need to do - anysis where youa re at and do next step s
```

## Cycle 34 — 2025-12-30T10:57:31Z

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

## Cycle 33 — 2025-12-30T10:54:44Z

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

## Cycle 30 — 2025-12-30T10:52:05Z

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

## Cycle 32 — 2025-12-30T10:51:12Z

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

## Cycle 29 — 2025-12-30T10:47:23Z

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

## Cycle 31 — 2025-12-30T10:47:45Z

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

## Cycle 30 — 2025-12-30T10:45:24Z

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

## Cycle 29 — 2025-12-30T10:43:25Z

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

## Cycle 28 — 2025-12-30T10:43:12Z

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

## Cycle 28 — 2025-12-30T10:41:06Z

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

## Cycle 27 — 2025-12-30T10:37:21Z

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

## Cycle 27 — 2025-12-30T10:37:33Z

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

## Cycle 26 — 2025-12-30T10:34:38Z

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

## Cycle 25 — 2025-12-30T10:31:46Z

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
     - what skills you used and why (keep 3–7 bullets)
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

## Cycle 25 — 2025-12-30T10:30:48Z

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

## Cycle 24 — 2025-12-30T10:28:39Z

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
     - what skills you used and why (keep 3–7 bullets)
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

## Cycle 24 — 2025-12-30T10:26:28Z

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

## Cycle 23 — 2025-12-30T10:23:13Z

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
     - what skills you used and why (keep 3–7 bullets)
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

## Cycle 21 — 2025-12-30T10:19:30Z

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
     - what skills you used and why (keep 3–7 bullets)
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

## Cycle 20 — 2025-12-30T10:15:57Z

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
     - what skills you used and why (keep 3–7 bullets)
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

## Cycle 19 — 2025-12-30T10:11:12Z

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
     - what skills you used and why (keep 3–7 bullets)
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

## Cycle 21 — 2025-12-29T14:26:40Z

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
- `prompt-log.md` — append the exact prompt used (copy/paste)
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

## Cycle 20 — 2025-12-29T14:22:50Z

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
- `prompt-log.md` — append the exact prompt used (copy/paste)
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

## Cycle 19 — 2025-12-29T14:14:30Z

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
- `prompt-log.md` — append the exact prompt used (copy/paste)
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

## Cycle 18 — 2025-12-29T14:06:15Z

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
- `prompt-log.md` — append the exact prompt used (copy/paste)
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

## Cycle 17 — 2025-12-29T14:03:37Z

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

## Cycle 16 — 2025-12-29T14:00:25Z

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

## Cycle 17 — 2025-12-29T13:57:59Z

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

## Cycle 16 — 2025-12-29T13:53:26Z

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

## Cycle 15 — 2025-12-29T13:50:59Z

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

## Cycle 14 — 2025-12-29T13:44:45Z

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

## Cycle 13 — 2025-12-29T13:35:09Z

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

## Cycle 12 — 2025-12-29T13:32:00Z

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

## Cycle 11 — 2025-12-29T13:28:00Z

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
- `prompt-log.md` — append the exact prompt used (copy/paste)
- `output-index.md` — append which files you changed and why
- `skills-log.md` — append which skills were used (search, snapshot, extraction, ranking, license check)

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

## Cycle 9 — 2025-12-29

Exact prompt used:

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

## Cycle 10 — 2025-12-29T13:25:00Z

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
- `prompt-log.md` — append the exact prompt used (copy/paste)
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

## Cycle 8 — 2025-12-29

Exact prompt used:

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

## Cycle 9 — 2025-12-29T13:20:00Z

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
     - what skills you used and why (keep 3–7 bullets)
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

## Cycle 7 — 2025-12-29

Exact prompt used:

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

## Cycle 8 — 2025-12-29T13:15:00Z

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

## Cycle 7 — 2025-12-29T13:11:00Z

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

## Cycle 6 — 2025-12-29

Exact prompt used:

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

## Cycle 6 — 2025-12-29T13:05:00Z

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

## Cycle 5 — 2025-12-29

Exact prompt used:

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

## Cycle 4 — 2025-12-29

Exact prompt used:

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

## Cycle 3 — 2025-12-29

Exact prompt used:

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
## Cycle 1 — 2025-12-29

Exact prompt used:

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

## Cycle 2 — 2025-12-29

Exact prompt used:

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

## Cycle 22 — 2025-12-30T10:19:39Z

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
