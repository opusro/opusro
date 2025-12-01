import React from 'react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <footer style={{
            padding: '4rem 2rem',
            background: '#050505',
            color: '#666',
            textAlign: 'center',
            borderTop: '1px solid #111'
        }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

                {/* Company Info */}
                <div>
                    <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>OPUS</h3>
                    <p style={{ fontSize: '0.9rem' }}>Human Experience Design</p>
                </div>

                {/* Social Links */}
                <div style={{ display: 'flex', gap: '2rem', fontSize: '1.5rem' }}>
                    <a href="https://www.instagram.com/opus.ro" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '1.5rem', transition: 'color 0.3s' }}>
                        <FaInstagram />
                    </a>
                    <a href="https://www.youtube.com/@opusro" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '1.5rem', transition: 'color 0.3s' }}>
                        <FaYoutube />
                    </a>
                    <a href="mailto:hello@opus.ro" style={{ color: '#fff', fontSize: '1.5rem', transition: 'color 0.3s' }}>
                        <MdEmail />
                    </a>
                </div>

                {/* Made with Love */}
                <div style={{ fontSize: '0.8rem', marginTop: '2rem', opacity: 0.6 }}>
                    With ❤️ from Romania
                </div>
                <div style={{ fontSize: '0.8rem', marginTop: '2rem', opacity: 0.6 }}>
                    Copyright © {new Date().getFullYear()} OPUSCULUM SRL. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
