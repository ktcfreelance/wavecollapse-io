import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

/* ── Lazy Pages — Institutional Landing ── */
const InstitutionalLanding = lazy(() => import('./pages/Home/InstitutionalLanding'));

/* ── Solutions ── */
const OnboardingIntake = lazy(() => import('./pages/Solutions/OnboardingIntake'));
const Settlement = lazy(() => import('./pages/Solutions/Settlement'));
const RwaTokenization = lazy(() => import('./pages/Solutions/RwaTokenization'));

/* ── Protocol ── */
const RedundantEquivalency = lazy(() => import('./pages/Protocol/RedundantEquivalency'));
const Iso20022 = lazy(() => import('./pages/Protocol/Iso20022'));
const X402 = lazy(() => import('./pages/Protocol/X402'));
const Changelog = lazy(() => import('./pages/Protocol/Changelog'));

/* ── Build ── */
const NodeWizardHome = lazy(() => import('./pages/Build/NodeWizard'));
const ComplianceSandbox = lazy(() => import('./pages/Build/ComplianceSandbox'));
const TypescriptSDK = lazy(() => import('./pages/Build/TypescriptSDK'));
const ApiReference = lazy(() => import('./pages/Build/ApiReference'));

/* ── Governance ── */
const ProtocolEconomics = lazy(() => import('./pages/Governance/ProtocolEconomics'));
const ValidatorPortal = lazy(() => import('./pages/Governance/ValidatorPortal'));
const Audits = lazy(() => import('./pages/Governance/Audits'));
const DaoProposals = lazy(() => import('./pages/Governance/DaoProposals'));

/* ── Company ── */
const About = lazy(() => import('./pages/Company/About'));
const Contact = lazy(() => import('./pages/Company/Contact'));
const Press = lazy(() => import('./pages/Company/Press'));
const Careers = lazy(() => import('./pages/Company/Careers'));

/* ── Trust Hub ── */
const SimulationReport = lazy(() => import('./pages/TrustHub/SimulationReport'));

/* ── Legal ── */

const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/Legal/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/Legal/CookiePolicy'));

/* ── Catch-all ── */
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home */}
          <Route index element={<InstitutionalLanding />} />

          {/* Solutions */}
          <Route path="solutions/intake"      element={<OnboardingIntake />} />
          <Route path="solutions/settlement"  element={<Settlement />} />
          <Route path="solutions/rwa"         element={<RwaTokenization />} />

          {/* Protocol */}
          <Route path="protocol/equivalency" element={<RedundantEquivalency />} />
          <Route path="protocol/iso20022"    element={<Iso20022 />} />
          <Route path="protocol/x402"        element={<X402 />} />
          <Route path="protocol/changelog"   element={<Changelog />} />

          {/* Build */}
          <Route path="build/node-wizard"              element={<NodeWizardHome />} />
          <Route path="build/node-wizard/*"             element={<Navigate to="/build/node-wizard" replace />} />
          <Route path="build/sandbox"                  element={<ComplianceSandbox />} />
          <Route path="build/sdk"                      element={<TypescriptSDK />} />
          <Route path="build/api"                      element={<ApiReference />} />

          {/* Governance */}
          <Route path="governance/economics"  element={<ProtocolEconomics />} />
          <Route path="governance/validators" element={<ValidatorPortal />} />
          <Route path="governance/audits"     element={<Audits />} />
          <Route path="governance/proposals"  element={<DaoProposals />} />

          {/* Company */}
          <Route path="about"    element={<About />} />
          <Route path="contact"  element={<Contact />} />
          <Route path="press"    element={<Press />} />
          <Route path="careers"  element={<Careers />} />

          {/* Trust Hub */}
          <Route path="trust/simulation" element={<SimulationReport />} />
          <Route path="trust/sec17a4" element={
            <InstitutionalGate
              title="SEC Rule 17a-4 Compliance Memo"
              description="This document details WaveCollapse's Software-Defined WORM architecture and its alignment with SEC Rule 17a-4 record retention requirements. Access is restricted to credentialed institutional partners."
              classification="RESTRICTED — INSTITUTIONAL ONLY"
            />
          } />

          {/* Legal */}
          <Route path="legal" element={
            <InstitutionalGate
              title="Regulatory Disclosures"
              description="WaveCollapse regulatory positioning, GENIUS Act compliance strategy, and Technology Provider status documentation. Access is restricted to credentialed institutional partners."
              classification="RESTRICTED — INSTITUTIONAL ONLY"
            />
          } />
          <Route path="legal/privacy"    element={<PrivacyPolicy />} />
          <Route path="legal/terms"      element={<TermsOfService />} />
          <Route path="legal/cookies"    element={<CookiePolicy />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
