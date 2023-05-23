const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route to view all users
router.get('/users', userController.getAllUsers);

module.exports = router;
