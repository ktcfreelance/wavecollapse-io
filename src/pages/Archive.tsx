import { useState } from 'react';
import { DownloadCloud, ShieldCheck } from 'lucide-react';
import { generateManifest } from '../utils/manifestGenerator';
import '../components/Forms.css';

export default function Archive() {
  const [nodeId, setNodeId] = useState(7);
  const [listenPort, _setListenPort] = useState(9000); // Port used in manifest; UI does not expose this field
  const [rpcPort, setRpcPort] = useState(8546);
  const [bootnodes, setBootnodes] = useState('/ip4/172.28.1.0/tcp/9000');
  const [storageProvider, setStorageProvider] = useState('aws');
  const [s3Bucket, setS3Bucket] = useState('wavecollapse-worm-archive');
  const [s3Region, setS3Region] = useState('us-east-1');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    generateManifest({
      type: 'archive',
      nodeId,
      listenPort,
      rpcPort,
      p2pBootnodes: bootnodes,
      storageProvider,
      s3Bucket,
      s3Region
    });
  };

  return (
    <div className="form-container animate-fade-in">
      <div className="form-header">
        <h1 className="code-font">[SYS] ARCHIVE_17A4_CFG</h1>
        <p className="form-subtitle">Configure SEC Rule 17a-4 Software-Defined WORM compliance.</p>
      </div>

      <form onSubmit={handleGenerate}>
        <div className="form-group">
          <label className="form-label">STORAGE_PROVIDER</label>
          <select 
            className="form-input" 
            value={storageProvider} 
            onChange={e => setStorageProvider(e.target.value)}
          >
            <option value="aws">Amazon Web Services (S3)</option>
            <option value="azure">Microsoft Azure (Immutable Blob)</option>
          </select>
        </div>

        <div className="form-group" style={{display: 'flex', gap: '16px'}}>
          <div style={{flex: 1}}>
            <label className="form-label">{storageProvider === 'aws' ? 'S3_BUCKET_NAME' : 'AZURE_CONTAINER_NAME'}</label>
            <input 
              type="text" 
              className="form-input" 
              value={s3Bucket} 
              onChange={e => setS3Bucket(e.target.value)} 
              required 
            />
          </div>
          <div style={{flex: 1}}>
            <label className="form-label">{storageProvider === 'aws' ? 'AWS_REGION' : 'AZURE_LOCATION'}</label>
            <input 
              type="text" 
              className="form-input" 
              value={s3Region} 
              onChange={e => setS3Region(e.target.value)} 
              required 
            />
          </div>
        </div>

        <div className="form-group" style={{display: 'flex', gap: '16px'}}>
          <div style={{flex: 1}}>
            <label className="form-label">NODE_ID</label>
            <input 
              type="number" 
              className="form-input" 
              value={nodeId} 
              onChange={e => setNodeId(Number(e.target.value))} 
              required 
            />
          </div>
          <div style={{flex: 1}}>
             <label className="form-label">RPC_PORT</label>
            <input 
              type="number" 
              className="form-input" 
              value={rpcPort} 
              onChange={e => setRpcPort(Number(e.target.value))} 
              required 
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">GOSSIPSUB_BOOTNODES (Comma separated)</label>
          <input 
            type="text" 
            className="form-input" 
            value={bootnodes} 
            onChange={e => setBootnodes(e.target.value)} 
          />
        </div>

        <div className="terminal-block" style={{marginTop: '24px'}}>
          <div className="terminal-header">
            <ShieldCheck size={14} /> WORM Policy Auto-Gen
          </div>
          <div style={{padding: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
            This payload will include a dynamically generated <code>aws-iam-policy.json</code> tailored specifically to <strong>{s3Bucket}</strong>, granting least-privilege WORM write access to the node.
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            <DownloadCloud size={18} /> GENERATE PAYLOAD
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 16, padding: '12px 16px', borderRadius: 8, background: 'rgba(23,207,174,0.04)', border: '1px solid rgba(23,207,174,0.12)' }}>
          <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>🔒</span>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--teal-400)' }}>WaveCollapse never transmits your configuration.</strong>{' '}
            All node manifests are generated locally in your browser. No data leaves this device.
          </p>
        </div>
      </form>
    </div>
  );
}
