const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const syllabusController = require('../controllers/syllabusController');

router.post('/upload', upload.single('pdf'), syllabusController.uploadSyllabus);

module.exports = router;
