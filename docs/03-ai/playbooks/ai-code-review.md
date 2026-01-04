# Automated AI Code Review (OpenAI)

This repo includes an optional GitHub Actions workflow that posts an automated code review comment on every Pull Request using the OpenAI API.

Files:
- `.github/workflows/ai-review.yml`
- `scripts/ai-review/review-pr.mjs`

## Setup

1) Add a repository secret
- Name: `OPENAI_API_KEY`
- Value: your OpenAI API key

2) (Optional) Add repository variables to tune behavior
- `OPENAI_REVIEW_MODEL` (default: `gpt-4o-mini`)
- `OPENAI_REVIEW_MAX_DIFF_CHARS` (default: `180000`)
- `OPENAI_REVIEW_MAX_OUTPUT_TOKENS` (default: `1200`)
- `OPENAI_REVIEW_TEMPERATURE` (default: `0.2`)

3) Open a PR
- The workflow runs on `pull_request` events (opened/synchronize/reopened/ready_for_review).
- It skips draft PRs and fork PRs (because secrets are not available to forks).

## What it does

- Downloads the PR unified diff via the GitHub API
- Sends the diff to OpenAI (Responses API) with review instructions
- Creates or updates a PR comment (it upserts by finding a marker in an existing comment)

## Security notes

- The workflow uses `store: false` in the OpenAI request.
- The workflow requires the diff contents to be sent to OpenAI. Do not enable this workflow on repos that contain code you are not allowed to share with a third-party service.
- For PRs from forks, GitHub does not provide secrets to the workflow. The job is skipped rather than failing noisily.

## Troubleshooting

- If no comment appears, check the Actions run logs for the `AI PR Review (OpenAI)` workflow.
- If you see `Missing required env var: OPENAI_API_KEY`, confirm the repo secret exists and is named exactly `OPENAI_API_KEY`.

