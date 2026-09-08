// models/db.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'giftdb';

let dbInstance = null;
const client = new MongoClient(url);

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }

    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected successfully to MongoDB server');
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
}

module.exports = connectToDatabase;
