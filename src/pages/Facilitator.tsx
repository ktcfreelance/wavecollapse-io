import { useState } from 'react';
import { DownloadCloud, Percent } from 'lucide-react';
import { generateManifest } from '../utils/manifestGenerator';
import '../components/Forms.css';

export default function Facilitator() {
  const [nodeId, setNodeId] = useState(8);
  const [listenPort, _setListenPort] = useState(9000); // Port used in manifest; UI does not expose this field
  const [rpcPort, setRpcPort] = useState(8547);
  const [bootnodes, setBootnodes] = useState('/ip4/172.28.1.0/tcp/9000');
  const [treasuryWallet, setTreasuryWallet] = useState('wc1treasury...xyz');
  const [relaySpread, setRelaySpread] = useState(2);
  const [maxGasSubsidy, setMaxGasSubsidy] = useState(0.50);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    generateManifest({
      type: 'facilitator',
      nodeId,
      listenPort,
      rpcPort,
      p2pBootnodes: bootnodes,
      treasuryWallet,
      relaySpread,
      maxGasSubsidy
    });
  };

  return (
    <div className="form-container animate-fade-in">
      <div className="form-header">
        <h1 className="code-font" style={{color: 'var(--accent-red)'}}>[SYS] RELAY_X402_CFG</h1>
        <p className="form-subtitle">Configure high-availability algorithm metrics for B2B Facilitator Relay operations.</p>
      </div>

      <form onSubmit={handleGenerate}>
        <div className="form-group">
          <label className="form-label">TREASURY_WALLET_ADDRESS</label>
          <input 
            type="text" 
            className="form-input" 
            value={treasuryWallet} 
            onChange={e => setTreasuryWallet(e.target.value)} 
            required 
            placeholder="Address containing $BRIK / $WAVE for gas..."
          />
        </div>

        <div className="form-group" style={{display: 'flex', gap: '16px'}}>
          <div style={{flex: 1}}>
            <label className="form-label">ALGO_TARGET_SPREAD (bps)</label>
            <input 
              type="number" 
              step="1"
              min="1"
              max="3"
              className="form-input" 
              value={relaySpread} 
              onChange={e => setRelaySpread(Number(e.target.value))} 
              required 
            />
          </div>
          <div style={{flex: 1}}>
            <label className="form-label">MAX_GAS_SUBSIDY (USD)</label>
            <input 
              type="number" 
              step="0.01"
              className="form-input" 
              value={maxGasSubsidy} 
              onChange={e => setMaxGasSubsidy(Number(e.target.value))} 
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
             <label className="form-label">RPC_PORT / X402</label>
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
            <Percent size={14} /> Spread Calculation Safety
          </div>
          <div style={{padding: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
            This payload activates the <code>x402_server</code>. The node will automatically reject any incoming `wc/intelligence/4.0` requests that ask for a subsidy greater than <strong>${maxGasSubsidy}</strong> or yield a spread lower than <strong>{relaySpread} bps</strong>.
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            <DownloadCloud size={18} /> GENERATE PAYLOAD
          </button>
        </div>
      </form>
    </div>
  );
}
