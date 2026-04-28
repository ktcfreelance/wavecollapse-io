import { useState, useEffect } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, Terminal, Shield, BarChart3, Building2,
  Cpu, BookOpen, FileText, Activity, Lock, Users,
  ArrowRight, Zap
} from 'lucide-react';
import './MegaMenu.css';

interface SubItem {
  to: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
}

interface NavSection {
  id: string;
  label: string;
  items: SubItem[];
}

const navSections: NavSection[] = [
  {
    id: 'solutions',
    label: 'Solutions',
    items: [
      { to: '/solutions/settlement', label: 'Settlement Infrastructure', description: 'Sub-millisecond finality for high-value transfers', icon: <Activity size={18} /> },
      { to: '/solutions/rwa', label: 'RWA Tokenization', description: 'Compliant tokenization of real-world assets', icon: <Building2 size={18} /> },
      { to: '/solutions/intake', label: 'Institutional Onboarding', description: 'Phased enterprise intake and provisioning portal', icon: <Users size={18} />, tag: 'New' },
    ],
  },
  {
    id: 'protocol',
    label: 'Protocol',
    items: [
      { to: '/protocol/equivalency', label: 'Redundant Equivalency', description: 'SEC 17a-4 software-defined audit trail architecture', icon: <Shield size={18} />, tag: 'Reg' },
      { to: '/protocol/iso20022', label: 'ISO 20022 Specs', description: 'Native structured message field mapping', icon: <FileText size={18} /> },
      { to: '/protocol/x402', label: 'Agentic x402 Layer', description: 'Autonomous settlement negotiation and execution', icon: <Zap size={18} /> },
    ],
  },
  {
    id: 'build',
    label: 'Build',
    items: [
      { to: '/build/node-wizard', label: 'Node Wizard', description: 'Apply to operate a WaveCollapse node', icon: <Terminal size={18} />, tag: '📋 Application' },
      { to: '/build/sandbox', label: 'Compliance Sandbox', description: 'Live ISO 20022 & KYT simulation environment', icon: <Cpu size={18} />, tag: 'New' },
      { to: '/build/sdk', label: 'TypeScript SDK', description: 'Typed client libraries for protocol integration', icon: <BookOpen size={18} /> },
    ],
  },
  {
    id: 'governance',
    label: 'Governance',
    items: [
      { to: '/governance/economics', label: 'Protocol Economics', description: 'DVT staking and cryptoeconomic security deposits', icon: <BarChart3 size={18} /> },
      { to: '/governance/validators', label: 'Validator Portal', description: 'Stake management, SLA contracts and DTC config', icon: <Cpu size={18} /> },
      { to: '/governance/audits', label: 'Audits', description: 'Third-party security and protocol audit reports', icon: <Lock size={18} /> },
    ],
  },
  {
    id: 'trust',
    label: 'Trust Hub',
    items: [
      { to: '/trust/simulation', label: 'Simulation Report', description: '99.9% latency improvement vs. legacy rails', icon: <Activity size={18} />, tag: 'Data' },
      { to: '/trust/sec17a4', label: 'SEC 17a-4 Memo', description: 'Legal equivalency whitepaper for compliance officers', icon: <FileText size={18} />, tag: '⚖️ Legal' },
      { to: '/legal', label: 'Regulatory Docs', description: 'Full disclosure library and regulatory framework', icon: <Shield size={18} /> },
    ],
  },
];

export default function MegaMenu() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className={`mega-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="mega-inner">
        {/* Brand */}
        <Link to="/" className="mega-brand" id="nav-brand-logo">
          <img src="/logo.png" alt="WaveCollapse Logo" style={{ width: '40px', height: '40px', marginRight: '12px' }} />
          <div className="brand-text">
            <span className="brand-name">WaveCollapse</span>
            <span className="brand-tag">Protocol v4.0</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu.Root className="mega-nav-root" id="main-navigation">
          <NavigationMenu.List className="mega-nav-list">
            {navSections.map((section) => (
              <NavigationMenu.Item key={section.id}>
                <NavigationMenu.Trigger className="mega-nav-trigger" id={`nav-${section.id}`}>
                  {section.label}
                  <ChevronDown className="mega-chevron" size={14} aria-hidden />
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className="mega-nav-content" id={`nav-${section.id}-content`}>
                  <motion.div
                    className="mega-dropdown"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    <div className="mega-dropdown-header">
                      <span className="code-font" style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}>
                        [{section.id.toUpperCase()}]
                      </span>
                    </div>
                    <div className="mega-dropdown-items">
                      {section.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`mega-dropdown-item ${location.pathname === item.to ? 'active' : ''}`}
                          id={`nav-${section.id}-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <span className="mega-item-icon">{item.icon}</span>
                          <span className="mega-item-body">
                            <span className="mega-item-label">
                              {item.label}
                              {item.tag && <span className="mega-item-tag">{item.tag}</span>}
                            </span>
                            <span className="mega-item-desc">{item.description}</span>
                          </span>
                          <ArrowRight className="mega-item-arrow" size={14} />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ))}

            <NavigationMenu.Indicator className="mega-nav-indicator" />
          </NavigationMenu.List>

          <div className="mega-viewport-wrapper">
            <NavigationMenu.Viewport className="mega-nav-viewport" />
          </div>
        </NavigationMenu.Root>

        {/* Right Actions */}
        <div className="mega-actions">
          <div className="status-indicator">
            <span className="status-dot" />
            <span>WaveNet-v4.0</span>
          </div>
          <Link to="/solutions/intake" className="btn-primary" id="nav-cta-intake" style={{ padding: '9px 20px', fontSize: '0.8rem' }}>
            Request Access
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="mega-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            id="nav-mobile-toggle"
          >
            <span className={`ham-line ${mobileOpen ? 'open' : ''}`} />
            <span className={`ham-line ${mobileOpen ? 'open' : ''}`} />
            <span className={`ham-line ${mobileOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mega-mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            id="mobile-navigation-drawer"
          >
            {navSections.map((section) => (
              <div key={section.id} className="mobile-section">
                <div className="mobile-section-label">{section.label}</div>
                {section.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="mobile-nav-link"
                    id={`mobile-nav-${section.id}-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span className="mega-item-icon">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.tag && <span className="mega-item-tag">{item.tag}</span>}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mobile-cta">
              <Link to="/solutions/intake" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Request Institutional Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
