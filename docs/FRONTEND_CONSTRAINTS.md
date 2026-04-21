# WaveCollapse Protocol — Frontend Content Constraints

> **Purpose:** This document defines the exact claims the `wavecollapse-io` UI is **allowed to make** about the WaveCollapse protocol. It is derived from `ARCHITECTURE.md`, `WHITEPAPER.md`, and `ALIGNMENT_REPORT.md` without the Rust implementation internals.
>
> **Rule:** If a claim is not in this document or the three source documents above, it must be verified against `ALIGNMENT_REPORT.md` before being published. Never publish a claim sourced from `ARCHITECTURE.md` directly — use this document as the approved intermediary.
>
> **Last synced with protocol:** 2026-04-21 (DTC implementation complete)

---

## 1. Protocol Identity Claims

These are approved for all marketing, landing, and protocol pages.

| Claim | Approved Phrasing | Source |
|---|---|---|
| What it is | "A Layer 1 settlement protocol — the Rails — for real-world asset (RWA) tokenization." | WHITEPAPER §1 |
| What it is NOT | "Not an exchange, not a custodian, not a securities issuer." | WHITEPAPER §2 |
| Regulatory posture | "Technology provider operating under the GENIUS Act Shield, without adopting custodial risk." | WHITEPAPER §2 |
| Architecture | "Bifurcated: WaveCollapse is the Rails. Applications like BrikFi are the Vehicle." | WHITEPAPER §2 |

---

## 2. Finality Performance — Verified Numbers

These are measured results from the Docker testnet load test (100 transactions, 7-validator network). They may be cited on performance pages.

| Tier | Target | Measured P50 | Sustained SLA |
|---|---|---|---|
| **T1 Optimistic** | <100ms | ~45.9 ms | ~200,000 tx/sec |
| **T2 WaveProof** | ~400ms BFT | ~77.3 ms | ~10,000 tx/sec |
| **T3 TideBlock** | ~1.5s institutional | ~328.5 ms | 58 tides/sec |

> ⚠️ **Disclaimer required on performance pages:** "Latencies reflect network I/O and BFT consensus overhead measured within a 7-node Docker environment. Global production latency may vary based on geographic node distribution."

---

## 3. Dynamic Threshold Committee (DTC) — Approved Claims

All claims below are **fully implemented in live Rust code** as of 2026-04-21.

### What You Can Say

- **150% Security Rule:** "The protocol assembles a validator committee until their aggregate staked capital equals at least 150% of the block's highest transaction value. Corrupting a $50M transaction requires sacrificing $75M in staked collateral."
- **Fiat-Pegged Admission:** "Node operating minimums are pegged to $100,000 USD, continuously adjusted by decentralized oracle feeds. The required number of tokens adjusts as price changes — the fiat barrier stays constant."
- **Catastrophic Slashing:** "If coordinated malicious action is detected, the entire committee is slashed simultaneously — not just the flagged validator. The aggregate slashed amount always exceeds the transaction value."
- **Oracle Reconciliation:** "Committee members' oracle price readings are validated at consensus time. Readings more than ±5% from the committee median are rejected. If more than one-third of the committee submits divergent readings, the consensus round is aborted."
- **VRF Selection:** "Committee members are selected via cryptographic randomness (VRF-seeded using the previous block hash). No central party controls committee assembly."

### What You Must NOT Say

- ❌ Do not describe the internal shuffle algorithm (`xorshift64`) or VRF seed specifics — these are implementation details that may change.
- ❌ Do not specify exact slash percentages for Soft/Hard slash (0.5%, 10%) — these are governance-mutable. Instead say "tiered penalty system."
- ❌ Do not claim specific GNN architecture details (number of layers, edge decay formula).

---

## 4. Regulatory Claims — Approved Phrasing

These claims are defensible under current law. Use exact phrasing.

