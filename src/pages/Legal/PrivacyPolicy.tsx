import { motion } from 'framer-motion';

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly through our intake and application forms, including: organization name, entity type, jurisdiction, EIN/Tax ID, website, authorized representative name and title, business email, phone number, node operation preferences, infrastructure details, compliance posture indicators (primary regulator, AML/BSA program status), and any additional context you choose to provide. We also collect technical data including device type, browser, and a one-way SHA-256 hash of your IP address for fraud prevention and audit purposes. We do not store raw IP addresses.',
  },
  {
    title: '2. How We Use Your Data',
    body: 'Data is used to: (a) process institutional intake and node operator applications, (b) evaluate organizational eligibility for protocol participation, (c) communicate application status and protocol updates via transactional email, (d) prevent fraudulent or duplicate submissions, and (e) comply with applicable regulatory requirements. We do not sell, rent, or trade personal data to third parties.',
  },
  {
    title: '3. Third-Party Service Providers',
    body: 'We use the following third-party processors to operate our services: Supabase (PostgreSQL database hosting — data stored in US-East-1 with Row Level Security enabled), Brevo (transactional email delivery for application confirmations and operator notifications), and Cloudflare (DNS, CDN, and Turnstile bot protection). Each processor is bound by data processing agreements and processes data only on our instructions.',
  },
  {
    title: '4. Data Isolation',
    body: 'In accordance with our protocol architecture, institutional intake and node operator application data is stored in a dedicated, isolated database instance separate from all other WaveCollapse product infrastructure. This bifurcation ensures that onboarding data is never commingled with protocol operational data.',
  },
  {
    title: '5. Bot Protection',
    body: 'We use Cloudflare Turnstile on our forms to verify that submissions originate from humans. Turnstile may set cookies and process limited technical data (IP address, browser fingerprint) to generate a challenge token. This data is processed by Cloudflare under their privacy policy and is not stored by WaveCollapse.',
  },
  {
    title: '6. Data Retention',
    body: 'Application and intake data is retained for a period sufficient to complete the institutional onboarding process, or as required by applicable law and regulatory obligations. Hashed IP data is retained for up to 24 months for fraud audit purposes. You may request deletion at any time by contacting legal@wavecollapse.io.',
  },
  {
    title: '7. Cookies',
    body: 'We use essential cookies for site functionality. Optional analytics and performance cookies are only set with your explicit consent via our cookie consent banner. See our Cookie Policy for full details.',
  },
  {
    title: '8. Security',
    body: 'All data is transmitted via TLS 1.3. Database access is restricted to service-role credentials with Row Level Security enforced at the database layer. IP addresses are irreversibly hashed (SHA-256) before storage. Access to personal data is restricted to authorized personnel on a need-to-know basis.',
  },
  {
    title: '9. Your Rights',
    body: 'You have the right to access, correct, port, or erase your personal data. You may also object to or restrict processing under applicable data protection laws. Requests should be directed to legal@wavecollapse.io. We will respond within 30 days.',
  },
  {
    title: '10. Contact',
    body: 'For privacy-related inquiries: legal@wavecollapse.io | WaveCollapse Protocol, Attn: Privacy Officer.',
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="container-sm section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Legal / Privacy Policy</span>
        <h1>Privacy <span style={{ color: 'var(--teal-400)' }}>Policy</span></h1>
        <p style={{ marginTop: 12, marginBottom: 8, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
          Last Updated: April 28, 2026
        </p>
        <p style={{ marginBottom: 40 }}>
          This Privacy Policy describes how WaveCollapse Protocol ("WaveCollapse," "we," "our") collects, uses, and
          protects information in connection with our website, institutional onboarding services, and node operator application portal.
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
