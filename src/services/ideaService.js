import { IDEA_URL } from '../api/api';


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
    return data;
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
};


export const voteOnIdea = async (ideaId, userEmail, voteType) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    let endpoint;
    let method;

    // Determine the endpoint and method based on the vote type
    if (voteType === 'add') {
      endpoint = `${IDEA_URL}/${ideaId}/vote?userEmail=${encodeURIComponent(userEmail)}`;
      method = 'POST';
    } else if (voteType === 'remove') {
      endpoint = `${IDEA_URL}/${ideaId}/unvote?userEmail=${encodeURIComponent(userEmail)}`;
      method = 'DELETE';
    } 

    // Send the request
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`, // Pass the token for authentication
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to ${voteType} idea: ${response.statusText}`);
    }

    // No need to process response data as we don't need to update the frontend with new data
  } catch (error) {
    console.error(`Error trying to ${voteType} idea:`, error);
    throw error;
  }
};


export const checkUserVote = async (ideaId, userEmail) => {
  try {
    const response = await fetch(`${IDEA_URL}/${ideaId}/vote/check?userEmail=${userEmail}`);
    if (response.ok) {
      const hasVoted = await response.json();
      return hasVoted; // Returns true or false based on whether the user has voted
    } else {
      throw new Error('Error checking user vote');
    }
  } catch (error) {
    console.error('Error checking user vote:', error);
    throw error;
  }
};


// // Update an existing idea
export const updateIdea = async (ideaId, updatedData) => {
  try {
    const response = await fetch(`${IDEA_URL}/${ideaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update idea');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating idea:', error);
    throw error;
  }
};

// Delete an idea
export const deleteIdea = async (ideaId) => {
  try {
    const response = await fetch(`${IDEA_URL}/${ideaId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete idea');
    }
    return { message: 'Idea deleted successfully' };
  } catch (error) {
    console.error('Error deleting idea:', error);
    throw error;
  }
};


export const submitIdea = async (ideaData, token) => {
  try {
    const response = await fetch(IDEA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(ideaData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit idea');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting idea:', error);
    throw error;
  }
};


