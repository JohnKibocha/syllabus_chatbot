const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate role
        if (!['professor', 'student'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if email is taken
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const user = new User({ name, email, password, role });
        await user.save();

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(201).json(userWithoutPassword);

    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};
