const bcrypt = require('bcrypt');
const User = require('../model/User');
const { generateToken, verifyToken } = require('../jwt/jwt');

// Register user
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, role });
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = generateToken(savedUser);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // set true in production with HTTPS
            sameSite: 'Lax',
            maxAge: 1000 * 60 * 60, // 1 hour
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // set true in production with HTTPS
            sameSite: 'Lax',
            maxAge: 1000 * 60 * 60, // 1 hour
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get current user
const getMe = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const decoded = verifyToken(token);
        res.json({ 
            user: { 
                _id: decoded.sub, 
                username: decoded.username, 
                role: decoded.role, 
                email: decoded.email 
            } 
        });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Logout user
const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true, // match your cookie settings
        sameSite: 'Strict' // match your cookie settings
    });
    res.status(200).json({ message: 'Logged out' });
};

module.exports = {
    register,
    login,
    getMe,
    logout
}; 