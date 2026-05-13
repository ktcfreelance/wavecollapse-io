import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import { Link } from 'react-router-dom';
import {
  Zap, Shield, Clock, Network, Server, Lock, CheckCircle,
  ArrowRight, AlertCircle, Globe, Database,
} from 'lucide-react';

const slaMetrics = [
  { label: 'Tier 1: Optimistic', value: '<100ms', sub: 'Machine-to-machine finality', color: 'var(--teal-300)' },
  { label: 'Tier 2: WaveProof', value: '~400ms', sub: 'BFT consensus finality', color: '#60A5FA' },
  { label: 'Tier 3: TideBlock', value: '~1.5s', sub: 'Institutional WORM commit', color: 'var(--accent-amber)' },
  { label: 'Throughput', value: '~10k TPS', sub: 'Sustained WaveProof SLA', color: 'var(--teal-400)' },
];

const fedwireSteps = [
  {
    step: '01',
    title: 'Client Application Initiates',
    desc: 'Institution initiates a payment via the WaveCollapse SDK. The ISO 20022 pacs.008 message is constructed at the application layer with mandatory purposeCode and creditorLEI metadata. A blinded SHA3-256 hash of this metadata is injected into the settlement request.',
    icon: <Globe size={18} />,
  },
  {
    step: '02',
    title: 'x402 Negotiation Layer',
    desc: 'The HTTP 402 Payment Required cycle begins. The WaveCollapse node returns a payment challenge. The client\'s agent resolves the compliance payload and commits gas via a Facilitator node.',
    icon: <Zap size={18} />,
  },
  {
    step: '03',
    title: 'Dynamic Threshold Committee',
    desc: 'A DTC is assembled whose aggregate $WAVE stake exceeds 150% of the block\'s total fiat-equivalent value. Validators sign and broadcast the settlement attestation.',
    icon: <Shield size={18} />,
  },
  {
    step: '04',
    title: 'On-Chain Finality',
    desc: 'Settlement is finalized on the WaveCollapse L1. The Merkle-chained state transition is broadcast to all Archive nodes for SEC 17a-4 WORM compliance.',
    icon: <CheckCircle size={18} />,
  },
  {
    step: '05',
    title: 'Fedwire / DTCC Bridge',
    desc: 'The protocol emits ISO 20022 camt.054 credit notifications. Client Applications connect their own Fedwire or DTCC adapter layer — WaveCollapse is the rail, not the router.',
    icon: <Network size={18} />,
  },
];

const complianceFeatures = [
  { label: 'ISO 20022 Native', detail: 'pacs.008, camt.054, pain.001 message types are natively supported. purposeCode and creditorLEI are cryptographically bound to the TideBlock\u2122 header via a blinded SHA3-256 hash, enforced at the protocol layer for institutional nodes. Raw metadata is retained off-chain by the application layer.', badge: 'Fedwire Mandate' },
  { label: 'Software-Defined 17a-4', detail: 'Every cleared transaction is committed to a software-defined WORM store via Archive nodes within 1.5s. Immutable, hardware-independent, auditor-accessible.', badge: 'WORM Compliant' },
  { label: 'Byzantine Anomaly Detection (BAD)', detail: 'Advanced Graph Neural Networks continually monitor validator behavior, identifying and isolating Sybil attacks and collusion formations via active immune response.', badge: 'Intelligence Layer' },
  { label: 'GENIUS Act Shield', detail: 'WaveCollapse operates strictly as a Technology Provider. All AML/KYC obligations remain with the Client Application. Protocol does not take custody.', badge: 'Tech Provider' },
  { label: 'FinCEN / BSA', detail: 'Facilitator Nodes abstract gas without taking custody of funds. Paymaster architecture ensures atomic reimbursement in the same block.', badge: 'Non-Custodial' },
];

const refArch = [
  { label: 'Client Application', detail: 'Fintech, NeoBank, or Fund of Funds', icon: <Database size={16} />, color: 'var(--text-tertiary)' },
  { label: 'WaveCollapse SDK', detail: 'ISO 20022 construction layer', icon: <Server size={16} />, color: '#60A5FA' },
  { label: 'Facilitator Node', detail: 'Gas abstraction as a service', icon: <Zap size={16} />, color: 'var(--teal-400)' },
  { label: 'Validator DTC', detail: 'Dynamic Threshold Committee', icon: <Shield size={16} />, color: 'var(--teal-300)' },
  { label: 'Archive Node', detail: 'WORM state commitment', icon: <Lock size={16} />, color: 'var(--accent-amber)' },
  { label: 'Legacy Rail', detail: 'Fedwire / DTCC / Bank Wire', icon: <Network size={16} />, color: 'var(--text-secondary)' },
];

