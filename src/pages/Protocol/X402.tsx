import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import { Zap } from 'lucide-react';

export default function X402() {
  return (
    <div className="container section">
      <SEOHead
        title="Agentic x402 Settlement Layer"
        description="The x402 layer extends HTTP 402 Payment Required into an autonomous, machine-to-machine settlement negotiation protocol. AI agents settle without human intervention while bounded by ISO 20022 compliance."
        path="/protocol/x402"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Protocol / x402 Layer</span>
        <h1>Agentic <span style={{ color: 'var(--teal-400)' }}>x402 Settlement</span></h1>
        <div style={{ display: 'flex', gap: 12, marginTop: 16, marginBottom: 24 }}>
          <span className="badge badge-teal"><Zap size={10} /> HTTP 402 Extension</span>
          <span className="badge badge-blue">Autonomous Settlement</span>
        </div>
        <p style={{ maxWidth: 640, marginBottom: 40 }}>
          The x402 layer extends the HTTP 402 Payment Required status code into an autonomous, machine-to-machine
          settlement negotiation protocol. AI agents or automated systems can negotiate, confirm, and finalize
          settlement without human intervention — while remaining strictly bounded by ISO 20022 compliance constraints
          and KYT gate logic pre-programmed by the institutional operator.
        </p>
        <div className="glass-card-teal" style={{ padding: 28, maxWidth: 580 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 8 }}>x402 Core Principle</div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            The agents are not rogue — they are deterministic enforcers executing logic strictly bounded by
            the institution's locally-configured compliance payload. Autonomy is the mechanism;
            compliance is the constraint.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
