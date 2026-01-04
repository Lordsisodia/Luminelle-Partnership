---
status: draft
last_reviewed: 2025-12-31
owner: agent-zero
generated_at_utc: 2025-12-31T16:09:52Z
total_unique_repos: 6
min_stars: 25
include_forks: false
include_archived: false
excluded_results_count: 4
nonfatal_query_errors_count: 0
exclude_keywords: template, starter, boilerplate, example, demo, awesome
---

# OSS Discovery — GitHub search (catalog only)

This tranche is generated from live GitHub search queries (sorted by stars).
Treat license values as **best-effort**; confirm in each repo before adoption.

## 🔎 Search queries used

- inbox pattern idempotent consumer stars:>=25 fork:false archived:false
- transactional outbox pattern open source stars:>=25 fork:false archived:false
- outbox pattern postgres stars:>=25 fork:false archived:false
- outbox pattern kafka stars:>=25 fork:false archived:false
- event deduplication store stars:>=25 fork:false archived:false
- deduplication table postgres stars:>=25 fork:false archived:false
- replay protection webhook stars:>=25 fork:false archived:false
- idempotent consumer pattern stars:>=25 fork:false archived:false
- at least once delivery idempotent stars:>=25 fork:false archived:false
- exactly once semantics outbox stars:>=25 fork:false archived:false
- webhook consumer at least once stars:>=25 fork:false archived:false
- dead letter queue open source stars:>=25 fork:false archived:false
- retry queue worker idempotent stars:>=25 fork:false archived:false

## ⚡ Top 25 “<1 week integration” candidates (heuristic)

| Rank | Repo | Stars | Lang | License | Bucket | Why it’s here |
|---:|---|---:|---|---|---|---|
| 1 | dotnetcore/CAP — https://github.com/dotnetcore/CAP | 7037 | C# | MIT | safe | score=8 (lang+recency+stars+license) |
| 2 | Zehelein/pg-transactional-outbox — https://github.com/Zehelein/pg-transactional-outbox | 35 | TypeScript | MIT | safe | score=8 (lang+recency+stars+license) |
| 3 | mrinalxdev/shadowstream — https://github.com/mrinalxdev/shadowstream | 72 | Python | UNKNOWN | verify | score=6 (lang+recency+stars+license) |
| 4 | Armando1514/Event-Driven-Microservices-Advanced — https://github.com/Armando1514/Event-Driven-Microservices-Advanced | 138 | Java | UNKNOWN | verify | score=5 (lang+recency+stars+license) |
| 5 | suadev/microservices-change-data-capture-with-debezium — https://github.com/suadev/microservices-change-data-capture-with-debezium | 104 | C# | UNKNOWN | verify | score=4 (lang+recency+stars+license) |
| 6 | wangliangbd/SparkStreaming_Store_KafkaTopicOffset_To_HBase — https://github.com/wangliangbd/SparkStreaming_Store_KafkaTopicOffset_To_HBase | 37 | Java | Apache-2.0 | safe | score=3 (lang+recency+stars+license) |

## 📚 Outbox / inbox pattern (top by stars)

| Repo | Stars | Lang | License | Bucket | Updated | Description |
|---|---:|---|---|---|---|---|
| dotnetcore/CAP — https://github.com/dotnetcore/CAP | 7037 | C# | MIT | safe | 2025-12-31T08:27:20Z | Distributed transaction solution in micro-service base on eventually consistency, also an eventbus with Outbox pattern |
| Armando1514/Event-Driven-Microservices-Advanced — https://github.com/Armando1514/Event-Driven-Microservices-Advanced | 138 | Java | UNKNOWN | verify | 2025-12-02T17:19:43Z | Event-Driven Architecture for a microservices-based system with a clean architecture + Domain Driven Design (DDD) + CQRS pattern + Saga pattern + Outbox pattern + CDC. |
| suadev/microservices-change-data-capture-with-debezium — https://github.com/suadev/microservices-change-data-capture-with-debezium | 104 | C# | UNKNOWN | verify | 2025-09-15T04:59:44Z | Microservices data exchange with change data capture and outbox pattern. |
| mrinalxdev/shadowstream — https://github.com/mrinalxdev/shadowstream | 72 | Python | UNKNOWN | verify | 2025-12-19T08:51:30Z | a Change Data Capture (CDC) system using Outbox Pattern with Postgres WAL, Redis Streams and gRPC |
| Zehelein/pg-transactional-outbox — https://github.com/Zehelein/pg-transactional-outbox | 35 | TypeScript | MIT | safe | 2025-12-28T16:28:17Z | A library to implement the transactional outbox pattern for PostgreSQL, a message broker or event stream, and TypeScript. |

## 📚 Dedupe / replay protection (top by stars)

| Repo | Stars | Lang | License | Bucket | Updated | Description |
|---|---:|---|---|---|---|---|

## 📚 At-least-once processing (top by stars)

| Repo | Stars | Lang | License | Bucket | Updated | Description |
|---|---:|---|---|---|---|---|
| wangliangbd/SparkStreaming_Store_KafkaTopicOffset_To_HBase — https://github.com/wangliangbd/SparkStreaming_Store_KafkaTopicOffset_To_HBase | 37 | Java | Apache-2.0 | safe | 2022-09-04T14:12:24Z | Kafka delivery semantics in the case of failure depend on how and when offsets are stored. Spark output operations are at-least-once. So if you want the equivalent of exactly-once semantics, you must either store offsets after an idempotent output, or store offsets in an atomic transaction alongside output.There is Spark Streaming how to store Kafka topic offset with HBase. |

## 📚 DLQ + retries (top by stars)

| Repo | Stars | Lang | License | Bucket | Updated | Description |
|---|---:|---|---|---|---|---|

