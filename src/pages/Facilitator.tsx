import { useState, useEffect, useRef } from 'react';
import { DownloadCloud, RefreshCw, AlertTriangle, ShieldCheck, Info, Zap } from 'lucide-react';
import { generateManifest } from '../utils/manifestGenerator';
import '../components/Forms.css';

const DEFAULT_ORACLE = 'https://api.wavecollapse.io/v1/oracle/fiat-peg?pair=WAVE-USD&basis=100000';

// Tier definitions — capacity denominated in bytes (network physics), NOT fiat.
// This is a deliberate architectural decision to maintain the GENIUS Act
// Technology Provider shield. The Rail does not know what a dollar is.
const TIER_CONFIG = {
  tier1: {
    label: 'Tier 1 — Regional Relay',
    waveMin: 10_000,
    dailyCapBytes: 50 * 1024 * 1024, // 50 MB = 52,428,800 bytes
    dailyCapDisplay: '50 MB / 24h epoch',
    hasCap: true,
    hasPeerRegistration: true,
  },
  tier2: {
    label: 'Tier 2 — Global Infrastructure (Backbone)',
    waveMin: 100_000,
    dailyCapBytes: 0, // 0 = unlimited
    dailyCapDisplay: 'Unlimited',
    hasCap: false,
    hasPeerRegistration: false,
  },
} as const;

type FacilitatorTier = 'tier1' | 'tier2';

function mockFetchWavePrice(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1.0 + Math.random() * 4.0);
    }, 600);
  });
}

