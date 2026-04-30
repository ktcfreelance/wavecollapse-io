import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import { Link } from 'react-router-dom';
import {
  Building2, Shield, Lock, FileCheck, ArrowRight, AlertCircle,
  CheckCircle, Key, Layers, BarChart3,
} from 'lucide-react';

const assetClasses = [
  { label: 'Fractional Real Estate', detail: 'Commercial, multifamily, and industrial CRE assets. WAVE-S enforces transfer restrictions, KYC whitelist, and forced clawbacks.', color: 'var(--teal-400)', icon: <Building2 size={18} /> },
  { label: 'Private Credit', detail: 'Tokenized loan books, CLOs, and credit facilities. Compliant with Reg CF/A+ limits. Full 1099-DA reporting hooks.', color: '#60A5FA', icon: <BarChart3 size={18} /> },
  { label: 'Tokenized Treasuries', detail: 'Short-duration government securities structured as WAVE-S instruments. Settlement guaranteed by WaveCollapse DTC validators.', color: 'var(--accent-amber)', icon: <Shield size={18} /> },
  { label: 'Infrastructure Bonds', detail: 'Green bonds, municipal bonds, and infrastructure debt instruments represented as compliant WAVE-S securities.', color: 'var(--teal-300)', icon: <Layers size={18} /> },
];

const waveS = [
  { feature: 'KYC/AML Whitelist', desc: 'Every transfer is gated by a programmable whitelist smart contract. Only credentialed, KYC-verified wallets can hold or receive a WAVE-S instrument.', badge: 'Mandatory' },
  { feature: 'Forced Clawback', desc: 'Reg CF/A+ and SEC enforcement actions can be satisfied through protocol-level forced transfer of WAVE-S instruments without requiring holder consent.', badge: 'SEC Enforcement Hook' },
  { feature: 'Transfer Restrictions', desc: 'Lock-up periods, accredited investor limits, and geographic restrictions are enforced by smart contract — not by UI enforcement that users can circumvent.', badge: 'Programmable' },
  { feature: '1099-DA Reporting', desc: 'WAVE-S instruments emit standardized tax events for IRS 1099-DA compliance for the 2025/2026 tax years. Events are captured by the Archive node WORM layer.', badge: 'IRS 2025/2026' },
  { feature: 'Fractional Issuance', desc: 'Any WAVE-S instrument can be fractionally issued to up to the Reg CF/A+ investor limits. The protocol enforces cap table logic at the smart contract level.', badge: 'Reg CF/A+' },
  { feature: 'Howey Test Isolation', desc: 'WAVE-S is a smart contract standard, not a token. It does not create a pooled investment managed by a promoter, preserving the issuer\'s Howey Test posture.', badge: 'Not a Token' },
];

const issuanceSteps = [
  { step: '01', title: 'Asset Structuring', desc: 'Legal counsel structures the underlying asset. The WAVE-S term sheet defines transfer restrictions, whitelist criteria, and reporting cadence.' },
  { step: '02', title: 'KYC/AML Deployment', desc: 'Client Application deploys a whitelist contract to WaveCollapse L1. The contract references a credentialed KYC provider\'s on-chain attestation registry.' },
  { step: '03', title: 'Instrument Issuance', desc: 'The WAVE-S smart contract is deployed with fixed supply, fractional denomination, and hardcoded compliance hooks. The Archive node begins WORM recording.' },
  { step: '04', title: 'Secondary Market', desc: 'WAVE-S instruments can be transferred peer-to-peer only between whitelisted wallets. The x402 layer handles settlement finality in <400ms.' },
  { step: '05', title: 'Reporting & Audits', desc: 'Annual 1099-DA events are extracted from the Archive node WORM store. External auditors receive read-only Archive node credentials.' },
];

