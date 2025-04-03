const Syllabus = require('../models/Syllabus');
const Course = require('../models/Course');
const User = require('../models/User');

exports.uploadSyllabus = async (req, res) => {
    try {
        const { courseId, professorId } = req.body;

        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        // Optional: validate course and user exist
        const course = await Course.findById(courseId);
        const professor = await User.findById(professorId);

        if (!course || !professor) {
            return res.status(400).json({ message: 'Invalid course or professor ID' });
        }

        const syllabus = new Syllabus({
            fileUrl: req.file.path,
            course: course._id,
            uploadedBy: professor._id
        });

        await syllabus.save();
        res.status(201).json({ message: 'Syllabus uploaded', syllabus });

    } catch (err) {
        res.status(500).json({ message: 'Upload failed', error: err.message });
    }
};
