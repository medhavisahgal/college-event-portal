import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import KiitLogo from '../../assets/images/kiit-logo.png';

export default function Signup() {
  // State for form fields and feedback
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();

  // This function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    setError('');
    setLoading(true);

    // Only allow KIIT emails
    if (!email.endsWith('@kiit.ac.in')) {
      setError('Please use your KIIT university email address');
      setLoading(false);
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save extra info (name) in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email
      });

      // After signup, go to login page
      navigate('/login');
    } catch (error) {
      setError('Signup failed. Email may already be in use or password is too weak.');
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
          Create Account
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
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
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
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
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
            type="email"
            placeholder="KIIT Email"
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
            placeholder="Password"
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
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account?{' '}
          <span
            style={{ color: '#19c94a', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
