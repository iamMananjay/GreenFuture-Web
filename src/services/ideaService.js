import { IDEA_URL,USER_DETAIL } from '../api/api';



/// Static ideas data
export const staticIDEA = [
  {
    id: 1,
    title: 'Green Energy Solutions',
    description: 'A proposal for new, renewable energy solutions for urban areas.',
    status: 'pending',
    voteCount: 12,
    submittedBy: 'employee@example.com',
    submissionDate: '2024-06-15',
    votes: [{ userEmail: 'employee@example.com', hasVoted: true }],
  },
  {
    id: 2,
    title: 'Smart Waste Management',
    description: 'An innovative system for efficient waste management using IoT devices.',
    status: 'approved',
    voteCount: 25,
    submittedBy: 'jane.doe@example.com',
    submissionDate: '2024-06-10',
    votes: [{ userEmail: 'user1@example.com', hasVoted: true }],
  },
  {
    id: 3,
    title: 'Water Conservation System',
    description: 'A proposal for a water-saving system for agricultural purposes.',
    status: 'rejected',
    voteCount: 5,
    submittedBy: 'alice.smith@example.com',
    submissionDate: '2024-06-12',
    votes: [{ userEmail: 'user1@example.com', hasVoted: true }],
  },
  {
    id: 4,
    title: 'AI-Powered Recycling',
    description: 'Leveraging artificial intelligence to improve recycling processes in cities.',
    status: 'pending',
    voteCount: 18,
    submittedBy: 'bob.jones@example.com',
    submissionDate: '2024-06-14',
    votes: [{ userEmail: 'user1@example.com', hasVoted: true }],
  },
];

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





// 
// Vote on an idea
export const voteOnIdea = async (ideaId, userEmail, ideaStatus) => {
  // Dynamic logic (uncomment when backend is ready)
  /*
  try {
    const response = await fetch(`${IDEA_URL}/vote/${ideaId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail }),
    });
    if (!response.ok) {
      throw new Error('Failed to vote on idea');
    }
    return await response.json();
  } catch (error) {
    console.error('Error voting on idea:', error);
    throw error;
  }
  */

  // Static logic (for now)
  try {
    const idea = staticIDEA.find((item) => item.id === ideaId);
    if (!idea) {
      throw new Error('Idea not found');
    }

    const existingVote = idea.votes.find((vote) => vote.userEmail === userEmail);

    if (existingVote) {
      // Remove vote (unvote logic)
      idea.votes = idea.votes.filter((vote) => vote.userEmail !== userEmail);
      idea.voteCount -= 1;
    } else {
      // Add vote
      idea.votes.push({ userEmail, hasVoted: true });
      idea.voteCount += 1;
    }

    return {
      message: 'Vote updated successfully',
      updatedIdea: idea,
    };
  } catch (error) {
    console.error('Error voting on idea:', error);
    throw error;
  }
};

// Check if the user has voted on a specific idea
export const checkUserVote = async (ideaId, userEmail) => {
  // Dynamic logic (uncomment when backend is ready)
  /*
  try {
    const response = await fetch(`${IDEA_URL}/vote/check/${ideaId}?userEmail=${userEmail}`);
    if (!response.ok) {
      throw new Error('Failed to check user vote');
    }
    const data = await response.json();
    return data.hasVoted;
  } catch (error) {
    console.error('Error checking user vote:', error);
    throw error;
  }
  */

  // Static logic (for now)
  try {
    const idea = staticIDEA.find((item) => item.id === ideaId);
    if (!idea) {
      console.error('Idea not found');
      return false;
    }

    const userVote = idea.votes.find((vote) => vote.userEmail === userEmail);
    return userVote ? userVote.hasVoted : false;
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


