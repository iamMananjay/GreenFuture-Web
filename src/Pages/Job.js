import React, { useEffect, useState } from "react";
import {
  fetchAllJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../services/JobService";

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({ name: "", salary: "" });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await fetchAllJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateJob(editId, job);
      } else {
        await createJob(job);
      }
      fetchJobs();
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleEdit = (job) => {
    setJob(job);
    setIsEditing(true);
    setEditId(job.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const resetForm = () => {
    setJob({ name: "", salary: "" });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Job Designations</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300 ease-in-out"
      >
        Add Job
      </button>
      <div className="mt-4">
        {jobs.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200 mt-4 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Salary (£)</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr
                  key={job.id}
                  className={index % 2 === 0 ? "bg-indigo-50" : "bg-teal-50"}
                >
                  <td className="border border-gray-300 px-4 py-2">{job.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{job.name}</td>
                  <td className="border border-gray-300 px-4 py-2">£{job.salary}</td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(job)}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-1 px-3 rounded hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="bg-gradient-to-r from-red-400 to-red-500 text-white py-1 px-3 rounded hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No jobs available.</p>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {isEditing ? "Edit Job" : "Add New Job"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={job.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Salary (£)</label>
                <input
                  type="number"
                  name="salary"
                  value={job.salary}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 transition-all duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-400 to-green-500 text-white py-1 px-3 rounded hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 transition-all duration-300 ease-in-out"
                >
                  {isEditing ? "Update Job" : "Create Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Job;
