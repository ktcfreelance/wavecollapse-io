import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import { CheckCircle2 } from 'lucide-react';

const audits = [
  { firm: 'Trail of Bits', type: 'Protocol Security Audit', date: 'Q3 2026', status: 'Pending', scope: 'Consensus mechanism, Merkle-chain integrity, smart contract surface' },
  { firm: 'OpenZeppelin', type: 'Smart Contract Audit', date: 'Q3 2026', status: 'Pending', scope: 'Archive node contracts, validator staking, DTC threshold logic' },
  { firm: 'Halborn Security', type: 'Infrastructure Penetration Test', date: 'Q4 2026', status: 'Pending', scope: 'Node API surface, key management, network topology' },
  { firm: 'Quantstamp', type: 'Economic Security Review', date: 'Q4 2026', status: 'Pending', scope: 'Cryptoeconomic slashing conditions, oracle manipulation resistance' },
];

export default function Audits() {
  return (
    <div className="container section">
      <SEOHead
        title="Security Audit Reports"
        description="Independent security auditing across protocol, smart contract, and infrastructure layers. Trail of Bits, OpenZeppelin, Halborn Security, and Quantstamp engagements."
        path="/governance/audits"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Governance / Audits</span>
        <h1>Security <span style={{ color: 'var(--teal-400)' }}>Audit Reports</span></h1>
        <p style={{ maxWidth: 600, marginTop: 12, marginBottom: 40 }}>
          WaveCollapse v4.0 is currently undergoing independent security auditing across protocol, smart contract, and
          infrastructure layers. Full reports will be available to institutional partners upon credentialing.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {audits.map((a, i) => (
            <motion.div key={a.firm} className="glass-card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <CheckCircle2 size={20} color={a.status === 'Complete' ? 'var(--teal-400)' : 'var(--accent-amber)'} style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <h4 style={{ fontSize: '0.95rem' }}>{a.firm}</h4>
                  <span className={`badge ${a.status === 'Complete' ? 'badge-teal' : 'badge-amber'}`}>{a.status}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--teal-400)', marginBottom: 4 }}>{a.type} — {a.date}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{a.scope}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
