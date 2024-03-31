import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Register.css";


function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // For success messages
    const [errorMessage, setErrorMessage] = useState(''); // For error messages
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { username, email, password };
    
        try {
            const response = await fetch('http://localhost:3001/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setSuccessMessage('Registration complete');
                setErrorMessage(''); // Clear any previous error message
            } else {
                throw new Error(data.message || 'Failed to register');
            }
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage(''); // Clear any previous success message
        }
    };
    
  
    return (
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h1>Register</h1>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit">Register</button>
          <div className="login-link">
            <p>Already have an account? <Link to="/">Login Here</Link></p>
          </div>
          {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    );
  }
  
  export default Register;
  
