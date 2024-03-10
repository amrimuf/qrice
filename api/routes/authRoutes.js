const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// OAuth routes
router.get('/auth/google', authController.authenticateGoogle);
router.get('/auth/google/callback', authController.handleOAuthCallback ,authController.googleAuthCallback);

// Other routes (e.g., login, logout, register)
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);

module.exports = router;
