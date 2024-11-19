import React, { useContext } from 'react';
import { ContextData } from './ContextProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(ContextData);

    if (loading) {
        return <div className="flex justify-center mt-36"><span className="loading loading-lg loading-infinity text-success"></span></div>;
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivateRoute;