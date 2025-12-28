/**
 * GitHub Actions PR reviewer that:
 * - fetches the PR diff
 * - sends it to OpenAI Responses API for review
 * - upserts a PR comment with the review
 *
 * Required env:
 * - OPENAI_API_KEY
 * - GITHUB_TOKEN
 * - GITHUB_REPOSITORY (owner/repo)
 * - PR_NUMBER
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_REVIEW_MODEL || "gpt-4o-mini";
const OPENAI_MAX_OUTPUT_TOKENS = Number.parseInt(
  process.env.OPENAI_REVIEW_MAX_OUTPUT_TOKENS || "1200",
  10,
);
const OPENAI_TEMPERATURE = Number.parseFloat(
  process.env.OPENAI_REVIEW_TEMPERATURE || "0.2",
);
const MAX_DIFF_CHARS = Number.parseInt(
  process.env.OPENAI_REVIEW_MAX_DIFF_CHARS || "180000",
  10,
);

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const PR_NUMBER = process.env.PR_NUMBER;

const COMMENT_MARKER = "<!-- openai-pr-review -->";

function requireEnv(name, value) {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function safeJsonParse(text, context) {
  try {
    return JSON.parse(text);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to parse JSON (${context}): ${message}`);
  }
}

function truncate(text, maxChars) {
  if (text.length <= maxChars) return { text, truncated: false };
  return {
    text: `${text.slice(0, maxChars)}\n\n[...diff truncated to ${maxChars} chars...]`,
    truncated: true,
  };
}

function extractFilenamesFromDiff(diffText) {
  const filenames = new Set();
  // Example: diff --git a/src/foo.ts b/src/foo.ts
  const re = /^diff --git a\/(.+?) b\/(.+?)$/gm;
  for (const match of diffText.matchAll(re)) {
    filenames.add(match[2]);
  }
  return [...filenames];
}

function extractOpenAIText(responseJson) {
  // The REST API response includes an `output` array. We defensively aggregate text.
  // Prefer any helper field if present.
  if (typeof responseJson?.output_text === "string" && responseJson.output_text.trim()) {
    return responseJson.output_text.trim();
  }

  const output = responseJson?.output;
  if (!Array.isArray(output)) return "";

  const chunks = [];
  for (const item of output) {
    // Items often look like: { type: "message", role: "assistant", content: [ {type:"output_text", text:"..."} ] }
    const content = item?.content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (part?.type === "output_text" && typeof part?.text === "string") {
        chunks.push(part.text);
      }
      if (part?.type === "text" && typeof part?.text === "string") {
        chunks.push(part.text);
      }
    }
  }
  return chunks.join("\n").trim();
}

async function githubRequest(path, { method = "GET", headers = {}, body } = {}) {
  const url = `https://api.github.com${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "lumelle-openai-pr-review",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(
      `GitHub API error ${res.status} ${res.statusText} for ${method} ${path}: ${text.slice(0, 2000)}`,
    );
  }
  return text ? safeJsonParse(text, `GitHub ${method} ${path}`) : null;
}

async function fetchPullRequestDiff({ owner, repo, prNumber }) {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3.diff",
      "User-Agent": "lumelle-openai-pr-review",
    },
  });

  const diffText = await res.text();
  if (!res.ok) {
    throw new Error(
      `Failed to fetch PR diff (${res.status} ${res.statusText}): ${diffText.slice(0, 2000)}`,
    );
  }
  return diffText;
}

async function openaiReview({ instructions, input }) {
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions,
      input,
      temperature: OPENAI_TEMPERATURE,
      max_output_tokens: OPENAI_MAX_OUTPUT_TOKENS,
      // For PR diffs, it's usually preferable not to store outputs server-side by default.
      store: false,
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(
      `OpenAI API error ${res.status} ${res.statusText}: ${text.slice(0, 2000)}`,
    );
  }
  return safeJsonParse(text, "OpenAI responses");
}

async function upsertPrComment({ owner, repo, prNumber, body }) {
  const comments = await githubRequest(
    `/repos/${owner}/${repo}/issues/${prNumber}/comments?per_page=100`,
  );

  const existing = Array.isArray(comments)
    ? comments.find((c) => typeof c?.body === "string" && c.body.includes(COMMENT_MARKER))
    : null;

  if (existing?.id) {
    await githubRequest(`/repos/${owner}/${repo}/issues/comments/${existing.id}`, {
      method: "PATCH",
      body: { body },
    });
    return { updated: true, commentId: existing.id };
  }

  const created = await githubRequest(`/repos/${owner}/${repo}/issues/${prNumber}/comments`, {
    method: "POST",
    body: { body },
  });
  return { updated: false, commentId: created?.id };
}

async function main() {
  requireEnv("OPENAI_API_KEY", OPENAI_API_KEY);
  requireEnv("GITHUB_TOKEN", GITHUB_TOKEN);
  requireEnv("GITHUB_REPOSITORY", GITHUB_REPOSITORY);
  requireEnv("PR_NUMBER", PR_NUMBER);

  const [owner, repo] = GITHUB_REPOSITORY.split("/");
  if (!owner || !repo) {
    throw new Error(`Invalid GITHUB_REPOSITORY: ${GITHUB_REPOSITORY} (expected owner/repo)`);
  }

  const prNumber = Number.parseInt(PR_NUMBER, 10);
  if (!Number.isFinite(prNumber)) throw new Error(`Invalid PR_NUMBER: ${PR_NUMBER}`);

  const diffTextRaw = await fetchPullRequestDiff({ owner, repo, prNumber });
  const { text: diffText, truncated } = truncate(diffTextRaw, MAX_DIFF_CHARS);
  const filenames = extractFilenamesFromDiff(diffTextRaw);

  const instructions = [
    "You are a senior engineer doing a pull request review.",
    "Be specific and practical: focus on correctness, security, edge cases, performance footguns, and maintainability.",
    "Prefer minimal changes over refactors unless clearly justified.",
    "If you point out an issue, suggest a concrete fix (ideally as a small patch description).",
    "Use GitHub-flavored Markdown and headings.",
    "Output sections in this order:",
    "1) Summary (2-4 bullets)",
    "2) High-risk issues (ranked, with rationale and fix suggestions)",
    "3) Medium/low suggestions (bullets)",
    "4) Tests to add (bullets)",
    "If the diff is too large or truncated, say so and focus on the highest-risk changes you can see.",
  ].join("\n");

  const input = [
    `Repo: ${GITHUB_REPOSITORY}`,
    `PR: #${prNumber}`,
    filenames.length ? `Files changed (from diff headers): ${filenames.join(", ")}` : "",
    truncated ? `NOTE: Diff was truncated to ${MAX_DIFF_CHARS} chars.` : "",
    "",
    "Unified diff:",
    "```diff",
    diffText,
    "```",
  ]
    .filter(Boolean)
    .join("\n");

  const reviewResponse = await openaiReview({ instructions, input });
  const reviewText = extractOpenAIText(reviewResponse) || "(No review text returned.)";

  const metaLines = [
    `Model: \`${OPENAI_MODEL}\``,
    `Max output tokens: \`${OPENAI_MAX_OUTPUT_TOKENS}\``,
    `Temperature: \`${OPENAI_TEMPERATURE}\``,
    truncated ? `Diff truncated: \`true\`` : `Diff truncated: \`false\``,
  ];

  const commentBody = [
    COMMENT_MARKER,
    "## Automated AI Code Review",
    "",
    reviewText,
    "",
    "<details>",
    "<summary>Run metadata</summary>",
    "",
    metaLines.map((l) => `- ${l}`).join("\n"),
    "</details>",
  ].join("\n");

  await upsertPrComment({ owner, repo, prNumber, body: commentBody });
  console.log("Posted OpenAI PR review comment.");
}

main().catch((err) => {
  const message = err instanceof Error ? err.stack || err.message : String(err);
  console.error(message);
  process.exit(1);
});

