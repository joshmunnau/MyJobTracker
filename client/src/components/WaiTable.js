import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WaiTable.css"; // Assuming you have CSS for styling

function formatDate(dateString) {
  const options = {
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function WaiTable(onUpdateStatus) {
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
          const filteredJobs = data.filter((job) => job.status === "WAI");
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

  const handleStatusChange = async (jobId, newStatus) => {
    // Display the confirmation dialog
    const isConfirmed = window.confirm("Are you sure you wish to complete?");

    // Check if the user confirmed the action
    if (isConfirmed) {
      const token = localStorage.getItem("token"); // Retrieve the stored token

      try {
        const response = await fetch(`http://localhost:3001/jobs/${jobId}`, {
          method: "PUT", // or 'POST', depending on how your backend expects to receive the request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          // If the job status was successfully updated in the backend,
          // you might want to update the job list in the frontend as well
          const updatedJobs = jobs.map((job) => {
            if (job.id === jobId) {
              return { ...job, status: newStatus };
            }
            return job;
          });
          setJobs(updatedJobs);
        } else {
          // Handle response failure
          console.error("Failed to update job status");
        }
      } catch (error) {
        console.error("Error updating job status:", error);
      }
    } else {
      // If the user did not confirm, you can optionally handle this case
      console.log("User canceled the action.");
    }
  };

  const goToComTable = () => {
    navigate("/com-jobs"); // Navigate to ComTable
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
                <button
                  className="wai-button"
                  onClick={() => handleStatusChange(job.id, "COM")}
                ></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={goToAddJob} className="complete-button">
          Add Job
        </button>
        <button onClick={goToComTable} className="complete-button">
          Completed Jobs
        </button>
      </div>
    </div>
  );
}

export default WaiTable;
