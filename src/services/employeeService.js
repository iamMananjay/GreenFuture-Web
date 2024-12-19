import { EMPLOYEE_URL,USER_DETAIL } from '../api/api'; // Import the employee API URL
import axios from "axios";


// export const staticEmployees = [{ 
//   id: 1,
//   name: "Mananjay",
//   email: "ghjk",
//   password: "hjk",
//   contact: "hjkl",
//   region: "Asia",
//   gender: "Male",
//   status: "active", // Add status for active/inactive employees
//   userRole:'Admin'
// }];

// Fetch all employees
export const getEmployees = async () => {
  try {
    const response = await fetch(EMPLOYEE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    return await response.json(); // Return employee data

  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
export const  getYourProfile=async(token)=>{
  console.log(token);
  try{
      const response = await axios.get(USER_DETAIL, 
      {
          headers: {Authorization: `Bearer ${token}`}
      })
      return response.data;
  }catch(err){
      throw err;
  }
}

// Create a new employee
export const createEmployee = async (employeeData) => {
  console.log(`credentials: ${JSON.stringify(employeeData)}`);

  try {
    // Dynamic API call (uncomment when backend API is ready)
    const response = await fetch(EMPLOYEE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error("Failed to create employee");
    }

    return await response.json(); // Return created employee data

    // Simulate an API call delay (e.g., 1 second)
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate creating a new employee by adding to the static array
    // const newEmployee = {
    //   id: staticEmployees.length + 1, // Increment ID for new employee
    //   ...employeeData, // Include the provided employee data
    //   status: "active", // Set status as active by default
    // };

    // Add the new employee to the static array
    // staticEmployees.push(newEmployee);

    // Return the newly created employee
    // return newEmployee;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

// Update the status of an employee (active/inactive)
export const updateEmployeeStatus = async (employeeId, status) => {
  try {
    console.log("Updating status to:", employeeId);

    const response = await fetch(`${EMPLOYEE_URL}/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status ), // Pass the status in the request body
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract error details if available
      throw new Error(errorData.message || "Failed to update employee status");
    }

    const updatedEmployee = await response.json();
    console.log("Employee status updated successfully:", updatedEmployee);

    return updatedEmployee; // Return the updated employee data
  } catch (error) {
    console.error("Error updating employee status:", error.message);
    throw error; // Re-throw the error for further handling
  }
};


// Edit an employee's details
// export const editEmployee = async (employeeId, updatedData) => {
//   try {
//     // Simulate an API call delay (e.g., 1 second)
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     // Find the employee by ID and update their details
//     const employee = staticEmployees.find(emp => emp.id === employeeId);
//     if (employee) {
//       Object.assign(employee, updatedData); // Update the employee's details
//     }

//     return employee;
//   } catch (error) {
//     console.error("Error editing employee:", error);
//     throw error;
//   }
// };

// Delete an employee
export const deleteEmployee = async (employeeId) => {
  console.log(employeeId);
  try {
    // Dynamic API call (uncomment when backend API is ready)
    const response = await fetch(`${EMPLOYEE_URL}/${employeeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete employee");
    }

    getEmployees();
    return await response.json(); // Return confirmation of deletion

    // Simulate an API call delay (e.g., 1 second)
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // Find and remove the employee from the static array
    // const index = staticEmployees.findIndex(emp => emp.id === employeeId);
    // console.log(index)
    // if (index !== -1) {
    //   staticEmployees.splice(index, 1); // Remove the employee from the array
    // }

    // return { message: "Employee deleted successfully" };
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
