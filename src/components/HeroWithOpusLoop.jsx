```javascript
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import OpusLoopBackground from './backgrounds/OpusLoopBackground';
import Smartphone from './Smartphone';
import loopIcon from '../assets/loopIcon.png';

const HeroWithOpusLoop = () => {
    return (
        <section style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#050505',
            paddingBottom: '4rem'
        }}>
            {/* Continuous Spiral Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <OpusLoopBackground />
            </div>

            {/* Content Container */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: '1024px',
                padding: '0 2rem'
            }}>

                {/* Hero Content - Logo and Tagline */}
                <div style={{
                    minHeight: '70vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ marginBottom: '2rem' }}
                    >
                        <img src="/opusLogo.svg" alt="OPUS Logo" style={{ width: '120px', height: '120px' }} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        style={{
                            fontSize: '4rem',
                            fontWeight: 800,
                            letterSpacing: '0.05em',
                            textAlign: 'center',
                            color: '#ffffff',
                            margin: 0
                        }}
                    >
                        OPUS
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                        style={{
                            fontSize: '1.2rem',
                            fontWeight: 300,
                            marginTop: '1rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            textAlign: 'center'
                        }}
                    >
                        Human Experience Design
                    </motion.p>
                </div>

                {/* Opus Loop Content - Centered over spiral */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                    paddingTop: '4rem',
                    paddingBottom: '4rem',
                    width: '100%'
                }}>
                    {/* Top Section: Icon + Title + Description */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        style={{
                            textAlign: 'center',
                            width: '100%',
                            maxWidth: '800px'
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                            style={{ marginBottom: '2rem' }}
                        >
                            <img
                                src={loopIcon}
                                alt="Opus Loop Icon"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '18px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}
                            />
                        </motion.div>
                        <h2 style={{ fontSize: '3rem', fontWeight: 600, color: '#ffffff', margin: '0 0 1rem 0', textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.6)' }}>Opus Loop</h2>
                        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#e0e0e0', margin: 0, textShadow: '0 2px 16px rgba(0,0,0,0.8), 0 4px 32px rgba(0,0,0,0.6)' }}>
                            Your personal tool for your mindful moments. No subscription, no bloated library of content. Just your soundscapes and your mind.
                        </p>
                    </motion.div>

                    {/* Phone Mockup - Centered */}
                    {/* Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{
                            width: '100%',
                            maxWidth: '300px', // Reduced from 320px
                            margin: '0 auto'
                        }}
                    >
                        <Smartphone
                            videoSrc="/opusloop.mp4"
                            appIcon={loopIcon}
                            appName="Opus Loop"
                        />
                    </motion.div>

                    {/* Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <a
                            href="#"
                            style={{
                                display: 'inline-block',
                                padding: '12px 30px',
                                background: '#fff',
                                color: '#000',
                                borderRadius: '8px',
                                fontWeight: 600,
                                fontSize: '1rem',
                                transition: 'transform 0.2s',
                                textDecoration: 'none'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Download on the App Store
                        </a>
                        <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>Just $5 once. No subscription.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroWithOpusLoop;
