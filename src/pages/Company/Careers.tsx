import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Briefcase, Mail, ExternalLink } from 'lucide-react';

interface Role {
  title: string;
  dept: string;
  location: string;
  type: string;
  level: string;
  description: string;
  requirements: string[];
}

const openRoles: Role[] = [
  {
    title: 'Senior Protocol Engineer',
    dept: 'Engineering',
    location: 'Remote (US / EU)',
    type: 'Full-Time',
    level: 'Senior',
    description: 'Design and implement core WaveCollapse L1 consensus primitives, Dynamic Threshold Committee logic, and ISO 20022 protocol compliance hooks.',
    requirements: [
      '5+ years systems or blockchain protocol engineering',
      'Deep experience with consensus algorithms (BFT, PoS variants)',
      'Solidity / Rust / Go proficiency',
      'Understanding of financial regulatory frameworks (17a-4, ISO 20022)',
    ],
  },
  {
    title: 'Institutional Partnerships Lead',
    dept: 'Business Development',
    location: 'New York / Remote',
    type: 'Full-Time',
    level: 'Senior',
    description: 'Lead relationships with institutional operators — FinTechs, NeoBank operators, and Fund of Funds — through the WaveCollapse onboarding process.',
    requirements: [
      '7+ years institutional financial services or fintech BD',
      'Demonstrated track record closing enterprise infrastructure deals',
      'Fluency in DeFi, tokenization, and regulatory frameworks',
      'Existing network within CRE, private credit, or digital asset verticals',
    ],
  },
  {
    title: 'Compliance Engineer',
    dept: 'Compliance',
    location: 'Remote (US)',
    type: 'Full-Time',
    level: 'Mid-Senior',
    description: 'Build and maintain the compliance payload architecture — including ISO 20022 metadata enforcement, KYT gate logic, and SEC 17a-4 WORM audit trail systems.',
    requirements: [
      'Background in RegTech, financial compliance technology, or legal engineering',
      'Familiarity with SEC Rule 17a-4, GENIUS Act, FIT21 Act, and FinCEN/BSA',
      'TypeScript / Node.js proficiency',
      'Experience with immutable audit log architecture (WORM storage)',
    ],
  },
];

export default function Careers() {
  return (
    <div className="container section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Company / Careers</span>
        <h1>Build the <span style={{ color: 'var(--teal-400)' }}>Infrastructure</span></h1>
        <p style={{ maxWidth: 680, marginTop: 12, marginBottom: 16, fontSize: '1.05rem', lineHeight: 1.8 }}>
          WaveCollapse is building the settlement infrastructure layer for the next generation of
          regulated financial applications. We are a small, focused team of protocol engineers,
          compliance experts, and institutional partnership leads. We do not hire fast. We hire right.
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 56, flexWrap: 'wrap' }}>
          <span className="badge badge-teal">Remote-First</span>
          <span className="badge badge-blue">Competitive Compensation</span>
          <span className="badge badge-amber">$WAVE Equity Package</span>
        </div>

        {/* ── Culture ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 56 }}>
          {[
            { label: 'Systems Thinkers', desc: 'We reason about incentive design, not features. Every decision is evaluated for regulatory impact, security implications, and architectural coherence.' },
            { label: 'Compliance as Code', desc: 'We do not bolt on compliance after shipping. Regulatory requirements are first-class design inputs, not afterthoughts.' },
            { label: 'Institutional Grade', desc: 'We build for institutions that settle billions per day. Our standards for reliability, auditability, and precision are not negotiable.' },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              className="glass-card"
              style={{ padding: 24 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--teal-400)', marginBottom: 10 }}>{c.label}</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Open Roles ── */}
        <h2 style={{ marginBottom: 8 }}>Open <span className="gradient-text">Roles</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 32 }}>
          All roles include competitive base salary, full remote flexibility, and a $WAVE equity package.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 56 }}>
          {openRoles.map((role, i) => (
            <motion.div
              key={role.title}
              className="glass-card"
              style={{ padding: 28 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', margin: '0 0 6px' }}>{role.title}</h3>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span className="badge badge-teal">
                      <Briefcase size={9} /> {role.dept}
                    </span>
                    <span className="badge badge-blue">
                      <MapPin size={9} /> {role.location}
                    </span>
                    <span className="badge badge-amber">
                      <Clock size={9} /> {role.type}
                    </span>
                  </div>
                </div>
                <a
                  href={`mailto:careers@wavecollapse.io?subject=Application: ${encodeURIComponent(role.title)}`}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '8px 18px', flexShrink: 0 }}
                  id={`careers-apply-${role.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Apply <ArrowRight size={13} />
                </a>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 14 }}>{role.description}</p>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Requirements</div>
                <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {role.requirements.map(req => (
                    <li key={req} style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--teal-600)', flexShrink: 0 }}>→</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── General Application CTA ── */}
        <div className="glass-card-teal" style={{ padding: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h3 style={{ marginBottom: 8 }}>Don't See Your Role?</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, maxWidth: 480 }}>
              We occasionally hire outside our open roles for exceptional candidates.
              Send a general application with your background and the problem you'd want to work on at WaveCollapse.
            </p>
          </div>
          <a
            href="mailto:careers@wavecollapse.io?subject=General Application — WaveCollapse"
            className="btn-primary"
            id="careers-general-apply"
          >
            <Mail size={14} /> Send General Application
          </a>
        </div>
      </motion.div>
    </div>
  );
}
