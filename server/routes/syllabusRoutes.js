const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const syllabusController = require('../controllers/syllabusController');
const { verifyToken, requireProfessor } = require('../middleware/auth');

router.post('/upload', verifyToken, requireProfessor, upload.single('pdf'), syllabusController.uploadSyllabus);

module.exports = router;
