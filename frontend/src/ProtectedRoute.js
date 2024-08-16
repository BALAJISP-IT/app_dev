import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import LoginContext from './context';

// Component to protect routes
const ProtectedRoute = ({ children }) => {
  const [user,setUser] = useContext(LoginContext);

  // If user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the child components
  return children;
};

export default ProtectedRoute;
