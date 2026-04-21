import { motion } from 'framer-motion';

const cookieTypes = [
  { type: 'Essential', required: true, desc: 'Required for the website to function. These cannot be disabled. Includes session management and security tokens.' },
  { type: 'Analytics', required: false, desc: 'Help us understand how visitors navigate the protocol documentation. Data is anonymized and never sold. Powered by privacy-first analytics.' },
  { type: 'Performance', required: false, desc: 'Monitor page load times and protocol dashboard latency to optimize the user experience for institutional operators.' },
  { type: 'Marketing', required: false, desc: 'Allow us to present institutional content (whitepapers, event invitations) relevant to your compliance role. Only set with explicit consent.' },
];

export default function CookiePolicy() {
  return (
    <div className="container-sm section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Legal / Cookie Policy</span>
        <h1>Cookie <span style={{ color: 'var(--teal-400)' }}>Policy</span></h1>
        <p style={{ marginTop: 12, marginBottom: 8, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
          Last Updated: April 20, 2026
        </p>
        <p style={{ marginBottom: 40 }}>
          This Cookie Policy explains how WaveCollapse Protocol uses cookies and similar tracking technologies on our website.
          You can manage your cookie preferences at any time via the cookie settings banner.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {cookieTypes.map((c) => (
            <div key={c.type} className="glass-card" style={{ padding: 24, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{ minWidth: 120 }}>
                <span className={`badge ${c.required ? 'badge-amber' : 'badge-blue'}`}>
                  {c.type}
                </span>
                {c.required && <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>Always Active</div>}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="glass-card" style={{ padding: 24 }}>
          <h4 style={{ marginBottom: 10 }}>Manage Your Preferences</h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            To update your consent preferences, clear your browser's localStorage for this domain and
            refresh the page. The cookie consent banner will reappear. You can also contact us at{' '}
            <a href="mailto:privacy@wavecollapse.io" style={{ color: 'var(--teal-400)' }}>privacy@wavecollapse.io</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
