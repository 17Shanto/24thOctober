import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
export const ContextData = createContext(null);
const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const userInfo = { user, setUser };
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