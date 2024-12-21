import React, { useState, useEffect } from "react";
import {
  getAllRegions,
  createRegion,
  updateRegion,
  deleteRegion,
} from "../services/regionService";
import { getEmployees } from "../services/employeeService";

const RegionComponent = () => {
  const [regions, setRegions] = useState([]);
  const [employees, setEmployees] = useState([]); 
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newRegionName, setNewRegionName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [editingRegionId, setEditingRegionId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regionData = await getAllRegions();
        setRegions(regionData);

        const employeeData = await getEmployees();
        setEmployees(employeeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewRegionName(e.target.value);
  };

  const handleMemberSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedMembers(selected);
  };

  const handleEdit = (region) => {
    setIsEditing(true);
    setEditingRegionId(region.id);
    setNewRegionName(region.name);
    setSelectedMembers(region.members.map((member) => member.id));
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regionData = {
      name: newRegionName,
      members: selectedMembers.map((memberId) => ({ id: memberId })),
    };

    try {
      if (isEditing) {
        await updateRegion(editingRegionId, regionData);
      } else {
        await createRegion(regionData);
      }

      setShowForm(false);
      setIsEditing(false);
      setNewRegionName("");
      setSelectedMembers([]);

      const updatedRegions = await getAllRegions();
      setRegions(updatedRegions);
    } catch (error) {
      console.error("Error submitting region:", error);
    }
  };

  const handleDelete = async (regionId) => {
    try {
      await deleteRegion(regionId);
      setRegions((prevRegions) => prevRegions.filter((region) => region.id !== regionId));
    } catch (error) {
      console.error("Error deleting region:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Regions</h1>
      {regions.length > 0 ? (
        <ul className="list-disc pl-5 m-5 space-y-4">
          {regions.map((region, index) => (
            <li
              key={region.id}
              className={`mb-2 p-4 rounded-lg ${
                index % 2 === 0 ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              <strong>{region.name}</strong>
              <p>
                Members:{" "}
                {region.members.map((member) => member.name).join(", ")}
              </p>
              <button
                onClick={() => handleEdit(region)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(region.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No regions available.</p>
      )}

      <button
        onClick={() => setShowForm(true)}
        className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
      >
        Add Region
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Region" : "Add New Region"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Region Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newRegionName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="members" className="block text-gray-700 mb-2">
                  Select Members
                </label>
                <select
                  id="members"
                  multiple
                  value={selectedMembers}
                  onChange={handleMemberSelect}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                >
                  {isEditing ? "Update Region" : "Create Region"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionComponent;
