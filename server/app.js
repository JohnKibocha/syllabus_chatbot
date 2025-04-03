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

// User route
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Course route
const courseRoutes = require('./routes/courseRoutes');
app.use('/api/courses', courseRoutes);

// Syllabus route
const syllabusRoutes = require('./routes/syllabusRoutes');
app.use('/api/syllabus', syllabusRoutes);

// Export app
module.exports = app;
