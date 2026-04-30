import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MegaMenu from './Navigation/MegaMenu';
import LegalFooter from './Footer/LegalFooter';
import CookieBanner from './CookieBanner/CookieBanner';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.2 } },
};

export default function Layout() {
  const location = useLocation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <MegaMenu />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="page-wrapper"
          style={{ paddingTop: 72, flex: 1 }}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <LegalFooter />
      <CookieBanner />

      {/* Native Data Router scroll restoration — respects browser back/forward cache */}
      <ScrollRestoration />
    </div>
  );
}
