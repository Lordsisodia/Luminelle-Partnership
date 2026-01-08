import fs from "node:fs";
import path from "node:path";

const TRACKER_PATH =
  "docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md";
const ACTIVE_DIR = "docs/06-quality/feedback/ui-issue-tracker/ui-issues";
const DONE_DIR = "docs/06-quality/feedback/ui-issue-tracker/done-issues";

function splitMarkdownRow(line) {
  // Supports escaped pipes (\|) inside markdown table cells.
  const cells = [];
  let cur = "";
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const prev = i > 0 ? line[i - 1] : "";
    if (ch === "|" && prev !== "\\") {
      cells.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }

  let trimmed = cells;
  if (trimmed.length && trimmed[0].trim() === "") trimmed = trimmed.slice(1);
  if (trimmed.length && trimmed.at(-1)?.trim() === "") trimmed = trimmed.slice(0, -1);
  return trimmed.map((c) => c.trim());
}

function readTrackerRows() {
  const text = fs.readFileSync(TRACKER_PATH, "utf8");
  const lines = text.split(/\r?\n/);

  let inFull = false;
  let seenHeader = false;
  const rows = [];

  for (const line of lines) {
    if (line.trim() === "## Full tracker (includes completed / closed)") {
      inFull = true;
      continue;
    }
    if (!inFull) continue;

    if (!seenHeader) {
      if (line.includes("| ID | Area | Title | Impact")) seenHeader = true;
      continue;
    }

    if (!/^\|\s*\d+\s*\|/.test(line)) continue;
    const parts = splitMarkdownRow(line);
    if (parts.length !== 10) continue;

    rows.push({
      id: Number(parts[0]),
      area: parts[1],
      title: parts[2],
      impact: parts[3],
      reach: parts[4],
      effort: parts[5],
      confidence: parts[6],
      priority: Number(parts[7]),
      status: parts[8],
      worklogCell: parts[9],
    });
  }

  return rows;
}

function listIssueFiles(dir) {
  if (!fs.existsSync(dir)) return new Set();
  const files = fs.readdirSync(dir);
  const ids = new Set();
  for (const f of files) {
    const m = /^issue-(\d{3})\.md$/.exec(f);
    if (!m) continue;
    ids.add(Number(m[1]));
  }
  return ids;
}

function main() {
  if (!fs.existsSync(TRACKER_PATH)) {
    console.error(`Missing tracker: ${TRACKER_PATH}`);
    process.exit(1);
  }

  const rows = readTrackerRows();
  const counts = new Map();
  for (const r of rows) counts.set(r.status, (counts.get(r.status) ?? 0) + 1);

  const activeIds = listIssueFiles(ACTIVE_DIR);
  const doneIds = listIssueFiles(DONE_DIR);

  const openStatuses = new Set([
    "UNTRIAGED",
    "VERIFYING",
    "PLANNED",
    "IN_PROGRESS",
    "VALIDATING",
    "NEEDS_DECISION",
  ]);
  const closedStatuses = new Set(["DONE", "NOT_AN_ISSUE", "DUPLICATE", "DEFERRED"]);

  console.log(`Black Box status`);
  console.log(`- Tracker: ${TRACKER_PATH}`);
  console.log(`- Total rows parsed: ${rows.length}`);
  console.log(``);
  console.log(`Counts by status:`);
  for (const [status, count] of [...counts.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`- ${status}: ${count}`);
  }

  const inProgress = rows.filter((r) => r.status === "IN_PROGRESS");
  const validating = rows.filter((r) => r.status === "VALIDATING");
  const needsDecision = rows.filter((r) => r.status === "NEEDS_DECISION");

  console.log(``);
  console.log(`Hot list:`);
  if (inProgress.length === 0) console.log(`- IN_PROGRESS: none`);
  else console.log(`- IN_PROGRESS: ${inProgress.map((r) => `#${r.id}`).join(", ")}`);
  if (validating.length === 0) console.log(`- VALIDATING: none`);
  else console.log(`- VALIDATING: ${validating.map((r) => `#${r.id}`).join(", ")}`);
  if (needsDecision.length === 0) console.log(`- NEEDS_DECISION: none`);
  else console.log(`- NEEDS_DECISION: ${needsDecision.map((r) => `#${r.id}`).join(", ")}`);

  // Basic hygiene checks: folder placement.
  const expectedActive = new Set(
    rows.filter((r) => openStatuses.has(r.status)).map((r) => r.id)
  );
  const expectedDone = new Set(rows.filter((r) => r.status === "DONE").map((r) => r.id));

  const missingActiveFiles = [...expectedActive].filter(
    (id) => !activeIds.has(id) && !doneIds.has(id)
  );
  const missingDoneFiles = [...expectedDone].filter((id) => !doneIds.has(id));

  const misplacedDoneFiles = [...expectedDone].filter((id) => activeIds.has(id));

  // Some closed-but-not-done issues may still live in ui-issues/ by design.
  const activeButDoneDir = [...expectedActive].filter((id) => doneIds.has(id));

  console.log(``);
  console.log(`Hygiene checks:`);
  console.log(`- Active worklogs present: ${activeIds.size} (${ACTIVE_DIR})`);
  console.log(`- Done worklogs present: ${doneIds.size} (${DONE_DIR})`);
  console.log(
    `- Missing active worklogs (open status but no file): ${missingActiveFiles.length}`
  );
  if (missingActiveFiles.length) {
    console.log(`  - IDs: ${missingActiveFiles.slice(0, 40).join(", ")}${missingActiveFiles.length > 40 ? ", …" : ""}`);
  }
  console.log(`- Missing done worklogs (DONE but no file in done-issues): ${missingDoneFiles.length}`);
  if (missingDoneFiles.length) {
    console.log(`  - IDs: ${missingDoneFiles.slice(0, 40).join(", ")}${missingDoneFiles.length > 40 ? ", …" : ""}`);
  }
  console.log(`- Misplaced DONE worklogs still in ui-issues/: ${misplacedDoneFiles.length}`);
  if (misplacedDoneFiles.length) {
    console.log(`  - IDs: ${misplacedDoneFiles.slice(0, 40).join(", ")}${misplacedDoneFiles.length > 40 ? ", …" : ""}`);
  }
  console.log(`- Open issues incorrectly in done-issues/: ${activeButDoneDir.length}`);
  if (activeButDoneDir.length) {
    console.log(`  - IDs: ${activeButDoneDir.slice(0, 40).join(", ")}${activeButDoneDir.length > 40 ? ", …" : ""}`);
  }
}

main();

