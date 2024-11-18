import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextData } from './ContextProvider';

const ProtectedHome = ({ children }) => {
    const { user } = useContext(ContextData); // Get user from your context

    // Redirect to home if user is logged in
    if (user) {
        return <Navigate to="/" />;
    }

    // Render children (e.g., login page) if not logged in
    return children;
};

export default ProtectedHome;