export default function RwaTokenization() {
  return (
    <div className="container section">
      <SEOHead
        title="RWA Tokenization — WAVE-S Standard"
        description="The WAVE-S standard enables SEC-compliant real-world asset tokenization with programmable KYC/AML enforcement, forced clawbacks, and IRS 1099-DA reporting built into every instrument."
        path="/solutions/rwa"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Solutions / RWA Tokenization</span>
        <h1>RWA <span style={{ color: 'var(--teal-400)' }}>Tokenization</span></h1>
        <p style={{ maxWidth: 700, marginTop: 12, marginBottom: 16 }}>
          The WAVE-S standard is WaveCollapse's answer to SEC-compliant real-world asset tokenization.
          It is not a token — it is a programmable smart contract standard that embeds investor protection,
          KYC/AML enforcement, and tax reporting directly into every instrument issued on the protocol.
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
          <span className="badge badge-teal">WAVE-S Standard</span>
          <span className="badge badge-blue">SEC Reg CF/A+ Aligned</span>
          <span className="badge badge-amber">FIT21 Act / Howey-Safe</span>
        </div>

        {/* ── Regulatory Frame ── */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 48, display: 'flex', gap: 14, alignItems: 'flex-start', borderColor: 'rgba(245,158,11,0.3)' }}>
          <AlertCircle size={18} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)', letterSpacing: '0.08em', marginBottom: 6 }}>
              REGULATORY POSITIONING
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text-secondary)' }}>WAVE-S</strong> is a smart contract standard, not a security or token.
              WaveCollapse is the <strong style={{ color: 'var(--text-secondary)' }}>Technology Provider</strong> (GENIUS Act).
              The <strong style={{ color: 'var(--text-secondary)' }}>Client Application</strong> (e.g., BrikFi) is the Regulated Entity
              responsible for SEC registration, investor onboarding, and AML screening.
              WAVE-S provides the programmable rails; compliance is enforced by the issuer's deployed smart contract logic.
            </p>
          </div>
        </div>

        {/* ── The Smart SPV ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 56 }}>
          <motion.div
            className="glass-card-teal"
            style={{ padding: 28 }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--teal-300)', marginBottom: 8 }}>The Smart SPV</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--teal-400)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
              Universal Container for Capital
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
              WaveCollapse utilizes the Smart SPV (Special Purpose Vehicle) as its foundational primitive. Each SPV is a cryptographically sealed environment providing absolute legal segregation for the WAVE-S instruments and asset-agnostic settlement logic inside.
            </p>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['KYC whitelist enforcement at transfer layer', 'Forced clawback and freeze functions', 'Fractional issuance with investor caps', 'IRS 1099-DA event emission'].map(item => (
                <li key={item} style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>
                  <CheckCircle size={12} style={{ display: 'inline', marginRight: 6, color: 'var(--teal-400)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="glass-card"
            style={{ padding: 28 }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
              What WAVE-S Is Not
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Not a fungible token', desc: 'WAVE-S instruments are non-fungible by design. No two instruments share economic or legal equivalence.' },
                { label: 'Not managed by WaveCollapse', desc: 'The protocol has no discretionary control over WAVE-S instruments. All governance is encoded in the Client Application\'s smart contract.' },
                { label: 'Not a pooled investment', desc: 'WAVE-S prevents Howey Test exposure by ensuring no common enterprise managed by a promoter.' },
              ].map(item => (
                <div key={item.label} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: '#FCA5A5', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Asset Classes ── */}
        <h2 style={{ marginBottom: 8 }}>Supported <span className="gradient-text">Asset Classes</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 28 }}>
          Any SEC-regulated financial instrument can be structured as a WAVE-S instrument.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 56 }}>
          {assetClasses.map((ac, i) => (
            <motion.div
              key={ac.label}
              className="glass-card"
              style={{ padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div style={{ width: 40, height: 40, background: `${ac.color}15`, border: `1px solid ${ac.color}40`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ac.color, flexShrink: 0 }}>
                {ac.icon}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: ac.color, marginBottom: 6 }}>{ac.label}</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.65, margin: 0 }}>{ac.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── WAVE-S Feature Matrix ── */}
        <h2 style={{ marginBottom: 8 }}>WAVE-S <span className="gradient-text">Compliance Feature Matrix</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 28 }}>
          Every WAVE-S instrument must implement these interface functions. Compliance is not optional.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 56 }}>
          {waveS.map((w, i) => (
            <motion.div
              key={w.feature}
              className="glass-card"
              style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Key size={16} color="var(--teal-400)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{w.feature}</div>
                  <span className="badge badge-teal">{w.badge}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.65, margin: 0 }}>{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Issuance Workflow ── */}
        <h2 style={{ marginBottom: 8 }}>Compliant Issuance <span className="gradient-text">Workflow</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 32 }}>
          Five-phase workflow from asset structuring to secondary market operations.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 56 }}>
          {issuanceSteps.map((step, i) => (
            <motion.div
              key={step.step}
              style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: i < issuanceSteps.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 800, background: 'var(--grad-teal)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', minWidth: 48, lineHeight: 1 }}>
                {step.step}
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', margin: '0 0 6px' }}>{step.title}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="glass-card-teal" style={{ padding: 'clamp(20px, 4vw, 36px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h3 style={{ marginBottom: 8 }}>Structure Your First WAVE-S Instrument</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, maxWidth: 520 }}>
              Our institutional onboarding team will guide your legal and engineering team through
              the WAVE-S deployment process, whitelist configuration, and Archive node credentialing.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/solutions/intake" className="btn-primary" id="rwa-cta-intake">
              Begin Onboarding <ArrowRight size={14} />
            </Link>
            <Link to="/governance/economics" className="btn-secondary" id="rwa-cta-economics">
              View Token Economics
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
