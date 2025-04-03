// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Load environment variables
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Basic test route
app.get('/', (req, res) => {
    res.send('RAG Syllabus Chatbot Backend is running');
});

// Export app
module.exports = app;
