import { useState, useEffect, useRef } from 'react';
import { DownloadCloud, Key, AlertTriangle, RefreshCw, ShieldCheck } from 'lucide-react';
import { generateManifest } from '../utils/manifestGenerator';
import '../components/Forms.css';

const DEFAULT_ORACLE = 'https://api.wavecollapse.io/v1/oracle/fiat-peg?pair=WAVE-USD&basis=100000';
const WAVE_PRICE_BASIS_USD = 100_000; // $100,000 USD fixed fiat peg

// Simulates a decentralized oracle response for the demo environment.
// In production, the node itself reads from WC_ORACLE_RPC on startup.
function mockFetchWaveRequirement(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate realistic market fluctuation around a $1.00–$5.00 range
      const simulatedPrice = 1.0 + Math.random() * 4.0;
      const requiredWave = Math.ceil(WAVE_PRICE_BASIS_USD / simulatedPrice);
      resolve(requiredWave);
    }, 600);
  });
}

export default function Validator() {
  const [nodeId, setNodeId] = useState(1);
  const [listenPort, setListenPort] = useState(9000);
  const [rpcPort, setRpcPort] = useState(8545);
  const [bootnodes, setBootnodes] = useState('/ip4/172.28.1.0/tcp/9000');
  const [fundingMode, setFundingMode] = useState<'DEX' | 'OTC'>('DEX');
  const [otcContract, setOtcContract] = useState('');
  const [oracleRpc, setOracleRpc] = useState(DEFAULT_ORACLE);
  const [waveRequirement, setWaveRequirement] = useState<number | null>(null);
  const [oracleLoading, setOracleLoading] = useState(false);
  const [oracleError, setOracleError] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchRequirement = async () => {
    setOracleLoading(true);
    setOracleError(false);
    try {
      const result = await mockFetchWaveRequirement();
      setWaveRequirement(result);
    } catch {
      setOracleError(true);
    } finally {
      setOracleLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch on mount or oracle URL change
    fetchRequirement();

    // Poll every 60 seconds for updated requirement
    pollRef.current = setInterval(fetchRequirement, 60_000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oracleRpc]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    generateManifest({
      type: 'validator',
      nodeId,
      listenPort,
      rpcPort,
      p2pBootnodes: bootnodes,
      fundingMode,
      otcContract: fundingMode === 'OTC' ? otcContract : undefined,
      oracleRpc,
    });
  };

  return (
    <div className="form-container animate-fade-in">
      <div className="form-header">
        <h1 className="code-font">[SYS] VALIDATOR_CFG</h1>
        <p className="form-subtitle">Configure parameters for T2/T3 BFT Consensus participation via Dynamic Threshold Committees (DTC).</p>
      </div>

      <form onSubmit={handleGenerate}>
        <div className="form-group">
          <label className="form-label">NODE_ID</label>
          <input
            type="number"
            className="form-input"
            value={nodeId}
            onChange={e => setNodeId(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group" style={{display: 'flex', gap: '16px'}}>
          <div style={{flex: 1}}>
            <label className="form-label">P2P_LISTEN_PORT</label>
            <input
              type="number"
              className="form-input"
              value={listenPort}
              onChange={e => setListenPort(Number(e.target.value))}
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

        {/* ─── ORACLE ENDPOINT ──────────────────────────────────────────────── */}
        <div className="form-group">
          <label className="form-label">
            WC_ORACLE_RPC — Fiat-Peg Endpoint
            <span style={{ color: 'var(--accent-red)', marginLeft: '6px', fontSize: '0.75rem' }}>
              [CRITICAL — node will not join DTC without a live feed]
            </span>
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              className="form-input"
              value={oracleRpc}
              onChange={e => setOracleRpc(e.target.value)}
              required
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}
              onClick={fetchRequirement}
              disabled={oracleLoading}
            >
              <RefreshCw size={14} style={{ animation: oracleLoading ? 'spin 1s linear infinite' : 'none' }} />
            </button>
          </div>

          {/* Live requirement readout */}
          <div className="terminal-block" style={{ marginTop: '10px' }}>
            <div className="terminal-header">
              <ShieldCheck size={13} /> ORACLE FEED — CURRENT REQUIREMENT
            </div>
            <div style={{ padding: '12px 16px', fontSize: '0.9rem' }}>
              {oracleLoading && (
                <span style={{ color: 'var(--text-secondary)' }}>⟳ Querying oracle feed…</span>
              )}
              {!oracleLoading && oracleError && (
                <span style={{ color: 'var(--accent-red)' }}>
                  ✗ Oracle unreachable. Node startup will be blocked. Verify endpoint.
                </span>
              )}
              {!oracleLoading && !oracleError && waveRequirement !== null && (
                <span style={{ color: 'var(--accent-cta)', fontWeight: 600 }}>
                  ✓ Current Minimum Stake:{' '}
                  <span className="code-font" style={{ fontSize: '1rem' }}>
                    {waveRequirement.toLocaleString()} WAVE
                  </span>
                  <span style={{ color: 'var(--text-secondary)', marginLeft: '10px', fontWeight: 400, fontSize: '0.8rem' }}>
                    (≡ $100,000 USD · refreshes every 60s)
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ─── FUNDING SOURCE ───────────────────────────────────────────────── */}
        <div className="form-group">
          <label className="form-label">WC_FUNDING_MODE — Stake Acquisition Path</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className={fundingMode === 'DEX' ? 'btn-primary' : 'btn-secondary'}
              style={{ flex: 1 }}
              onClick={() => setFundingMode('DEX')}
            >
              DEX Open Market
            </button>
            <button
              type="button"
              className={fundingMode === 'OTC' ? 'btn-primary' : 'btn-secondary'}
              style={{ flex: 1 }}
              onClick={() => setFundingMode('OTC')}
            >
              Institutional OTC Desk
            </button>
          </div>

          {/* DEX slippage warning */}
          {fundingMode === 'DEX' && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              marginTop: '12px',
              padding: '12px 14px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 170, 0, 0.35)',
              backgroundColor: 'rgba(255, 170, 0, 0.07)',
            }}>
              <AlertTriangle size={16} color="var(--accent-orange, #ffaa00)" style={{ flexShrink: 0, marginTop: '1px' }} />
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                <strong style={{ color: 'var(--accent-orange, #ffaa00)' }}>Slippage Advisory:</strong>{' '}
                Large purchases on a DEX AMM will move the price against you. For stake acquisitions
                exceeding <strong>$500,000 USD</strong>, contact the{' '}
                <strong>Institutional OTC Desk</strong> for a time-weighted, slippage-free allocation
                directly from the Genesis Treasury.
              </p>
            </div>
          )}
        </div>

        {/* ─── OTC CONTRACT (conditionally rendered) ────────────────────────── */}
        {fundingMode === 'OTC' && (
          <div className="form-group">
            <label className="form-label">
              WC_OTC_CONTRACT — Time-Locked SLA Contract Hash
              <span style={{ color: 'var(--accent-red)', marginLeft: '6px', fontSize: '0.75rem' }}>
                [REQUIRED for OTC]
              </span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="0x000…"
              value={otcContract}
              onChange={e => setOtcContract(e.target.value)}
              required
            />
            <p style={{ marginTop: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              The node will not announce readiness to join a DTC until it has synced the chain
              and verified this SLA contract hash against the on-chain OTC registry.
            </p>
          </div>
        )}

        {/* ─── KEY GENERATION NOTICE ────────────────────────────────────────── */}
        <div className="terminal-block" style={{marginTop: '24px'}}>
          <div className="terminal-header">
            <Key size={14} /> BLS12-381 Auto-Generation
          </div>
          <div style={{padding: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
            Validator keys will be securely generated locally inside the container wrapper upon first launch. No private keys are sent to this UI.
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
