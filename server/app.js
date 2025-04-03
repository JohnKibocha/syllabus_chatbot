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

app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
});


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

// Query route
const queryRoutes = require('./routes/queryRoutes');
app.use('/api/query', queryRoutes);

// Export app
module.exports = app;
