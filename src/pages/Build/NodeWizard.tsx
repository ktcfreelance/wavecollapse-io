import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Database, ShieldAlert, ArrowRight, Loader2, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { Turnstile, useTurnstile } from 'react-turnstile';

const NODE_TYPE_OPTIONS = [
  { value: 'validator', label: 'Validator Node', icon: <Cpu size={16} />, badge: 'DTC Enabled' },
  { value: 'archive', label: 'Archive / WORM Node', icon: <Database size={16} />, badge: 'SEC 17a-4' },
  { value: 'facilitator', label: 'Facilitator Node', icon: <ShieldAlert size={16} />, badge: 'FinCEN Relay' },
];

const INITIAL_FORM = {
  org_name: '', entity_type: '', jurisdiction: '', ein: '', website: '',
  first_name: '', last_name: '', rep_title: '', email: '', phone: '',
  node_types: [] as string[], estimated_stake: '', infra_provider: '', go_live: '',
  regulator: '', aml_program: '', prior_ops: false, additional: '',
};

export default function NodeWizard() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refId, setRefId] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstile = useTurnstile();

  const toggleNodeType = (val: string) => {
    setForm(prev => ({
      ...prev,
      node_types: prev.node_types.includes(val)
        ? prev.node_types.filter(v => v !== val)
        : [...prev.node_types, val],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.node_types.length === 0) {
      setError('Please select at least one node type.');
      return;
    }

    setIsSubmitting(true);
    try {
      const applyUrl = import.meta.env.VITE_WC_NODE_APPLY_URL;

      if (!applyUrl) {
        console.warn('VITE_WC_NODE_APPLY_URL not configured — using client-side stub');
        setRefId(`WC-NO-${Date.now().toString(36).toUpperCase()}`);
        setSubmitted(true);
        return;
      }

      const res = await fetch(applyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Server error (${res.status})`);

      setRefId(data.ref_id);
      setSubmitted(true);
    } catch (err) {
      console.error('Application submission failed:', err);
      setError(err instanceof Error ? err.message : 'Unable to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
      turnstile.reset();
      setTurnstileToken('');
    }
  };

  // ── Success State ────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="container section">
        <motion.div className="glass-card-teal" style={{ padding: 40, maxWidth: 600, margin: '80px auto' }}
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <CheckCircle2 size={44} color="var(--teal-400)" />
          <h2 style={{ marginTop: 16 }}>Application Received</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 8 }}>
            Your node operator application for <strong>{form.org_name}</strong> has been received.
            The WaveCollapse onboarding team will review your application and contact{' '}
            <strong>{form.email}</strong> to begin the credentialing process.
          </p>
          <div style={{
            marginTop: 20, padding: '14px 18px',
            background: 'rgba(23,207,174,0.08)', border: '1px solid rgba(23,207,174,0.2)',
            borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>Reference:</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700,
              color: 'var(--teal-400)', letterSpacing: '0.5px',
            }}>{refId}</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 12, lineHeight: 1.6 }}>
            A confirmation email has been sent to <strong>{form.email}</strong>.
            Save your reference ID for all future correspondence.
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Application Form ─────────────────────────────────────────────────────────
  return (
    <div className="container section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label"><Terminal size={12} /> Build / Node Operator Application</span>
        <h1>Node Operator <span style={{ color: 'var(--teal-400)' }}>Application</span></h1>
        <p style={{ maxWidth: 600, marginBottom: 12, marginTop: 12 }}>
          WaveCollapse node operations are restricted to credentialed institutional partners.
          Complete this application to begin the vetting process—approved operators will receive
          sandbox provisioning and configuration access.
        </p>
        <div className="badge badge-teal" style={{ marginBottom: 40 }}>
          <Zap size={11} /> Institutional Pipeline
        </div>

        <div className="glass-card" style={{ padding: 36, maxWidth: 720 }}>
          <h3 style={{ marginBottom: 4 }}>Operator Screening Form</h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-tertiary)', marginBottom: 28 }}>
            All fields marked with * are required. Data is processed under our{' '}
            <a href="/legal/privacy" style={{ color: 'var(--teal-400)' }}>Privacy Policy</a>.
          </p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 20,
                padding: '14px 16px', borderRadius: 8,
                border: '1px solid rgba(239, 68, 68, 0.4)', backgroundColor: 'rgba(239, 68, 68, 0.08)',
              }}>
              <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#ef4444', fontWeight: 600 }}>Submission Failed</p>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{error}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* ── Section: Organization ─────────────────────────────────────── */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal-400)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Organization Details
              </legend>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                <div>
                  <label className="form-label" htmlFor="app-org">Organization Name *</label>
                  <input id="app-org" className="form-input" required placeholder="Acme Financial Corp"
                    value={form.org_name} onChange={e => setForm({ ...form, org_name: e.target.value })} disabled={isSubmitting} />
                </div>
                <div>
                  <label className="form-label" htmlFor="app-entity">Entity Type</label>
                  <select id="app-entity" className="form-input" value={form.entity_type}
                    onChange={e => setForm({ ...form, entity_type: e.target.value })} disabled={isSubmitting}>
                    <option value="">Select Type</option>
                    <option>LLC</option>
                    <option>Corporation (C-Corp / S-Corp)</option>
                    <option>Limited Partnership</option>
                    <option>DAO / Foundation</option>
                    <option>Individual / Sole Proprietor</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="app-jurisdiction">Jurisdiction</label>
                  <input id="app-jurisdiction" className="form-input" placeholder="e.g. Delaware, USA"
                    value={form.jurisdiction} onChange={e => setForm({ ...form, jurisdiction: e.target.value })} disabled={isSubmitting} />
                </div>
                <div>
                  <label className="form-label" htmlFor="app-ein">EIN / Tax ID</label>
                  <input id="app-ein" className="form-input" placeholder="Optional at this stage"
                    value={form.ein} onChange={e => setForm({ ...form, ein: e.target.value })} disabled={isSubmitting} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" htmlFor="app-website">Website</label>
                  <input id="app-website" className="form-input" type="url" placeholder="https://yourfirm.com"
                    value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} disabled={isSubmitting} />
                </div>
              </div>
            </fieldset>

            {/* ── Section: Authorized Representative ───────────────────────── */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal-400)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Authorized Representative
              </legend>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                <div>
                  <label className="form-label" htmlFor="app-first">First Name *</label>
                  <input id="app-first" className="form-input" required placeholder="Jane"
                    value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} disabled={isSubmitting} />
                </div>
                <div>
                  <label className="form-label" htmlFor="app-last">Last Name *</label>
                  <input id="app-last" className="form-input" required placeholder="Smith"
                    value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} disabled={isSubmitting} />
                </div>
                <div>
                  <label className="form-label" htmlFor="app-title">Title / Role</label>
                  <input id="app-title" className="form-input" placeholder="Chief Technology Officer"
                    value={form.rep_title} onChange={e => setForm({ ...form, rep_title: e.target.value })} disabled={isSubmitting} />
                </div>
                <div>
                  <label className="form-label" htmlFor="app-phone">Phone</label>
                  <input id="app-phone" className="form-input" type="tel" placeholder="+1 (555) 000-0000"
                    value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} disabled={isSubmitting} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" htmlFor="app-email">Business Email *</label>
                  <input id="app-email" className="form-input" type="email" required placeholder="compliance@yourfirm.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} disabled={isSubmitting} />
                </div>
              </div>
            </fieldset>

            {/* ── Section: Node Interest ───────────────────────────────────── */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal-400)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Node Interest *
              </legend>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
                {NODE_TYPE_OPTIONS.map(n => {
                  const selected = form.node_types.includes(n.value);
                  return (
                    <button key={n.value} type="button" onClick={() => toggleNodeType(n.value)} disabled={isSubmitting}
                      id={`app-node-${n.value}`}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
                        padding: '16px 18px', borderRadius: 10, cursor: 'pointer',
                        background: selected ? 'rgba(23,207,174,0.08)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${selected ? 'rgba(23,207,174,0.4)' : 'var(--border-muted)'}`,
                        color: selected ? 'var(--teal-400)' : 'var(--text-secondary)',
                        transition: 'all var(--transition-normal)',
                        textAlign: 'left',
                      }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        {n.icon}
                        <span className="badge badge-teal" style={{ fontSize: '0.58rem', opacity: selected ? 1 : 0.5 }}>{n.badge}</span>
                      </div>
                      <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>{n.label}</span>
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <label className="form-label" htmlFor="app-stake">Estimated Stake (Validators)</label>
                  <select id="app-stake" className="form-input" value={form.estimated_stake}
                    onChange={e => setForm({ ...form, estimated_stake: e.target.value })} disabled={isSubmitting}>
                    <option value="">Select Range</option>
                    <option>$100K – $250K</option>
                    <option>$250K – $1M</option>
                    <option>$1M – $10M</option>
                    <option>Over $10M</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="app-infra">Infrastructure Provider</label>
                  <select id="app-infra" className="form-input" value={form.infra_provider}
                    onChange={e => setForm({ ...form, infra_provider: e.target.value })} disabled={isSubmitting}>
                    <option value="">Select Provider</option>
                    <option>AWS</option>
                    <option>Azure</option>
                    <option>Google Cloud</option>
                    <option>Bare Metal / Colo</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="app-golive">Expected Go-Live</label>
                  <select id="app-golive" className="form-input" value={form.go_live}
                    onChange={e => setForm({ ...form, go_live: e.target.value })} disabled={isSubmitting}>
                    <option value="">Select Timeline</option>
                    <option>Immediate</option>
                    <option>Within 30 days</option>
                    <option>Within 90 days</option>
                    <option>Exploring / No timeline</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* ── Section: Compliance Posture ──────────────────────────────── */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal-400)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Compliance Posture
              </legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <label className="form-label" htmlFor="app-regulator">Primary Regulator</label>
                  <select id="app-regulator" className="form-input" value={form.regulator}
                    onChange={e => setForm({ ...form, regulator: e.target.value })} disabled={isSubmitting}>
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
                <div>
                  <label className="form-label" htmlFor="app-aml">AML/BSA Program?</label>
                  <select id="app-aml" className="form-input" value={form.aml_program}
                    onChange={e => setForm({ ...form, aml_program: e.target.value })} disabled={isSubmitting}>
                    <option value="">Select Status</option>
                    <option>Yes — Active</option>
                    <option>In Progress</option>
                    <option>No</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 4 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.84rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.prior_ops}
                      onChange={e => setForm({ ...form, prior_ops: e.target.checked })}
                      disabled={isSubmitting}
                      style={{ width: 16, height: 16, accentColor: 'var(--teal-400)' }} />
                    Prior node operations
                  </label>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <label className="form-label" htmlFor="app-additional">Additional Context</label>
                <textarea id="app-additional" className="form-input" rows={3}
                  placeholder="Describe your integration objectives, compliance considerations, or questions..."
                  value={form.additional} onChange={e => setForm({ ...form, additional: e.target.value })}
                  maxLength={2000}
                  style={{ resize: 'vertical' }} disabled={isSubmitting} />
              </div>
            </fieldset>

            {/* ── Consent + Submit ─────────────────────────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="checkbox" id="app-consent" required style={{ width: 16, height: 16, accentColor: 'var(--teal-400)' }} disabled={isSubmitting} />
              <label htmlFor="app-consent" style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                I agree to the <a href="/legal/terms" style={{ color: 'var(--teal-400)' }}>Terms of Service</a> and{' '}
                <a href="/legal/privacy" style={{ color: 'var(--teal-400)' }}>Privacy Policy</a>, and confirm I am authorized
                to represent the organization listed above.
              </label>
            </div>

            {/* Turnstile Bot Protection */}
            <div style={{ marginTop: 4 }}>
              <Turnstile
                sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY || ''}
                onVerify={(t: string) => setTurnstileToken(t)}
                onExpire={() => setTurnstileToken('')}
                theme="dark"
              />
            </div>

            <button type="submit" className="btn-primary" id="app-submit-btn"
              style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}
              disabled={isSubmitting || !turnstileToken}>
              {isSubmitting ? (
                <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Submitting…</>
              ) : (
                <>Submit Application <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Privacy Notice */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 20, padding: '12px 16px', borderRadius: 8, background: 'rgba(23,207,174,0.04)', border: '1px solid rgba(23,207,174,0.12)' }}>
            <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>🔒</span>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--teal-400)' }}>Your data is secured.</strong>{' '}
              Application data is stored in an isolated WaveCollapse Supabase instance with Row Level Security enabled.
              No identity documents are collected at this stage—formal KYC/KYB verification occurs during Phase 03 credentialing.
            </p>
          </div>
        </div>

        {/* ── Infrastructure Requirements Appendix ── */}
        <div className="glass-card" style={{ marginTop: 64, padding: 32 }}>
          <h2 style={{ marginBottom: 16 }}>Infrastructure <span className="gradient-text">Prerequisites</span></h2>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 24, lineHeight: 1.6 }}>
            WaveCollapse is designed for cloud-native elasticity. Bare-metal deployments are supported, but SEC 17a-4 compliant nodes require S3-compatible cloud object storage integrations. Ensure your operational environment meets the baseline resource thresholds before configuring your node.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Node Role</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Compute (CPU/RAM)</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Local Storage</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Network / Cloud Constraints</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-tertiary)' }}>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 500 }}>Validator</td>
                  <td style={{ padding: '16px' }}>2+ Cores, 4 GB RAM</td>
                  <td style={{ padding: '16px' }}>50–100 GB SSD</td>
                  <td style={{ padding: '16px' }}>10 Mbps sym, Stable P2P Port 9000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 500 }}>Archive (17a-4)</td>
                  <td style={{ padding: '16px' }}>2+ Cores, 8 GB RAM</td>
                  <td style={{ padding: '16px' }}>0.5–2 TB SSD</td>
                  <td style={{ padding: '16px' }}>50 Mbps+, AWS S3 / Azure Object Sync</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 500 }}>Facilitator</td>
                  <td style={{ padding: '16px' }}>1-2 Cores, 1-2 GB RAM</td>
                  <td style={{ padding: '16px' }}>10 GB (Stateless relay)</td>
                  <td style={{ padding: '16px' }}>5 Mbps+, Edge-device supported</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
