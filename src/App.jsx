import React from 'react';
import HeroWithOpusLoop from './components/HeroWithOpusLoop';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import CynicalBackground from './components/backgrounds/CynicalBackground';
import AssnBackground from './components/backgrounds/AssnBackground';

// Placeholder components until they are implemented
const Placeholder = ({ text }) => <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #333' }}>{text}</div>;

function App() {
  return (
    <div className="app">
      <HeroWithOpusLoop />

      <ProductSection
        title="CyniCal"
        description="The brain was not designed to hold onto gift ideas for more than 48 hours. Yours especially."
        videoSrc="/samplevideo.mp4"
        appIcon="/appIcon.png"
        BackgroundComponent={CynicalBackground}
        comingSoonText="Coming soon"
        renderAction={() => (
          <form
            name="cynical-notify"
            method="POST"
            data-netlify="true"
            action="/success"
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '400px' }}
          >
            <input type="hidden" name="form-name" value="cynical-notify" />
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

      <ProductSection
        title="Anti-Social Social Network"
        description="You won't make new friends here. But you'll own the ones you have."
        appIcon="/appIcon.png"
        BackgroundComponent={AssnBackground}
        comingSoonText="Coming in Q2 2026"
        hidePhone={true}
        renderAction={() => (
          <form
            name="assn-notify"
            method="POST"
            data-netlify="true"
            action="/success"
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '400px' }}
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
