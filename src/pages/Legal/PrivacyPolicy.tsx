import { motion } from 'framer-motion';

const sections = [
  { title: '1. Information We Collect', body: 'We collect information you provide directly (name, email, organization, compliance questionnaire responses), usage data (pages visited, interactions), and technical data (device, browser, IP address) for security and performance purposes.' },
  { title: '2. How We Use Your Data', body: 'Data is used to process institutional intake requests, improve the WaveCollapse Protocol documentation, and communicate relevant protocol updates. We do not sell personal data to third parties.' },
  { title: '3. Data Retention', body: 'Intake form data is retained for a period sufficient to complete the institutional onboarding process or as required by applicable law. You may request deletion at any time by contacting legal@wavecollapse.io.' },
  { title: '4. Cookies', body: 'We use essential cookies for site functionality. Optional analytics and performance cookies are only set with your explicit consent via our cookie consent banner. See our Cookie Policy for full details.' },
  { title: '5. Security', body: 'All data is transmitted via TLS 1.3. Access to personal data is restricted to authorized personnel. We design our systems to minimize data exposure as a core architectural principle.' },
  { title: '6. Your Rights', body: 'You have the right to access, correct, port, or erase your personal data. Requests should be directed to legal@wavecollapse.io. We will respond within 30 days.' },
  { title: '7. Contact', body: 'For privacy-related inquiries: legal@wavecollapse.io | WaveCollapse Protocol, Attn: Privacy Officer.' },
];

export default function PrivacyPolicy() {
  return (
    <div className="container-sm section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Legal / Privacy Policy</span>
        <h1>Privacy <span style={{ color: 'var(--teal-400)' }}>Policy</span></h1>
        <p style={{ marginTop: 12, marginBottom: 8, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
          Last Updated: April 20, 2026
        </p>
        <p style={{ marginBottom: 40 }}>
          This Privacy Policy describes how WaveCollapse Protocol ("WaveCollapse," "we," "our") collects, uses, and
          protects information in connection with our website and institutional onboarding services.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {sections.map((s) => (
            <div key={s.title} className="glass-card" style={{ padding: 24 }}>
              <h4 style={{ marginBottom: 10, fontFamily: 'var(--font-mono)' }}>{s.title}</h4>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
