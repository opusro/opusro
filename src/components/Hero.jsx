import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10,
            background: 'radial-gradient(circle at center, #111 0%, #050505 100%)'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ marginBottom: '2rem' }}
            >
                <img src="/opusLogo.svg" alt="OPUS Logo" style={{ width: '150px', height: '150px' }} />
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
                    color: '#ffffff'
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
                    textTransform: 'uppercase'
                }}
            >
                Human Experience Design
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                    opacity: { delay: 2, duration: 1 },
                    y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    width: '2px',
                    height: '40px',
                    background: 'linear-gradient(to bottom, #fff, transparent)'
                }}
            />
        </section>
    );
};

export default Hero;
