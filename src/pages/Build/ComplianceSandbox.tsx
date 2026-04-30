import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import { motion } from 'framer-motion';
import { PlayCircle, RotateCcw, CheckCircle2, XCircle, AlertCircle, Info, ShieldAlert } from 'lucide-react';

interface Iso20022Fields {
  purposeCode: string;
  creditorLEI: string;
  amount: string;
  currency: string;
  debtorIBAN: string;
}

interface KytFlags {
  highRisk: boolean;
  sanctionMatch: boolean;
  velocityAlert: boolean;
}

type SimResult = 'idle' | 'running' | 'pass' | 'fail' | 'held';

const purposeCodes: { code: string; desc: string }[] = [
  { code: 'GDDS', desc: 'Goods & Services' },
  { code: 'SCVE', desc: 'Securities Purchase / Sale' },
  { code: 'INVS', desc: 'Investment / Securities' },
  { code: 'INTC', desc: 'Intra-Company Transfer' },
  { code: 'CASH', desc: 'Cash Management' },
  { code: 'DIVI', desc: 'Dividend Payment' },
  { code: 'LOAN', desc: 'Loan Repayment' },
  { code: 'SALA', desc: 'Salary / Payroll' },
];

export default function ComplianceSandbox() {
  const [iso, setIso] = useState<Iso20022Fields>({
    purposeCode: 'GDDS',
    creditorLEI: '5493001KJTIIGC8Y1R12',
    amount: '250000',
    currency: 'USD',
    debtorIBAN: 'US12 3456 7890 1234 5678',
  });
  const [kyt, setKyt] = useState<KytFlags>({ highRisk: false, sanctionMatch: false, velocityAlert: false });
  const [result, setResult] = useState<SimResult>('idle');
  const [log, setLog] = useState<string[]>([]);

  const runSimulation = () => {
    setResult('running');
    setLog([]);
    const isHardFail = kyt.sanctionMatch || iso.creditorLEI.length !== 20;
    const isSoftHold = !isHardFail && (kyt.highRisk || kyt.velocityAlert);

    const steps: string[] = [
      '[00:00ms] Initializing x402 settlement context...',
      `[00:08ms] ISO 20022 purposeCode validated: ${iso.purposeCode} ✓`,
      `[00:11ms] creditorLEI format check: ${iso.creditorLEI.length === 20 ? '20-char GLEIF format ✓' : 'FORMAT ERROR ✗'}`,
      '[00:14ms] KYT engine loading transaction profile...',
      kyt.sanctionMatch ? '[00:22ms] ⚠ OFAC/UN sanctions match detected — settlement blocked ✗' : '[00:22ms] OFAC/UN sanctions screen: CLEAR ✓',
      kyt.highRisk ? '[00:28ms] ⚠ High-risk jurisdiction flag active — enhanced due diligence required' : '[00:28ms] Jurisdiction risk score: LOW ✓',
      kyt.velocityAlert ? '[00:32ms] ⚠ Velocity threshold exceeded — potential structuring detected' : '[00:32ms] Velocity check: WITHIN LIMITS ✓',
      `[00:38ms] Amount: $${Number(iso.amount).toLocaleString()} ${iso.currency}`,
      '[00:41ms] 17a-4 Merkle audit record appended — chain intact ✓',
    ];

    // Branch the final steps based on outcome
    if (isHardFail) {
      steps.push('[00:45ms] SETTLEMENT REJECTED — compliance gate triggered ✗');
    } else if (isSoftHold) {
      steps.push('[00:45ms] WaveToken.freeze() invoked — tokens escrowed pending review');
      steps.push('[00:48ms] SETTLEMENT HELD — FROZEN in escrow, awaiting compliance officer clearance');
      if (kyt.highRisk) steps.push('[00:50ms] ↳ Trigger: FATF high-risk jurisdiction — manual EDD review required');
      if (kyt.velocityAlert) steps.push('[00:51ms] ↳ Trigger: FinCEN velocity threshold breach — structuring review queued');
      steps.push('[00:54ms] Compliance review ticket created — settlement will finalize or reject upon officer action');
    } else {
      steps.push('[00:45ms] SETTLEMENT APPROVED — x402 finality confirmed ✓');
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        setResult(isHardFail ? 'fail' : isSoftHold ? 'held' : 'pass');
        return;
      }
      setLog((prev) => [...prev, steps[i]]);
      i++;
    }, 120);
  };

  const reset = () => {
    setResult('idle');
    setLog([]);
  };

  return (
    <div className="container section">
      <SEOHead
        title="Compliance Sandbox"
        description="Simulate a full ISO 20022-compliant x402 settlement including KYT checks, OFAC screening, velocity analysis, and SEC 17a-4 audit-trail appending in real time."
        path="/build/sandbox"
      />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="section-label">Build / Compliance Sandbox</span>
        <h1>Compliance-<span style={{ color: 'var(--teal-400)' }}>as-Code</span> Sandbox</h1>
        <p style={{ maxWidth: 620, marginTop: 12, marginBottom: 48 }}>
          Simulate a full ISO 20022-compliant x402 settlement including KYT checks,
          OFAC screening, velocity analysis, and 17a-4 audit-trail appending.
          Toggle parameters and observe real-time compliance gate outcomes.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {/* Left: Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* ISO 20022 Fields */}
            <div className="glass-card" style={{ padding: 24 }}>
              <div className="terminal-header" style={{ margin: '-24px -24px 20px', borderRadius: '12px 12px 0 0' }}>
                <span className="terminal-dot dot-red" /><span className="terminal-dot dot-yellow" /><span className="terminal-dot dot-green" />
                <span style={{ marginLeft: 8 }}>ISO 20022 Message Fields</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="form-label" htmlFor="sandbox-purposeCode">purposeCode *</label>
                  <select id="sandbox-purposeCode" className="form-input" value={iso.purposeCode}
                    onChange={e => setIso({ ...iso, purposeCode: e.target.value })}>
                    {purposeCodes.map(({ code, desc }) => <option key={code} value={code}>{code} — {desc}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="sandbox-lei">creditorLEI (20 chars) *</label>
                  <input id="sandbox-lei" className="form-input" value={iso.creditorLEI}
                    onChange={e => setIso({ ...iso, creditorLEI: e.target.value })}
                    placeholder="20-character GLEIF LEI" maxLength={24} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                  <div>
                    <label className="form-label" htmlFor="sandbox-amount">Amount</label>
                    <input id="sandbox-amount" className="form-input" type="number" value={iso.amount}
                      onChange={e => setIso({ ...iso, amount: e.target.value })} />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="sandbox-currency">Currency</label>
                    <select id="sandbox-currency" className="form-input" value={iso.currency}
                      onChange={e => setIso({ ...iso, currency: e.target.value })}>
                      <option>USD</option><option>EUR</option><option>GBP</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* KYT Toggle Panel */}
            <div className="glass-card" style={{ padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                Know Your Transaction (KYT) Flags
              </div>
              {[
                { key: 'highRisk', label: 'High-Risk Jurisdiction', icon: <AlertCircle size={15} />, tooltip: 'Flags counterparties domiciled in FATF-designated high-risk or non-cooperative jurisdictions. Triggers enhanced due diligence and may require manual compliance officer review before settlement.' },
                { key: 'sanctionMatch', label: 'OFAC / UN Sanctions Match', icon: <XCircle size={15} />, tooltip: 'Screens the creditor LEI and associated entities against OFAC SDN, UN Security Council, and EU consolidated sanctions lists. A positive match blocks settlement immediately.' },
                { key: 'velocityAlert', label: 'Velocity Threshold Alert', icon: <AlertCircle size={15} />, tooltip: 'Monitors transaction frequency and cumulative volume over rolling 24h / 7d windows per counterparty. Exceeding FinCEN-defined thresholds triggers a structuring-risk flag.' },
              ].map(({ key, label, icon, tooltip }) => (
                <label key={key} htmlFor={`kyt-${key}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer', gap: 12, position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: kyt[key as keyof KytFlags] ? 'var(--accent-red)' : 'var(--text-secondary)', fontSize: '0.875rem', flex: 1 }}>
                    {icon}{label}
                    <span className="kyt-tooltip-anchor" style={{ display: 'inline-flex', marginLeft: 2, position: 'relative' }}>
                      <Info size={13} style={{ color: 'var(--text-muted)', cursor: 'help', flexShrink: 0 }} />
                      <span className="kyt-tooltip">{tooltip}</span>
                    </span>
                  </div>
                  <input id={`kyt-${key}`} type="checkbox" checked={kyt[key as keyof KytFlags]}
                    onChange={e => setKyt({ ...kyt, [key]: e.target.checked })}
                    style={{ width: 16, height: 16, accentColor: 'var(--teal-400)' }} />
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-primary" onClick={runSimulation} disabled={result === 'running'} id="sandbox-run-btn"
                style={{ flex: 1, opacity: result === 'running' ? 0.7 : 1 }}>
                <PlayCircle size={16} /> Run Simulation
              </button>
              <button className="btn-secondary" onClick={reset} id="sandbox-reset-btn" style={{ padding: '12px 18px' }}>
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Right: Output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="terminal-block" style={{ flex: 1 }}>
              <div className="terminal-header">
                <span className="terminal-dot dot-red" /><span className="terminal-dot dot-yellow" /><span className="terminal-dot dot-green" />
                <span style={{ marginLeft: 8 }}>x402 Settlement Engine — Output</span>
                {result !== 'idle' && (
                  <span style={{ marginLeft: 'auto' }}>
                    {result === 'running' && <span className="badge badge-amber">RUNNING</span>}
                    {result === 'pass'    && <span className="badge badge-teal">APPROVED</span>}
                    {result === 'held'    && <span className="badge badge-amber">HELD — FROZEN</span>}
                    {result === 'fail'    && <span className="badge badge-red">REJECTED</span>}
                  </span>
                )}
              </div>
              <div style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 2, minHeight: 320, maxHeight: 440, overflowY: 'auto' }}>
                {log.length === 0 && (
                  <span style={{ color: 'var(--text-muted)' }}>// Configure parameters and click Run Simulation</span>
                )}
                {log.filter(Boolean).map((line, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.12 }}
                    style={{
                      color: line.includes('✗') || line.includes('REJECTED') ? 'var(--accent-red)'
                        : line.includes('HELD') || line.includes('freeze()') || line.includes('↳') ? 'var(--accent-amber)'
                        : line.includes('⚠') ? 'var(--accent-amber)'
                        : line.includes('APPROVED') ? 'var(--teal-300)'
                        : 'var(--text-secondary)',
                    }}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>

            {result === 'pass' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card-teal" style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'center' }}>
                <CheckCircle2 size={28} color="var(--teal-400)" />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--teal-300)', marginBottom: 4 }}>Settlement Approved</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>All compliance gates cleared. 17a-4 record appended to Merkle chain.</div>
                </div>
              </motion.div>
            )}
            {result === 'held' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'center', borderColor: 'rgba(245,158,11,0.35)', background: 'rgba(245,158,11,0.04)' }}>
                <ShieldAlert size={28} color="var(--accent-amber)" />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FCD34D', marginBottom: 4 }}>Settlement Held — Frozen in Escrow</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>Tokens escrowed via WaveToken <code>freeze()</code>. Settlement awaiting manual compliance officer review. Will finalize or reject upon officer action.</div>
                </div>
              </motion.div>
            )}
            {result === 'fail' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'center', borderColor: 'rgba(239,68,68,0.35)', background: 'rgba(239,68,68,0.04)' }}>
                <XCircle size={28} color="var(--accent-red)" />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#FCA5A5', marginBottom: 4 }}>Settlement Blocked</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>Compliance gate triggered. Review flagged parameters before resubmission.</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
