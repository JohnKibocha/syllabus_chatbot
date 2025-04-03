// server/models/Query.js
const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    question: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Syllabus', required: true },
    response: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Query', querySchema);
