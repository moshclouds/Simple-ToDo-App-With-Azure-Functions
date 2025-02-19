const mongoose = require('mongoose');
require('dotenv').config();

// Function to connect to the database
async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
        // Connect to MongoDB only if not already connected
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Successfully connected to MongoDB');
        } catch (err) {
            console.error('Database connection error:', err);
            throw new Error('Database connection failed');
        }
    }
}

module.exports = { connectToDatabase };