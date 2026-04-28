import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, AlertTriangle, Cpu, FileText,
  Activity, Lock, ChevronRight, Zap, GitBranch,
  BarChart3, Clock, Hash, TrendingUp, Award,
} from 'lucide-react';

// ─── Mock data for the "glass wall" preview panels ──────────────────────────

const MOCK_SLA_HASH = '0x9f3a2c8b1e4d7f0a5c2e8b4d1f7a3c9e2b5d8f1a4c7e0b3d6f9a2c5e8b1d4f7';
const MOCK_NODE_ID  = 'WC-VAL-0x4F2A…9C1E';
const MOCK_WAVE_STAKE = '82,441';
const MOCK_USD_EQUIV  = '$100,038';

const MERKLE_RECORDS = [
  { seq: 'TXN-0091823', hash: '0x17cf…ae4b', ts: '14:51:02Z', status: 'VERIFIED' },
  { seq: 'TXN-0091822', hash: '0xa3f1…8c22', ts: '14:50:47Z', status: 'VERIFIED' },
  { seq: 'TXN-0091821', hash: '0x5e7d…1109', ts: '14:50:31Z', status: 'VERIFIED' },
  { seq: 'TXN-0091820', hash: '0xbb4c…f765', ts: '14:50:16Z', status: 'VERIFIED' },
];

const DTC_ROUNDS = [
  { round: 'R-4419', committee: 'T3-ALPHA', participation: '✓', vote: 'AFFIRM', latency: '38ms' },
  { round: 'R-4418', committee: 'T2-DELTA', participation: '✓', vote: 'AFFIRM', latency: '41ms' },
  { round: 'R-4417', committee: 'T3-ALPHA', participation: '✓', vote: 'AFFIRM', latency: '35ms' },
  { round: 'R-4416', committee: 'T2-GAMMA', participation: '✗', vote: '—',      latency: 'TIMEOUT' },
];

// ─── Animated counter for the live-feel mock data ───────────────────────────
function useTick(interval = 4200) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), interval);
    return () => clearInterval(id);
  }, [interval]);
  return tick;
}

// ─── Fade-up animation variant ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.68rem',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--teal-400)',
      marginBottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      {children}
    </div>
  );
}

function LiveDot({ color = 'var(--teal-400)' }: { color?: string }) {
  return (
    <span style={{
      display: 'inline-block',
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: color,
      animation: 'pulse-teal 2.2s ease infinite',
      flexShrink: 0,
    }} />
  );
}

// ─── Panel: Stake Dashboard ──────────────────────────────────────────────────
function StakePanel({ tick }: { tick: number }) {
  // Simulate tiny oracle drift
  const drift = ((tick % 7) - 3) * 12;
  const displayWave = (82441 + drift).toLocaleString();

  return (
    <div style={{
      background: 'var(--bg-void)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
      overflow: 'hidden',
    }}>
      <div className="terminal-header" style={{ borderColor: 'rgba(23,207,174,0.15)' }}>
        <div className="terminal-dot dot-red" />
        <div className="terminal-dot dot-yellow" />
        <div className="terminal-dot dot-green" />
        <span style={{ marginLeft: 6 }}>stake_dashboard.rs — live oracle feed</span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <LiveDot /> ORACLE ACTIVE
        </span>
      </div>
      <div style={{ padding: '20px 22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
              STAKED $WAVE
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.6rem',
              fontWeight: 700,
              background: 'var(--grad-teal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {displayWave}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
              USD EQUIV (ORACLE)
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.6rem',
              fontWeight: 700,
              color: '#FCD34D',
            }}>
              {MOCK_USD_EQUIV}
            </div>
          </div>
        </div>

        {/* SLA Hash — The centrepiece per Directive 3 */}
        <div style={{
          background: 'rgba(245,158,11,0.06)',
          border: '1px solid rgba(245,158,11,0.22)',
          borderRadius: 7,
          padding: '12px 14px',
          marginBottom: 14,
        }}>
          <div style={{
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            color: '#FCD34D',
            letterSpacing: '0.1em',
            marginBottom: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <Hash size={11} /> OTC SLA CONTRACT HASH — CHAIN-VERIFIED
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            wordBreak: 'break-all',
            lineHeight: 1.55,
          }}>
            {MOCK_SLA_HASH}
          </div>
          <div style={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.7rem',
            color: 'var(--teal-400)',
            fontFamily: 'var(--font-mono)',
          }}>
            <ShieldCheck size={11} /> VERIFIED ON-CHAIN · SLA ACTIVE · EXPIRES 2027-01-01
          </div>
        </div>

        {/* Status row */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { label: 'JAILING STATUS', value: 'CLEAR', color: 'var(--teal-400)' },
            { label: 'EPOCH REWARDS', value: '+14.2 $WAVE', color: '#FCD34D' },
            { label: 'SLASH HISTORY',  value: '0 events',  color: 'var(--text-secondary)' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              flex: '1 1 auto',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-muted)',
              borderRadius: 6,
              padding: '8px 12px',
            }}>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
                {label}
              </div>
              <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Panel: DTC Participation ────────────────────────────────────────────────
