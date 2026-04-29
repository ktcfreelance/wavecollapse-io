import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';

interface InstitutionalGateProps {
  title: string;
  description: string;
  classification: string;
}

export default function InstitutionalGate({ title, description, classification }: InstitutionalGateProps) {
  return (
    <div className="container section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ maxWidth: 560, textAlign: 'center' }}
      >
        {/* Lock Icon */}
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: 'rgba(23,207,174,0.08)', border: '1px solid rgba(23,207,174,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <Lock size={28} color="var(--teal-400)" />
        </div>

        {/* Classification Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
          borderRadius: 9999, padding: '4px 14px', marginBottom: 20,
        }}>
          <ShieldAlert size={12} color="#f59e0b" />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700,
            color: '#f59e0b', letterSpacing: '0.5px',
          }}>
            {classification}
          </span>
        </div>

        <h2 style={{ fontSize: '1.5rem', marginBottom: 12 }}>{title}</h2>
        <p style={{
          fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7,
          marginBottom: 32, maxWidth: 480, margin: '0 auto 32px',
        }}>
          {description}
        </p>

        {/* CTA */}
        <div className="glass-card" style={{
          padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', margin: 0 }}>
            Complete your institutional readiness assessment to request access to restricted protocol documentation.
          </p>
          <Link
            to="/solutions/intake"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            Request Access <ArrowRight size={16} />
          </Link>
        </div>

        {/* Fine Print */}
        <p style={{
          fontSize: '0.72rem', color: 'var(--text-tertiary)',
          marginTop: 20, fontFamily: 'var(--font-mono)',
        }}>
          Access is granted to vetted institutional partners on a need-to-know basis.
          <br />Questions? Contact <a href="mailto:partners@wavecollapse.io" style={{ color: 'var(--teal-400)' }}>partners@wavecollapse.io</a>
        </p>
      </motion.div>
    </div>
  );
}
