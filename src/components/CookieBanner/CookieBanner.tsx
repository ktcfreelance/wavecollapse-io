import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';

const COOKIE_KEY = 'wc_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, performance: true, targeting: false });

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = (all: boolean) => {
    const consent = all ? { analytics: true, performance: true, targeting: true } : prefs;
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ consent, timestamp: Date.now() }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="cookie-banner"
          id="cookie-consent-banner"
          role="dialog"
          aria-label="Cookie preferences"
          aria-modal="false"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="cookie-main">
            <div className="cookie-icon-wrap">
              <Cookie size={20} />
            </div>
            <div className="cookie-content">
              <div className="cookie-header-row">
                <strong className="cookie-title">We use cookies</strong>
                <button
                  className="cookie-expand-btn"
                  onClick={() => setExpanded(!expanded)}
                  aria-label={expanded ? 'Show less options' : 'Customize preferences'}
                  id="cookie-expand-toggle"
                >
                  {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  {expanded ? 'Less' : 'Customize'}
                </button>
              </div>
              <p className="cookie-desc">
                We use essential cookies for site functionality and optional analytics to improve
                the protocol experience. Read our{' '}
                <Link to="/legal/cookies" className="cookie-policy-link">Cookie Policy</Link>.
              </p>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    className="cookie-prefs"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {[
                      { key: 'analytics', label: 'Analytics', desc: 'Understand how users navigate the protocol documentation and dashboards.' },
                      { key: 'performance', label: 'Performance', desc: 'Monitor latency and load-time bottlenecks to optimize the experience.' },
                      { key: 'targeting', label: 'Marketing', desc: 'Serve institutional content relevant to your compliance role.' },
                    ].map(({ key, label, desc }) => (
                      <label key={key} className="cookie-pref-row" htmlFor={`cookie-pref-${key}`}>
                        <div className="cookie-pref-text">
                          <span className="cookie-pref-label">{label}</span>
                          <span className="cookie-pref-desc">{desc}</span>
                        </div>
                        <div className={`cookie-toggle ${prefs[key as keyof typeof prefs] ? 'on' : ''}`}>
                          <input
                            type="checkbox"
                            id={`cookie-pref-${key}`}
                            checked={prefs[key as keyof typeof prefs]}
                            onChange={(e) => setPrefs({ ...prefs, [key]: e.target.checked })}
                          />
                          <span className="cookie-toggle-thumb" />
                        </div>
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="cookie-actions">
            <button className="btn-ghost cookie-dismiss" onClick={() => accept(false)} id="cookie-accept-selected">
              {expanded ? 'Save Selection' : 'Reject Non-Essential'}
            </button>
            <button className="btn-primary" onClick={() => accept(true)} id="cookie-accept-all" style={{ padding: '9px 20px', fontSize: '0.82rem' }}>
              Accept All
            </button>
          </div>

          <button className="cookie-close" onClick={() => accept(false)} aria-label="Close cookie banner" id="cookie-close-btn">
            <X size={15} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
