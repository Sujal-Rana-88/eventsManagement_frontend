import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import HomePage from './Pages/HomePage';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      
      {/* Protect the /dashboard route */}
      <Route path="/dashboard" element={<PrivateRoute element={<HomePage />} />} />
    </Routes>
  );
}

export default App;