| Regulation | Approved Claim |
|---|---|
| **GENIUS Act** | "Non-discretionary, decentralized validator selection via cryptographic randomness. No centralized party controls committee assembly." |
| **FIT21 Act** | "The $WAVE token functions as a Functional Infrastructure Token. The fiat-pegged admission floor ensures the token's utility relationship to the network is price-stable." |
| **SEC Rule 17a-4** | "Software-Defined WORM audit trail using Merkle-chained records. No hardware dependency. Archive nodes sync to S3-compatible cloud storage for tamper-evident, auditor-ready retention." |
| **ISO 20022** | "Every transaction requires `purposeCode` and `creditorLEI` metadata. Capital cannot move without regulatory context." |
| **BSA / FinCEN** | "WaveCollapse operates as a technology provider, not a money services business. Facilitator Nodes are non-custodial." |

> ⚠️ **Legal review required** before adding any claim to a page that includes a call-to-action for node operators or investors. These claims are technical descriptions, not legal opinions.

---

## 5. Node Type Claims

### Validator Nodes

| Claim | Status |
|---|---|
| Minimum stake $100,000 USD (fiat-pegged) | ✅ Implemented |
| Oracle-adjusted token requirement | ✅ Implemented |
| DEX and OTC funding paths | ✅ Implemented |
| DTC committee eligibility | ✅ Implemented |
| Tiered slashing (Soft / Hard / Catastrophic) | ✅ Implemented |
| Yield: 8–9 bps of settled volume | ✅ Designed (Tokenomics §4) |

### Facilitator Nodes

| Claim | Status |
|---|---|
| Gas Abstraction as a Service (GAaaS) | ✅ Implemented |
| Tier 1 Regional: 10,000 WAVE minimum | ✅ Implemented |
| Tier 2 Global: 100,000 WAVE minimum | ✅ Implemented |
| Dual-asset SLA Bond (WAVE + USDC) | ✅ Implemented |
| Spillover routing (merchant never interrupted) | ✅ Implemented |
| Yield: 1–3 bps of routed volume | ✅ Designed (Tokenomics §4) |

### Archive Nodes

| Claim | Status |
|---|---|
| Full immutable block history | ✅ Implemented |
| SEC Rule 17a-4 Software-Defined WORM | ✅ Implemented |
| S3/Azure cloud archival | ✅ Implemented |
| Zero yield (compliance role, not consensus) | ✅ Correct |
| No staking requirement | ✅ Correct |

---

## 6. Tokenomics Claims — Approved Numbers

Source: `Tokenomics.md`. These figures are the **only** economics numbers approved for the site.

| Item | Value |
|---|---|
| Total fixed supply | 1,000,000,000 WAVE |
| Initial circulating (DEX) | 2,000,000 WAVE |
| Day-1 DEX valuation | $1.00 USD (paired with $2M USDC) |
| Settlement fee | 15 basis points (bps) |
| Validator share | 8–9 bps |
| Facilitator share | 1–3 bps |
| Protocol treasury | 3–4 bps |
| Non-circulating enterprise reserve | 998,000,000 WAVE |
| Enterprise/Ecosystem allocation | 65% |
| Core team/Foundation | 20% (1yr cliff, 48mo linear vest) |
| Seed/Strategic investors | 15% (1yr cliff, 24mo linear vest) |
| Deflationary mechanism | 100% of slashed WAVE permanently burned |

---

## 7. Claims That Require Protocol Verification Before Publishing

Before adding any of the following to the site, cross-reference the current `ALIGNMENT_REPORT.md`:

- Any claim about a new protocol feature not listed in §3–§6 above
- Any performance number not in §2
- Any regulatory statement not in §4
- Any yield percentage or tokenomics figure not in §6
- Any claim about smart contract logic, on-chain governance, or DEX mechanics

---

## 8. Sync Protocol

This document must be updated whenever:

1. A new item in `ALIGNMENT_REPORT.md` moves from 🔲 Planned → ✅ Implemented
2. `WHITEPAPER.md` is revised (version bump required)
3. The testnet load test is re-run with new results
4. Any regulatory framework cited in §4 is amended or reinterpreted

**Update process:** Update `docs/ALIGNMENT_REPORT.md` in this repo first (copy from protocol), then update this document to reflect any new approved claims.

---

*Maintained by the WaveCollapse Foundation. Protocol source of truth: [github.com/ktcfreelance/WaveCollapse4.0](https://github.com/ktcfreelance/WaveCollapse4.0)*
