import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import KiitLogo from '../../assets/images/kiit-logo.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const db = getFirestore();

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            let userRole = 'user';
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                if (userData.role) {
                    userRole = userData.role;
                } else {
                    console.warn(`No role found for user ${user.uid}. Defaulting to 'user'.`);
                }
            } else {
                console.warn(`No user document found for user ${user.uid}. Defaulting to 'user'.`);
            }

            console.log('Login successful, user role:', userRole);

            navigate('/dashboard', { state: { userRole: userRole } });

        } catch (error) {
            setError('Invalid email or password. Please try again.');
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#19c94a' }}>
            {/* Header Bar */}
            <div style={{
                background: 'white',
                color: '#19c94a',
                padding: '1rem 2rem',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                letterSpacing: '1px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
            }}>
                <img
                    src={KiitLogo}
                    alt="KIIT Logo"
                    style={{
                        height: '60px',
                        width: 'auto',
                    }}
                />
                <span>KALINGA INSTITUTE OF INDUSTRIAL TECHNOLOGY</span>
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
                    marginBottom: '1.5rem',
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
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