function DtcPanel() {
  return (
    <div style={{
      background: 'var(--bg-void)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
      overflow: 'hidden',
    }}>
      <div className="terminal-header">
        <Activity size={12} style={{ color: 'var(--teal-400)' }} />
        <span>dtc_participation.log — last 4 rounds</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--teal-400)' }}>
          NODE: {MOCK_NODE_ID}
        </span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-muted)' }}>
              {['ROUND', 'COMMITTEE', 'PRESENT', 'VOTE', 'LATENCY'].map(h => (
                <th key={h} style={{
                  padding: '8px 14px',
                  textAlign: 'left',
                  color: 'var(--text-tertiary)',
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DTC_ROUNDS.map((r, i) => (
              <tr key={r.round} style={{
                borderBottom: i < DTC_ROUNDS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <td style={{ padding: '9px 14px', color: 'var(--text-secondary)' }}>{r.round}</td>
                <td style={{ padding: '9px 14px', color: 'var(--teal-300)' }}>{r.committee}</td>
                <td style={{ padding: '9px 14px', color: r.participation === '✓' ? 'var(--teal-400)' : 'var(--accent-red)' }}>
                  {r.participation}
                </td>
                <td style={{ padding: '9px 14px', color: r.vote === 'AFFIRM' ? 'var(--teal-400)' : 'var(--text-tertiary)' }}>
                  {r.vote}
                </td>
                <td style={{ padding: '9px 14px', color: r.latency === 'TIMEOUT' ? 'var(--accent-amber)' : 'var(--text-secondary)' }}>
                  {r.latency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{
        padding: '10px 14px',
        borderTop: '1px solid var(--border-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: '0.72rem',
        color: 'var(--text-tertiary)',
        fontFamily: 'var(--font-mono)',
      }}>
        <AlertTriangle size={11} color="var(--accent-amber)" />
        1 timeout in R-4416 — liveness fault registered. Soft slash threshold: 3 consecutive misses.
      </div>
    </div>
  );
}

// ─── Panel: Software WORM / Merkle Audit Trail ───────────────────────────────
function WormPanel() {
  return (
    <div style={{
      background: 'var(--bg-void)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
      overflow: 'hidden',
    }}>
      <div className="terminal-header">
        <GitBranch size={12} style={{ color: 'var(--teal-400)' }} />
        <span>worm_audit_trail.rs — SEC 17a-4 Merkle Chain</span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, color: 'var(--teal-400)' }}>
          <LiveDot /> INTEGRITY OK
        </span>
      </div>
      <div style={{ padding: '16px 18px' }}>
        {MERKLE_RECORDS.map((r, i) => (
          <div key={r.seq} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '9px 0',
            borderBottom: i < MERKLE_RECORDS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            fontSize: '0.76rem',
            fontFamily: 'var(--font-mono)',
          }}>
            <ShieldCheck size={13} color="var(--teal-400)" style={{ flexShrink: 0 }} />
            <span style={{ color: 'var(--text-tertiary)', width: 90 }}>{r.seq}</span>
            <span style={{ color: 'var(--teal-300)', flex: 1 }}>{r.hash}</span>
            <span style={{ color: 'var(--text-tertiary)', width: 78 }}>{r.ts}</span>
            <span className="badge badge-teal" style={{ fontSize: '0.6rem' }}>{r.status}</span>
          </div>
        ))}
      </div>
      <div style={{
        padding: '10px 18px',
        borderTop: '1px solid var(--border-muted)',
        fontSize: '0.7rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-tertiary)',
      }}>
        Chain root: <span style={{ color: 'var(--teal-300)' }}>0x5811…3d7f</span> · No hardware dependency · Software-defined immutability enforced
      </div>
    </div>
  );
}

// ─── Panel: Health Metrics ────────────────────────────────────────────────────
function HealthPanel({ tick }: { tick: number }) {
  const uptime = (99.87 + (tick % 3) * 0.01).toFixed(2);
  return (
    <div style={{
      background: 'var(--bg-void)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
      padding: '18px 20px',
    }}>
      <PanelLabel><BarChart3 size={12} /> NODE HEALTH METRICS</PanelLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { label: 'UPTIME',      value: `${uptime}%`,   icon: <TrendingUp size={14} />, color: 'var(--teal-400)' },
          { label: 'AVG LATENCY', value: '38ms',          icon: <Zap size={14} />,        color: '#FCD34D'          },
          { label: 'DTC ROUNDS',  value: '4,417',         icon: <Cpu size={14} />,        color: 'var(--teal-300)'  },
          { label: 'EPOCH',       value: `#${182 + (tick % 2)}`, icon: <Clock size={14} />, color: 'var(--text-secondary)' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-muted)',
            borderRadius: 7,
            padding: '12px 14px',
            textAlign: 'center',
          }}>
            <div style={{ color, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function ValidatorPortal() {
  const tick = useTick(4200);

  return (
    <div className="container section" style={{ position: 'relative' }}>

      {/* Page header */}
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.div variants={fadeUp}>
          <span className="section-label">
            <ShieldCheck size={12} /> Governance / Validator Portal
          </span>
          <h1 style={{ marginBottom: 12 }}>
            Validator <span className="gradient-text">Portal</span>
          </h1>
          <p style={{ maxWidth: 640, marginBottom: 48, fontSize: '1rem' }}>
            Institutional-grade stake management, SLA contract monitoring, DTC consensus
            participation, and Software-Defined WORM audit trail visibility.
            Access restricted to credentialed <strong style={{ color: 'var(--teal-300)' }}>Anchor Nodes</strong>.
          </p>
        </motion.div>

        {/* ── Glass Wall Wrapper ─────────────────────────────────────────── */}
        <motion.div variants={fadeUp} style={{ position: 'relative' }}>

          {/* Ghost preview panels — rendered behind the gate */}
          <div style={{
            filter: 'blur(3.5px)',
            opacity: 0.45,
            pointerEvents: 'none',
            userSelect: 'none',
            display: 'grid',
            gap: 20,
          }}>
            <HealthPanel tick={tick} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <StakePanel tick={tick} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <DtcPanel />
              </div>
            </div>
            <WormPanel />
          </div>

          {/* ── The Prestige Gate Modal ─────────────────────────────────── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}>
            {/* Backdrop blur layer */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(7,11,20,0.6) 0%, rgba(7,11,20,0.85) 100%)',
              backdropFilter: 'blur(1.5px)',
              WebkitBackdropFilter: 'blur(1.5px)',
            }} />

            {/* Gate card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: 'easeOut' }}
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: 560,
                background: 'linear-gradient(145deg, rgba(13,21,37,0.97) 0%, rgba(7,11,20,0.99) 100%)',
                border: '1px solid rgba(245,158,11,0.35)',
                borderRadius: 18,
                boxShadow: '0 0 80px rgba(245,158,11,0.08), 0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,158,11,0.1)',
                overflow: 'hidden',
              }}
            >
              {/* Amber top accent bar */}
              <div style={{
                height: 3,
                background: 'linear-gradient(90deg, transparent, #F59E0B 30%, #FCD34D 50%, #F59E0B 70%, transparent)',
              }} />

              <div style={{ padding: '36px 40px 40px' }}>

                {/* Lock icon */}
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  boxShadow: '0 0 24px rgba(245,158,11,0.12)',
                }}>
                  <Lock size={24} color="#FCD34D" />
                </div>

                {/* Credential label */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#FCD34D',
                  background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  borderRadius: 4,
                  padding: '4px 10px',
                  marginBottom: 18,
                }}>
                  <Award size={10} /> PHASE 03 — INSTITUTIONAL VALIDATION
                </div>

                <h2 style={{
                  fontSize: '1.55rem',
                  marginBottom: 14,
                  lineHeight: 1.3,
                  fontFamily: 'var(--font-mono)',
                }}>
                  Access Restricted to{' '}
                  <span style={{ color: 'var(--teal-400)' }}>Anchor Nodes</span>
                </h2>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.7 }}>
                  This portal provides real-time stake management, SLA contract monitoring,
                  DTC committee assignments, and SEC Rule{' '}
                  <span style={{ color: 'var(--teal-300)', fontFamily: 'var(--font-mono)' }}>17a-4</span>{' '}
                  Merkle-chain audit visibility. Access is available exclusively to
                  credentialed institutional validators who have completed the WaveCollapse
                  Phase 03 onboarding protocol.
                </p>

                {/* SLA Hash teaser block */}
                <div style={{
                  background: 'rgba(245,158,11,0.05)',
                  border: '1px dashed rgba(245,158,11,0.25)',
                  borderRadius: 8,
                  padding: '14px 16px',
                  marginBottom: 28,
                }}>
                  <div style={{
                    fontSize: '0.63rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#FCD34D',
                    letterSpacing: '0.1em',
                    marginBottom: 7,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    <FileText size={10} /> YOUR OTC SLA CONTRACT HASH (AWAITING VERIFICATION)
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.04em',
                    filter: 'blur(4px)',
                    userSelect: 'none',
                  }}>
                    0x████████████████████████████████████████████████████████████████████
                  </div>
                  <div style={{
                    fontSize: '0.68rem',
                    color: 'var(--text-tertiary)',
                    fontFamily: 'var(--font-mono)',
                    marginTop: 8,
                  }}>
                    Complete Phase 03 credentialing to bind your SLA hash to this node identity.
                  </div>
                </div>

                {/* Feature list */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
                  {[
                    { icon: <BarChart3 size={13} />, label: 'Live Stake Dashboard'         },
                    { icon: <Cpu          size={13} />, label: 'DTC Committee Assignments' },
                    { icon: <GitBranch   size={13} />, label: 'WORM Audit Trail'           },
                    { icon: <Activity    size={13} />, label: 'Liveness & Slash Monitor'   },
                    { icon: <Hash        size={13} />, label: 'SLA Contract Binding'       },
                    { icon: <TrendingUp  size={13} />, label: 'Epoch Reward Accrual'       },
                  ].map(({ icon, label }) => (
                    <div key={label} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      <span style={{ color: 'var(--teal-400)' }}>{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link
                    to="/solutions/intake"
                    className="btn-primary"
                    id="validator-portal-begin-onboarding"
                    style={{ flex: '1 1 auto' }}
                  >
                    Begin Phase 03 Onboarding <ChevronRight size={16} />
                  </Link>
                  <Link
                    to="/build/node-wizard/validator"
                    className="btn-secondary"
                    id="validator-portal-node-wizard-link"
                    style={{ flex: '1 1 auto' }}
                  >
                    Configure Node First
                  </Link>
                </div>

                {/* Fine print */}
                <p style={{
                  marginTop: 20,
                  fontSize: '0.72rem',
                  color: 'var(--text-tertiary)',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-mono)',
                }}>
                  Node operator review is conducted under the WaveCollapse Institutional Validator
                  Agreement. All nodes must satisfy a $100,000 USD fiat-equivalent minimum stake,
                  oracle-verified at admission time. Operation governed by the GENIUS Act (2025)
                  and FinCEN/BSA gas abstraction requirements.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
