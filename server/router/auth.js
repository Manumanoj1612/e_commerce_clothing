const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// POST /register - Signup Route
router.post('/register', AuthController.register);

// POST /login - Login Route
router.post('/login', AuthController.login);

// GET /me - Get current user
router.get('/me', AuthController.getMe);

// POST /logout - Logout user
router.post('/logout', AuthController.logout);

module.exports = router;
