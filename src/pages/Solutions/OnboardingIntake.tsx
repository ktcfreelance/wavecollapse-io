import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Server, Key, CheckCircle2, ArrowRight } from 'lucide-react';

const phases = [
  { icon: <ClipboardList size={22} />, num: '01', title: 'Readiness Assessment', desc: 'Complete a compliance questionnaire covering your regulatory posture, AML program status, and infrastructure tier.' },
  { icon: <Server size={22} />, num: '02', title: 'Sandbox Provisioning', desc: 'Instant testnet access. Spin up a Node Wizard environment in isolation to validate integration patterns without production risk.' },
  { icon: <Key size={22} />, num: '03', title: 'Production Credentialing', desc: 'Managed key issuance for institutional validators. Includes SLA contract execution and DTC configuration verification.' },
];

type Phase = 1 | 2 | 3;

export default function OnboardingIntake() {
  const [phase, setPhase] = useState<Phase>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ org: '', role: '', aum: '', regulator: '', use_case: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Solutions / Institutional Onboarding</span>
        <h1>Institutional <span style={{ color: 'var(--teal-400)' }}>Intake Portal</span></h1>
        <p style={{ maxWidth: 600, marginTop: 12, marginBottom: 48 }}>
          WaveCollapse onboarding is a phased, high-touch process designed to match enterprise procurement and
          risk assessment workflows. Complete your readiness assessment to begin.
        </p>

        {/* Phase Progress */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
          {phases.map((p, i) => (
            <div key={p.num} onClick={() => setPhase((i + 1) as Phase)}
              className={`glass-card ${phase === i + 1 ? 'glass-card-teal' : ''}`}
              style={{ padding: 20, cursor: 'pointer', transition: 'all var(--transition-normal)', display: 'flex', flexDirection: 'column', gap: 10 }}
              id={`intake-phase-${p.num}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: 'var(--teal-400)' }}>{p.icon}</div>
                <span className="badge badge-teal">{p.num}</span>
              </div>
              <h4 style={{ fontSize: '0.95rem' }}>{p.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        {!submitted ? (
          <div className="glass-card" style={{ padding: 36, maxWidth: 640 }}>
            <h3 style={{ marginBottom: 6 }}>Phase 01: Readiness Assessment</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-tertiary)', marginBottom: 28 }}>
              All fields are required for institutional screening. Data is processed under our{' '}
              <a href="/legal/privacy" style={{ color: 'var(--teal-400)' }}>Privacy Policy</a>.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label className="form-label" htmlFor="intake-org">Organization Name</label>
                  <input id="intake-org" className="form-input" required placeholder="Acme Financial Corp"
                    value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} />
                </div>
                <div>
                  <label className="form-label" htmlFor="intake-role">Your Role</label>
                  <select id="intake-role" className="form-input" required value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}>
                    <option value="">Select Role</option>
                    <option>Chief Technology Officer</option>
                    <option>Chief Compliance Officer</option>
                    <option>Chief Risk Officer</option>
                    <option>FinTech Architect</option>
                    <option>Legal / Regulatory Counsel</option>
                    <option>Capital Allocator</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label className="form-label" htmlFor="intake-aum">AUM / Transaction Volume (USD)</label>
                  <select id="intake-aum" className="form-input" value={form.aum}
                    onChange={e => setForm({ ...form, aum: e.target.value })}>
                    <option value="">Select Range</option>
                    <option>Under $10M</option>
                    <option>$10M–$100M</option>
                    <option>$100M–$1B</option>
                    <option>Over $1B</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="intake-regulator">Primary Regulator</label>
                  <select id="intake-regulator" className="form-input" value={form.regulator}
                    onChange={e => setForm({ ...form, regulator: e.target.value })}>
                    <option value="">Select Regulator</option>
                    <option>SEC</option>
                    <option>CFTC</option>
                    <option>OCC / Federal Reserve</option>
                    <option>FinCEN</option>
                    <option>State Banking Authority</option>
                    <option>FCA (UK)</option>
                    <option>Other / International</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="intake-usecase">Primary Use Case</label>
                <textarea id="intake-usecase" className="form-input" rows={3}
                  placeholder="Describe your settlement use case or integration objective..."
                  value={form.use_case} onChange={e => setForm({ ...form, use_case: e.target.value })}
                  style={{ resize: 'vertical' }} />
              </div>
              <div>
                <label className="form-label" htmlFor="intake-email">Business Email</label>
                <input id="intake-email" className="form-input" type="email" required
                  placeholder="compliance@yourfirm.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input type="checkbox" id="intake-consent" required style={{ width: 16, height: 16, accentColor: 'var(--teal-400)' }} />
                <label htmlFor="intake-consent" style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                  I agree to the{' '}
                  <a href="/legal/terms" style={{ color: 'var(--teal-400)' }}>Terms of Service</a>{' '}
                  and{' '}
                  <a href="/legal/privacy" style={{ color: 'var(--teal-400)' }}>Privacy Policy</a>.
                </label>
              </div>
              <button type="submit" className="btn-primary" id="intake-submit-btn" style={{ alignSelf: 'flex-start' }}>
                Submit Assessment <ArrowRight size={16} />
              </button>
            </form>
          </div>
        ) : (
          <motion.div className="glass-card-teal" style={{ padding: 36, maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 16 }}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <CheckCircle2 size={40} color="var(--teal-400)" />
            <h3>Assessment Received</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Your institutional readiness assessment has been received. A WaveCollapse protocol engineer will
              contact <strong>{form.email}</strong> within 2 business days to schedule Phase 02 sandbox provisioning.
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
              Reference: WC-{Date.now().toString(36).toUpperCase()}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
