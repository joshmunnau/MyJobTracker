import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
import Login from "./Login";
import Register from "./Register";
import WaiTable from "./WaiTable";
import ComTable from "./ComTable";
import AddJob from "./AddJob";
import ProtectedRoute from "./ProtectedRoute"; // Make sure the path is correct
import Header from "./Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/MyJobTracker" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected routes wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route path="/wai-jobs" element={<WaiTable />} />
            <Route path="/com-jobs" element={<ComTable />} />
            <Route path="/add-jobs" element={<AddJob />} />
          </Route>
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
