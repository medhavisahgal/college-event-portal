import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if (!email.endsWith('@kiit.ac.in')) {
            setError('Please use your KIIT university email address');
            setLoading(false);
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');
            navigate('/create');
        } catch (error) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            {/* Header Bar */}
            <div style={{
                background: '#19c94a',
                color: 'white',
                padding: '1rem 0',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                letterSpacing: '1px'
            }}>
                KALINGA INSTITUTE OF INDUSTRIAL TECHNOLOGY
            </div>

            {/* Login Card */}
            <div style={{
                maxWidth: 400,
                margin: '40px auto',
                background: 'white',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                padding: '2rem'
            }}>
                <h2 style={{
                    color: '#19c94a',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    fontWeight: 'bold'
                }}>
                    KIIT Event Portal
                </h2>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div style={{
                            background: '#fee2e2',
                            color: '#b91c1c',
                            border: '1px solid #ef4444',
                            borderRadius: 4,
                            padding: '0.75rem',
                            marginBottom: '1rem'
                        }}>
                            {error}
                        </div>
                    )}
                    <input
                        type="email"
                        placeholder="Enter your KIIT email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            marginBottom: '1rem',
                            border: '1px solid #d1d5db',
                            borderRadius: 4
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            marginBottom: '1rem',
                            border: '1px solid #d1d5db',
                            borderRadius: 4
                        }}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            background: loading ? '#a7e9c2' : '#19c94a',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    New user?{' '}
                    <span
                        style={{ color: '#19c94a', cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => navigate('/signup')}
                    >
                        Signup
                    </span>
                </div>
            </div>
        </div>
    );
}