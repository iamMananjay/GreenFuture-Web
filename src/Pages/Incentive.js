import React, { useState, useEffect } from "react";
import { getAllIncentives, createIncentive, updateIncentive, deleteIncentive } from "../services/IncentiveService"; // Import individual functions
import { fetchTeams } from "../services/teamService"; // Import the fetchTeams function

const Incentive = () => {
  const [incentives, setIncentives] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editMode, setEditMode] = useState(false); // Track edit mode

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newIncentive, setNewIncentive] = useState({
    type: "Bonus", // Default incentive type
    amount: "",
    teamId: "", // Assuming this is the team ID for the incentive
  });
  const [selectedIncentive, setSelectedIncentive] = useState(null); // For updating an incentive

  // Fetch incentives and teams on component mount
  useEffect(() => {
    const fetchIncentivesAndTeams = async () => {
      try {
        // First fetch incentives
        const incentivesData = await getAllIncentives();
        setIncentives(incentivesData);

        // Fetch teams only if it's not already done
        if (teams.length === 0) {
          const teamsData = await fetchTeams();
          setTeams(teamsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchIncentivesAndTeams();
  }, [teams.length]); // Dependency array ensures teams are fetched only once

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncentive({ ...newIncentive, [name]: value });
  };

  const handleAddIncentive = async () => {
    try {
      if (editMode) {
        // Update existing incentive
        const updatedIncentive = {
          type: newIncentive.type,
          team: { id: newIncentive.teamId }, // Pass team ID correctly
          amount: newIncentive.amount,
        };

        // Call the updateIncentive function to update the incentive
        await updateIncentive(selectedIncentive.id, updatedIncentive); // Use the updateIncentive function

      } else {
        // Add new incentive
        const newIncentiveData = {
          type: newIncentive.type,
          team: { id: newIncentive.teamId }, // Pass team ID correctly
          amount: newIncentive.amount,
        };

        // Call the createIncentive function to create a new incentive
        await createIncentive(newIncentiveData);
      }

      // Fetch updated incentives after adding or updating
      const updatedIncentives = await getAllIncentives();
      setIncentives(updatedIncentives);

      // Reset form
      setNewIncentive({
        type: "Bonus", // Default incentive type
        amount: "",
        teamId: "",
      });

      setIsFormVisible(false);
      setEditMode(false);

    } catch (error) {
      console.error("Error creating/updating incentive:", error);
    }
  };

  const handleEditIncentive = (incentive) => {
    // Set selectedIncentive for editing
    setSelectedIncentive(incentive);
    setNewIncentive({
      type: incentive.type,
      amount: incentive.amount,
      teamId: incentive.team ? incentive.team.id : "", // Ensure teamId is set correctly
    });
    setEditMode(true); // Set edit mode
    setIsFormVisible(true);
  };

  const handleDeleteIncentive = async (id) => {
    try {
      await deleteIncentive(id); // Using the individual function
      setIncentives(incentives.filter((incentive) => incentive.id !== id));
    } catch (error) {
      console.error("Error deleting incentive:", error);
    }
  };

  const fetchTeamsList = async () => {
    try {
      const teamResponse = await fetchTeams(); // Ensure fetchTeams() is defined and imported
      setTeams(teamResponse);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incentives</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setIsFormVisible(!isFormVisible);
          if (!isFormVisible) {
            // Fetch teams and ideas when the form opens
            if (teams.length === 0) {
              fetchTeamsList();
            }
            setEditMode(false); // Reset edit mode
          }
        }}
      >
        {isFormVisible ? "Close Form" : "Add New Incentive"}
      </button>

      {isFormVisible && (
        <div className="bg-gray-100 p-4 rounded shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">
            {selectedIncentive ? "Edit Incentive" : "Add New Incentive"}
          </h2>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Incentive Type</label>
            <select
              name="type"
              value={newIncentive.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Bonus">Bonus</option>
              <option value="Reward">Reward</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Amount (£)</label>
            <input
              type="number"
              name="amount"
              value={newIncentive.amount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Team</label>
            <select
              name="teamId"
              value={newIncentive.teamId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Team</option>
              {teams.map((team, index) => (
                <option key={index} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddIncentive}
          >
            {selectedIncentive ? "Update Incentive" : "Add Incentive"}
          </button>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Incentive Type</th>
            <th className="border border-gray-300 p-2">Team</th>
            <th className="border border-gray-300 p-2">Amount (£)</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incentives.map((incentive) => (
            <tr key={incentive.id}>
              <td className="border border-gray-300 p-2">{incentive.id}</td>
              <td className="border border-gray-300 p-2">{incentive.type}</td>
              <td className="border border-gray-300 p-2">
                {incentive.team ? incentive.team.name : "No Team"}
              </td>
              <td className="border border-gray-300 p-2">{`£${incentive.amount}`}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleEditIncentive(incentive)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteIncentive(incentive.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Incentive;
