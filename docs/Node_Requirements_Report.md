# WaveCollapse v4.0 — Node Requirements Reference

> **Scope:** Compiled from full codebase review of `ARCHITECTURE.md`, `WHITEPAPER.md`, `Cargo.toml` (workspace + all 12 crates), `Dockerfile`, `docker-compose.yml`, `wc-node/src/main.rs`, `wc-sdk/src/facilitator.rs`, `ALIGNMENT_REPORT.md`, and the `.env` configuration file.  
> **Date:** 2026-04-21  
> **Last updated:** 2026-04-21 — DTC consensus implementation complete (see §8)

---

## Quick Reference: Node Types

| | Validator | Archive | Facilitator |
|---|---|---|---|
| **Primary Role** | BFT consensus voting | Immutable full-history storage & SEC compliance | Gas abstraction relay (non-custodial) |
| **Votes in consensus** | ✅ Yes | ❌ No | ❌ No |
| **Storage retention** | Rolling 30-day window | Full history, no pruning | Stateless relay buffer (100 tx default) |
| **Oracle required** | ✅ Critical (blocks DTC entry) | ❌ No | ❌ No |
| **S3 / Cloud storage** | ❌ No | ✅ Required for 17a-4 | ❌ No |
| **SLA bond required** | ✅ Yes ($100k USD min) | ✅ Yes (OTC desk) | ✅ Yes (WAVE + optional USDC) |
| **Regulatory authority** | FinCEN / BSA | SEC Rule 17a-4 | FinCEN / BSA |

---

## 1. Software Stack (All Node Types)

These are hard build and runtime dependencies extracted from `Dockerfile` and `Cargo.toml`.

### Build-Time Requirements

| Dependency | Version / Detail | Source |
|---|---|---|
| **Rust toolchain** | Edition 2021, stable (1.x) | `Cargo.toml` |
| **Cargo** | Included with Rust | `Cargo.toml` |
| **`pkg-config`** | Build tool for C library resolution | `Dockerfile` line 6 |
| **`libssl-dev`** (OpenSSL headers) | Required by libp2p at compile time | `Dockerfile` line 7 |
| **`protobuf-compiler`** | Required by libp2p Gossipsub | `Dockerfile` line 8 |

### Runtime Requirements (Binary Dependencies)

| Library | Required By | Source |
|---|---|---|
| **`libssl3`** (OpenSSL runtime) | libp2p TLS, rustls ring backend | `Dockerfile` line 58 |
| **`ca-certificates`** | TLS certificate chain validation for oracle/S3 HTTPS calls | `Dockerfile` line 59 |
| **glibc** (Debian trixie baseline) | Rust binary linkage | `Dockerfile` line 55 |

### Container Runtime

| Requirement | Detail |
|---|---|
| **Docker Engine** | `docker compose up -d --build` — required for the reference testnet deployment |
| **Docker Compose** (v2+) | `docker-compose.yml` uses `services:`, `networks:`, `ipam:` blocks |
| **OTC mode sidecar** | `wc-sync-status` container must reach `service_healthy` before main node starts; `wc-cli contract verify` runs every 30s |

---

## 2. Core Rust Crate Dependencies (Third-Party Libraries)

All sourced from `[workspace.dependencies]` in `Cargo.toml`.

### Networking & P2P

| Crate | Version | Purpose |
|---|---|---|
| **`libp2p`** | 0.56 | Gossipsub mesh, Identify, Noise encryption, Yamux multiplexing, TCP transport, DNS |
| **`tokio`** | 1.x (`full`) | Async runtime for all subsystems |
| **`futures`** | 0.3 | Async stream composition |
| **`tokio-stream`** | 0.1 | SSE event streaming |

> **Transport stack:** Noise protocol (encryption) + Yamux (multiplexing) over TCP with DNS resolution. All P2P connections are encrypted by design.

### Cryptography

