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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">User Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              />
            ) : (
              <p className="text-lg text-gray-800">{user.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              />
            ) : (
              <p className="text-lg text-gray-800">{user.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Role</label>
            {isEditing ? (
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              />
            ) : (
              <p className="text-lg text-gray-800">{user.role}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Contact</label>
            {isEditing ? (
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              />
            ) : (
              <p className="text-lg text-gray-800">{user.contact}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Gender</label>
            {isEditing ? (
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              />
            ) : (
              <p className="text-lg text-gray-800">{user.gender}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Status</label>
            {isEditing ? (
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              />
            ) : (
              <p className="text-lg text-gray-800">{user.status}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
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
