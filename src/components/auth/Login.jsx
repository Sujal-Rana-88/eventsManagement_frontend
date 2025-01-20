import React, { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup } from './firebase'; // import Firebase Auth methods
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios'; // Import axios for making HTTP requests
import { FcGoogle } from "react-icons/fc"; // Import Google icon
import API_URLS from '../../config/urls';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate instead of history

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated, redirect to the dashboard
        navigate('/dashboard');
      }
    });

    // Clean up the listener on component unmount
    return unsubscribe;
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User logged in:', user);

      // Get the ID token after login
      const idToken = await user.getIdToken();

      // Store the user's email in localStorage
      localStorage.setItem('userEmail', user.email);
      
      // Send the ID token to your backend
      const response = await axios.post(API_URLS.LOGIN, {
        idToken: idToken,
      });
      localStorage.setItem('token', response.data.token);

      console.log('Response from backend:', response.data);

      // Redirect to the dashboard after successful login and backend processing
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Login to Your Account</h1>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-200 transition duration-300"
        >
          <FcGoogle className="mr-2" size={20} /> Login with Google
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
