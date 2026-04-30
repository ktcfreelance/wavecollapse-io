import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Mail, Building2, User, MessageSquare, Send } from 'lucide-react';

const categories = [
  'Partnership / Integration',
  'Institutional Onboarding',
  'Technical / Protocol Questions',
  'Press / Media Inquiry',
  'Investment / OTC Desk',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', org: '', email: '', category: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would POST to a backend / edge function
    setSubmitted(true);
  };

  return (
    <div className="container section">
      <SEOHead
        title="Contact"
        description="Contact WaveCollapse for institutional partnerships, onboarding questions, and press inquiries. Messages are reviewed and triaged within one business day."
        path="/contact"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Company / Contact</span>
        <h1>Contact <span style={{ color: 'var(--teal-400)' }}>WaveCollapse</span></h1>
        <p style={{ maxWidth: 620, marginTop: 12, marginBottom: 48 }}>
          For institutional partnership inquiries, onboarding questions, and press requests.
          All messages are reviewed by the WaveCollapse team and triaged within one business day.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40, alignItems: 'start' }}>
          {/* ── Left: Contact Cards ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: <Mail size={18} />, title: 'General Inquiries', detail: 'hello@wavecollapse.io', color: 'var(--teal-400)' },
              { icon: <Building2 size={18} />, title: 'Institutional Partnerships', detail: 'institutional@wavecollapse.io', color: '#60A5FA' },
              { icon: <MessageSquare size={18} />, title: 'Press & Media', detail: 'press@wavecollapse.io', color: 'var(--accent-amber)' },
            ].map(item => (
              <div key={item.title} className="glass-card" style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, background: `${item.color}15`, border: `1px solid ${item.color}40`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: '0.78rem', color: item.color }}>{item.detail}</div>
                </div>
              </div>
            ))}

            <div className="glass-card-teal" style={{ padding: 20 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal-400)', letterSpacing: '0.1em', marginBottom: 10 }}>FAST TRACK</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 14 }}>
                Institutional operators can skip the contact queue by starting the formal onboarding intake directly.
              </p>
              <a href="/solutions/intake" className="btn-primary" style={{ display: 'inline-flex', fontSize: '0.8rem', padding: '8px 18px' }} id="contact-intake-cta">
                Start Onboarding <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          {submitted ? (
            <motion.div
              className="glass-card-teal"
              style={{ padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div style={{ width: 60, height: 60, background: 'rgba(23,207,174,0.15)', border: '1px solid var(--border-strong)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-400)' }}>
                <CheckCircle size={28} />
              </div>
              <h3>Message Received</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: 380, lineHeight: 1.7 }}>
                Your message has been queued for review. The WaveCollapse team will respond to{' '}
                <strong style={{ color: 'var(--text-primary)' }}>{form.email}</strong>{' '}
                within one business day.
              </p>
            </motion.div>
          ) : (
            <form className="glass-card" style={{ padding: 32 }} onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 20 }}>
                <div>
                  <label className="form-label" htmlFor="contact-name">
                    <User size={11} style={{ display: 'inline', marginRight: 4 }} />
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    className="form-input"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="contact-org">
                    <Building2 size={11} style={{ display: 'inline', marginRight: 4 }} />
                    Organization
                  </label>
                  <input
                    id="contact-org"
                    name="org"
                    className="form-input"
                    placeholder="Acme Financial Group"
                    value={form.org}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="form-label" htmlFor="contact-email">
                  <Mail size={11} style={{ display: 'inline', marginRight: 4 }} />
                  Business Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="jane@acmefinancial.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="form-label" htmlFor="contact-category">Inquiry Category</label>
                <select
                  id="contact-category"
                  name="category"
                  className="form-input"
                  value={form.category}
                  onChange={handleChange}
                  required
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Select a category...</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label className="form-label" htmlFor="contact-message">
                  <MessageSquare size={11} style={{ display: 'inline', marginRight: 4 }} />
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-input"
                  rows={5}
                  placeholder="Describe your use case, technical requirements, or question..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  style={{ resize: 'vertical', fontFamily: 'var(--font-sans)' }}
                />
              </div>

              <button type="submit" className="btn-primary" id="contact-submit-btn" style={{ width: '100%' }}>
                Send Message <Send size={14} />
              </button>

              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 14, textAlign: 'center', lineHeight: 1.6 }}>
                By submitting this form you agree to our{' '}
                <a href="/legal/privacy" style={{ color: 'var(--teal-600)' }}>Privacy Policy</a>.
                WaveCollapse will not share your contact information with third parties.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
