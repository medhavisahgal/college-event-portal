import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await signOut(auth);
                navigate('/login');
            } catch (error) {
                console.error('Logout error:', error);
                // Even if there's an error, redirect to login
                navigate('/login');
            }
        };

        performLogout();
    }, [navigate]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            background: '#f5f5f5'
        }}>
            <div style={{ 
                textAlign: 'center',
                padding: '2rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
                <h2 style={{ color: '#19c94a', marginBottom: '1rem' }}>Logging out...</h2>
                <p>Please wait while we sign you out.</p>
            </div>
        </div>
    );
} 