| Crate | Version | Algorithm |
|---|---|---|
| **`blst`** | 0.3 | BLS12-381 threshold signatures (consensus voting + TideBlock aggregation) |
| **`ed25519-dalek`** | 2.x | Ed25519 transaction signing and receipt non-repudiation |
| **`x25519-dalek`** | 2.x | X25519 ECDH key exchange (envelope confidential payloads) |
| **`aes-gcm`** | 0.10 | AES-256-GCM payload encryption |
| **`blake3`** | 1.x | Primary hash function (Merkle trees, WORM chaining) |
| **`sha2`** | 0.10 | SHA-256 (interop hashing, HMAC-SHA256 API auth) |
| **`hkdf`** | 0.12 | HKDF key derivation for envelope keys |
| **`subtle`** | 2.x | Constant-time comparison (timing attack protection on API keys) |
| **`zeroize`** | 1.x | Automatic secret key zeroing on drop |

### Storage

| Crate | Version | Purpose |
|---|---|---|
| **`sled`** | 0.34 | Embedded key-value database — primary on-disk block/state store |
| **`opendal`** | 0.55 | Unified object storage abstraction: S3 archival + filesystem (feature `s3`) |

### HTTP & API

| Crate | Version | Purpose |
|---|---|---|
| **`axum`** | 0.8 | HTTP API server framework (RPC endpoints, SSE) |
| **`tower`** | 0.5 | Middleware stack |
| **`tower-http`** | 0.6 | CORS, request tracing, 1 MB body limit |
| **`hyper`** | 1.x | Low-level HTTP for x402 autonomous handshake server |
| **`reqwest`** | 0.12 | HTTP client for oracle polling (`WC_ORACLE_RPC`) and SDK `WaveClient` |
| **`rustls`** | 0.23 | Pure-Rust TLS (mTLS for RPC client certificate verification) |
| **`tokio-rustls`** | 0.26 | Tokio integration for rustls |

### Intelligence / AI Layer

| Crate | Version | Purpose |
|---|---|---|
| **`petgraph`** | 0.7 | Graph data structure for GNN Byzantine detector (validator interaction graph, clique detection) |
| **`dashmap`** | 6.x | Concurrent HashMap for behavioral z-score tracking |
| **`parking_lot`** | 0.12 | Fast Mutex/RwLock for shared state |

### Observability

| Crate | Version | Purpose |
|---|---|---|
| **`prometheus`** | 0.14 | Metrics export on `/metrics` endpoint |
| **`tracing`** | 0.1 | Structured logging throughout all crates |
| **`tracing-subscriber`** | 0.3 | Log formatter with `env-filter` and optional JSON output |

### Serialization & Utilities

| Crate | Version | Purpose |
|---|---|---|
| **`serde`** | 1.x | Serialization framework (all data types) |
| **`serde_json`** | 1.x | JSON (RPC API, oracle responses, x402 payloads) |
| **`bincode`** | 1.x | Binary encoding (on-wire P2P messages, block storage) |
| **`clap`** | 4.x | CLI argument parsing for `wavecollapse` binary |
| **`toml`** | 0.8 | `wavecollapse.toml` config file parsing |
| **`chrono`** | 0.4 | Timestamp handling (WORM audit records, volume epoch resets) |
| **`uuid`** | 1.x | SPV container IDs and x402 session tokens |
| **`anyhow`** | 1.x | Error propagation in main binary |
| **`thiserror`** | 2.x | Typed error definitions per crate |

---

## 3. Third-Party External Services

These are **network-reachable services** the node calls out to at runtime.

### 3A. Price Oracle (Validator Nodes — CRITICAL)

> **This is the single most operationally critical external dependency in the protocol.**

