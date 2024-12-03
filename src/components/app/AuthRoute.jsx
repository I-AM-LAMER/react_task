import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuth } from './store'

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = useSelector(isAuth)

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

export default AuthRoute;