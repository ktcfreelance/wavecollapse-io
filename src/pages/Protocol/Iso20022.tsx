import { motion } from 'framer-motion';
import SEOHead from '../../components/SEOHead';

export default function Iso20022() {
  return (
    <div className="container section">
      <SEOHead
        title="ISO 20022 Native Messaging"
        description="WaveCollapse v4.0 natively encodes every settlement message in ISO 20022 XML. purposeCode and creditorLEI are mandatory protocol-level fields on every state transition."
        path="/protocol/iso20022"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Protocol / ISO 20022</span>
        <h1>ISO 20022 <span style={{ color: 'var(--teal-400)' }}>Native Messaging</span></h1>
        <p style={{ maxWidth: 640, marginTop: 12, marginBottom: 32 }}>
          WaveCollapse v4.0 natively encodes every settlement message in ISO 20022 XML format.
          The mandatory <code>purposeCode</code> and <code>creditorLEI</code> fields are protocol-required
          on every state transition — not optional metadata.
        </p>
        <div className="terminal-block" style={{ maxWidth: 680 }}>
          <div className="terminal-header">
            <span className="terminal-dot dot-red" /><span className="terminal-dot dot-yellow" /><span className="terminal-dot dot-green" />
            <span style={{ marginLeft: 8 }}>pacs.008.001 — Credit Transfer Initiation</span>
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
      </motion.div>
    </div>
  );
}
