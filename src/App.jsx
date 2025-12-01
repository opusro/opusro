import React, { Suspense, lazy } from 'react';
import HeroWithOpusLoop from './components/HeroWithOpusLoop';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import EmailSignupForm from './components/EmailSignupForm';
import cynicalIcon from './assets/cynicalIcon.png';
import assnIcon from './assets/assnIcon.png';

// Lazy load heavy background components
const CynicalBackground = lazy(() => import('./components/backgrounds/CynicalBackground'));
const AssnBackground = lazy(() => import('./components/backgrounds/AssnBackground'));

// Loading fallback
const LoadingBackground = () => <div style={{ width: '100%', height: '100%', background: '#000' }} />;

// Placeholder components until they are implemented
const Placeholder = ({ text }) => <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #333' }}>{text}</div>;

function App() {
  return (
    <div className="app">
      <HeroWithOpusLoop />

      {/* CyniCal Section */}
      <ProductSection
        title="CyniCal"
        description="The brain was not designed to hold onto gift ideas for more than 48 hours. Yours especially."
        appIcon={cynicalIcon}
        BackgroundComponent={() => (
          <Suspense fallback={<LoadingBackground />}>
            <CynicalBackground />
          </Suspense>
        )}
        comingSoonText="Coming soon"
        hidePhone={true}
        renderAction={() => <EmailSignupForm appName="cynical" />}
      />

      {/* ASSN Section */}
      <ProductSection
        title="ass.network"
        description="anti-social social network"
        appIcon={assnIcon}
        BackgroundComponent={() => (
          <Suspense fallback={<LoadingBackground />}>
            <AssnBackground />
          </Suspense>
        )}
        comingSoonText="Coming in Q2 2026"
        hidePhone={true}
        renderAction={() => <EmailSignupForm appName="assn" />}
      />

      <Footer />
    </div>
  );
}

export default App;
