import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Key, FileText, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const endpoints = [
  { method: 'POST', path: '/v1/settlement/initiate', desc: 'Initiate a new settlement transaction. Requires ISO 20022 pacs.008 payload.' },
  { method: 'GET',  path: '/v1/settlement/{txId}/status', desc: 'Poll the settlement status for a specific transaction ID.' },
  { method: 'POST', path: '/v1/compliance/validate', desc: 'Validate an ISO 20022 message payload against the current KYT rules before submission.' },
  { method: 'GET',  path: '/v1/network/health', desc: 'Returns current validator committee health, block latency, and DTC coverage metrics.' },
  { method: 'POST', path: '/v1/wavs/issue', desc: 'Issue a new WAVE-S instrument. Requires credentialed institutional operator key.' },
  { method: 'GET',  path: '/v1/wavs/{instrumentId}', desc: 'Retrieve current cap table, whitelist status, and transfer history for a WAVE-S instrument.' },
];

const methodColor: Record<string, string> = {
  GET:  '#93C5FD',
  POST: 'var(--teal-300)',
  PUT:  '#FCD34D',
  DELETE: '#FCA5A5',
};

const tiers = [
  {
    name: 'Observer',
    access: 'Public',
    color: 'var(--text-tertiary)',
    features: ['Network health endpoints', 'Protocol documentation', 'Testnet sandbox access'],
  },
  {
    name: 'Institutional',
    access: 'Credentialed',
    color: 'var(--teal-400)',
    features: ['Full settlement API', 'WAVE-S instrument issuance', 'Compliance validation endpoints', 'Dedicated Facilitator node', '99.97% uptime SLA'],
  },
];

export default function ApiReference() {
  return (
    <div className="container section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Build / API Reference</span>
        <h1>API <span style={{ color: 'var(--teal-400)' }}>Reference</span></h1>
        <p style={{ maxWidth: 680, marginTop: 12, marginBottom: 16 }}>
          The WaveCollapse REST API provides programmatic access to settlement initiation,
          compliance validation, WAVE-S instrument management, and network health monitoring.
          Full access requires institutional credentials issued upon completion of the three-phase onboarding process.
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
          <span className="badge badge-teal"><Lock size={10} /> Credentialed Access Required</span>
          <span className="badge badge-blue">REST + JSON</span>
          <span className="badge badge-amber">TypeScript SDK Available</span>
        </div>

        {/* ── Access Gate ── */}
        <div className="glass-card-teal" style={{ padding: 32, marginBottom: 48, display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: 48, height: 48, background: 'rgba(23,207,174,0.15)', border: '1px solid var(--border-strong)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-400)', flexShrink: 0 }}>
            <Key size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: 8 }}>API Access is Credentialed</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
              Institutional API keys are issued during Phase 03 of the onboarding process, after your legal entity has
              completed KYB verification and your compliance posture assessment has been reviewed.
              Observer-tier keys for testnet access are available to any registered institution.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/solutions/intake" className="btn-primary" id="api-cta-intake">
                Begin Onboarding <ArrowRight size={14} />
              </Link>
              <Link to="/build/sandbox" className="btn-secondary" id="api-cta-sandbox">
                Try Compliance Sandbox
              </Link>
            </div>
          </div>
        </div>

        {/* ── Access Tiers ── */}
        <h2 style={{ marginBottom: 8 }}>Access <span className="gradient-text">Tiers</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 28 }}>
          Two credential tiers control access to different API surface areas.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 56 }}>
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={i === 1 ? 'glass-card-teal' : 'glass-card'}
              style={{ padding: 28 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800, color: tier.color }}>{tier.name}</div>
                <span className="badge badge-teal" style={{ color: tier.color, borderColor: `${tier.color}40`, background: `${tier.color}15` }}>{tier.access}</span>
              </div>
              <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {tier.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle size={13} color={tier.color} style={{ flexShrink: 0, marginTop: 2 }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── Endpoint Reference ── */}
        <h2 style={{ marginBottom: 8 }}>Endpoint <span className="gradient-text">Reference</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 28 }}>
          Core API surface — all endpoints require Bearer token authentication.
          Full interactive documentation is issued alongside institutional API keys.
        </p>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', marginBottom: 48 }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
              Base URL: <span style={{ color: 'var(--teal-300)' }}>https://api.wavecollapse.io</span>
            </span>
          </div>
          {endpoints.map((ep, i) => (
            <div
              key={ep.path}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                padding: '16px 20px',
                borderBottom: i < endpoints.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, color: methodColor[ep.method] || 'white', background: `${methodColor[ep.method]}18`, border: `1px solid ${methodColor[ep.method]}40`, borderRadius: 4, padding: '2px 8px', flexShrink: 0, minWidth: 48, textAlign: 'center' }}>
                {ep.method}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: 4 }}>{ep.path}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>{ep.desc}</div>
              </div>
              <Lock size={13} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 2 }} />
            </div>
          ))}
        </div>

        {/* ── SDK CTA ── */}
        <div className="glass-card" style={{ padding: 24, display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <FileText size={20} color="var(--teal-400)" />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>TypeScript SDK — @wavecollapse/sdk</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>Typed client library wrapping the full API surface with ISO 20022 message construction helpers.</div>
            </div>
          </div>
          <Link to="/build/sdk" className="btn-secondary" id="api-sdk-link">
            View SDK Docs <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
