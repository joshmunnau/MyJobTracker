require('dotenv').config();
console.log(process.env.JWT_SECRET);
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/dbConfig');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Environment variables for better security

const JWT_SECRET = process.env.JWT_SECRET;

// User Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: "Registration Confirmed", user: result.rows[0] });
    } catch (error) {
        console.error(error);
        if (error.code === '23505') {
            return res.status(409).json({ message: "User already exists" });
        }
        res.status(500).send("An error occurred during the registration process.");
    }
});

// User Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.login(user, { session: false }, (error) => {
            if (error) return next(error);
            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

            return res.json({ token });
        });
    })(req, res, next);
});

module.exports = router;
