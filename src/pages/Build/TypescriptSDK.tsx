import { motion } from 'framer-motion';
import { BookOpen, Terminal } from 'lucide-react';

export default function TypescriptSDK() {
  return (
    <div className="container section">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Build / TypeScript SDK</span>
        <h1>TypeScript <span style={{ color: 'var(--teal-400)' }}>SDK</span></h1>
        <p style={{ maxWidth: 600, marginTop: 12, marginBottom: 32 }}>
          The official WaveCollapse TypeScript SDK provides typed client libraries for protocol integration,
          ISO 20022 message construction, and settlement state management.
        </p>
        <div className="terminal-block" style={{ maxWidth: 600 }}>
          <div className="terminal-header">
            <span className="terminal-dot dot-red" /><span className="terminal-dot dot-yellow" /><span className="terminal-dot dot-green" />
            <span style={{ marginLeft: 8 }}>Installation</span>
          </div>
          <pre style={{ padding: '16px 20px' }}>{`npm install @wavecollapse/sdk\n\n# Initialize a settlement client\nimport { WaveCollapseClient } from '@wavecollapse/sdk';\n\nconst client = new WaveCollapseClient({\n  network: 'mainnet',\n  credentialPath: './wc-credentials.json',\n});\n\nawait client.initiateSettlement({\n  purposeCode: 'GDDS',\n  creditorLEI: '5493001KJTIIGC8Y1R12',\n  amount: 250000,\n  currency: 'USD',\n});`}</pre>
        </div>
        <p style={{ marginTop: 24, color: 'var(--text-tertiary)', fontSize: '0.84rem' }}>
          Full API reference documentation is available to credentialed institutional partners.{' '}
          <a href="/solutions/intake" style={{ color: 'var(--teal-400)' }}>Request access →</a>
        </p>
      </motion.div>
    </div>
  );
}
