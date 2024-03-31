import React, { useState, useEffect } from "react";
import "./WaiTable.css"; // Assuming you have CSS for styling
import { useNavigate } from "react-router-dom";

function formatDate(dateString) {
  const options = {
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function ComTable(onUpdateStatus) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Step 2: Get the navigate function

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); // Start loading
      const token = localStorage.getItem("token"); // Retrieve the stored token
      try {
        const response = await fetch("http://localhost:3001/jobs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Correctly formatted Authorization header
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Filter the jobs to only include those with a status of "WAI"
          const filteredJobs = data.filter((job) => job.status === "COM");
          setJobs(filteredJobs);
          setError(""); // Clear any previous errors
        } else {
          // If the response is not ok, then throw an error with the response status
          throw new Error(`Failed to fetch jobs: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message); // Set error message to be displayed
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchJobs();
  }, []);

  const handleStatusChange = (jobId, newStatus) => {
    onUpdateStatus(jobId, newStatus); // Function to update status in the backend
  };

  const goToWaiTable = () => {
    navigate("/wai-jobs"); // Navigate to ComTable
  };

  const goToAddJob = () => {
    navigate("/add-jobs"); // Navigate to ComTable
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>SA</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index}>
              <td>{job.customer_name}</td>
              <td>{job.appointment_number}</td>
              <td>{formatDate(job.date_scheduled)}</td>
              <td>
                <button className="com-button"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={goToAddJob} className="complete-button">
          Add Job
        </button>
        <button onClick={goToWaiTable} className="Waiting-button">
          Back
        </button>
      </div>
    </div>
  );
}

export default ComTable;
