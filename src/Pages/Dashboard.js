import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom'; // For nested routes

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar /> {/* Sidebar component */}

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Dashboard</h2>
        {/* Outlet for the nested routes (Regions, Employee, etc.) */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
