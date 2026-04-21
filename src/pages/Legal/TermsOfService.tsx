import { motion } from 'framer-motion';

const sections = [
  { title: '1. Acceptance of Terms', body: 'By accessing or using the WaveCollapse Protocol website, documentation, or developer tools, you agree to be bound by these Terms of Service and all applicable laws and regulations.' },
  { title: '2. Technology Provider Status', body: 'WaveCollapse Protocol operates solely as a technology provider under the GENIUS Act of 2025. We do not issue payment stablecoins, operate as a broker-dealer, act as a custodian, or provide investment advice.' },
  { title: '3. No Investment Advice', body: 'Nothing on this website constitutes investment, legal, tax, or regulatory advice. All technical and regulatory documentation is provided for informational purposes only. You must conduct your own due diligence.' },
  { title: '4. Developer Tools & Sandbox', body: 'The Node Wizard, Compliance Sandbox, and TypeScript SDK are provided "as-is" for institutional evaluation. Use in production environments requires a separate credentialing agreement with WaveCollapse.' },
  { title: '5. Intellectual Property', body: 'The WaveCollapse Protocol, design system, and all associated documentation are the intellectual property of WaveCollapse Protocol. Protocol specifications are open-standard; UI and brand elements are proprietary.' },
  { title: '6. Limitation of Liability', body: 'WaveCollapse shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or any protocol-related documentation, to the fullest extent permitted by law.' },
  { title: '7. Governing Law', body: 'These terms are governed by the laws of the United States. Any disputes shall be resolved in the federal courts of competent jurisdiction.' },
];

export default function TermsOfService() {
  return (
    <div className="container-sm section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Legal / Terms of Service</span>
        <h1>Terms of <span style={{ color: 'var(--teal-400)' }}>Service</span></h1>
        <p style={{ marginTop: 12, marginBottom: 8, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
          Last Updated: April 20, 2026
        </p>
        <p style={{ marginBottom: 40 }}>
          These Terms of Service govern your access to and use of the WaveCollapse Protocol website, developer tools, and documentation.
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
