import { Link } from 'react-router-dom';
import { Shield, ExternalLink, FileText, Lock } from 'lucide-react';
import './LegalFooter.css';

const currentYear = new Date().getFullYear();

const footerLinks = {
  Protocol: [
    { label: 'Redundant Equivalency', to: '/protocol/equivalency' },
    { label: 'ISO 20022 Specs', to: '/protocol/iso20022' },
    { label: 'Agentic x402 Layer', to: '/protocol/x402' },
    { label: 'Protocol Changelog', to: '/protocol/changelog' },
  ],
  Build: [
    { label: 'Node Wizard', to: '/build/node-wizard' },
    { label: 'Compliance Sandbox', to: '/build/sandbox' },
    { label: 'TypeScript SDK', to: '/build/sdk' },
    { label: 'API Reference', to: '/build/api' },
  ],
  Governance: [
    { label: 'Protocol Economics', to: '/governance/economics' },
    { label: 'Validator Portal', to: '/governance/validators' },
    { label: 'Audit Reports', to: '/governance/audits' },
    { label: 'DAO Proposals', to: '/governance/proposals' },
  ],
  Company: [
    { label: 'About WaveCollapse', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Press Kit', to: '/press' },
    { label: 'Careers', to: '/careers' },
  ],
};

const legalLinks = [
  { label: 'Privacy Policy', to: '/legal/privacy' },
  { label: 'Terms of Service', to: '/legal/terms' },
  { label: 'Cookie Policy', to: '/legal/cookies' },
  { label: 'Regulatory Disclosures', to: '/legal' },
];

export default function LegalFooter() {
  return (
    <footer className="legal-footer" id="site-footer">
      {/* Compliance Security Banner */}
      <div className="footer-compliance-banner">
        <div className="container">
          <div className="compliance-grid">
            <div className="compliance-item" id="footer-sec17a4-badge">
              <Shield size={16} className="compliance-icon" />
              <div className="compliance-text">
                <span className="compliance-title">SEC Rule 17a-4</span>
                <span className="compliance-sub">Redundant Equivalency Compliant</span>
              </div>
              <Link to="/protocol/equivalency" className="compliance-link">
                View Memo <ExternalLink size={11} />
              </Link>
            </div>
            <div className="compliance-item" id="footer-genius-act-badge">
              <FileText size={16} className="compliance-icon" />
              <div className="compliance-text">
                <span className="compliance-title">GENIUS Act 2025</span>
                <span className="compliance-sub">Technology Provider Status</span>
              </div>
              <Link to="/legal" className="compliance-link">
                Disclosures <ExternalLink size={11} />
              </Link>
            </div>
            <div className="compliance-item" id="footer-iso20022-badge">
              <Lock size={16} className="compliance-icon" />
              <div className="compliance-text">
                <span className="compliance-title">ISO 20022</span>
                <span className="compliance-sub">Native Protocol Support</span>
              </div>
              <Link to="/protocol/iso20022" className="compliance-link">
                Specs <ExternalLink size={11} />
              </Link>
            </div>
            <div className="compliance-item" id="footer-fit21-badge">
              <Shield size={16} className="compliance-icon" />
              <div className="compliance-text">
                <span className="compliance-title">FIT21 Act</span>
                <span className="compliance-sub">Digital Commodity Classification</span>
              </div>
              <Link to="/legal" className="compliance-link">
                Framework <ExternalLink size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="footer-body">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand-col">
              <Link to="/" className="footer-brand" id="footer-brand-logo">
                <img src="/logo.png" alt="WaveCollapse Logo" style={{ width: '40px', height: '40px', marginRight: '12px' }} />
                <div>
                  <div className="footer-brand-name">WaveCollapse</div>
                  <div className="footer-brand-sub">Protocol v4.0</div>
                </div>
              </Link>
              <p className="footer-brand-desc">
                Programmable compliance infrastructure for institutional digital asset settlement.
                Built on the GENIUS Act Technology Provider framework.
              </p>
              <div className="footer-network-status" id="footer-network-status">
                <span className="status-dot" />
                <span className="code-font" style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                  WaveNet-Testnet-v4.0 ACTIVE
                </span>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="footer-link-col">
                <h4 className="footer-col-title">{section}</h4>
                <ul className="footer-link-list">
                  {links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="footer-link" id={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legal Bottom Bar */}
      <div className="footer-legal-bar">
        <div className="container">
          <div className="footer-legal-inner">
            <div className="footer-legal-copy">
              <p>
                © {currentYear} WaveCollapse Protocol. All rights reserved.
              </p>
              <p className="footer-disclosure">
                WaveCollapse operates as a Technology Provider under the GENIUS Act of 2025.
                Nothing on this site constitutes investment advice, an offer to sell, or a solicitation
                to purchase any security or commodity. $WAVE is the native Layer 1 utility token used strictly for
                cryptoeconomic security (Validator staking), liquidity routing (Facilitator SLA bonds), and network settlement fees.
                $WAVE is governed under FIT21 as a Digital Commodity. WAVE-S is a separate protocol-level smart contract standard
                for SEC-regulated financial instruments and is not a token. Validator staking represents a cryptoeconomic security deposit
                for network infrastructure participation, not an investment contract. Treasury governance is restricted via the
                Restricted Utility Pool — distributions as dividends, yield, or profit-sharing to $WAVE holders are explicitly
                prohibited by smart contract architecture. Securities-related disclosures for BrikFi are governed separately under Reg CF/A+ and SEC rules.
              </p>
            </div>
            <div className="footer-legal-links">
              {legalLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="footer-legal-link"
                  id={`footer-legal-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
