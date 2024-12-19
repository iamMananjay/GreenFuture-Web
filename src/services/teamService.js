import {EMPLOYEE_URL ,IDEA_URL,TEAM_DETAIL } from '../api/api'; // Import the login API URL

// Fetch all teams
export const fetchTeams = async () => {
    try {
      const response = await fetch(TEAM_DETAIL);
      console.log(fetchTeams);
      if (!response.ok) throw new Error("Failed to fetch teams");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  


  export const fetchIdeas = async () => {
    try {
      const response = await fetch(IDEA_URL, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
      },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch ideas');
      }
  
      const data = await response.json();
  console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching ideas:', error);
      throw error;
    }
  };
  
  // Fetch all employees
  export const fetchEmployees = async () => {
    try {
      const response = await fetch(EMPLOYEE_URL);
      if (!response.ok) throw new Error("Failed to fetch employees");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Create a new team
  export const createTeam = async (teamData) => {
    console.log(teamData);
    try {
      const response = await fetch(TEAM_DETAIL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });
      if (!response.ok) throw new Error("Failed to create team");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  