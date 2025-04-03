const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    try {
        const { department, courseNumber, courseName } = req.body;

        const existing = await Course.findOne({ department, courseNumber });
        if (existing) return res.status(400).json({ message: 'Course already exists' });

        const course = new Course({ department, courseNumber, courseName });
        await course.save();

        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create course', error: err.message });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ department: 1, courseNumber: 1 });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
    }
};
