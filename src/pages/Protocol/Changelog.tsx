import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import { Link } from 'react-router-dom';
import { Tag, CheckCircle, AlertCircle, Cpu, Shield, Zap, Lock, ArrowRight } from 'lucide-react';

type EntryType = 'breaking' | 'feature' | 'compliance' | 'fix';

interface ChangeEntry {
  type: EntryType;
  text: string;
}

interface Release {
  version: string;
  date: string;
  label: string;
  summary: string;
  badge: string;
  badgeClass: string;
  icon: React.ReactNode;
  entries: ChangeEntry[];
}

const typeStyle: Record<EntryType, { color: string; label: string }> = {
  breaking:   { color: '#FCA5A5', label: 'BREAKING' },
  feature:    { color: 'var(--teal-300)', label: 'FEATURE' },
  compliance: { color: '#FCD34D', label: 'COMPLIANCE' },
  fix:        { color: '#93C5FD', label: 'FIX' },
};

const releases: Release[] = [
  {
    version: 'v4.0.0',
    date: 'April 2026',
    label: 'Current Mainnet Release',
    summary: 'The foundational v4.0 architecture introduces Dynamic Threshold Committees, Redundant Equivalency for SEC 17a-4 compliance, and the Agentic x402 Settlement Layer. This release represents a complete architectural overhaul from the v3.x consensus model.',
    badge: 'Stable',
    badgeClass: 'badge-teal',
    icon: <Shield size={20} />,
    entries: [
      { type: 'feature', text: 'Dynamic Threshold Committees (DTC): Validator committee size now scales with transaction value. Every validated block has aggregate stake ≥150% of its fiat-equivalent value.' },
      { type: 'feature', text: 'Redundant Equivalency: Software-defined 17a-4 compliance via dual-node (Validator + Archive) architecture. Eliminates hardware WORM dependency.' },
      { type: 'feature', text: 'Agentic x402 Settlement Layer: HTTP 402 Payment Required extended into machine-to-machine settlement negotiation. Zero human-in-the-loop for autonomous systems.' },
      { type: 'feature', text: 'WAVE-S Standard (v1.0): Protocol-level smart contract interface for SEC-regulated RWA instruments. Enforces KYC whitelist, forced clawbacks, and 1099-DA event emission.' },
      { type: 'feature', text: 'Fiat-Pegged Dynamic Minimum: Validator stake minimum is now $100,000 USD fiat-equivalent, oracle-adjusted in real-time. Removes token-price dependency from security model.' },
      { type: 'compliance', text: 'GENIUS Act Technology Provider compliance posture formalized. Protocol does not hold funds, assert counterparty relationships, or perform AML screening.' },
      { type: 'compliance', text: 'ISO 20022 Fedwire mandate (March 2025) readiness: pacs.008, camt.054, pain.001 natively supported. purposeCode and creditorLEI are mandatory protocol fields.' },
      { type: 'compliance', text: 'FIT21 Digital Commodity classification affirmed for $WAVE. Restricted Utility Pool smart contract prohibits dividend distributions by architecture.' },
      { type: 'breaking', text: 'v3.x Validator staking contracts are incompatible. All nodes must migrate to v4.0 DTC staking contracts. Migration guide available via institutional onboarding.' },
      { type: 'breaking', text: 'Legacy Archive node configuration deprecated. All Archive nodes must pair with a Validator node for Redundant Equivalency compliance.' },
    ],
  },
  {
    version: 'v3.2.1',
    date: 'January 2026',
    label: 'v3.x Final Patch',
    summary: 'Final patch release in the v3.x line. Closes critical oracle feed race condition in validator committee formation and improves gas estimation accuracy for Facilitator nodes.',
    badge: 'EOL',
    badgeClass: 'badge-amber',
    icon: <Cpu size={20} />,
    entries: [
      { type: 'fix', text: 'Fixed oracle feed race condition where two validators could simultaneously claim committee lead on blocks >$5M fiat-equivalent.' },
      { type: 'fix', text: 'Improved Facilitator gas estimation by 31% for high-throughput periods. Gas pre-commitment now uses P90 block fee oracle.' },
      { type: 'compliance', text: 'Added preliminary ISO 20022 message validation to the node-level compliance payload parser.' },
      { type: 'feature', text: 'Network health dashboard endpoints exposed via authenticated REST API for institutional monitoring integrations.' },
    ],
  },
  {
    version: 'v3.2.0',
    date: 'November 2025',
    label: 'Facilitator Node GA',
    summary: 'General availability of Facilitator Nodes — the Gas Abstraction as a Service (GAaaS) layer enabling institutions to submit transactions without managing base asset gas.',
    badge: 'EOL',
    badgeClass: 'badge-amber',
    icon: <Zap size={20} />,
    entries: [
      { type: 'feature', text: 'Facilitator Nodes GA: Dual-Asset SLA Bond model (Tier 1: 10,000 $WAVE, Tier 2: 100,000 $WAVE). Atomic Paymaster reimbursement in same block.' },
      { type: 'feature', text: 'On-chain SLA contract enforcement. Facilitators must maintain minimum uptime SLA or face $WAVE bond slashing.' },
      { type: 'compliance', text: 'FinCEN/BSA guidance review: Facilitator Node architecture confirmed non-custodial. Gas abstraction does not constitute money transmission.' },
      { type: 'feature', text: 'Testnet deployment of WAVE-S prototype standard. KYC whitelist and forced clawback interfaces stable for early adopters.' },
      { type: 'fix', text: 'Resolved Facilitator registration deadlock under simultaneous multi-block committee formation.' },
    ],
  },
  {
    version: 'v3.1.0',
    date: 'August 2025',
    label: 'Archive Node & 17a-4 Foundation',
    summary: 'Introduction of the Archive Node role and the foundational SEC Rule 17a-4 WORM compliance architecture. First release with software-defined immutable record storage.',
    badge: 'EOL',
    badgeClass: 'badge-amber',
    icon: <Lock size={20} />,
    entries: [
      { type: 'feature', text: 'Archive Node role introduced: Read-only compliance nodes that pipe network state into software-defined WORM storage (e.g., AWS S3 Object Lock, Azure Immutable Blob).' },
      { type: 'compliance', text: 'SEC Rule 17a-4 Software WORM compliance architecture documented. Merkle-chained audit trail with 6-year retention policy enforced at configuration layer.' },
      { type: 'feature', text: 'Compliance payload v2: Structured ISO 20022 metadata now embedded in every transaction\'s on-chain record.' },
      { type: 'breaking', text: 'Validator nodes must now broadcast to at least one registered Archive node per epoch. Isolated validators will be slashed in v3.2+.' },
      { type: 'fix', text: 'Fixed Archive node sync lag under high-throughput conditions.' },
    ],
  },
  {
    version: 'v3.0.0',
    date: 'May 2025',
    label: 'Protocol v3 — Institutional Foundation',
    summary: 'The v3.0 release established WaveCollapse as an institutional-grade settlement network. Introduced formal Validator staking, the $WAVE token, and the 15 bps settlement fee architecture.',
    badge: 'EOL',
    badgeClass: 'badge-amber',
    icon: <Tag size={20} />,
    entries: [
      { type: 'feature', text: '$WAVE token genesis: 1B fixed supply. DEX circulating supply of 2M $WAVE at $1.00. Enterprise Reserve of 998M $WAVE OTC-distributed under time-lock.' },
      { type: 'feature', text: '15 bps settlement fee architecture: 8–9 bps Validators, 1–3 bps Facilitators, 3–4 bps Protocol Treasury.' },
      { type: 'feature', text: 'Deflationary burn mechanism: 100% of slashed $WAVE permanently burned, never recycled to Treasury.' },
      { type: 'compliance', text: 'FIT21 Digital Commodity classification framework applied. Restricted Utility Pool architecture formalized to prevent Howey Test exposure.' },
      { type: 'feature', text: 'Institutional OTC Desk: SLA-locked token distribution for institutional operators requiring node-scale $WAVE without DEX slippage.' },
    ],
  },
];

