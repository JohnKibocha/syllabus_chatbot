const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contains userId and role
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

const requireProfessor = (req, res, next) => {
    if (req.user.role !== 'professor') {
        return res.status(403).json({ message: 'Only professors can perform this action' });
    }
    next();
};

module.exports = { verifyToken, requireProfessor };
