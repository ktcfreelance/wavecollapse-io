import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';

// DAO Proposals page — redirects to Protocol Economics until on-chain governance is live.
// The governance system (DAO proposal creation, on-chain voting) is scheduled for post-mainnet GA.
export default function DaoProposals() {
  return <Navigate to="/governance/economics" replace />;
}
