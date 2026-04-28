import { lazy, Suspense } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Database, ShieldAlert, Cpu } from 'lucide-react';

// Re-export the old node wizard pages as lazy modules for the /build/node-wizard route
const NodeWizardPages = {
  Validator: lazy(() => import('../Validator')),
  Archive: lazy(() => import('../Archive')),
  Facilitator: lazy(() => import('../Facilitator')),
};

export default NodeWizardPages;
