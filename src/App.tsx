import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import InstitutionalGate from './components/InstitutionalGate';

/* ── Suspense Fallback ── */
function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '60vh', gap: 12, fontFamily: 'var(--font-mono)',
      fontSize: '0.8rem', color: 'var(--text-tertiary)',
    }}>
      <div style={{
        width: 16, height: 16, border: '2px solid var(--teal-400)',
        borderTopColor: 'transparent', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      Loading module...
    </div>
  );
}

/** Wraps a lazy component in Suspense for use within createBrowserRouter */
function lazyPage(factory: () => Promise<{ default: React.ComponentType }>) {
  const Component = lazy(factory);
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

/* ── Lazy Pages — Institutional Landing ── */
const InstitutionalLanding = () => lazyPage(() => import('./pages/Home/InstitutionalLanding'));

/* ── Solutions ── */
const OnboardingIntake = () => lazyPage(() => import('./pages/Solutions/OnboardingIntake'));
const Settlement = () => lazyPage(() => import('./pages/Solutions/Settlement'));
const RwaTokenization = () => lazyPage(() => import('./pages/Solutions/RwaTokenization'));

/* ── Protocol ── */
const RedundantEquivalency = () => lazyPage(() => import('./pages/Protocol/RedundantEquivalency'));
const Iso20022 = () => lazyPage(() => import('./pages/Protocol/Iso20022'));
const X402 = () => lazyPage(() => import('./pages/Protocol/X402'));
const Changelog = () => lazyPage(() => import('./pages/Protocol/Changelog'));

/* ── Build ── */
const NodeWizardHome = () => lazyPage(() => import('./pages/Build/NodeWizard'));
const ComplianceSandbox = () => lazyPage(() => import('./pages/Build/ComplianceSandbox'));
const TypescriptSDK = () => lazyPage(() => import('./pages/Build/TypescriptSDK'));
const ApiReference = () => lazyPage(() => import('./pages/Build/ApiReference'));

/* ── Governance ── */
const ProtocolEconomics = () => lazyPage(() => import('./pages/Governance/ProtocolEconomics'));
const ValidatorPortal = () => lazyPage(() => import('./pages/Governance/ValidatorPortal'));
const Audits = () => lazyPage(() => import('./pages/Governance/Audits'));
const DaoProposals = () => lazyPage(() => import('./pages/Governance/DaoProposals'));

/* ── Company ── */
const About = () => lazyPage(() => import('./pages/Company/About'));
const Contact = () => lazyPage(() => import('./pages/Company/Contact'));
const Press = () => lazyPage(() => import('./pages/Company/Press'));
const Careers = () => lazyPage(() => import('./pages/Company/Careers'));

/* ── Trust Hub ── */
const SimulationReport = () => lazyPage(() => import('./pages/TrustHub/SimulationReport'));

/* ── Legal ── */
const PrivacyPolicy = () => lazyPage(() => import('./pages/Legal/PrivacyPolicy'));
const TermsOfService = () => lazyPage(() => import('./pages/Legal/TermsOfService'));
const CookiePolicy = () => lazyPage(() => import('./pages/Legal/CookiePolicy'));

/* ── Catch-all ── */
const NotFound = () => lazyPage(() => import('./pages/NotFound'));

/* ══════════════════════════════════════════════════════════════
   Data Router (React Router v6.4+ / v7)
   Required for <ScrollRestoration /> and future data loaders.
   ══════════════════════════════════════════════════════════════ */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      /* Home */
      { index: true, element: <InstitutionalLanding /> },

      /* Solutions */
      { path: 'solutions/intake', element: <OnboardingIntake /> },
      { path: 'solutions/settlement', element: <Settlement /> },
      { path: 'solutions/rwa', element: <RwaTokenization /> },

      /* Protocol */
      { path: 'protocol/equivalency', element: <RedundantEquivalency /> },
      { path: 'protocol/iso20022', element: <Iso20022 /> },
      { path: 'protocol/x402', element: <X402 /> },
      { path: 'protocol/changelog', element: <Changelog /> },

      /* Build */
      { path: 'build/node-wizard', element: <NodeWizardHome /> },
      { path: 'build/node-wizard/*', element: <Navigate to="/build/node-wizard" replace /> },
      { path: 'build/sandbox', element: <ComplianceSandbox /> },
      { path: 'build/sdk', element: <TypescriptSDK /> },
      { path: 'build/api', element: <ApiReference /> },

      /* Governance */
      { path: 'governance/economics', element: <ProtocolEconomics /> },
      { path: 'governance/validators', element: <ValidatorPortal /> },
      { path: 'governance/audits', element: <Audits /> },
      { path: 'governance/proposals', element: <DaoProposals /> },

      /* Company */
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'press', element: <Press /> },
      { path: 'careers', element: <Careers /> },

      /* Trust Hub */
      { path: 'trust/simulation', element: <SimulationReport /> },
      {
        path: 'trust/sec17a4',
        element: (
          <InstitutionalGate
            title="SEC Rule 17a-4 Compliance Memo"
            description="This document details WaveCollapse's Software-Defined WORM architecture and its alignment with SEC Rule 17a-4 record retention requirements. Access is restricted to credentialed institutional partners."
            classification="RESTRICTED — INSTITUTIONAL ONLY"
          />
        ),
      },

      /* Legal */
      {
        path: 'legal',
        element: (
          <InstitutionalGate
            title="Regulatory Disclosures"
            description="WaveCollapse regulatory positioning, GENIUS Act compliance strategy, and Technology Provider status documentation. Access is restricted to credentialed institutional partners."
            classification="RESTRICTED — INSTITUTIONAL ONLY"
          />
        ),
      },
      { path: 'legal/privacy', element: <PrivacyPolicy /> },
      { path: 'legal/terms', element: <TermsOfService /> },
      { path: 'legal/cookies', element: <CookiePolicy /> },

      /* 404 */
      { path: '*', element: <NotFound /> },
    ],
  },
]);
