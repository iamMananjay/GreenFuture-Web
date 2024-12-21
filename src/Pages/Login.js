import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'; // Import the login service

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const credentials = { email, password };
      const responseMessage = await loginUser(credentials); // Call the login service
  
      console.log(responseMessage); // Log success message for debugging
  
      if (responseMessage.token) {
        localStorage.setItem('token', responseMessage.token)
        localStorage.setItem('role', responseMessage.userRole)
        navigate('/dashboard')
    }else{
        setError(responseMessage.message)
    }
    } catch (err) {
      setError('Invalid email or password'); // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            className="mt-4"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
