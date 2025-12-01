import React, { Suspense, lazy } from 'react';
import HeroWithOpusLoop from './components/HeroWithOpusLoop';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
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
        iconSrc={cynicalIcon}
        BackgroundComponent={() => (
          <Suspense fallback={<LoadingBackground />}>
            <CynicalBackground />
          </Suspense>
        )}
        comingSoonText="Coming soon"
        hidePhone={true}
        renderAction={() => (
          <form
            name="cynical-notify"
            method="POST"
            data-netlify="true"
            action="/success"
            style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '400px' }}
          >
            <input type="hidden" name="form-name" value="cynical-notify" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: '1px solid #333',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 30px',
                background: '#fff',
                color: '#000',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                width: '100%'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Notify me
            </button>
          </form>
        )}
      />

      {/* ASSN Section */}
      <ProductSection
        title="ass.network"
        description="anti-social social network"
        iconSrc={assnIcon}
        BackgroundComponent={() => (
          <Suspense fallback={<LoadingBackground />}>
            <AssnBackground />
          </Suspense>
        )}
        comingSoonText="Coming in Q2 2026"
        hidePhone={true}
        renderAction={() => (
          <form
            name="assn-notify"
            method="POST"
            data-netlify="true"
            action="/success"
            style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '400px' }}
          >
            <input type="hidden" name="form-name" value="assn-notify" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: '30px',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px 25px',
                borderRadius: '30px',
                border: 'none',
                background: '#fff',
                color: '#000',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Notify me
            </button>
          </form>
        )}
      />

      <Footer />
    </div>
  );
}

export default App;