export default function Facilitator() {
  const [tier, setTier]                           = useState<FacilitatorTier>('tier1');
  const [nodeId, setNodeId]                       = useState(8);
  const [rpcPort, setRpcPort]                     = useState(8547);
  const [bootnodes, setBootnodes]                 = useState('/ip4/172.28.1.0/tcp/9000');
  const [operatorRewardAddr, setOperatorRewardAddr] = useState('');
  const [waveCollateral, setWaveCollateral]       = useState('');
  const [usdcCollateral, setUsdcCollateral]       = useState('0');
  const [tier2PeerId, setTier2PeerId]             = useState('');

  // Oracle feed for live fiat equivalent display
  const [wavePrice, setWavePrice]     = useState<number | null>(null);
  const [oracleLoading, setOracleLoading] = useState(false);
  const [oracleRpc, setOracleRpc]     = useState(DEFAULT_ORACLE);
  const pollRef                       = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchWavePrice = async () => {
    setOracleLoading(true);
    try {
      const price = await mockFetchWavePrice();
      setWavePrice(price);
    } finally {
      setOracleLoading(false);
    }
  };

  useEffect(() => {
    fetchWavePrice();
    pollRef.current = setInterval(fetchWavePrice, 60_000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  // Compute live fiat value of WAVE collateral
  const waveAmount = parseFloat(waveCollateral) || 0;
  const waveFiatValue = wavePrice ? (waveAmount * wavePrice) : null;
  const tierCfg = TIER_CONFIG[tier];
  const collateralMeetsMin = waveAmount >= tierCfg.waveMin;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    generateManifest({
      type: 'facilitator',
      nodeId,
      listenPort: 9000,
      rpcPort,
      p2pBootnodes: bootnodes,
      facilitatorTier: tier,
      waveCollateral: waveAmount,
      usdcCollateral: parseFloat(usdcCollateral) || 0,
      tier2PeerId: tier === 'tier1' ? tier2PeerId : undefined,
      operatorRewardAddress: operatorRewardAddr,
      oracleRpc,
    });
  };

  return (
    <div className="form-container animate-fade-in">
      <div className="form-header">
        <h1 className="code-font" style={{ color: 'var(--teal-400)' }}>[SYS] RELAY_X402_CFG</h1>
        <p className="form-subtitle">
          Configure a Facilitator Node providing Gas Abstraction as a Service (GAaaS).
          Facilitators earn a <strong>protocol-fixed 3 bps</strong> spread on all transaction volume routed and sponsored.
        </p>
      </div>

      <form onSubmit={handleGenerate}>

        {/* ─── TIER SELECTION ─────────────────────────────────────────────────── */}
        <div className="form-group">
          <label className="form-label">
            WC_FACILITATOR_TIER — Node Tier
          </label>
          <div style={{ display: 'flex', gap: 12 }}>
            {(['tier1', 'tier2'] as FacilitatorTier[]).map((t) => (
              <button
                key={t}
                type="button"
                className={tier === t ? 'btn-primary' : 'btn-secondary'}
                style={{ flex: 1 }}
                onClick={() => setTier(t)}
                id={`facilitator-tier-${t}`}
              >
                {t === 'tier1' ? 'Tier 1 — Regional' : 'Tier 2 — Global Backbone'}
              </button>
            ))}
          </div>

          {/* Tier details block */}
          <div className="terminal-block" style={{ marginTop: 12 }}>
            <div className="terminal-header">
              <Zap size={13} /> {tierCfg.label}
            </div>
            <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px 24px', fontSize: '0.85rem' }}>
              <div><span style={{ color: 'var(--text-tertiary)' }}>Min $WAVE Bond:</span> <strong style={{ color: 'var(--teal-400)' }}>{tierCfg.waveMin.toLocaleString()} $WAVE</strong></div>
              <div><span style={{ color: 'var(--text-tertiary)' }}>Daily Throughput:</span> <strong style={{ color: 'var(--teal-400)' }}>{tierCfg.dailyCapDisplay}</strong></div>
              <div><span style={{ color: 'var(--text-tertiary)' }}>Facilitator Fee:</span> <strong style={{ color: 'var(--teal-400)' }}>3 bps (protocol-fixed)</strong></div>
              <div><span style={{ color: 'var(--text-tertiary)' }}>Tier 2 Failover:</span> <strong style={{ color: 'var(--teal-400)' }}>{tierCfg.hasPeerRegistration ? 'Required' : 'N/A (this is Tier 2)'}</strong></div>
            </div>
          </div>

          {/* Tier 1 daily cap advisory */}
          {tier === 'tier1' && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 12, padding: '12px 14px', borderRadius: 6, border: '1px solid rgba(255,170,0,0.35)', backgroundColor: 'rgba(255,170,0,0.07)' }}>
              <AlertTriangle size={15} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                <strong style={{ color: 'var(--accent-amber)' }}>Throughput Governance:</strong>{' '}
                Tier 1 nodes are capped at <strong>50 MB / 24h epoch</strong> of relayed throughput.
                This is a network physics constraint — not a financial limit — ensuring stable bandwidth
                allocation across edge nodes. When throughput exceeds this cap, transactions are automatically
                spilled over to your registered Tier 2 Backbone peer. Merchant operations are never interrupted.
                Register a Tier 2 peer ID below to enable seamless spillover.
              </p>
            </div>
          )}
        </div>

        {/* ─── PROTOCOL-FIXED FEE DISPLAY ─────────────────────────────────────── */}
        <div className="form-group">
          <label className="form-label">WC_FACILITATOR_FEE_BPS</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'rgba(23,207,174,0.05)', border: '1px solid rgba(23,207,174,0.2)', borderRadius: 8 }}>
            <ShieldCheck size={16} color="var(--teal-400)" />
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--teal-400)', fontSize: '1.1rem' }}>3 bps</span>
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginLeft: 12 }}>Protocol-fixed · Set by genesis parameters · Not configurable</span>
            </div>
            <Info size={14} color="var(--text-tertiary)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
          </div>
          <p style={{ marginTop: 6, fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
            Facilitators earn 3 bps on every transaction routed and sponsored by this node.
            The spread is extracted automatically at the protocol layer — no configuration required.
          </p>
        </div>

        {/* ─── SLA BOND — WAVE COLLATERAL ─────────────────────────────────────── */}
        <div className="form-group">
          <label className="form-label">
            WC_WAVE_COLLATERAL — $WAVE SLA Bond
            <span style={{ color: 'var(--accent-red)', marginLeft: 6, fontSize: '0.75rem' }}>
              [REQUIRED — Minimum: {tierCfg.waveMin.toLocaleString()} $WAVE]
            </span>
          </label>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="number"
              className={`form-input ${waveAmount > 0 && !collateralMeetsMin ? 'input-error' : ''}`}
              placeholder={`Min ${tierCfg.waveMin.toLocaleString()} $WAVE`}
              value={waveCollateral}
              onChange={e => setWaveCollateral(e.target.value)}
              min={tierCfg.waveMin}
              required
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}
              onClick={fetchWavePrice}
              disabled={oracleLoading}
            >
              <RefreshCw size={14} style={{ animation: oracleLoading ? 'spin 1s linear infinite' : 'none' }} />
            </button>
          </div>

          {/* Live fiat equivalent via oracle */}
          <div className="terminal-block" style={{ marginTop: 10 }}>
            <div className="terminal-header">
              <ShieldCheck size={13} /> ORACLE FEED — FIAT EQUIVALENT
            </div>
            <div style={{ padding: '10px 16px', fontSize: '0.88rem' }}>
              {oracleLoading && <span style={{ color: 'var(--text-secondary)' }}>⟳ Querying oracle feed…</span>}
              {!oracleLoading && wavePrice && waveAmount > 0 && (
                <span style={{ color: collateralMeetsMin ? 'var(--teal-400)' : 'var(--accent-red)', fontWeight: 600 }}>
                  {collateralMeetsMin ? '✓' : '✗'}{' '}
                  {waveAmount.toLocaleString()} $WAVE ≡ <span className="code-font">${waveFiatValue?.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</span>
                  {!collateralMeetsMin && (
                    <span style={{ color: 'var(--accent-red)', fontWeight: 400, marginLeft: 10, fontSize: '0.8rem' }}>
                      Below minimum — node cannot register SLA bond
                    </span>
                  )}
                </span>
              )}
              {!oracleLoading && (!wavePrice || waveAmount === 0) && (
                <span style={{ color: 'var(--text-tertiary)' }}>Enter $WAVE amount to see fiat equivalent (refreshes every 60s)</span>
              )}
            </div>
          </div>
        </div>

        {/* ─── SLA BOND — USDC COLLATERAL (Optional) ──────────────────────────── */}
        <div className="form-group">
          <label className="form-label">
            WC_USDC_COLLATERAL — Additional USDC/USDT Bond
            <span style={{ color: 'var(--text-tertiary)', marginLeft: 6, fontSize: '0.75rem' }}>[Optional — increases routing bandwidth]</span>
          </label>
          <input
            type="number"
            className="form-input"
            placeholder="0.00"
            value={usdcCollateral}
            onChange={e => setUsdcCollateral(e.target.value)}
            min="0"
            step="100"
          />
          <p style={{ marginTop: 6, fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
            Optional stablecoin addition to the SLA Bond. Increases daily routing bandwidth proportionally above the base $WAVE bond.
          </p>
        </div>

        {/* ─── TIER 2 PEER REGISTRATION (Tier 1 only) ─────────────────────────── */}
        {tier === 'tier1' && (
          <div className="form-group">
            <label className="form-label">
              WC_TIER2_PEER_ID — Backbone Failover Node
              <span style={{ color: 'var(--accent-amber)', marginLeft: 6, fontSize: '0.75rem' }}>[Recommended for production]</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="12D3KooW... (Tier 2 libp2p Peer ID)"
              value={tier2PeerId}
              onChange={e => setTier2PeerId(e.target.value)}
            />
            <p style={{ marginTop: 6, fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
              When your daily throughput exceeds <strong>50 MB</strong>, transactions are automatically
              rerouted to this Tier 2 Backbone peer. Merchant operations are uninterrupted.
              Leave blank to disable automated spillover (not recommended for production deployments).
            </p>
          </div>
        )}

        {/* ─── OPERATOR REWARD ADDRESS ─────────────────────────────────────────── */}
        <div className="form-group">
          <label className="form-label">
            WC_OPERATOR_REWARD_ADDRESS — Revenue Wallet
            <span style={{ color: 'var(--accent-red)', marginLeft: 6, fontSize: '0.75rem' }}>[REQUIRED]</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="wc1... (your operator revenue address)"
            value={operatorRewardAddr}
            onChange={e => setOperatorRewardAddr(e.target.value)}
            required
          />
          <p style={{ marginTop: 6, fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
            Address where your earned <strong>3 bps facilitator fees are deposited</strong>.
            This is your revenue wallet — not the protocol treasury.
            The protocol treasury address is a governance-managed on-chain parameter enforced by the Restricted Utility Pool.
          </p>
        </div>

        {/* ─── NETWORK CONFIG ──────────────────────────────────────────────────── */}
        <div className="form-group" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <label className="form-label">NODE_ID</label>
            <input type="number" className="form-input" value={nodeId}
              onChange={e => setNodeId(Number(e.target.value))} required />
          </div>
          <div style={{ flex: 1 }}>
            <label className="form-label">RPC_PORT / X402</label>
            <input type="number" className="form-input" value={rpcPort}
              onChange={e => setRpcPort(Number(e.target.value))} required />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">GOSSIPSUB_BOOTNODES (Comma separated)</label>
          <input type="text" className="form-input" value={bootnodes}
            onChange={e => setBootnodes(e.target.value)} />
        </div>

        {/* ─── PROTOCOL SUMMARY BLOCK ──────────────────────────────────────────── */}
        <div className="terminal-block" style={{ marginTop: 24 }}>
          <div className="terminal-header">
            <Zap size={14} /> Spread Calculation & Principal Protection
          </div>
          <div style={{ padding: '16px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            When this node fronts gas to settle a transaction, <strong>100% of that gas cost is atomically
            reimbursed in the same block</strong> from the Client Application's on-chain Paymaster contract —
            eliminating counterparty risk. Your <strong>3 bps spread</strong> on the settled amount is
            credited to <code>WC_OPERATOR_REWARD_ADDRESS</code> immediately after settlement.
            The node will automatically reject any <code>wc/intelligence/4.0</code> requests that
            would result in a gas subsidy exceeding your configured maximum.
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" id="facilitator-generate-btn">
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
