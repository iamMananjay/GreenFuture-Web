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
        localStorage.setItem('token', responseMessage.token);
        localStorage.setItem('role', responseMessage.userRole);
        navigate('/dashboard');
      } else {
        setError(responseMessage.message);
      }
    } catch (err) {
      setError('Invalid email or password'); // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-green-300">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-2">
          Greenfuture Energy
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
          Login to Your Account
        </h2>
        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">
            {error}
          </p>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: { borderRadius: '8px' },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { borderRadius: '8px' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              backgroundColor: '#38a169',
              color: '#fff',
              borderRadius: '8px',
              padding: '12px 0',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
            className="hover:bg-green-700"
          >
            Login
          </Button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          © {new Date().getFullYear()} Greenfuture Energy. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
