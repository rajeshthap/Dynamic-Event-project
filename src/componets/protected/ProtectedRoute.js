// src/components/auth/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path to your AuthContext

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // If auth is still loading (checking localStorage), you can show a spinner or nothing
  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated spinner component
  }

  // If the user is not authenticated, redirect them to the /login page,
  // but save the current location they were trying to go to.
  // This allows us to send them to the dashboard after they log in.
  if (!isAuthenticated) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the child component (the protected page)
  return children;
};

export default ProtectedRoute;