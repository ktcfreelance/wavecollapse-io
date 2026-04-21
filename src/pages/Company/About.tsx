import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Globe, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const pillars = [
  {
    icon: <Shield size={22} />,
    title: 'Compliance-First by Architecture',
    desc: 'WaveCollapse does not bolt on compliance after the fact. Every protocol primitive — from the dynamic threshold committee to the archive node — exists to satisfy a specific regulatory requirement. SEC 17a-4, ISO 20022, GENIUS Act, FIT21: they are architectural constraints, not checkboxes.',
    color: 'var(--teal-400)',
  },
  {
    icon: <Cpu size={22} />,
    title: 'Rails, Not Vehicles',
    desc: 'The protocol is infrastructure — not a financial product. WaveCollapse does not hold funds, manage investments, or assert counterparty relationships. This bifurcation is the source of the GENIUS Act Technology Provider status that insulates the protocol from securities law obligations.',
    color: '#60A5FA',
  },
  {
    icon: <Globe size={22} />,
    title: 'Institutional, Not Retail',
    desc: 'WaveCollapse is built for the institutions that settle billions in real-world assets daily. The fiat-pegged validator minimum, the OTC desk model, and the SLA bond architecture are not scalability constraints — they are deliberate filters that ensure network security scales with the value it protects.',
    color: 'var(--accent-amber)',
  },
];

const timeline = [
  { year: '2023', event: 'Protocol concept originated from analysis of institutional settlement latency in CRE fund administration.' },
  { year: '2024', event: 'v1.0–v2.x architecture developed. Proof-of-concept settlement network operational on private testnet.' },
  { year: 'May 2025', event: 'v3.0 mainnet launch. $WAVE token genesis. Validator staking and 15 bps settlement fee architecture live.' },
  { year: 'Nov 2025', event: 'Facilitator Node GA. Gas Abstraction as a Service (GAaaS) layer operational. Non-custodial design confirmed with FinCEN counsel.' },
  { year: 'Jan 2026', event: 'v3.2.1 final patch. GENIUS Act Technology Provider status analysis completed. ISO 20022 Fedwire mandate readiness achieved.' },
  { year: 'Apr 2026', event: 'v4.0 launch: Dynamic Threshold Committees, Redundant Equivalency, Agentic x402 Settlement Layer, and WAVE-S Standard v1.0.' },
];

export default function About() {
  return (
    <div className="container section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Company / About</span>
        <h1>About <span style={{ color: 'var(--teal-400)' }}>WaveCollapse</span></h1>
        <p style={{ maxWidth: 720, marginTop: 12, marginBottom: 48, fontSize: '1.05rem', lineHeight: 1.8 }}>
          WaveCollapse is programmable compliance infrastructure for institutional digital asset settlement.
          We build the rails that allow regulated financial applications to settle real-world assets
          with submillisecond finality, without sacrificing the auditability, regulatory compliance,
          or institutional-grade security that modern financial law requires.
        </p>

        {/* ── Mission Card ── */}
        <div className="glass-card-teal" style={{ padding: 36, marginBottom: 56 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal-400)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            Mission Statement
          </div>
          <blockquote style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
            "To make programmable, compliance-first settlement infrastructure the standard for institutional digital asset operations — globally."
          </blockquote>
        </div>

        {/* ── Three Pillars ── */}
        <h2 style={{ marginBottom: 8 }}>Founding <span className="gradient-text">Principles</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 32 }}>
          Three architectural beliefs that have governed every design decision since inception.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 56 }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="glass-card"
              style={{ padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start' }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div style={{ width: 48, height: 48, background: `${p.color}15`, border: `1px solid ${p.color}40`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color, flexShrink: 0 }}>
                {p.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', margin: '0 0 10px' }}>{p.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', lineHeight: 1.75, margin: 0 }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Protocol Timeline ── */}
        <h2 style={{ marginBottom: 8 }}>Protocol <span className="gradient-text">Timeline</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 32 }}>
          From concept to v4.0 institutional infrastructure.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 56 }}>
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: i < timeline.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--teal-400)', minWidth: 72, paddingTop: 2 }}>{item.year}</div>
              <div style={{ flex: 1, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <CheckCircle size={15} color="var(--teal-600)" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', lineHeight: 1.65, margin: 0 }}>{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Regulatory Framework Note ── */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 48, display: 'flex', gap: 14, alignItems: 'flex-start', borderColor: 'rgba(245,158,11,0.3)' }}>
          <AlertCircle size={18} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)', letterSpacing: '0.08em', marginBottom: 6 }}>
              TECHNOLOGY PROVIDER STATUS
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>
              WaveCollapse operates as a <strong style={{ color: 'var(--text-secondary)' }}>Technology Provider</strong> under the GENIUS Act of 2025.
              Nothing on this site constitutes investment advice, an offer to sell, or a solicitation to purchase any security or commodity.
              All regulatory disclosures are available at <Link to="/legal" style={{ color: 'var(--teal-400)' }}>/legal</Link>.
            </p>
          </div>
        </div>

        {/* ── CTA Row ── */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/solutions/intake" className="btn-primary" id="about-cta-intake">
            Partner With Us <ArrowRight size={14} />
          </Link>
          <Link to="/contact" className="btn-secondary" id="about-cta-contact">
            Contact the Team
          </Link>
          <Link to="/protocol/equivalency" className="btn-secondary" id="about-cta-protocol">
            Read the Protocol Docs
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
