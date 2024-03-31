const express = require('express');
const db = require('../config/dbConfig'); // Adjust the path as needed
const router = express.Router();
const passport = require('passport');




// Assuming Passport and JWT setup is correctly done
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log("Authenticated", req.user); // Confirm user is logged
    // return res.json({ message: "Success", user: req.user });
    try {
        const userId = req.user.id; // Extract user ID from the authenticated user
        // Adjust the SQL query to include a WHERE clause that filters by userId
        const { rows } = await db.query('SELECT * FROM jobs WHERE user_id = $1', [userId]);
        res.json(rows);
    } catch (error) {
        console.error('Failed to retrieve jobs for user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// In your server-side route handling file
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // Since the user is authenticated, you can access req.user
    const userId = req.user.id; // Extract user ID from the authenticated user
    const { customer_name, appointment_number, date_scheduled } = req.body;
    
    try {
      const result = await db.query(
        'INSERT INTO jobs (customer_name, appointment_number, date_scheduled, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [customer_name, appointment_number, date_scheduled, 'WAI', userId] // Assume 'WAI' is the default status
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Failed to add job:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  router.put('/:jobId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { jobId } = req.params; // Extract job ID from the request URL
    const userId = req.user.id; // Extract user ID from the authenticated user

    try {
        // Update the job status to "COM" for the given jobId and userId
        // This ensures that users can only update jobs they have created (if your logic requires so)
        const result = await db.query(
            'UPDATE jobs SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
            ['COM', jobId, userId]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Send back the updated job
        } else {
            res.status(404).json({ message: 'Job not found or not authorized to update this job' });
        }
    } catch (error) {
        console.error('Failed to update job status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
