import React, { useState } from "react";

const Project = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Clean Air Initiative",
      region: "Asia",
      team: "Team A",
      startDate: "2023-01-15",
      endDate: "2023-12-31",
      status: "Ongoing",
    },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    region: "",
    team: "",
    startDate: "",
    endDate: "",
    status: "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = () => {
    setProjects([...projects, { id: Date.now(), ...newProject }]);
    setNewProject({
      name: "",
      region: "",
      team: "",
      startDate: "",
      endDate: "",
      status: "Pending",
    });
    setIsFormVisible(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "Close Form" : "Add New Project"}
      </button>

      {isFormVisible && (
        <div className="bg-gray-100 p-4 rounded shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Project</h2>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Project Name</label>
            <input
              type="text"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Region</label>
            <select
              name="region"
              value={newProject.region}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Region</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="America">America</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Team</label>
            <input
              type="text"
              name="team"
              value={newProject.team}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={newProject.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">End Date</label>
            <input
              type="date"
              name="endDate"
              value={newProject.endDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Status</label>
            <select
              name="status"
              value={newProject.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddProject}
          >
            Submit
          </button>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Region</th>
            <th className="border border-gray-300 p-2">Team</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Start Date</th>
            <th className="border border-gray-300 p-2">End Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border border-gray-300 p-2">{project.name}</td>
              <td className="border border-gray-300 p-2">{project.region}</td>
              <td className="border border-gray-300 p-2">{project.team}</td>
              <td className="border border-gray-300 p-2">{project.status}</td>
              <td className="border border-gray-300 p-2">{project.startDate}</td>
              <td className="border border-gray-300 p-2">{project.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Project;
