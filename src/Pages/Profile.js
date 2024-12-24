import React, { useState, useEffect } from 'react';
import { getYourProfile } from "../services/employeeService"; // Assuming you have this service to get employee data

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    contact: '',
    gender: '',
    status: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  // Fetch user profile data (this can be the logged-in user's employee data)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response = await getYourProfile(token);

        setUser({
          name: response.users.name,
          email: response.users.email,
          role: response.users.userRole,
          contact: response.users.contact,
          gender: response.users.gender,
          status: response.users.status,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-semibold">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            ) : (
              <p className="text-lg">{user.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            ) : (
              <p className="text-lg">{user.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">Role</label>
            {isEditing ? (
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            ) : (
              <p className="text-lg">{user.role}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">Contact</label>
            {isEditing ? (
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            ) : (
              <p className="text-lg">{user.contact}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">Gender</label>
            {isEditing ? (
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            ) : (
              <p className="text-lg">{user.gender}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold">Status</label>
            {isEditing ? (
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            ) : (
              <p className="text-lg">{user.status}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
