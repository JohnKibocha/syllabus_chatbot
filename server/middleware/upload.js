const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Storage config
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        const uploadPath = path.resolve(__dirname, '../../res/uploads');

        // Ensure directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter: only PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

module.exports = multer({ storage, fileFilter });
