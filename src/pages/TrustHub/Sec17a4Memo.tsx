import { motion } from 'framer-motion';
import { FileText, Download, Shield } from 'lucide-react';

const memoSections = [
  { num: '§1', title: 'Statutory Background', body: 'SEC Rule 17a-4, as amended in 2022, permits broker-dealers to satisfy electronic recordkeeping requirements through either (A) the WORM method or (B) the Audit-Trail Method. The Audit-Trail Method requires that every modification or deletion of a record is logged, with the ability to recreate the original record at any time.' },
  { num: '§2', title: 'Technical Architecture of WaveCollapse v4.0', body: 'WaveCollapse v4.0 employs a Merkle-chained audit trail at the protocol layer. Every settlement event (state transition, consensus vote, record modification) is hashed and appended to a linked Merkle tree rooted in the Archive Node cluster. No modification can be made without creating a detectable hash inconsistency, satisfying the "audit-trail" requirement for non-erasable records.' },
  { num: '§3', title: 'Redundant Equivalency Standard', body: 'Hardware-locked WORM storage is replaced with "Redundant Equivalency" — a standard where multi-node redundancy, cryptographic proof-of-existence, and independent third-party verification create a storage regime equivalent in integrity to physical WORM media. Each record is mirrored across geographically distributed Archive Nodes with independent signing keys.' },
  { num: '§4', title: 'Six-Year Retention Compliance', body: 'Archive Node operators are contractually bound to maintain records for a minimum period of six years from the date of creation, in accordance with 17a-4(b)(4). Automated proof-of-existence timestamps are generated at creation, year-three, and year-six intervals.' },
  { num: '§5', title: 'Third-Party Download Capability', body: 'All archived records are exportable in machine-readable ISO 20022 XML format on demand, satisfying 17a-4(f)(2)(ii)(B)\'s requirement that records be available for download by the SEC or FINRA.' },
  { num: '§6', title: 'Legal Disclaimer', body: 'This memo is provided for informational and technical reference purposes only. It does not constitute legal advice. Institutional operators must obtain independent securities law counsel before relying on this analysis for regulatory compliance filings.' },
];

export default function Sec17a4Memo() {
  return (
    <div className="container-sm section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Trust Hub / SEC 17a-4 Memo</span>
        <h1>Legal Equivalency <span style={{ color: 'var(--teal-400)' }}>Memorandum</span></h1>
        <div style={{ display: 'flex', gap: 12, marginTop: 16, marginBottom: 12, flexWrap: 'wrap' }}>
          <span className="badge badge-teal"><Shield size={10} /> SEC Rule 17a-4(f)</span>
          <span className="badge badge-blue">Audit-Trail Method</span>
          <span className="badge badge-amber">Document Version 1.2</span>
        </div>
        <p style={{ marginBottom: 16 }}>
          <strong>Re:</strong> Technical and Legal Analysis of WaveCollapse v4.0 Compliance with SEC Rule 17a-4
          Electronic Recordkeeping Requirements Under the Audit-Trail Method.
        </p>
        <p style={{ marginBottom: 40, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
          Date: April 20, 2026 | Classification: Institutional Distribution Only
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
          {memoSections.map((s) => (
            <div key={s.num} className="glass-card" style={{ padding: 28 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--teal-400)', marginBottom: 8, letterSpacing: '0.1em' }}>
                {s.num}
              </div>
              <h4 style={{ marginBottom: 12 }}>{s.title}</h4>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div className="glass-card-teal" style={{ padding: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
          <FileText size={28} color="var(--teal-400)" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
              Download Full Memorandum (PDF)
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
              For legal team distribution. Includes technical appendices and node architecture diagrams.
            </div>
          </div>
          <button className="btn-secondary" id="sec17a4-download-btn" style={{ gap: 8, display: 'inline-flex', alignItems: 'center' }}>
            <Download size={15} /> Download
          </button>
        </div>
      </motion.div>
    </div>
  );
}
