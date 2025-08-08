// controllers/authController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @desc   Register a new admin
 * @route  POST /api/auth/register
 * @access Public (for initial setup; later restrict to super admin)
 */
exports.registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }

        // Check if admin already exists
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create new admin (password will be hashed by model middleware)
        const newAdmin = await Admin.create({ email, password });

        res.status(201).json({
            message: '✅ Admin registered successfully',
            admin: {
                id: newAdmin._id,
                email: newAdmin.email
            }
        });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc   Login admin
 * @route  POST /api/auth/login
 * @access Public
 */
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: '✅ Login successful',
            token,
            admin: {
                id: admin._id,
                email: admin.email
            }
        });
    } catch (error) {
        console.error('SERVER CRASH during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
