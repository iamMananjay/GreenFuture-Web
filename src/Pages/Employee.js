import React, { useState, useEffect } from "react";
import {
  createEmployee,
  getEmployees,
  updateEmployeeStatus,
  deleteEmployee,
} from "../services/employeeService";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    region: "",
    gender: "",
    userRole: "",
    status: "active",
  });
  const [regions] = useState(["Asia", "Europe", "Africa", "Americas", "Oceania"]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees(); // Fetch all employees
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingEmployee) {
      setEditingEmployee({ ...editingEmployee, [name]: value });
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(newEmployee); // Create a new employee via service
      setShowForm(false);
      setNewEmployee({
        name: "",
        email: "",
        password: "",
        contact: "",
        region: "",
        gender: "",
        userRole: "",
        status: "active",
      });
      fetchEmployees(); // Refresh employee list
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee); // Set employee data for editing
    setShowForm(true);
  };
  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    try {
      // Prepare the data object with only the required fields
      const updatedEmployeeData = {
        name: editingEmployee.name,
        email: editingEmployee.email,
        password: editingEmployee.password, // Include password if necessary
        contact: editingEmployee.contact,
        region: editingEmployee.region,
        gender: editingEmployee.gender,
        userRole: editingEmployee.userRole,
        status: "active", // Include status if needed
      };
  
      // Call the service function with the formatted data
      await updateEmployeeStatus(editingEmployee.id, updatedEmployeeData);
  
      // Reset the state and refresh the employee list
      setEditingEmployee(null);
      setShowForm(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId); // Delete employee
      setEmployees(employees.filter((employee) => employee.id !== employeeId)); // Update state immediately
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Filter employees based on selected region and status
  const filteredEmployees = employees.filter((employee) => {
    const regionFilter =
      selectedRegion === "All" || employee.region === selectedRegion;
    const statusFilter =
      selectedStatus === "All" ||
      (selectedStatus === "Active" && employee.status === "active") ||
      (selectedStatus === "Inactive" && employee.status === "inactive");
    return regionFilter && statusFilter;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>

      <div className="mb-4 flex items-center">
        <label className="mr-2">Filter by Region:</label>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mr-4"
        >
          <option value="All">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <label className="mr-2">Filter by Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {filteredEmployees.length === 0 ? (
        <p className="text-red-500">No employees found.</p>
      ) : (
        <div className="space-y-4">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className={`border p-4 rounded-lg ${
                employee.status === "inactive" ? "bg-gray-200" : ""
              }`}
            >
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <ul className="list-disc pl-6">
                <li>Email: {employee.email}</li>
                <li>Contact: {employee.contact}</li>
                <li>Region: {employee.region}</li>
                <li>Gender: {employee.gender}</li>
                <li>Status: {employee.status}</li>
              </ul>

              <div className="flex justify-between mt-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditEmployee(employee)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          setShowForm(true);
          setEditingEmployee(null);
        }}
        className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
      >
        Add Employee
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h2>
            <form
              onSubmit={
                editingEmployee ? handleUpdateEmployee : handleAddEmployee
              }
            >
              {["name", "email", "password", "contact"].map((field) => (
                <div className="mb-4" key={field}>
                  <label
                    htmlFor={field}
                    className="block text-gray-700 mb-2 capitalize"
                  >
                    {field}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    id={field}
                    name={field}
                    value={
                      editingEmployee
                        ? editingEmployee[field]
                        : newEmployee[field]
                    }
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              ))}
              <div className="mb-4">
                <label htmlFor="region" className="block text-gray-700 mb-2">
                  Region
                </label>
                <select
                  id="region"
                  name="region"
                  value={
                    editingEmployee ? editingEmployee.region : newEmployee.region
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={
                    editingEmployee ? editingEmployee.gender : newEmployee.gender
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="userRole" className="block text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="userRole"
                  name="userRole"
                  value={
                    editingEmployee
                      ? editingEmployee.userRole
                      : newEmployee.userRole
                  }
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Innovation Manager">Innovation Manager</option>
                  <option value="Regional IT Support">
                    Regional IT Support
                  </option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  {editingEmployee ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
