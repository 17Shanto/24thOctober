import React, { useContext } from 'react';
import { ContextData } from './ContextProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(ContextData);

    if (loading) {
        return <span className="loading loading-spinner text-success"></span>;
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivateRoute;