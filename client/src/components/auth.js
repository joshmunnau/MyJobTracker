// src/auth.js
export const isAuthenticated = () => {
    // Example check: verify token existence
    const token = localStorage.getItem('token');
    return !!token; // Convert token presence to a boolean
  };
  