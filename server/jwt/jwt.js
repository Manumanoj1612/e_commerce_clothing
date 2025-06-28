// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;  // ✅ Correct now

function generateToken(user) {
    return jwt.sign(
        {
            sub: user._id,
            username: user.username,
            email: user.email,
            role: user.role || 'user',
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken,
};
