const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
    fileUrl: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Syllabus', syllabusSchema);
