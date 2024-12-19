import React, { useState, useEffect } from 'react';
import { getYourProfile } from "../services/employeeService"; // Assuming you have this service to get employee data

import {
  fetchIdeas,
  submitIdea,
  updateIdea,
  deleteIdea,
  voteOnIdea,
  fetchUserDet
} from '../services/ideaService';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const Idea = () => {
  const [ideas, setIdeas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  // const [userEmail] = useState('employee@example.com');
  const [userVotes, setUserVotes] = useState({});
  const [editingIdea, setEditingIdea] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserData = async () => {
          try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await getYourProfile(token);
                setUserEmail(response.users.email);
            
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
        fetchUserData();

    fetchIdeasData();
  }, []);
    

  const fetchIdeasData = async () => {
    try {
      const data = await fetchIdeas();
      setIdeas(data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  const toggleFormVisibility = () => {
    setShowForm((prev) => !prev);
    if (showForm) {
      resetForm();
    }
  };

  const resetForm = () => {
    setIdeaTitle('');
    setIdeaDescription('');
    setEditingIdea(null);
  };

  const handleFormSubmit = async (e) => {
    
    e.preventDefault();
    const newIdea = {
      title: ideaTitle,
      description: ideaDescription,
      status: 'pending',
      voteCount: 0,
      submissionDate: new Date().toISOString(),
      submittedBy: userEmail,
    };
    const token = localStorage.getItem('token');
    try {
      if (editingIdea) {
        await updateIdea(editingIdea.id, newIdea);
      } else {
        await submitIdea(newIdea, token);
      }
      resetForm();
      setShowForm(false);
      fetchIdeasData();
    } catch (error) {
      console.error('Error submitting or updating idea:', error);
    }
  };

  const handleEdit = (idea) => {
    setEditingIdea(idea);
    setIdeaTitle(idea.title);
    setIdeaDescription(idea.description);
    setShowForm(true);
  };

  const handleDelete = async (ideaId) => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      try {
        await deleteIdea(ideaId);
        fetchIdeasData();
      } catch (error) {
        console.error('Error deleting idea:', error);
      }
    }
  };

  const handleVote = async (ideaId, voteType) => {
    try {
      await voteOnIdea(ideaId, userEmail, voteType);
      setUserVotes((prevVotes) => ({
        ...prevVotes,
        [ideaId]: voteType === 'like',
      }));
      fetchIdeasData();
    } catch (error) {
      console.error('Error voting on idea:', error);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Ideas</h3>
      {ideas.length === 0 ? (
        <p className="text-red-500">No ideas found.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center"
            >
              <div>
                <h4 className="text-xl font-bold">{idea.title}</h4>
                <p>{idea.description}</p>
                <p>Status: {idea.status}</p>
                <p>Votes: {idea.voteCount}</p>
                <p>
                  Submission Date:{' '}
                  {new Date(idea.submissionDate).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {idea.submittedBy !== userEmail ? (
                  userVotes[idea.id] ? (
                    <FaThumbsDown
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleVote(idea.id, 'unlike')}
                      title="Remove your vote"
                    />
                  ) : (
                    <FaThumbsUp
                      className="text-green-500 cursor-pointer"
                      onClick={() => handleVote(idea.id, 'like')}
                      title="Vote for this idea"
                    />
                  )
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(idea)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(idea.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 shadow-md rounded-lg"
        >
          <h4 className="text-xl font-semibold mb-4">
            {editingIdea ? 'Update Idea' : 'Submit New Idea'}
          </h4>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 mb-2"
            >
              Idea Title
            </label>
            <input
              type="text"
              id="title"
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter idea title"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 mb-2"
            >
              Idea Description
            </label>
            <textarea
              id="description"
              value={ideaDescription}
              onChange={(e) => setIdeaDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter idea description"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            {editingIdea ? 'Update Idea' : 'Submit Idea'}
          </button>
        </form>
      )}
      {!showForm && (
        <button
          onClick={toggleFormVisibility}
          className="bg-green-500 text-white p-2 rounded-md mt-4"
        >
          Submit New Idea
        </button>
      )}
    </div>
  );
};

export default Idea;
