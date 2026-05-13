import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import { Shield, Lock, Eye, Cpu } from 'lucide-react';

const blindingSteps = [
  {
    step: '01',
    title: 'Vehicle Constructs',
    desc: 'The application layer (e.g., BrikFi) builds the full ISO 20022 payload with mandatory purposeCode and creditorLEI. A cryptographic nonce is generated and the payload is hashed.',
    icon: <Cpu size={16} />,
    color: '#60A5FA',
  },
  {
    step: '02',
    title: 'Rail Stores Hash',
    desc: 'The TideBlock\u2122 header stores only the 32-byte iso_metadata_hash \u2014 a salted SHA3-256 commitment. The Rail is mathematically blind to the financial intent.',
    icon: <Lock size={16} />,
    color: 'var(--teal-400)',
  },
  {
    step: '03',
    title: 'Regulator Verifies',
    desc: 'An examiner receives the raw payload and nonce from the Vehicle, independently computes the hash, and verifies it against the immutable on-chain commitment.',
    icon: <Eye size={16} />,
    color: 'var(--accent-amber)',
  },
];

const hardeningFeatures = [
  {
    title: 'Metadata Blinding',
    badge: 'GENIUS Act \u00a7402',
    desc: 'Raw ISO 20022 fields (purposeCode, creditorLEI, remittance_info) never touch the Rail. Only a salted SHA3-256 hash is stored on-chain, preserving the Technology Provider shield.',
    icon: <Shield size={18} />,
  },
  {
    title: 'Quantum-Resistant Hashing',
    badge: 'NIST SP 800-185',
    desc: 'SHA3-256 (Keccak) is resistant to both Shor\u2019s algorithm (factoring) and Grover\u2019s algorithm (search). The metadata commitment remains secure against known quantum attack vectors.',
    icon: <Lock size={18} />,
  },
  {
    title: 'PQC Crypto-Agility',
    badge: 'FIPS 204',
    desc: 'TideBlock signatures support hybrid BLS12-381 + ML-DSA validation via a bit-mask. The protocol transitions to post-quantum without a hard fork.',
    icon: <Cpu size={18} />,
  },
];

export default function Iso20022() {
  return (
    <div className="container section">
      <SEOHead
        title="ISO 20022 Native Messaging"
        description="WaveCollapse v4.0 cryptographically binds ISO 20022 compliance metadata to every institutional settlement via a salted SHA3-256 hash in the TideBlock header. Raw metadata is retained off-chain by the application layer."
        path="/protocol/iso20022"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Protocol / ISO 20022</span>
        <h1>ISO 20022 <span style={{ color: 'var(--teal-400)' }}>Native Messaging</span></h1>
        <p style={{ maxWidth: 640, marginTop: 12, marginBottom: 32 }}>
          WaveCollapse v4.0 cryptographically binds ISO 20022 compliance metadata to every institutional
          settlement via a quantum-resistant salted hash in the TideBlock&#8482; header. The mandatory <code>purposeCode</code> and <code>creditorLEI</code> fields
          are constructed at the application layer and their blinded <code>SHA3-256</code> hash is enforced at the protocol layer for
          institutional nodes &mdash; the Rail never sees raw financial intent.
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          <span className="badge badge-teal"><Shield size={10} /> Metadata Blinded</span>
          <span className="badge badge-blue"><Lock size={10} /> Quantum-Resistant</span>
          <span className="badge badge-amber"><Cpu size={10} /> PQC-Ready (FIPS 204)</span>
        </div>

        {/* ── ISO 20022 XML Sample ── */}
        <div className="terminal-block" style={{ maxWidth: 680, marginBottom: 56 }}>
          <div className="terminal-header">
            <span className="terminal-dot dot-red" /><span className="terminal-dot dot-yellow" /><span className="terminal-dot dot-green" />
            <span style={{ marginLeft: 8 }}>pacs.008.001 — Credit Transfer Initiation (Vehicle Layer)</span>
          </div>
          <pre style={{ padding: '20px 24px', fontSize: '0.8rem', overflowX: 'auto' }}>{`<Document>
  <FIToFICstmrCdtTrf>
    <GrpHdr>
      <MsgId>WC-20260420-00001</MsgId>
      <CreDtTm>2026-04-20T16:03:00Z</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
    </GrpHdr>
    <CdtTrfTxInf>
      <PmtId>
        <InstrId>WC-TXN-9182736455</InstrId>
      </PmtId>
      <Purp>
        <Cd>GDDS</Cd>                          <!-- purposeCode (REQUIRED) -->
      </Purp>
      <Cdtr>
        <FinInstnId>
          <LEI>5493001KJTIIGC8Y1R12</LEI>      <!-- creditorLEI (REQUIRED)  -->
        </FinInstnId>
      </Cdtr>
      <IntrBkSttlmAmt Ccy="USD">250000.00</IntrBkSttlmAmt>
    </CdtTrfTxInf>
  </FIToFICstmrCdtTrf>
</Document>`}</pre>
        </div>

        {/* ── Metadata Blinding Flow ── */}
        <h2 style={{ marginBottom: 8 }}>Metadata <span className="gradient-text">Blinding Flow</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 28 }}>
          How the protocol achieves ISO 20022 compliance without exposing raw financial data on-chain.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 56 }}>
          {blindingSteps.map((s, i) => (
            <motion.div
              key={s.step}
              style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: '20px 0', borderBottom: i < blindingSteps.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div style={{ width: 36, height: 36, background: `${s.color}15`, border: `1px solid ${s.color}40`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                {s.icon}
              </div>
              <div style={{ flex: 1, paddingTop: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--teal-600)', letterSpacing: '0.12em' }}>STEP {s.step}</span>
                  <h4 style={{ margin: 0, fontSize: '0.92rem' }}>{s.title}</h4>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Hash Visualization ── */}
        <div className="terminal-block" style={{ maxWidth: 680, marginBottom: 56 }}>
          <div className="terminal-header">
            <span className="terminal-dot dot-red" /><span className="terminal-dot dot-yellow" /><span className="terminal-dot dot-green" />
            <span style={{ marginLeft: 8 }}>TideBlock Header — What the Rail Sees</span>
          </div>
          <pre style={{ padding: '20px 24px', fontSize: '0.8rem', overflowX: 'auto' }}>{`TideBlock #1,204,887
├── block_hash:             0x8f2a...0f1a
├── iso_metadata_hash:      0xa3c1...9e2b  ← SHA3-256(nonce ‖ ISO payload)
├── signature_version_mask: 0x01           ← BLS12-381 (Legacy)
├── proposer:               validator_07
└── aggregate_signature:    0x91b4...7c03`}</pre>
        </div>

        {/* ── Privacy & Quantum Hardening ── */}
        <h2 style={{ marginBottom: 8 }}>Privacy &amp; Quantum <span className="gradient-text">Hardening</span></h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginBottom: 28 }}>
          The protocol&rsquo;s ISO 20022 implementation is designed to survive both regulatory scrutiny and quantum-era cryptanalysis.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 56 }}>
          {hardeningFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card"
              style={{ padding: 24 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, background: 'rgba(23,207,174,0.1)', border: '1px solid var(--border-strong)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-400)' }}>
                  {f.icon}
                </div>
                <h4 style={{ margin: 0, fontSize: '0.92rem' }}>{f.title}</h4>
                <span className="badge badge-teal" style={{ marginLeft: 'auto' }}>{f.badge}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
