# OSS Project Entry

## Identity

- Name: SparkStreaming_Store_KafkaTopicOffset_To_HBase
- Repo: https://github.com/wangliangbd/SparkStreaming_Store_KafkaTopicOffset_To_HBase
- Full name: wangliangbd/SparkStreaming_Store_KafkaTopicOffset_To_HBase
- License: Apache-2.0
- Stars (approx): 37
- Forks (approx): 37
- Primary language: Java
- Last updated: 2022-09-04T14:12:24Z

## What it gives us (plain English)

- …

## What feature(s) it maps to

- …

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth):
- Setup friction (self-host? SaaS? Docker?):
- Data model alignment:

## Adoption path

- 1 day POC:
- 1 week integration:
- 1 month hardening:

## Risks

- Maintenance risk:
- Security risk:
- Scope mismatch:
- License risk:

## Sources

- https://github.com/wangliangbd/SparkStreaming_Store_KafkaTopicOffset_To_HBase

## Score (0–100) + reasoning

- Score: …
- Why: …

---

## Repo description (from GitHub)

Kafka delivery semantics in the case of failure depend on how and when offsets are stored. Spark output operations are at-least-once. So if you want the equivalent of exactly-once semantics, you must either store offsets after an idempotent output, or store offsets in an atomic transaction alongside output.There is Spark Streaming how to store Kafka topic offset with HBase.
