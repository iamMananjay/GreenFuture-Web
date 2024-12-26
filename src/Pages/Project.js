import React, { useState, useEffect } from "react";
import { getProjects, addProject, deleteProject } from "../services/projectService";
import { fetchIdeas } from "../services/ideaService";
import { fetchTeams } from "../services/teamService";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false); // Track edit mode
  const [editProjectId, setEditProjectId] = useState(null); // Store ID of the project being edited
  const [newProject, setNewProject] = useState({
    name: "",
    team: "",
    idea: "",
    stage: "Pending",
  });

  const [teams, setTeams] = useState([]);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjectsData();
  }, []);

  const fetchTeamsAndIdeas = async () => {
    try {
      const teamResponse = await fetchTeams();
      const ideaResponse = await fetchIdeas();
      setTeams(teamResponse);
      setIdeas(ideaResponse);
    } catch (error) {
      console.error("Error fetching teams or ideas:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddOrUpdateProject = async () => {
    try {
      if (editMode) {
        // Update existing project
        const updatedProject = {
          id: editProjectId,
          name: newProject.name,
          team: { id: newProject.team },
          idea: { id: newProject.idea },
          stage: newProject.stage,
        };

        await addProject(updatedProject); // Replace with updateProject API call
      } else {
        // Add new project
        const projectData = {
          name: newProject.name,
          team: { id: newProject.team },
          idea: { id: newProject.idea },
          stage: newProject.stage,
        };

        await addProject(projectData);
      }

      // Fetch updated projects
      const updatedProjects = await getProjects();
      setProjects(updatedProjects);

      // Reset form
      setNewProject({
        name: "",
        team: "",
        idea: "",
        stage: "Pending",
      });

      setIsFormVisible(false);
      setEditMode(false);
      setEditProjectId(null);
    } catch (error) {
      console.error("Error adding or updating project:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEditProject = (project) => {
    setNewProject({
      name: project.name,
      team: project.team?.id || "",
      idea: project.idea?.id || "",
      stage: project.stage,
    });
    setEditMode(true); // Set edit mode
    setEditProjectId(project.id); // Store the ID of the project being edited
    setIsFormVisible(true); // Open the form
  };

  return (
    <div className=" p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Projects</h1>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mb-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => {
          setIsFormVisible(!isFormVisible);
          if (!isFormVisible) {
            fetchTeamsAndIdeas(); // Fetch teams and ideas when the form opens
            setEditMode(false); // Reset edit mode
            setEditProjectId(null); // Reset edit project ID
          }
        }}
      >
        {isFormVisible ? "Close Form" : "Add New Project"}
      </button>

      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            {editMode ? "Edit Project" : "Add New Project"}
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
            <input
              type="text"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Team</label>
            <select
              name="team"
              value={newProject.team}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Team</option>
              {teams.map((team, index) => (
                <option key={index} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Idea</label>
            <select
              name="idea"
              value={newProject.idea}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Idea</option>
              {ideas.map((idea, index) => (
                <option key={index} value={idea.id}>
                  {idea.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Status</label>
            <select
              name="stage"
              value={newProject.stage}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={handleAddOrUpdateProject}
          >
            {editMode ? "Update Project" : "Submit"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Team</th>
              <th className="p-3 border border-gray-300">Idea</th>
              <th className="p-3 border border-gray-300">Status</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="p-3 border border-gray-300">{project.name}</td>
                <td className="p-3 border border-gray-300">{project.team?.name || "No Team"}</td>
                <td className="p-3 border border-gray-300">{project.idea?.title || "No Idea"}</td>
                <td className="p-3 border border-gray-300">{project.stage}</td>
                <td className="p-3 border border-gray-300">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onClick={() => handleEditProject(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Project;
