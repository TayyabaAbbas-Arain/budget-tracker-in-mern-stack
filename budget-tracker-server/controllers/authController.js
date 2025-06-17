const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });

    } catch (err) {
        console.error('Registration Error:', err); // Log the specific error
        res.status(500).json({ message: 'Server error during registration. Please try again.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials.' });

        // Make sure process.env.JWT_SECRET is actually defined in your .env
        // If not, use 'yourSecretKey' as fallback or define it.
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });
        res.json({ token });

    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error during login. Please try again.' });
    }
};