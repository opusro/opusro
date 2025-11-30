import React from 'react';
import { motion } from 'framer-motion';
import Smartphone from './Smartphone';

const ProductSection = ({
    title,
    description,
    buttonText,
    buttonLink,
    videoSrc,
    appIcon,
    BackgroundComponent,
    renderAction,
    comingSoonText
}) => {
    return (
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
            {/* Background Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                {BackgroundComponent && <BackgroundComponent />}
            </div>

            {/* Gradient Masks */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to bottom, #050505, transparent)', zIndex: 2 }}></div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to top, #050505, transparent)', zIndex: 2 }}></div>

            {/* Content Layer - Vertical Centered Layout */}
            <div className="container" style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '600px',
                gap: '2rem'
            }}>

                {/* Top Section: Icon + Title + Description */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{
                        textAlign: 'center',
                        padding: '2rem',
                        borderRadius: '20px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        width: '100%'
                    }}
                >
                    {appIcon && <img src={appIcon} alt={title} style={{ width: '80px', height: '80px', borderRadius: '16px', marginBottom: '1rem' }} />}
                    <h2 style={{ fontSize: '3rem', fontWeight: 600, color: '#ffffff', margin: '0 0 1rem 0' }}>{title}</h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#e0e0e0', margin: 0 }}>
                        {description}
                    </p>
                </motion.div>

                {/* Middle Section: Phone Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <Smartphone videoSrc={videoSrc} appIcon={appIcon} appName={title} />
                </motion.div>

                {/* Bottom Section: Coming Soon Text + Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{
                        textAlign: 'center',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    {comingSoonText && (
                        <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>{comingSoonText}</p>
                    )}

                    {renderAction ? renderAction() : (
                        buttonText && (
                            <a
                                href={buttonLink || '#'}
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 30px',
                                    background: '#fff',
                                    color: '#000',
                                    borderRadius: '30px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    transition: 'transform 0.2s',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                {buttonText}
                            </a>
                        )
                    )}
                </motion.div>

            </div>
        </section>
    );
};

export default ProductSection;