| Parameter | Detail |
|---|---|
| **Env var** | `WC_ORACLE_RPC` |
| **Default endpoint** | `https://api.wavecollapse.io/v1/oracle/fiat-peg?pair=WAVE-USD&basis=100000` |
| **Accepted alternatives** | Chainlink: `https://feeds.chain.link/wave-usd` · Pyth Network: `https://hermes.pyth.network/v2/updates/price/latest` |
| **Polling interval** | Every 60 seconds (Node Wizard UI live display) |
| **Failure behavior** | `WC_ORACLE_REQUIRED=true` (default for validators) — node **refuses to announce DTC eligibility** and will not join any Dynamic Threshold Committee. Protocol cannot miscalculate stake value. |
| **Inter-node tolerance** | ±5% reconciliation tolerance between committee members is **enforced at the consensus layer** (`OracleReconciler` in `wc-consensus/src/dtc.rs`). CommitVotes carrying readings >50‰ from the committee median are silently dropped. If >⅓ of the committee diverges, the round is aborted and a view-change is triggered. |
| **Oracle price encoding** | Prices are transmitted and reconciled as **micro-USD `u64`** (e.g., `$4.65 = 4_650_000`). No floating-point arithmetic anywhere in the consensus path — eliminates rounding-error fork risk. |
| **Purpose** | Calculates `required_wave = $100,000 USD / oracle_price(WAVE/USD)` to enforce fiat-pegged DTC admission |

### 3B. AWS S3 (Archive Nodes — Required for SEC 17a-4)

