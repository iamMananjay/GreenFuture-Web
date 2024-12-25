import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const userRole = localStorage.getItem('role'); // Get user role from localStorage

  return (
    <div className="w-64 bg-green-600 text-white flex flex-col h-full p-6 shadow-md fixed top-16 left-0 z-10">
      <nav className="flex-1 p-4">
        <ul>
          {userRole !== 'Employee' && (
            <>
              <li className="mb-4">
                <NavLink
                  to="/dashboard/regions"
                  className="block p-2 hover:bg-green-700 rounded transition-colors"
                  activeClassName="bg-green-700"
                >
                  Regions
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/dashboard/job"
                  className="block p-2 hover:bg-green-700 rounded transition-colors"
                  activeClassName="bg-green-700"
                >
                  Job Designations
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/dashboard/employee"
                  className="block p-2 hover:bg-green-700 rounded transition-colors"
                  activeClassName="bg-green-700"
                >
                  Employee
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/dashboard/project"
                  className="block p-2 hover:bg-green-700 rounded transition-colors"
                  activeClassName="bg-green-700"
                >
                  Project
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/dashboard/incentive"
                  className="block p-2 hover:bg-green-700 rounded transition-colors"
                  activeClassName="bg-green-700"
                >
                  Incentive
                </NavLink>
              </li>
            </>
          )}

          {/* Always visible menu for everyone */}
          <li className="mb-4">
            <NavLink
              to="/dashboard/idea"
              className="block p-2 hover:bg-green-700 rounded transition-colors"
              activeClassName="bg-green-700"
            >
              Idea
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/dashboard/team"
              className="block p-2 hover:bg-green-700 rounded transition-colors"
              activeClassName="bg-green-700"
            >
              Team
            </NavLink>
          </li>

          
        </ul>
      </nav>

    
    </div>
  );
};

export default Sidebar;
