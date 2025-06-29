const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controllers/authController');

// POST /register - Signup Route
router.post('/register', register);

// POST /login - Login Route
router.post('/login', login);

// GET /me - Get current user
router.get('/me', getMe);

// POST /logout - Logout user
router.post('/logout', logout);

module.exports = router;
