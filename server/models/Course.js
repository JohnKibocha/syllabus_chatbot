const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    department: { type: String, required: true },
    courseNumber: { type: String, required: true },
    courseName: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
