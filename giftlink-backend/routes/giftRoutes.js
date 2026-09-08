// routes/giftRoutes.js
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const { ObjectId } = require('mongodb');

// Get all gifts - serves /api/gifts
router.get('/', async (req, res) => {
    try {
        // Connect to the database using the connectToDatabase() method
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gifts = await collection.find({}).toArray();
        res.status(200).json(gifts);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).json({ error: 'Failed to fetch gifts' });
    }
});

// Get a single gift by id - serves /api/gifts/:id
router.get('/:id', async (req, res) => {
    try {
        // Connect to the database using the connectToDatabase() method
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const id = req.params.id;

        // Search either by string ID or ObjectId
        let gift = await collection.findOne({ id: id });
        if (!gift && ObjectId.isValid(id)) {
            gift = await collection.findOne({ _id: new ObjectId(id) });
        }

        if (!gift) {
            return res.status(404).json({ error: 'Gift not found' });
        }

        res.status(200).json(gift);
    } catch (e) {
        console.error('Error fetching gift by ID:', e);
        res.status(500).json({ error: 'Failed to fetch gift' });
    }
});

// Add a new gift
router.post('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const newGift = req.body;
        newGift.date_added = Math.floor(Date.now() / 1000);
        const result = await collection.insertOne(newGift);
        res.status(201).json(result);
    } catch (e) {
        console.error('Error creating gift:', e);
        res.status(500).json({ error: 'Failed to create gift' });
    }
});

module.exports = router;
