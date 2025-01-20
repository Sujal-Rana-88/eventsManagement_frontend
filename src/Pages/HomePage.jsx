import React from "react";
import { auth } from "./../components/auth/firebase";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import EventList from "../components/common/EventList";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/"); // Redirect to login screen
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">
          Welcome to the Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <EventList />
    </div>
  );
};

export default HomePage;
