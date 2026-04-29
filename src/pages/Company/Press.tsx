import { motion } from 'framer-motion';
import { Download, FileText, Image, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const boilerplate = `WaveCollapse is programmable compliance infrastructure for institutional digital asset settlement. Built on the GENIUS Act Technology Provider framework, the WaveCollapse Protocol v4.0 provides high-throughput, auditable settlement rails for regulated financial applications operating in the digital asset space. The protocol enables compliant agentic settlement via the x402 layer, enforces SEC Rule 17a-4 immutable record-keeping through its Redundant Equivalency architecture, and natively supports ISO 20022 Fedwire messaging standards. WaveCollapse does not hold funds, manage investments, or act as a counterparty — it is the infrastructure layer beneath regulated applications.`;

const brandColors = [
  { name: 'Protocol Teal', hex: '#17CFAE', sub: 'Primary Brand · CSS var(--teal-400)' },
  { name: 'Midnight Void', hex: '#070B14', sub: 'Background Void · CSS var(--bg-void)' },
  { name: 'Slate Primary', hex: '#0D1525', sub: 'Surface Primary · CSS var(--bg-primary)' },
  { name: 'Text Primary', hex: '#F0F4FA', sub: 'Body Text · CSS var(--text-primary)' },
  { name: 'Accent Blue', hex: '#3B82F6', sub: 'Secondary Accent · CSS var(--accent-blue)' },
  { name: 'Accent Amber', hex: '#F59E0B', sub: 'Warning / Compliance · CSS var(--accent-amber)' },
];

const assets = [
  { label: 'Primary Logo (SVG)', format: 'SVG', size: '12 KB', icon: <Image size={16} /> },
  { label: 'Primary Logo (PNG @2x)', format: 'PNG', size: '48 KB', icon: <Image size={16} /> },
  { label: 'White Wordmark (SVG)', format: 'SVG', size: '9 KB', icon: <Image size={16} /> },
  { label: 'Dark Wordmark (SVG)', format: 'SVG', size: '9 KB', icon: <Image size={16} /> },
  { label: 'Protocol Icon (SVG)', format: 'SVG', size: '4 KB', icon: <Image size={16} /> },
  { label: 'Brand Guidelines PDF', format: 'PDF', size: '2.4 MB', icon: <FileText size={16} /> },
];

const pressContacts = [
  { role: 'Press & Media Inquiries', email: 'press@wavecollapse.io' },
  { role: 'Analyst & Research Requests', email: 'research@wavecollapse.io' },
];

export default function Press() {
  const [copied, setCopied] = useState(false);

  const copyBoilerplate = () => {
    navigator.clipboard.writeText(boilerplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Company / Press Kit</span>
        <h1>Press <span style={{ color: 'var(--teal-400)' }}>Kit</span></h1>
        <p style={{ maxWidth: 620, marginTop: 12, marginBottom: 48 }}>
          Brand assets, boilerplate copy, and media contacts for journalists, analysts, and research teams covering WaveCollapse Protocol.
        </p>

        {/* ── Brand Colors ── */}
        <h2 style={{ marginBottom: 8 }}>Brand <span className="gradient-text">Color System</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 28 }}>
          Use these colors when representing WaveCollapse in editorial content.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 56 }}>
          {brandColors.map(c => (
            <motion.div
              key={c.name}
              className="glass-card"
              style={{ padding: 20 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ width: '100%', height: 48, background: c.hex, borderRadius: 8, marginBottom: 14, border: '1px solid rgba(255,255,255,0.1)' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{c.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--teal-400)', marginBottom: 3 }}>{c.hex}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{c.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Typography ── */}
        <h2 style={{ marginBottom: 8 }}>Brand <span className="gradient-text">Typography</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 24 }}>
          WaveCollapse uses two purpose-specific typefaces across all materials.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 56 }}>
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>IBM Plex Sans</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginBottom: 12 }}>Body text · UI labels · Descriptions</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              The quick brown fox jumps over the lazy dog. 0123456789.
            </div>
          </div>
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--teal-300)', marginBottom: 6 }}>JetBrains Mono</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginBottom: 12 }}>Headlines · Data · Protocol identifiers</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--teal-400)', lineHeight: 1.7 }}>
              WaveCollapse v4.0 // 0x17CFAE
            </div>
          </div>
        </div>

        {/* ── Brand Assets ── */}
        <h2 style={{ marginBottom: 8 }}>Brand <span className="gradient-text">Assets</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 28 }}>
          Full asset package available to credentialed press and research contacts.
          Contact <a href="mailto:press@wavecollapse.io" style={{ color: 'var(--teal-400)' }}>press@wavecollapse.io</a> to receive the download link.
        </p>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', marginBottom: 56 }}>
          {assets.map((asset, i) => (
            <div
              key={asset.label}
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < assets.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}
            >
              <div style={{ color: 'var(--teal-400)', flexShrink: 0 }}>{asset.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{asset.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{asset.format} · {asset.size}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <Download size={13} />
                Credentialed
              </div>
            </div>
          ))}
        </div>

        {/* ── Boilerplate ── */}
        <h2 style={{ marginBottom: 8 }}>Company <span className="gradient-text">Boilerplate</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 20 }}>
          Use this approved copy when describing WaveCollapse in editorial content.
        </p>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>boilerplate.txt</span>
            <button onClick={copyBoilerplate} className="btn-ghost" style={{ padding: '4px 10px', fontSize: '0.72rem', gap: 6 }} id="press-copy-boilerplate">
              {copied ? <CheckCircle size={13} color="var(--teal-400)" /> : <Copy size={13} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p style={{ padding: '20px 24px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
            {boilerplate}
          </p>
        </div>

        {/* ── Press Contacts ── */}
        <h2 style={{ marginBottom: 28 }}>Press <span className="gradient-text">Contacts</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
          {pressContacts.map(c => (
            <div key={c.role} className="glass-card-teal" style={{ padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{c.role}</div>
              <a href={`mailto:${c.email}`} style={{ color: 'var(--teal-300)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                {c.email} <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
