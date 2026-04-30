import './InstitutionalLanding.css';
import SEOHead from '../../components/SEOHead';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, BarChart3, Activity, AlertTriangle,
  Building2, Lock, ChevronRight, Terminal
} from 'lucide-react';
import HeroGlobe from '../../components/HeroGlobe';

const metrics = [
  { value: '~45.9ms', label: 'P50 Optimistic Acknowledgement', sub: 'Machine-to-machine finality' },
  { value: '~400ms', label: 'BFT Consensus', sub: 'BFT consensus finality' },
  { value: '17a-4', label: 'SEC Audit Compliant', sub: 'Redundant Equivalency Standard' },
  { value: 'ISO', label: '20022 Native', sub: 'purposeCode & creditorLEI built-in' },
];

const pillars = [
  {
    id: 'solutions',
    icon: <Building2 size={22} />,
    label: 'Solutions',
    title: 'Commercial Infrastructure',
    desc: 'Settlement rails, RWA tokenization, and banking interoperability primitives for modern FinTech.',
    to: '/solutions/intake',
    cta: 'Explore Solutions',
  },
  {
    id: 'protocol',
    icon: <Shield size={22} />,
    label: 'Protocol',
    title: 'Programmable Compliance',
    desc: 'Redundant Equivalency architecture, ISO 20022 native messaging, and the agentic x402 settlement layer.',
    to: '/protocol/equivalency',
    cta: 'View Protocol',
  },
  {
    id: 'build',
    icon: <Terminal size={22} />,
    label: 'Build',
    title: 'Developer Tools',
    desc: 'The Node Wizard, Compliance Sandbox, and TypeScript SDK for institutional-grade integration.',
    to: '/build/sandbox',
    cta: 'Start Building',
    highlight: true,
  },
  {
    id: 'governance',
    icon: <BarChart3 size={22} />,
    label: 'Governance',
    title: 'Protocol Economics',
    desc: 'DVT staking, MPC-based security, and Dynamic Threshold Committees to secure high-value settlement.',
    to: '/governance/economics',
    cta: 'View Economics',
  },
  {
    id: 'trust',
    icon: <Lock size={22} />,
    label: 'Trust Hub',
    title: 'Legal Infrastructure',
    desc: 'The SEC 17a-4 Legal Equivalency Memo, the v4.0 Simulation Report, and the full regulatory disclosure library.',
    to: '/trust/sec17a4',
    cta: 'Open Trust Hub',
  },
];

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function InstitutionalLanding() {
  return (
    <div>
      <SEOHead
        title="Institutional Settlement Infrastructure"
        description="WaveCollapse is the GENIUS Act-native settlement infrastructure layer for banks, FinTechs, and custodians. Programmable compliance. Provable immutability. ISO 20022 native. Sub-second finality."
        path="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'WaveCollapse Protocol',
          url: 'https://wavecollapse.io',
          logo: 'https://wavecollapse.io/logo.png',
          description: 'GENIUS Act-native settlement infrastructure layer for institutional digital asset transactions.',
          sameAs: [],
          foundingDate: '2025',
          knowsAbout: ['Digital Asset Settlement', 'ISO 20022', 'SEC Rule 17a-4', 'GENIUS Act', 'RWA Tokenization'],
        }}
      />
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="container">
          <div className="hero-inner">
            <motion.div className="hero-content" variants={stagger} initial="initial" animate="animate">
              <motion.div variants={fadeUp}>
                <span className="section-label">WaveCollapse Protocol v4.0</span>
              </motion.div>

              <motion.h1 className="hero-headline" variants={fadeUp}>
                The Settlement<br />
                <span className="gradient-text">Infrastructure Layer</span><br />
                for Institutions
              </motion.h1>

              <motion.p className="hero-sub" variants={fadeUp}>
                Programmable compliance. Provable immutability. Agentic settlement.
                WaveCollapse v4.0 is the GENIUS Act-native protocol layer purpose-built
                for banks, FinTechs, and custodians operating in a regulated digital asset environment.
              </motion.p>

              <motion.div className="hero-actions" variants={fadeUp}>
                <Link to="/solutions/intake" className="btn-primary" id="hero-cta-primary">
                  Request Institutional Access <ArrowRight size={16} />
                </Link>
                <Link to="/trust/simulation" className="btn-secondary" id="hero-cta-simulation">
                  View Simulation Report <Activity size={16} />
                </Link>
              </motion.div>

              <motion.div className="hero-badges" variants={fadeUp}>
                <span className="badge badge-teal">GENIUS Act Compliant</span>
                <span className="badge badge-blue">SEC 17a-4 Equivalent</span>
                <span className="badge badge-amber">ISO 20022 Native</span>
                <span className="badge badge-teal">FIT21 Framework</span>
              </motion.div>
            </motion.div>

            <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1.2, delay: 0.2 }}>
              <HeroGlobe />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Metrics Bar ── */}
      <section className="metrics-bar">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: 6, border: '1px solid rgba(245, 158, 11, 0.2)', marginBottom: 24 }}>
            <AlertTriangle size={16} color="var(--accent-amber)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
              <strong>DISCLAIMER:</strong> Latencies reflect network I/O and BFT consensus overhead measured within a 7-node Docker environment. Global production latency may vary based on geographic node distribution.
            </div>
          </div>
          <div className="metrics-grid">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                className="metric-item"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.45 }}
              >
                <div className="stat-number">{m.value}</div>
                <div className="metric-label">{m.label}</div>
                <div className="metric-sub">{m.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5-Pillar Grid ── */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">The Institutional Stack</span>
            <h2 style={{ marginBottom: 12 }}>Five Pillars of <span className="gradient-text">Protocol Sovereignty</span></h2>
            <p style={{ maxWidth: 560, marginBottom: 48 }}>
              Each pillar addresses a distinct institutional stakeholder—from compliance officers 
              and CTOs to capital allocators and legal teams.
            </p>
          </motion.div>

          <div className="pillar-grid">
            {pillars.map((p, i) => (
              <motion.div
                key={p.id}
                className={`pillar-card glass-card ${p.highlight ? 'pillar-card--highlight' : ''}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                id={`pillar-${p.id}`}
              >
                <div className="pillar-icon">{p.icon}</div>
                <div className="pillar-section-label">{p.label}</div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
                <Link to={p.to} className="pillar-cta" id={`pillar-cta-${p.id}`}>
                  {p.cta} <ChevronRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section-sm">
        <div className="container">
          <motion.div
            className="cta-banner glass-card-teal"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="cta-banner-content">
              <span className="section-label">Ready to Deploy</span>
              <h2>Start with the <span className="gradient-text">Node Wizard</span></h2>
              <p>
                The fastest path to a compliant Validator, Archive, or Facilitator node on WaveNet.
                Provision a testnet environment in under 10 minutes.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
                <Link to="/build/node-wizard" className="btn-primary" id="cta-node-wizard">
                  <Zap size={16} /> Launch Node Wizard
                </Link>
                <Link to="/build/sandbox" className="btn-secondary" id="cta-sandbox">
                  Open Compliance Sandbox
                </Link>
              </div>
            </div>
            <div className="cta-banner-visual">
              <div className="terminal-block" style={{ maxWidth: 340, width: '100%' }}>
                <div className="terminal-header">
                  <span className="terminal-dot dot-red" />
                  <span className="terminal-dot dot-yellow" />
                  <span className="terminal-dot dot-green" />
                  <span style={{ marginLeft: 8 }}>wavecollapse init</span>
                </div>
                <div style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 2 }}>
                  <div style={{ color: 'var(--teal-400)' }}>$ wavecollapse init --type=validator</div>
                  <div style={{ color: 'var(--text-tertiary)' }}>✓ Docker runtime detected</div>
                  <div style={{ color: 'var(--text-tertiary)' }}>✓ GENIUS Act compliance hooks loaded</div>
                  <div style={{ color: 'var(--text-tertiary)' }}>✓ ISO 20022 message schema ready</div>
                  <div style={{ color: 'var(--teal-300)' }}>→ Node provisioned in 8.2s</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
