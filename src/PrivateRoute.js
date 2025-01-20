import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './components/auth/firebase'; // Assuming this is your Firebase auth object

const PrivateRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set the user on state change
      setLoading(false); // Set loading to false after checking auth state
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  // Show loading spinner or placeholder until authentication state is determined
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user is logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/" />;
  }

  // If user is logged in, render the protected component
  return element;
};

export default PrivateRoute;
