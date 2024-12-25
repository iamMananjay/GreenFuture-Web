import React, { useState, useEffect } from "react";
import {
  createEmployee,
  getEmployees,
  updateEmployeeStatus,
  deleteEmployee,
} from "../services/employeeService";

import { fetchAllJobs } from "../services/JobService"; // Assuming you have a service to fetch job designations

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    gender: "",
    userRole: "",
    status: "active",
    designationId: "", // New field to store the selected job designation
  });

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [jobDesignations, setJobDesignations] = useState([]); // State to store job designations

  // Fetch employees and job designations on component mount
  useEffect(() => {
    fetchEmployees();
    fetchJobDesignations(); // Fetch job designations
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees(); // Fetch all employees
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchJobDesignations = async () => {
    try {
      const data = await fetchAllJobs(); // Fetch job designations
      setJobDesignations(data);
    } catch (error) {
      console.error("Error fetching job designations:", error);
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
        gender: "",
        userRole: "",
        status: "active",
        designationId: "", // Reset designation field
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
      const updatedEmployeeData = {
        name: editingEmployee.name,
        email: editingEmployee.email,
        password: editingEmployee.password,
        contact: editingEmployee.contact,
        gender: editingEmployee.gender,
        userRole: editingEmployee.userRole,
        status: "active",
        designation: editingEmployee.designationId ? { id: editingEmployee.designationId } : null,
      };

      await updateEmployeeStatus(editingEmployee.id, updatedEmployeeData);

      setEditingEmployee(null);
      setShowForm(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      setEmployees(employees.filter((employee) => employee.id !== employeeId));
      fetchEmployees();
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const statusFilter =
      selectedStatus === "All" ||
      (selectedStatus === "Active" && employee.status === "active") ||
      (selectedStatus === "Inactive" && employee.status === "inactive");
    return statusFilter;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>

      <div className="mb-4 flex items-center">
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
                <li>Gender: {employee.gender}</li>
                <li>Status: {employee.status}</li>
                <li>
                  Designation:{" "}
                  {employee.designation
                    ? employee.designation.name
                    : "Not Assigned"}
                </li>
              </ul>

              <div className="flex justify-between mt-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditEmployee(employee)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
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
              onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
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
                    value={editingEmployee ? editingEmployee[field] : newEmployee[field]}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              ))}
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={editingEmployee ? editingEmployee.gender : newEmployee.gender}
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
                  value={editingEmployee ? editingEmployee.userRole : newEmployee.userRole}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Innovation Manager">Innovation Manager</option>
                  <option value="Regional IT Support">Regional IT Support</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="designationId" className="block text-gray-700 mb-2">
                  Job Designation (Optional)
                </label>
                <select
                  id="designationId"
                  name="designationId"
                  value={editingEmployee ? editingEmployee.designation?.id || "" : newEmployee.designationId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Designation</option>
                  {jobDesignations.map((designation) => (
                    <option key={designation.id} value={designation.id}>
                      {designation.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
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
                  {editingEmployee ? "Update" : "Add"} Employee
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
