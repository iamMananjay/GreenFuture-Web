import React, { useState, useEffect } from "react";
import {
  fetchTeams,
  fetchIdeas,
  fetchEmployees,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../services/teamService";
import { FaVideo, FaComments } from "react-icons/fa"; // Importing icons

const TeamForm = () => {
  const [teams, setTeams] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTeamId, setEditTeamId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamData = await fetchTeams();
        setTeams(teamData);

        const ideaData = await fetchIdeas();
        setIdeas(ideaData);

        const employeeData = await fetchEmployees();
        setEmployees(employeeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewTeamName(e.target.value);
  };

  const handleIdeaChange = (e) => {
    setSelectedIdea(e.target.value);
  };

  const handleEmployeeSelect = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedMembers(selected);
  };

  const handleEditClick = (team) => {
    setNewTeamName(team.name);
    setSelectedIdea(team.idea.id.toString());
    setSelectedMembers(team.members.map((member) => member.id.toString()));
    setEditTeamId(team.id);
    setShowForm(true);
    setIsEditing(true);
  };

  const handleDeleteClick = async (teamId) => {
    try {
      await deleteTeam(teamId);
      const updatedTeams = await fetchTeams();
      setTeams(updatedTeams);
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamData = {
      name: newTeamName,
      idea: { id: selectedIdea },
      members: selectedMembers.map((memberId) => ({ id: memberId })),
    };

    try {
      if (isEditing) {
        await updateTeam(editTeamId, teamData);
      } else {
        await createTeam(teamData);
      }

      setShowForm(false);
      setNewTeamName("");
      setSelectedIdea("");
      setSelectedMembers([]);
      setEditTeamId(null);
      setIsEditing(false);

      const updatedTeams = await fetchTeams();
      setTeams(updatedTeams);
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  // Handle Google Meet video call and chat site
  const handleVideoClick = (teamName) => {
    const meetUrl = `https://meet.google.com/new`; // Open Google Meet
    window.open(meetUrl, "_blank");
  };

  const handleChatClick = (teamName) => {
    const chatUrl = `https://tawk.to/`; // Example of a free chat site
    window.open(chatUrl, "_blank");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>

      <div
        className="mb-6 p-4 rounded-lg shadow-md"
        style={{
          backgroundColor: "#f0f8ff",
          border: "1px solid #d1e7f3",
        }}
      >
        <h2 className="text-xl font-semibold mb-3">Existing Teams</h2>
        {teams.length > 0 ? (
          <ul className="list-disc pl-5 m-5 space-y-4">
            {teams.map((team, index) => (
              <li
                key={team.id}
                className={`mb-2 p-4 rounded-lg ${
                  index % 2 === 0 ? "bg-blue-100" : "bg-green-100"
                }`}
              >
                <strong>{team.name}</strong>
                <p>Idea: {team.idea.title}</p>
                <p>
                  Members:{" "}
                  {team.members.map((member) => member.name).join(", ")}
                </p>
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={() => handleEditClick(team)}
                    className="mr-2 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(team.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleVideoClick(team.name)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    <FaVideo className="inline mr-2" />
                    Video Call
                  </button>
                  <button
                    onClick={() => handleChatClick(team.name)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                  >
                    <FaComments className="inline mr-2" />
                    Chat
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No teams available.</p>
        )}
      </div>

      <button
        onClick={() => {
          setShowForm(true);
          setIsEditing(false);
          setNewTeamName("");
          setSelectedIdea("");
          setSelectedMembers([]);
        }}
        className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
      >
        Add Team
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Team" : "Add New Team"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newTeamName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="idea" className="block text-gray-700 mb-2">
                  Select Idea
                </label>
                <select
                  id="idea"
                  value={selectedIdea}
                  onChange={handleIdeaChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select an Idea</option>
                  {ideas.map((idea) => (
                    <option key={idea.id} value={idea.id}>
                      {idea.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="members" className="block text-gray-700 mb-2">
                  Select Members
                </label>
                <select
                  id="members"
                  multiple
                  value={selectedMembers}
                  onChange={handleEmployeeSelect}
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
                  {isEditing ? "Update Team" : "Create Team"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamForm;
