import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom'; // For navigation
import { FaUserCircle } from 'react-icons/fa'; // Profile icon

const Dashboard = () => {
  const navigate = useNavigate(); // For programmatic navigation

  const handleProfileClick = () => {
    // Navigate to the Profile page when the Profile icon is clicked
    navigate('/dashboard/profile');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Navbar */}
        <div className="w-full bg-green-700 text-white flex justify-between items-center p-4 shadow-md fixed top-0 left-0 z-10">
          {/* Left side: Greenfuture Energy centered */}
          <div className="flex-grow text-center">
            <h2 className="text-3xl font-bold">Greenfuture Energy</h2>
          </div>

          {/* Right side: Profile Icon, Logout */}
          <div className="flex items-center space-x-6">
            {/* Profile Icon - Clicking redirects to /dashboard/profile */}
            <div
              className="relative cursor-pointer"
              onClick={handleProfileClick}
            >
              <FaUserCircle className="w-10 h-10 text-white" />
            </div>

            {/* Logout Button */}
            <button
              onClick={() => window.location.href = '/'}
              className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 mt-20">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Dashboard</h2>
          {/* Nested Routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