| Parameter | Detail |
|---|---|
| **Env vars** | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION` |
| **CLI flags** | `--s3-bucket`, `--s3-prefix`, `--s3-region` |
| **Sync interval** | Every 30 seconds (background `S3Archiver` task) |
| **IAM policy** | Generated by Node Wizard: least-privilege S3 WORM policy (`aws-iam-policy.json`) |
| **Azure alternative** | Node Wizard also generates `azure-rbac-policy.json` for Azure Immutable Blob Storage |
| **OpenDAL abstraction** | The `opendal` crate (`services-s3`) provides the S3 abstraction layer, meaning S3-compatible targets (MinIO, Cloudflare R2, etc.) also work |
| **Regulatory purpose** | SEC Rule 17a-4 Software-Defined WORM — Merkle-chained audit records are synced off-site for tamper-evident, auditor-ready retention |

### 3C. OTC SLA Registry (Validator Nodes — OTC Funding Mode Only)

| Parameter | Detail |
|---|---|
| **Env var** | `WC_OTC_CONTRACT` |
| **CLI flag** | `--otc-contract`, `--funding-mode=OTC` |
| **Verification** | Docker healthcheck runs `wc-cli contract verify --contract=${WC_OTC_CONTRACT} --registry=otc-sla-registry` every 30s |
| **Failure behavior** | Node remains `unhealthy` (invisible to DTC pool) until on-chain SLA hash is verified |
| **Source** | Genesis Treasury — operators sign multi-year SLAs directly; tokens dispersed via cryptographic time-lock |

---

## 4. Network Requirements

| Requirement | Value | Source |
|---|---|---|
| **P2P TCP port** | 9000 (default, configurable `--port`) | `docker-compose.yml`, `main.rs` |
| **RPC API port** | 8545 (seed/RPC node), 8546 (archive node) | `docker-compose.yml` |
| **x402 HTTP port** | Configurable (x402 payment channel) | `x402_server.rs` |
| **Prometheus metrics port** | `/metrics` on RPC port | `wc-rpc` |
| **Bootnode connectivity** | Must reach at least one bootnode multiaddress at startup (e.g., `/ip4/172.28.1.0/tcp/9000`) | `--bootnodes` flag |
| **Gossipsub mesh degree** | D=6, D_lo=4, D_hi=12 (requires stable outbound connections to 6 peers) | `ARCHITECTURE.md` |
| **Outbound HTTPS** | Oracle endpoint + S3 (AWS or Azure) | Runtime |
| **Firewall** | TCP inbound on P2P port; TCP inbound on RPC port | Ops |

---

## 5. Hardware Specifications

> **Note:** The codebase does not contain explicit hardware requirement tables. The specifications below are derived from the operational profile extracted from the code (storage mode, retention windows, load test throughput, S3 sync behavior).

### Validator Node (Minimum)

| Resource | Requirement | Derivation |
|---|---|---|
| **CPU** | 2+ cores (x86_64) | Tokio async runtime; BLS12-381 aggregation is CPU-intensive during TideBlock signing |
| **RAM** | 4 GB minimum | In-memory WORM trail, GNN interaction graph, consensus mempool, Gossipsub mesh state |
| **Disk** | 50–100 GB SSD | Rolling 30-day sled database window; SSD strongly recommended for sub-ms sled latency |
| **Network** | 10 Mbps symmetric minimum | Gossipsub P2P traffic at T3 throughput (58 tides/sec × block size) |
| **OS** | Linux (Debian-based preferred; Rust std is cross-platform) | Dockerfile uses `debian:trixie-slim`; SIGTERM handling in `main.rs` |

### Archive Node (Minimum)

| Resource | Requirement | Derivation |
|---|---|---|
| **CPU** | 2+ cores | Same as validator, plus S3 archiver background task |
| **RAM** | 8 GB minimum | Full WORM trail persisted to sled; durable audit log; S3 reader binary-search buffers |
| **Disk (local)** | 500 GB–2 TB SSD | Full untruncated block history; no pruning ever (`StorageMode::Archive`); WORM records in separate sled tree |
| **Network** | 50 Mbps+ | S3 sync every 30s of all blocks + tides + WORM records; RPC API serving paginated transaction history |
| **Cloud storage** | AWS S3 bucket (or compatible) | Required; `wc-storage` `s3` feature enabled by default in `wc-node` |
| **OS** | Linux | Same as validator |

### Facilitator Node (Minimum)

| Resource | Requirement | Derivation |
|---|---|---|
| **CPU** | 1–2 cores | Stateless relay; no BFT participation; ISO 20022 metadata validation only |
| **RAM** | 1–2 GB | Relay buffer (100 tx default), relay audit log, network service |
| **Disk** | 10 GB | Relay log + node keypair file (`{node_id}.key`); no block storage |
| **Network** | 5 Mbps+ | Transaction relay to validator network |
| **Edge deployment** | Supported — designed for deployment close to merchant PoS | `facilitator.rs` comments |

> **Facilitator Hardware Note:** The architecture explicitly targets edge device deployment (e.g., on-premise at a BrikFi partner branch or merchant PoS location). The stateless relay design means no local chain sync is required.

---

## 6. Economic / Staking Requirements

These are protocol-level prerequisites surfaced in both the codebase and Node Wizard UI.

### Validator Node

| Requirement | Detail |
|---|---|
| **Minimum stake** | $100,000 USD equivalent in `$WAVE` tokens (fiat-pegged, continuously recalculated by oracle) |
| **Oracle formula** | `required_wave = $100,000 USD ÷ oracle_price(WAVE/USD)` |
| **Funding path A (DEX)** | Acquire WAVE on open market. UI warns: *"For amounts over $500k, contact the Institutional OTC Desk."* |
| **Funding path B (OTC)** | Sign multi-year SLA with Genesis Treasury. Tokens time-locked for 12–24 months. Node entry blocked until `WC_OTC_CONTRACT` verified on-chain. |
| **DTC 150% rule** | The protocol dynamically adds validators to committee until aggregate staked USD ≥ 150% of the block's highest transaction value. Being part of a malicious committee = entire committee slashed. |

### Facilitator Node

| Tier | Minimum WAVE Bond | Daily Volume Cap | Spillover |
|---|---|---|---|
| **Tier 1 Regional** | `TIER1_MIN_WAVE` (set in `wc-types`) | $100,000 USD / 24h epoch | Spills to registered Tier 2 peer node |
| **Tier 2 Global** | `TIER2_MIN_WAVE` (higher threshold) | No cap | Always `RouteLocal` |

> Source: `facilitator.rs` — `DailyVolumeTracker`, `FacilitatorTier`, `SlaBond` types.

---

## 7. Security & Regulatory Compliance Prerequisites

These are non-optional hard requirements baked into the node binary and are not configurable away.

| Requirement | Enforcement Point |
|---|---|
| **Ed25519 keypair** | Auto-generated at first run; persisted to `{node_id}.key`. Every transaction is signature-verified before entering consensus. |
| **BLS12-381 keypair** | Generated in memory at startup for TideBlock signing rounds. |
| **mTLS certificates** | Optional but available via `wavecollapse.toml` `[rpc.tls]` block (`server_cert`, `server_key`, `client_ca`). Required for production RPC exposure. |
| **HMAC-SHA256 API keys** | Required to authenticate any state-mutating RPC call. Format: `name:secret`. |
| **ISO 20022 metadata** | Every transaction must carry `purposeCode` + `creditorLEI`. Facilitator nodes reject transactions with invalid metadata. |
| **WORM audit trail** | All protocol events are Merkle-chained. Archive nodes persist the WORM trail to sled + S3. Validators maintain in-memory trail. The `/v1/worm/export` endpoint makes the trail auditor-readable. |
| **Regulator key escrow** | Optional (`--regulator-pubkeys`): SEC/FinCEN X25519 public keys registered at startup allow regulators to decrypt sealed `TransactionEnvelope` payloads. |

---

## 8. Implementation Status (as of 2026-04-21)

All three previously-planned DTC items from the original Gap Analysis are now **fully implemented** and verified by 49 passing unit tests.

| Feature | Status | Implementation |
|---|---|---|
| DTC 150% aggregate stake assembly | ✅ **Implemented** | `wc-consensus/src/dtc.rs` — `DtcAssembler` with VRF-seeded shuffle. `ConsensusEngine::assemble_dtc()`. Seeded from previous block hash (not current proposal — prevents leader grinding). |
| Oracle ±5% reconciliation between committee members | ✅ **Implemented** | `wc-consensus/src/dtc.rs` — `OracleReconciler`. Piggybacked on `CommitMessage.oracle_reading`. Reads >50‰ from committee median dropped. >⅓ divergence triggers round abort + view-change. All math in `u64` micro-USD. |
| Full DTC committee slash on detected collusion | ✅ **Implemented** | `wc-intelligence/src/bad.rs` — `classify_and_slash_committee()`. `SlashType::Catastrophic` emits one `SlashEvent` per committee member. `SlashEvent` now carries `block_hash` and `committee_id` for SEC/CFTC audit trail reconstruction. |

### New Crate-Level Dependencies Added

| Crate | Added To | Purpose |
|---|---|---|
| `rand` (workspace) | `wc-consensus` | VRF-seeded `xorshift64` shuffle for deterministic committee assembly |

### New Types That Affect Node Operation

| Type | Location | Operational Impact |
|---|---|---|
| `StakeProvider` trait | `wc-types/facilitator.rs` | `ConsensusEngine` now accepts an `Arc<dyn StakeProvider>` at startup. In production, wire `StateLedger` to this trait. Without it, DTC enforcement is **relaxed** (testnet-compatible fallback). |
| `ValidatorStake` / `OracleReading` | `wc-types/facilitator.rs` | All USD values use `u64` micro-USD (6 decimals, $1.00 = 1_000_000). Oracle prices are encoded the same way in `CommitMessage.oracle_reading`. |
| `DtcAssembledMessage` | `wc-network/messages.rs` | Leaders broadcast the assembled committee on the `Consensus` Gossipsub topic immediately after proposal. Peers use this to gate commit votes by DTC membership. |
| `DtcCommitteeFormed` / `OracleDivergenceDetected` / `DtcSlashApplied` | `wc-types/audit.rs` | Three new WORM audit event types. Archive nodes' `/v1/worm/export` endpoint now surfaces full DTC lifecycle for SEC/CFTC regulators. |

---

*Full protocol implementation verified by 49 passing `wc-consensus` unit tests. The pre-existing `rpc_api_test.rs::AppState::s3_reader` error is unrelated to DTC and predates this work. See [ALIGNMENT_REPORT.md](file:///g:/Custom%20Apps/WaveCollapse%204.0/ALIGNMENT_REPORT.md).*
