// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');

const JWT_SECRET = process.env.JWT_SECRET || 'giftlink_capstone_jwt_secret_key_2026';

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const db = await connectToDatabase();
        const collection = db.collection('users');

        // Check if user already exists
        const existingUser = await collection.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const newUser = {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            createdAt: new Date()
        };

        await collection.insertOne(newUser);

        // Sign token
        const authtoken = jwt.sign(
            { email: newUser.email, firstName: newUser.firstName },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            authtoken,
            email: newUser.email,
            userName: newUser.firstName
        });
    } catch (e) {
        console.error('Registration error:', e);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const db = await connectToDatabase();
        const collection = db.collection('users');

        // Find the current user in the database
        const theUser = await collection.findOne({ email: email.toLowerCase() });
        if (!theUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, theUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        // Generate JWT token
        const authtoken = jwt.sign(
            { email: theUser.email, firstName: theUser.firstName },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            authtoken,
            email: theUser.email,
            userName: theUser.firstName
        });
    } catch (e) {
        console.error('Login error:', e);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Update user details
router.put('/update', async (req, res) => {
    try {
        const { email, firstName, lastName } = req.body;
        const db = await connectToDatabase();
        const collection = db.collection('users');

        // Use collection.findOne() to verify existing user
        const existingUser = await collection.findOne({ email: email.toLowerCase() });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        await collection.updateOne(
            { email: email.toLowerCase() },
            { $set: { firstName, lastName, updatedAt: new Date() } }
        );

        const updatedUser = await collection.findOne({ email: email.toLowerCase() });
        res.status(200).json({
            email: updatedUser.email,
            userName: updatedUser.firstName
        });
    } catch (e) {
        console.error('Update error:', e);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

module.exports = router;
