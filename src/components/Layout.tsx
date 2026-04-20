import { Outlet, Link, useLocation } from 'react-router-dom';
import { Terminal, Database, ShieldAlert, Cpu } from 'lucide-react';
import './Layout.css';

export default function Layout() {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Overview', icon: <Terminal size={18} /> },
    { to: '/validator', label: 'Validator Config', icon: <Cpu size={18} /> },
    { to: '/archive', label: 'Archive/WORM', icon: <Database size={18} /> },
    { to: '/facilitator', label: 'FinCEN Relay', icon: <ShieldAlert size={18} /> },
  ];

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="/logo.png" alt="WaveCollapse" className="nav-logo" />
          <div className="nav-brand-text">
            <span className="brand-title">WaveCollapse</span>
            <span className="brand-subtitle">Node Generation Portal</span>
          </div>
        </div>
        <div className="navbar-status">
          <div className="terminal-dot dot-green"></div>
          <span className="code-font network-label">WaveNet-Testnet-v4.0</span>
        </div>
      </nav>

      <div className="main-content">
        <aside className="sidebar">
          <div className="sidebar-header code-font">
            [SYS] CONFIG_ROUTER
          </div>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link 
                  to={link.to} 
                  className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="sidebar-footer">
            <div className="terminal-block">
              <div className="terminal-header" style={{fontSize: '0.7rem', padding: '4px 8px'}}>
                System Resources
              </div>
              <div className="code-font" style={{fontSize: '0.75rem', padding: '8px', color: 'var(--text-secondary)'}}>
                <div>Docker: DETECTED</div>
                <div>Protocol: v4.0.0</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
