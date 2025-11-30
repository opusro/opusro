import React from 'react';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import OpusLoopBackground from './components/backgrounds/OpusLoopBackground';
import CynicalBackground from './components/backgrounds/CynicalBackground';
import AssnBackground from './components/backgrounds/AssnBackground';

// Placeholder components until they are implemented
const Placeholder = ({ text }) => <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #333' }}>{text}</div>;

function App() {
  return (
    <div className="app">
      <Hero />

      <ProductSection
        title="Opus Loop"
        description="Your personal tool for your mindful moments. No subscription, no bloated library of content. Just your soundscapes and your mind."
        buttonText="Buy for $5 on App Store"
        buttonLink="#"
        videoSrc="/samplevideo.mp4"
        appIcon="/appIcon.png"
        BackgroundComponent={OpusLoopBackground}
      />

      <ProductSection
        title="CyniCal"
        description="The brain was not designed to hold onto gift ideas for more than 48 hours. Yours especially."
        videoSrc="/samplevideo.mp4"
        appIcon="/appIcon.png"
        BackgroundComponent={CynicalBackground}
        comingSoonText="Coming soon"
        renderAction={() => (
          <form name="cynical-notify" method="POST" data-netlify="true" style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px' }}>
            <input type="hidden" name="form-name" value="cynical-notify" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              style={{
                flex: 1,
                padding: '12px 20px',
                borderRadius: '30px',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 25px',
                borderRadius: '30px',
                border: 'none',
                background: '#fff',
                color: '#000',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
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
        videoSrc="/samplevideo.mp4"
        appIcon="/appIcon.png"
        BackgroundComponent={AssnBackground}
        comingSoonText="Coming in Q2 2026"
        renderAction={() => (
          <button
            disabled
            style={{
              padding: '12px 30px',
              background: '#333',
              color: '#888',
              borderRadius: '30px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'not-allowed',
              border: 'none'
            }}
          >
            ass.network
          </button>
        )}
      />

      <Footer />
    </div>
  );
}

export default App;
