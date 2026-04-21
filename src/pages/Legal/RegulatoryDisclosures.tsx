import { motion } from 'framer-motion';
import { Shield, FileText, Lock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const docs = [
  { icon: <Shield size={20} />, title: 'SEC 17a-4 Legal Equivalency Memo', desc: 'Technical and legal argument mapping the Redundant Equivalency Standard to SEC\'s Audit-Trail Method.', to: '/trust/sec17a4', badge: 'Primary' },
  { icon: <FileText size={20} />, title: 'GENIUS Act Technology Provider Analysis', desc: 'How WaveCollapse maintains Technology Provider classification to leverage GENIUS Act statutory protections.', badge: 'Framework' },
  { icon: <Shield size={20} />, title: 'FIT21 Digital Commodity Classification', desc: 'Network decentralization analysis supporting $WAVE classification as a Digital Commodity under FIT21, grounded in the protocol\'s sufficient decentralization architecture.', badge: 'Securities' },
  { icon: <Lock size={20} />, title: 'Howey Test Analysis — $WAVE Token', desc: 'Structured legal analysis confirming that $WAVE validator staking compensation does not constitute an investment contract under the Restricted Utility Pool framework.', badge: 'Securities' },
  { icon: <BookOpen size={20} />, title: 'ISO 20022 Implementation Guide', desc: 'Technical specification for mandatory purposeCode and creditorLEI field mapping in all settlement messages.', badge: 'Technical' },
  { icon: <FileText size={20} />, title: 'FinCEN/BSA Facilitator Node Opinion', desc: 'Analysis of Facilitator Node architecture and its compliance with FinCEN money services business regulations.', badge: 'Regulatory' },
];

export default function RegulatoryDisclosures() {
  return (
    <div className="container section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Legal / Regulatory Disclosures</span>
        <h1>Regulatory <span style={{ color: 'var(--teal-400)' }}>Document Library</span></h1>
        <p style={{ maxWidth: 640, marginTop: 12, marginBottom: 48 }}>
          WaveCollapse provides full regulatory transparency. All legal equivalency memos, framework analyses, and
          compliance documentation are archived here for institutional review and legal due diligence.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 48 }}>
          {docs.map((d, i) => (
            <motion.div key={d.title}
              className="glass-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--teal-400)', marginTop: 2 }}>{d.icon}</div>
                <span className="badge badge-blue">{d.badge}</span>
              </div>
              <h4 style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
                {d.to ? <Link to={d.to} style={{ color: 'var(--text-primary)' }}>{d.title}</Link> : d.title}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.65, flex: 1 }}>{d.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass-card" style={{ padding: 28 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--teal-400)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>General Legal Disclosure</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.7 }}>
            WaveCollapse Protocol operates as a Technology Provider under the GENIUS Act of 2025. Nothing contained on this
            website or in any document linked herein constitutes legal, investment, tax, or regulatory advice. All
            regulatory analyses are provided for informational purposes only. Institutional operators must conduct
            independent legal review before relying on any document contained in this library for regulatory
            compliance purposes. WaveCollapse is not a registered broker-dealer, investment adviser, or money services business.
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.7, marginTop: 12 }}>
            Legal inquiries: <a href="mailto:legal@wavecollapse.io" style={{ color: 'var(--teal-400)' }}>legal@wavecollapse.io</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
