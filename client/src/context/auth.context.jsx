import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [userDetail, setUserDetails] = useState(() => {

        const storedUser = localStorage.getItem("userDetail");
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const contextValue = useMemo(() => ({
        userDetail,
        setUserDetails,

        logout: () => {
            setUserDetails(null);
            localStorage.removeItem("userDetail");
        },

        isAuthenticated: !!userDetail
    }), [userDetail]);

    useEffect(() => {
        if (userDetail) {
            localStorage.setItem("userDetail", JSON.stringify(userDetail));
        } else {
            localStorage.removeItem("userDetail");
        }
    }, [userDetail]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Add prop type validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};