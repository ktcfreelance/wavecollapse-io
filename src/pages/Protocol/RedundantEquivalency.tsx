import { motion } from 'framer-motion';
import { Shield, CheckCircle2, FileText, ExternalLink } from 'lucide-react';

const equivalencyPillars = [
  { title: 'Merkle-Chained Audit Trail', desc: 'Every state transition is hashed and appended to an immutable Merkle chain. Any alteration is cryptographically detectable — satisfying the "audit-trail method" of SEC Rule 17a-4(f)(3)(iii).' },
  { title: 'Non-Erasable Record Enforcement', desc: 'Protocol-level write-once semantics enforced at the smart contract layer. No administrator, operator, or third party can delete or overwrite a committed record without detection.' },
  { title: 'Third-Party Download Capability', desc: 'All archived records maintain portable, machine-readable export capability compliant with 17a-4(f)(2)(ii)(B) — enabling regulatory download on demand without hardware lock-in.' },
  { title: 'Six-Year Lookback Guarantee', desc: 'Archive nodes enforce a minimum 6-year retention period with automated proof-of-existence timestamping, exceeding the SEC minimum retention period for broker-dealer records.' },
];

export default function RedundantEquivalency() {
  return (
    <div className="container section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Protocol / Redundant Equivalency</span>
        <h1>SEC 17a-4 <span style={{ color: 'var(--teal-400)' }}>Redundant Equivalency</span></h1>
        <div style={{ display: 'flex', gap: 12, marginTop: 16, marginBottom: 16, flexWrap: 'wrap' }}>
          <span className="badge badge-teal"><Shield size={10} /> SEC Rule 17a-4 Compliant</span>
          <span className="badge badge-amber">Legal Equivalency v1.2</span>
          <span className="badge badge-blue">2022/2026 Amendment Mapped</span>
        </div>
        <p style={{ maxWidth: 680, marginBottom: 20 }}>
          WaveCollapse v4.0 moves beyond hardware-locked WORM storage. Using the <strong>Audit-Trail Method</strong> established
          in the SEC's 2022 amendments to Rule 17a-4(f), the protocol satisfies federal broker-dealer
          record-retention requirements through software-defined, cryptographically provable redundancy.
        </p>
        <div style={{ marginBottom: 48 }}>
          <a href="/trust/sec17a4" className="btn-primary" id="protocol-sec17a4-memo-link" style={{ display: 'inline-flex' }}>
            <FileText size={16} /> Download Legal Equivalency Memo
          </a>
        </div>

        <h2 style={{ marginBottom: 32 }}>Architectural <span className="gradient-text">Compliance Pillars</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 48 }}>
          {equivalencyPillars.map((p, i) => (
            <motion.div key={p.title} className="glass-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}>
              <CheckCircle2 size={20} color="var(--teal-400)" />
              <h4 style={{ color: 'var(--text-primary)' }}>{p.title}</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-tertiary)', lineHeight: 1.65 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass-card-teal" style={{ padding: 28 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--teal-400)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>⚖ Legal Disclaimer</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>
            This page describes the technical architecture of WaveCollapse v4.0 and its design intent with respect to
            SEC Rule 17a-4. This does not constitute legal advice. Institutional operators must independently verify
            compliance applicability with qualified securities counsel before relying on this architecture for
            regulatory purposes. WaveCollapse operates as a Technology Provider, not a registered broker-dealer.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
