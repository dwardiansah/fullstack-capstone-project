// util/import-mongo/index.js
require('dotenv').config({ path: '../../.env' });
const fs = require('fs');
const path = require('path');
const connectToDatabase = require('../../models/db');

async function importGifts() {
    try {
        console.log('Connecting to database for import...');
        const db = await connectToDatabase();
        const collection = db.collection('gifts');

        const filePath = path.join(__dirname, 'gifts.json');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const gifts = JSON.parse(fileContent);

        // Clear existing gifts
        await collection.deleteMany({});
        console.log('Existing gifts cleared.');

        // Insert new gifts
        const result = await collection.insertMany(gifts);
        console.log(`========================================`);
        console.log(`Successfully imported ${result.insertedCount} documents into MongoDB.`);
        console.log(`Database: ${db.databaseName} | Collection: gifts`);
        console.log(`========================================`);

        process.exit(0);
    } catch (err) {
        console.error('Error importing gifts to MongoDB:', err);
        process.exit(1);
    }
}

importGifts();
