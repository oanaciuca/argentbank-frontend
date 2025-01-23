import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    console.log("Vérification de l'authentification dans ProtectedRoute:", isAuthenticated);
  }, [isAuthenticated]); 

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children; 
};

export default ProtectedRoute;
