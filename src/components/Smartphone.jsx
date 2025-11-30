import React from 'react';
import { motion } from 'framer-motion';

const Smartphone = ({ videoSrc, appIcon, appName }) => {
    return (
        <div style={{
            width: '320px',
            height: '640px',
            background: '#000',
            borderRadius: '40px',
            border: '4px solid #000000',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}>
            {/* Screen Content */}
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                {videoSrc ? (
                    <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#1a1a1a',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        {appIcon && <img src={appIcon} alt={appName} style={{ width: '80px', height: '80px', borderRadius: '16px', marginBottom: '1rem' }} />}
                        <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>{appName}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Smartphone;
