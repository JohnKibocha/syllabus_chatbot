const { queryGemini } = require('../services/llmService');
const Query = require('../models/Query');
const Syllabus = require('../models/Syllabus');
const User = require('../models/User');
const fs = require('fs');
const pdfParse = require('pdf-parse');

exports.querySyllabus = async (req, res) => {
    try {
        const { courseId, question } = req.body;

        const syllabus = await Syllabus.findOne({ course: courseId })
            .populate('course')
            .populate('uploadedBy'); // gets professor info

        if (!syllabus) {
            return res.status(404).json({ message: 'Syllabus not found for course' });
        }

        const pdfBuffer = fs.readFileSync(syllabus.fileUrl);
        const data = await pdfParse(pdfBuffer);
        const extractedText = data.text;

        const course = syllabus.course;
        const professor = syllabus.uploadedBy;

        const courseInfo = `Course: ${course.courseName} (${course.department} ${course.courseNumber})`;
        const professorInfo = `Professor: ${professor?.name || 'Unknown'}`;

        const safeText = extractedText.slice(0, 5000);

        const prompt = `
You are an assistant for answering student questions based on course syllabi.

${courseInfo}  
${professorInfo}  

Syllabus Content:
${safeText}

Question: ${question}
`;

        console.log(`📏 Prompt length: ${prompt.length} characters`);

        const response = await queryGemini(prompt);

        const savedQuery = new Query({
            question,
            courseId: syllabus._id,
            response
        });

        await savedQuery.save();

        res.json({ response });

    } catch (err) {
        console.error('❌ Query failed:', err);
        res.status(500).json({ message: 'Failed to process query', error: err.message });
    }
};
