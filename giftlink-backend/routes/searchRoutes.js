// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Search gifts with filter options
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');

        // Initialize query object
        const query = {};

        // Filter on name if provided
        if (req.query.name && req.query.name.trim() !== '') {
            query.name = { $regex: req.query.name.trim(), $options: 'i' };
        }

        // Filter on category
        if (req.query.category && req.query.category.trim() !== '' && req.query.category !== 'All') {
            query.category = req.query.category.trim();
        }

        // Filter on condition
        if (req.query.condition && req.query.condition.trim() !== '' && req.query.condition !== 'All') {
            query.condition = req.query.condition.trim();
        }

        // Filter on age_years (e.g. less than or equal to max age)
        if (req.query.age_years) {
            query.age_years = { $lte: parseFloat(req.query.age_years) };
        }

        const gifts = await collection.find(query).toArray();
        res.status(200).json(gifts);
    } catch (e) {
        console.error('Error executing gift search:', e);
        res.status(500).json({ error: 'Search failed' });
    }
});

module.exports = router;
