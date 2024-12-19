// const BASE_URL = 'http://your-backend-url/api'; // Replace with your backend URL

// const api = async (endpoint, method = 'GET', body = null, headers = {}) => {
//   const response = await fetch(`${BASE_URL}${endpoint}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : null,
//   });

//   return response; // Return the raw response to be handled in the service
// };

// export default api;

// services/api.js
export const BASE_URL =  'http://localhost:8080'; // Update with your actual backend URL


// Login API
export const LOGIN_URL = `${BASE_URL}/auth/login`;

// Employee API
export const EMPLOYEE_URL = `${BASE_URL}/api/employees`;

export const IDEA_URL = `${BASE_URL}/api/ideas`;
export const USER_DETAIL = `${BASE_URL}/auth/get-profile`;
export const TEAM_DETAIL = `${BASE_URL}/api/teams`;




// api.js

// Base URL for your API
// export const API_BASE_URL = 'https://api.example.com/ideas'; // Replace with your actual API base URL

// Utility function for making API requests
export const apiRequest = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// api.js




