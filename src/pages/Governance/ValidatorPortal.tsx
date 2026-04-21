import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ValidatorPortal() {
  return (
    <div className="container section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Governance / Validator Portal</span>
        <h1>Validator <span style={{ color: 'var(--teal-400)' }}>Portal</span></h1>
        <p style={{ maxWidth: 620, marginTop: 12, marginBottom: 32 }}>
          Manage your validator stake, SLA contract status, Dynamic Threshold Committee participation,
          and on-chain health metrics. Access is restricted to credentialed institutional validators.
        </p>
        <div className="glass-card-teal" style={{ padding: 28, maxWidth: 480 }}>
          <h3 style={{ marginBottom: 8 }}>Credentialing Required</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
            The live Validator Portal is available to institutions that have completed Phase 03 prodution credentialing.
          </p>
          <Link to="/solutions/intake" className="btn-primary" id="validator-portal-intake-link">
            Begin Onboarding
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
