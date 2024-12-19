// // // services/loginService.js
// // import { LOGIN_URL } from '../api/api'; // Import the login API URL

// // // Login API call
// // export const loginUser = async (credentials) => {
// //     // console.log(`credentials: ${JSON.stringify(credentials)}`);

// //   try {
// //     const response = await fetch(LOGIN_URL, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(credentials),
// //     });
// //     // const response = { ok: true, json: async () => ({ token: 'fake-token' }) };

// //     console.log(response);
// //     if (!response.ok) {
// //       throw new Error("Failed to log in");
// //     }

// //     // Parse the JSON response correctly
// //     const data = await response.json();
// //     console.log("Login response:", data); // Log the response to check the message

// //     return data; // Return the JSON response, which contains the message

// //     // return await response.json(); // Return login response (e.g., token, user data)
// //   } catch (error) {
// //     console.error("Error logging in:", error);
// //     throw error;
// //   }
// // };

// // services/authService.js
// // import { LOGIN_URL } from '../api/api'; // Import the login API URL

// // Login API call
// // export const loginUser = async (credentials) => {
// //   console.log(credentials);
// //   try {
// //     const response = await fetch(LOGIN_URL, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(credentials),
// //       credentials: "include", // Important for session cookies
// //     });

// //     if (!response.ok) {
// //       throw new Error("Failed to log in");
// //     }

// //     const data = await response.text(); // Parse response as text (for session-based success messages)
// //     console.log("Login response:", data);

// //     return data; // Return success message
// //   } catch (error) {
// //     console.error("Error logging in:", error);
// //     throw error;
// //   }
// // };

// // services/loginService.js
import { LOGIN_URL } from '../api/api'; // Import the login API URL

// // Login API call
// export const loginUser = async (credentials) => {
//   console.log(credentials)
//   try {
//     const response = await fetch(LOGIN_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(credentials),
//       credentials: "include", // Important for session cookies if needed
//     });

//     if (!response.ok) {
//       throw new Error("Failed to log in");
//     }

//     // Assuming the backend returns a token or a success message
//     const data = await response.json(); // Parse the response as JSON
//     console.log("Login response:", data); // Log the response to check

//     // Store the token in localStorage (or sessionStorage) for future requests
//     if (data.token) {
//       localStorage.setItem("authToken", data.token);
//     }

//     return data; // Return the data (e.g., token or user data)
//   } catch (error) {
//     console.error("Error logging in:", error);
//     throw error;
//   }
// };

// export const loginUser = async (credentials) => {
//   console.log(credentials);
//   try {
//     const response = await fetch(LOGIN_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(credentials),
//       // Remove credentials: "include" since you're using JWT, not session cookies
//     });

//     if (!response.ok) {
//       throw new Error("Failed to log in");
//     }
//     return response;


//     // Assuming the backend returns a token or a success message
//     // const data = await response.json(); // Parse the response as JSON
//     // console.log("Login response:", data); // Log the response to check

//     // Store the token in localStorage (or sessionStorage) for future requests
//     // if (data.token) {
//     //   localStorage.setItem("authToken", data.token);
//     // }

//     // return data; // Return the data (e.g., token or user data)
//   } catch (error) {
//     console.error("Error logging in:", error);
//     throw error;
//   }
// };

export const loginUser = async (credentials) => {
  try {
      const response = await fetch(LOGIN_URL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
      });

      if (!response.ok) {
          throw new Error("Failed to log in");
      }

      return await response.json(); // Here you should return the response data as is
  } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Rethrow the error so that it can be handled in the component
  }
};




