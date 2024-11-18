import React, { createContext, useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import PropTypes from 'prop-types';
import app from '../firebase/firebase.init';
import { useNavigate } from 'react-router-dom';

export const ContextData = createContext(null);

const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);

    const handleSignOut = () => {
        setLoading(true);
        signOut(auth).then(() => {
            console.log("Sign Out SuccessFull");
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const userInfo = { user, setUser, loading, setLoading, handleSignOut };
    return (
        <ContextData.Provider value={userInfo}>
            {children}
        </ContextData.Provider>
    );
};

export default ContextProvider;

ContextProvider.PropTypes = {
    optionalNode: PropTypes.node,
}