function EntryBadge({ type }: { type: EntryType }) {
  const style = typeStyle[type];
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.6rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      color: style.color,
      background: `${style.color}18`,
      border: `1px solid ${style.color}40`,
      borderRadius: 4,
      padding: '2px 6px',
      flexShrink: 0,
    }}>
      {style.label}
    </span>
  );
}

export default function Changelog() {
  return (
    <div className="container section">
      <SEOHead
        title="Protocol Changelog"
        description="Complete version history of the WaveCollapse Protocol. Documented against regulatory impact, compliance additions, and architectural changes from v3.0 through v4.0."
        path="/protocol/changelog"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Protocol / Changelog</span>
        <h1>Protocol <span style={{ color: 'var(--teal-400)' }}>Changelog</span></h1>
        <p style={{ maxWidth: 680, marginTop: 12, marginBottom: 16 }}>
          Version history for the WaveCollapse Protocol. All releases are documented against their
          regulatory impact, compliance additions, and architectural changes.
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
          <span className="badge badge-teal"><CheckCircle size={10} /> Current: v4.0.0</span>
          <span className="badge badge-blue">Mainnet Active</span>
          <span className="badge badge-amber"><AlertCircle size={10} /> v3.x End of Life</span>
        </div>

        {/* ── Changelog Entries ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {releases.map((release, ri) => (
            <motion.div
              key={release.version}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ri * 0.07 }}
            >
              {/* Release Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, background: ri === 0 ? 'rgba(23,207,174,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${ri === 0 ? 'var(--border-strong)' : 'var(--border-color)'}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ri === 0 ? 'var(--teal-400)' : 'var(--text-tertiary)', flexShrink: 0 }}>
                  {release.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 800, color: ri === 0 ? 'var(--teal-300)' : 'var(--text-primary)' }}>
                      {release.version}
                    </span>
                    <span className={`badge ${release.badgeClass}`}>{release.badge}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{release.date}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>{release.label}</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0 }}>{release.summary}</p>
                </div>
              </div>

              {/* Change Entries */}
              <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                {release.entries.map((entry, ei) => (
                  <div
                    key={ei}
                    style={{
                      display: 'flex',
                      gap: 14,
                      alignItems: 'flex-start',
                      padding: '14px 20px',
                      borderBottom: ei < release.entries.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    }}
                  >
                    <EntryBadge type={entry.type} />
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.65, margin: 0 }}>{entry.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="glass-card-teal" style={{ padding: 28, marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h3 style={{ marginBottom: 6 }}>Running v3.x? Migrate to v4.0</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
              v3.x nodes will be deprecated from the testnet on June 1, 2026. Begin migration via institutional onboarding.
            </p>
          </div>
          <Link to="/build/node-wizard" className="btn-primary" id="changelog-cta-wizard">
            Node Migration Wizard <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
