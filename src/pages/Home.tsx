import { Link } from 'react-router-dom';
import { Cpu, Database, ShieldAlert, ArrowRight } from 'lucide-react';
import './Home.css';

export default function Home() {
  return (
    <div className="home animate-fade-in">
      <div className="home-header">
        <h1 className="code-font title-glitch" data-text="INITIALIZE_NODE">INITIALIZE_NODE</h1>
        <p className="subtitle">Select your network role to generate a compliant testnet configuration payload.</p>
      </div>

      <div className="node-cards">
        
        <div className="node-card">
          <div className="node-card-header">
            <Cpu size={32} color="var(--accent-blue)" />
            <div className="node-card-badge">T2/T3 Consensus</div>
          </div>
          <h2 className="code-font">Validator Node</h2>
          <p>For institutions and infrastructure providers. Join the WaveCollapse consensus network.</p>
          <ul className="feature-list">
            <li>Generate BLS12-381 Keys</li>
            <li>Auto-join P2P Gossipsub</li>
            <li>Dynamic Threshold Committees (DTC)</li>
            <li>Fiat-Pegged Stake via Oracle</li>
          </ul>
          <Link to="/validator" className="btn-secondary card-btn">
            Configure <ArrowRight size={16} />
          </Link>
        </div>

        <div className="node-card">
          <div className="node-card-header">
            <Database size={32} color="var(--accent-cta)" />
            <div className="node-card-badge">SEC 17a-4 Compliant</div>
          </div>
          <h2 className="code-font">Archive Node</h2>
          <p>For regulators, auditors, and risk officers requiring full historical state and WORM storage.</p>
          <ul className="feature-list">
            <li>Software-Defined WORM</li>
            <li>AWS S3 IAM Policy Gen</li>
            <li>Disable Consensus Voting</li>
          </ul>
          <Link to="/archive" className="btn-secondary card-btn">
            Configure <ArrowRight size={16} />
          </Link>
        </div>

        <div className="node-card">
          <div className="node-card-header">
            <ShieldAlert size={32} color="var(--accent-red)" />
            <div className="node-card-badge">Liquidity / Relay</div>
          </div>
          <h2 className="code-font">Facilitator Node</h2>
          <p>For B2B Infrastructure Providers and Treasury Managers. Deploy a high-availability x402_server to algorithmically broker and subsidize network settlement.</p>
          <ul className="feature-list">
            <li>Gas Abstraction as a Service</li>
            <li>Automated Spread Negotiation</li>
            <li>Dockerized x402 Endpoints</li>
          </ul>
          <Link to="/facilitator" className="btn-secondary card-btn">
            Configure <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
