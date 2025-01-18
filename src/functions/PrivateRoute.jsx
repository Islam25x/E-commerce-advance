import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Comps/Context/AuthContext';

const PrivateRoute = ({ element: Component }) => {
    const { userName } = useAuth();

    return userName ? <Component /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
