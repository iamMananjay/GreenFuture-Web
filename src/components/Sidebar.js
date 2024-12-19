import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Get the user's role from localStorage (assuming it's stored there)
  const userRole = localStorage.getItem('role'); // Replace with your logic to get the role

  const handleLogout = () => {
    // Logic to log out (e.g., clearing session or redirecting to login page)
    console.log("Logging out...");
    localStorage.removeItem('role'); // Remove the role from localStorage on logout
    window.location.href = '/'; // Redirect to the login page
  };

  return (
    <div className="w-64 bg-blue-500 text-white flex flex-col h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">Dashboard Menu</h2>
      <nav className="flex-1 p-4">
        <ul>
          {/* Show full menu if user is not an employee */}
          {userRole !== 'Employee' && (
            <>
              <li className="mb-4">
                <NavLink 
                  to="/dashboard/regions" 
                  className="block p-2 hover:bg-blue-600 rounded"
                  activeClassName="bg-blue-600"
                >
                  Regions
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink 
                  to="/dashboard/employee" 
                  className="block p-2 hover:bg-blue-600 rounded"
                  activeClassName="bg-blue-600"
                >
                  Employee
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink 
                  to="/dashboard/project" 
                  className="block p-2 hover:bg-blue-600 rounded"
                  activeClassName="bg-blue-600"
                >
                  Project
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink 
                  to="/dashboard/incentive" 
                  className="block p-2 hover:bg-blue-600 rounded"
                  activeClassName="bg-blue-600"
                >
                  Incentive
                </NavLink>
              </li>
            </>
          )}

          {/* Show Idea, Team, Profile, and Logout for everyone */}
          <li className="mb-4">
            <NavLink 
              to="/dashboard/idea" 
              className="block p-2 hover:bg-blue-600 rounded"
              activeClassName="bg-blue-600"
            >
              Idea
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink 
              to="/dashboard/team" 
              className="block p-2 hover:bg-blue-600 rounded"
              activeClassName="bg-blue-600"
            >
              Team
            </NavLink>
          </li>

          {/* Show Profile and Logout for everyone */}
          <li className="mb-4">
            <NavLink 
              to="/dashboard/profile" 
              className="block p-2 hover:bg-blue-600 rounded"
              activeClassName="bg-blue-600"
            >
              View Profile
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="mt-auto p-4 bg-blue-600 rounded-lg">
        <button
          onClick={handleLogout}
          className="block w-full p-2 text-left hover:bg-blue-700 rounded text-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
