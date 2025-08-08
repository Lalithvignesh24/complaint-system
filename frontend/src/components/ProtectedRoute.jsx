import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token'); // Use 'token' for consistency

    if (!token) {
        // If no token, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If token exists, render the component
    return children;
}

export default ProtectedRoute;