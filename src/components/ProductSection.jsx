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
    renderAction, // Custom action renderer
    align = 'left' // 'left' or 'right' for text alignment
}) => {
    return (
        <section style={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 0'
        }}>
            {/* Background Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <BackgroundComponent />
                {/* Gradient Masks for smooth blending */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to bottom, #050505, transparent)', zIndex: 2 }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to top, #050505, transparent)', zIndex: 2 }}></div>
            </div>

            {/* Content Layer */}
            <div className="container" style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'row', // Default to row for desktop
                flexWrap: 'wrap', // Allow wrapping for mobile
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                gap: '4rem'
            }}>

                {/* Mockup - Front and Center */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        order: 1, // Always first visually
                        minWidth: '320px'
                    }}
                >
                    <Smartphone videoSrc={videoSrc} appIcon={appIcon} appName={title} />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{
                        flex: 1,
                        minWidth: '300px',
                        textAlign: 'left',
                        order: 2,
                        padding: '0 1rem' // Added padding for mobile
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        {appIcon && <img src={appIcon} alt={title} style={{ width: '80px', height: '80px', borderRadius: '16px', marginBottom: '1rem' }} />}
                        <h2 style={{ fontSize: '3rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>{title}</h2>
                    </div>

                    <p style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem', color: '#e0e0e0' }}>
                        {description}
                    </p>

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
                                    transition: 'transform 0.2s'
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
