import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

const ProtectedRoute = ({ children }) => {
    const { userDetail } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, []);


    if (isLoading) {
        return <Loading/>
    }


    if (!userDetail) {
        return <Navigate to="/login" replace />;
    }


    return <>{children}</>;
};


ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;