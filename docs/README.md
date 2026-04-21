# docs/ — Protocol Source of Truth

This folder contains the authoritative protocol documents that govern what the `wavecollapse-io` site is allowed to claim. **Do not edit these files directly.** They are synchronized from the [WaveCollapse 4.0 protocol repository](https://github.com/ktcfreelance/WaveCollapse4.0).

---

## Files

| File | Purpose |
|---|---|
| [`FRONTEND_CONSTRAINTS.md`](./FRONTEND_CONSTRAINTS.md) | **Start here.** Defines every claim this site is approved to make, organized by section (DTC, regulatory, performance, tokenomics). Created for frontend developers — no Rust internals. |
| [`WHITEPAPER.md`](./WHITEPAPER.md) | The canonical protocol specification. Primary content source for Protocol, Mission, and Architecture pages. |
| [`Tokenomics.md`](./Tokenomics.md) | The cryptoeconomic model. Primary content source for Economics, Node Operator, and Yield pages. All fee percentages and supply numbers must match this document exactly. |
| [`ALIGNMENT_REPORT.md`](./ALIGNMENT_REPORT.md) | Tracks what is ✅ fully implemented vs. 🔲 planned in the live protocol. Before publishing any feature claim, verify it is ✅ in this document. |

---

## Rules for Frontend Developers

1. **Check `FRONTEND_CONSTRAINTS.md` first.** If a claim you want to make is listed there with an approved phrasing, use that phrasing verbatim.
2. **Check `ALIGNMENT_REPORT.md` second.** Never publish a claim about a protocol feature that is marked 🔲 Planned — that is a regulatory and reputational risk.
3. **Never source numbers from `ARCHITECTURE.md`.** That document lives in the protocol repo and contains Rust implementation details. `FRONTEND_CONSTRAINTS.md` is the approved summary.

## Sync Schedule

These files must be updated whenever the protocol repo tags a new release or the `ALIGNMENT_REPORT.md` changes status for any item. Copy the updated files from the protocol repo into this folder.
