import React, { useState } from 'react';

const EmailSignupForm = ({ appName }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

            if (!scriptUrl) {
                throw new Error('Google Script URL not configured');
            }

            const response = await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors', // Google Apps Script requires this
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    app: appName,
                    source: 'website',
                    timestamp: new Date().toISOString()
                })
            });

            // With no-cors, we can't read the response, so we assume success
            setStatus('success');
            setMessage("You're on the list! We'll notify you when we launch.");
            setEmail('');

        } catch (error) {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
            console.error('Form submission error:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '100%',
                maxWidth: '400px'
            }}
        >
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading' || status === 'success'}
                style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: '1px solid #333',
                    background: status === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                    opacity: status === 'loading' || status === 'success' ? 0.6 : 1
                }}
            />

            <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                style={{
                    padding: '12px 30px',
                    background: status === 'success' ? '#4CAF50' : '#fff',
                    color: status === 'success' ? '#fff' : '#000',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
                    transition: 'transform 0.2s, background 0.3s',
                    width: '100%',
                    opacity: status === 'loading' ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                    if (status === 'idle' || status === 'error') {
                        e.target.style.transform = 'scale(1.02)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                }}
            >
                {status === 'loading' ? 'Submitting...' : status === 'success' ? '✓ Subscribed!' : 'Notify me'}
            </button>

            {message && (
                <p style={{
                    fontSize: '0.9rem',
                    color: status === 'success' ? '#4CAF50' : '#ff6b6b',
                    margin: 0,
                    textAlign: 'center'
                }}>
                    {message}
                </p>
            )}
        </form>
    );
};

export default EmailSignupForm;
