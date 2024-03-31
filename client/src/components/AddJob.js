import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AddJob() {
  const [customerName, setCustomerName] = useState('');
  const [serviceAppointmentNumber, setServiceAppointmentNumber] = useState('');
  const [dateScheduled, setDateScheduled] = useState('');

  const navigate = useNavigate(); // Step 2: Get the navigate function

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const token = localStorage.getItem("token"); // Assuming you're using JWT for auth

    try {
      const response = await fetch('http://localhost:3001/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the request
        },
        body: JSON.stringify({
          customer_name: customerName,
          appointment_number: serviceAppointmentNumber,
          date_scheduled: dateScheduled,
          status: 'WAI', // Default status
        }),
      });

      if (response.ok) {
        // Handle success, maybe clear the form or give user feedback
        alert('Job added successfully');
        setCustomerName('');
        setServiceAppointmentNumber('');
        setDateScheduled('');
      } else {
        // Handle errors, such as displaying a message to the user
        alert('Failed to add job');
      }
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Error adding job');
    }
  };

  const goToWaiTable = () => {
    navigate('/wai-jobs'); // Navigate to ComTable
  };

  return (
    <form onSubmit={handleSubmit} className="add-job-form">
      <label>
        Customer Name:
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </label>
      <label>
        Service Appointment Number:
        <input
          type="text"
          value={serviceAppointmentNumber}
          onChange={(e) => setServiceAppointmentNumber(e.target.value)}
          required
        />
      </label>
      <label>
        Date Scheduled:
        <input
          type="date"
          value={dateScheduled}
          onChange={(e) => setDateScheduled(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Job</button>
      <button onClick={goToWaiTable} className="Waiting-button">Back</button>
    </form>
  );
}

export default AddJob;
