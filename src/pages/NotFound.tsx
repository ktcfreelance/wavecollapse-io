import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '6rem', fontWeight: 800, background: 'var(--grad-teal)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: 16 }}>
          404
        </div>
        <h2 style={{ marginBottom: 12 }}>Route Not Found</h2>
        <p style={{ maxWidth: 400, marginBottom: 32, color: 'var(--text-tertiary)' }}>
          This path does not exist on the protocol. It may have moved or been deprecated in a protocol upgrade.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/" className="btn-primary" id="404-home-btn"><Home size={16} /> Return Home</Link>
          <button className="btn-secondary" onClick={() => window.history.back()} id="404-back-btn"><ArrowLeft size={16} /> Go Back</button>
        </div>
      </motion.div>
    </div>
  );
}
