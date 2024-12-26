import React, { useState, useEffect } from 'react';
import { getYourProfile } from "../services/employeeService";
import {
  fetchIdeas,
  submitIdea,
  updateIdea,
  deleteIdea,
  voteOnIdea,
} from '../services/ideaService';
import { FaThumbsUp, FaThumbsDown, FaSpinner } from 'react-icons/fa';

const Idea = () => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [userVotes, setUserVotes] = useState({});
  const [editingIdea, setEditingIdea] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
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

      const userVotesData = {};
      data.forEach((idea) => {
        if (idea.votes && idea.votes.some(vote => vote.userEmail === userEmail)) {
          const userVote = idea.votes.find(vote => vote.userEmail === userEmail);
          userVotesData[idea.id] = userVote.voteType;
        }
      });
      setUserVotes(userVotesData);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  const filterTopIdeas = () => {
    setLoading(true);
    setTimeout(() => {
      const sortedIdeas = [...ideas].sort((a, b) => b.voteCount - a.voteCount);
      const topIdeas = sortedIdeas.slice(0, 2);
      setFilteredIdeas(topIdeas);
      setLoading(false);
    }, 5000);
  };

  const showAllIdeas = () => {
    setShowAll(true);
    setFilteredIdeas([]);
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
      fetchIdeasData();
    } catch (error) {
      console.error('Error voting on idea:', error);
    }
  };
  const role = localStorage.getItem('role');


  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-4">Ideas</h3>
      {role !== "Employee" ? (
  <>
    <button
      onClick={filterTopIdeas}
      className="bg-green-600 text-white p-2 rounded-md mt-4 hover:bg-green-700 transition"
    >
      Filter Top Ideas (AI)
    </button>

    {filteredIdeas.length > 0 && !loading && (
      <button
        onClick={showAllIdeas}
        className="bg-blue-600 text-white p-2 rounded-md mt-4 hover:bg-blue-700 transition"
      >
        Show All Ideas
      </button>
    )}
  </>
) : null}


      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin text-blue-500 text-4xl">
            <FaSpinner />
          </div>
          <div className="ml-2">
            <p className="text-lg text-gray-500">AI Filtering in progress...</p>
            <p className="font-bold text-blue-600 animate-pulse">Magic is happening!</p>
          </div>
        </div>
      )}

      {filteredIdeas.length > 0 && !loading && (
        <div className="space-y-4 mb-6 mt-4">
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="bg-white p-4 shadow-lg rounded-lg flex justify-between items-center transition-transform transform hover:scale-105">
              <div>
                <h4 className="text-xl font-bold">{idea.title}</h4>
                <p>{idea.description}</p>
                <p>Votes: {idea.voteCount}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {(showAll || filteredIdeas.length === 0) && !loading && (
        <div className="space-y-4 mb-6 mt-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="bg-white p-4 shadow-lg rounded-lg flex justify-between items-center transition-transform transform hover:scale-105">
              <div>
                <h4 className="text-xl font-bold">{idea.title}</h4>
                <p>{idea.description}</p>
                <p>Votes: {idea.voteCount}</p>
                <p>Posted By: {idea.submittedBy}</p>
              </div>
              <div className="flex items-center space-x-2">
                {idea.submittedBy !== userEmail && (
                  <>
                    {idea.votes.some(vote => vote.userEmail === userEmail) ? (
                      <FaThumbsDown
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleVote(idea.id, 'remove')}
                        title="You have already voted"
                      />
                    ) : (
                      <FaThumbsUp
                        className="text-green-500 cursor-pointer"
                        onClick={() => handleVote(idea.id, 'add')}
                        title="Vote for this idea"
                      />
                    )}
                  </>
                )}
                {idea.submittedBy === userEmail && (
                  <>
                    <button
                      onClick={() => handleEdit(idea)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600"
                      >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(idea.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
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
          className="bg-white p-6 shadow-lg rounded-lg mt-6"
        >
          <h4 className="text-xl font-semibold mb-4">
            {editingIdea ? 'Update Idea' : 'Submit New Idea'}
          </h4>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
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
            <label htmlFor="description" className="block text-gray-700 mb-2">
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
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            {editingIdea ? 'Update Idea' : 'Submit Idea'}
          </button>
        </form>
      )}

      {!showForm && (
        <button
          onClick={toggleFormVisibility}
          className="bg-green-600 text-white p-2 rounded-md mt-4 hover:bg-green-700 transition"
        >
          Submit New Idea
        </button>
      )}
    </div>
  );
};

export default Idea ;
