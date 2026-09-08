// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pino = require('pino');
const pinoHttp = require('pino-http');

const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');
const { getSentiment } = require('./sentiment/index');

const app = express();
const port = process.env.PORT || 3060;

// Logger
const logger = pino({ level: 'info' });
app.use(pinoHttp({ logger }));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Connect gifts route: serves /api/gifts
app.use('/api/gifts', giftRoutes);

// Connect search route: serves /api/gifts/search and /api/search
app.use('/api/gifts/search', searchRoutes);
app.use('/api/search', searchRoutes);

// Connect auth routes: serves /api/auth
app.use('/api/auth', authRoutes);

// Sentiment test route
app.post('/api/sentiment', (req, res) => {
    const { sentence } = req.body;
    const sentiment = getSentiment(sentence);
    res.json({ sentiment });
});

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'GiftLink backend service is running smoothly' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`GiftLink Backend Server listening at http://localhost:${port}`);
});

module.exports = app;