export default function Settlement() {
  return (
    <div className="container section">
      <SEOHead
        title="Settlement Infrastructure"
        description="Programmable, compliance-first settlement infrastructure for institutional digital asset transactions. Sub-second finality, ISO 20022 native messaging, and SEC 17a-4 WORM compliance."
        path="/solutions/settlement"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'WaveCollapse Settlement Infrastructure',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Cloud',
          description: 'Institutional-grade settlement rails with ISO 20022 native messaging and SEC 17a-4 compliance.',
        }}
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Solutions / Settlement Infrastructure</span>
        <h1>Settlement <span style={{ color: 'var(--teal-400)' }}>Infrastructure</span></h1>
        <p style={{ maxWidth: 700, marginTop: 12, marginBottom: 16 }}>
          Programmable, compliance-first settlement infrastructure for institutional digital asset transactions.
          WaveCollapse serves as the rail — the high-throughput, auditable layer beneath your application —
          while your institution retains full regulatory responsibility and counterparty relationships.
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
          <span className="badge badge-teal"><Zap size={10} /> x402 Settlement Layer</span>
          <span className="badge badge-blue">ISO 20022 Native</span>
          <span className="badge badge-amber">SEC Rule 17a-4 Compliant</span>
        </div>

        {/* ── SLA Metrics ── */}
        <h2 style={{ marginBottom: 8 }}>Universal Progressive <span className="gradient-text">Finality</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 28 }}>
          Different economic activities demand different physical settlement times. WaveCollapse escalates finality based on cryptographic depth.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: 6, border: '1px solid rgba(245, 158, 11, 0.2)', marginBottom: 24 }}>
          <AlertCircle size={16} color="var(--accent-amber)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
            <strong>DISCLAIMER:</strong> Latencies reflect network I/O and BFT consensus overhead measured within a 7-node Docker environment. Global production latency may vary based on geographic node distribution.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 56 }}>
          {slaMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="glass-card"
              style={{ padding: 24, textAlign: 'center' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 800, color: m.color, marginBottom: 6 }}>{m.value}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: m.color, marginBottom: 6, letterSpacing: '0.06em' }}>{m.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{m.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Regulatory Alert ── */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 48, display: 'flex', gap: 14, alignItems: 'flex-start', borderColor: 'rgba(245,158,11,0.3)' }}>
          <AlertCircle size={18} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)', letterSpacing: '0.08em', marginBottom: 6 }}>
              RAIL vs. VEHICLE DOCTRINE
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>
              WaveCollapse is the <strong style={{ color: 'var(--text-secondary)' }}>Rail</strong>. Your application is the <strong style={{ color: 'var(--text-secondary)' }}>Vehicle</strong>.
              The protocol does not hold funds, assert counterparty relationships, or perform AML screening.
              All KYC/AML, investor protection, and securities compliance obligations remain strictly with the Client Application
              under GENIUS Act Technology Provider status.
            </p>
          </div>
        </div>

        {/* ── Settlement Flow ── */}
        <h2 style={{ marginBottom: 8 }}>Settlement <span className="gradient-text">Sequence Flow</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 32 }}>
          End-to-end x402 + ISO 20022 negotiation cycle from client initiation to WORM commit.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 56, position: 'relative' }}>
          {fedwireSteps.map((step, i) => (
            <motion.div
              key={step.step}
              style={{ display: 'flex', gap: 24, alignItems: 'flex-start', padding: '24px 0', borderBottom: i < fedwireSteps.length - 1 ? '1px solid var(--border-subtle)' : 'none', flexWrap: 'nowrap' }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 40, height: 40, background: 'rgba(23,207,174,0.1)', border: '1px solid var(--border-strong)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-400)' }}>
                  {step.icon}
                </div>
                {i < fedwireSteps.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: 'var(--border-subtle)', marginTop: 8, minHeight: 24 }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0, paddingTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--teal-600)', letterSpacing: '0.12em' }}>STEP {step.step}</span>
                  <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{step.title}</h4>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Reference Architecture ── */}
        <h2 style={{ marginBottom: 8 }}>Reference <span className="gradient-text">Architecture</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 28 }}>
          The full stack from client application to legacy banking rail.
        </p>
        <div className="glass-card" style={{ padding: 'clamp(16px, 4vw, 32px)', marginBottom: 56 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {refArch.map((layer, i) => (
              <div key={layer.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40 }}>
                  <div style={{ width: 36, height: 36, background: `${layer.color}15`, border: `1px solid ${layer.color}40`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: layer.color, flexShrink: 0 }}>
                    {layer.icon}
                  </div>
                  {i < refArch.length - 1 && (
                    <div style={{ width: 1, height: 20, background: 'var(--border-subtle)', flexShrink: 0 }} />
                  )}
                </div>
                <div style={{ flex: 1, paddingBottom: i < refArch.length - 1 ? 0 : 0 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: layer.color }}>{layer.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{layer.detail}</div>
                </div>
                {i < refArch.length - 1 && (
                  <ArrowRight size={14} color="var(--text-muted)" style={{ flexShrink: 0, transform: 'rotate(90deg)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Compliance Coverage ── */}
        <h2 style={{ marginBottom: 8 }}>The Intelligence Layer & <span className="gradient-text">Compliance Shield</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 28 }}>
          Network security cannot be passive. Every layer of the settlement stack enforces a systemic immune response.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 56 }}>
          {complianceFeatures.map((f, i) => (
            <motion.div
              key={f.label}
              className="glass-card"
              style={{ padding: 24 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{f.label}</h4>
                <span className="badge badge-teal">{f.badge}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0 }}>{f.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="glass-card-teal" style={{ padding: 'clamp(20px, 4vw, 36px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h3 style={{ marginBottom: 8 }}>Ready to Deploy Settlement Infrastructure?</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, maxWidth: 520 }}>
              Begin the three-phase institutional onboarding process. Our team will assess your compliance
              posture, assign a Facilitator node tier, and issue production credentials.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/solutions/intake" className="btn-primary" id="settlement-cta-intake">
              Begin Onboarding <ArrowRight size={14} />
            </Link>
            <Link to="/build/sandbox" className="btn-secondary" id="settlement-cta-sandbox">
              Run Sandbox Test
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
