import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful', data);
        // Save token to localStorage or sessionStorage based on your preference
        localStorage.setItem('token', data.token);
        
        // Navigate to the dashboard or another page on successful login
        navigate('/wai-jobs'); // Ensure you have a route set up for '/dashboard'
      } else {
        // Update state to display error message from server
        setErrorMessage(data.message || 'Failed to login');
      }
    } catch (error) {
      console.error('Login request failed', error);
      // Update state to display a generic error message
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h1>Login</h1>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Login</button>
        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register Here</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
