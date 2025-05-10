import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase'; // Import Firebase authentication instance
import { useAuthState } from 'react-firebase-hooks/auth'; // Import Firebase hook to track authentication state

// PrivateRoute component to protect routes that require authentication
export default function PrivateRoute({ children }) {
    // Get the current user and loading state from Firebase authentication
    const [user, loading] = useAuthState(auth);
    // Show a loading message while the authentication state is being checked
    if (loading) {
        return <div>Loading...</div>;
    }
    // If the user is not authenticated, redirect them to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }
    // If the user is authenticated, render the children components
    return children;
}