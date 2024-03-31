// src/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./auth"; // Adjust the import path as needed

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
