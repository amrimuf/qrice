const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const { isAdmin } = require('../middlewares/authMiddleware');
const { isLogin } = require('../middlewares/authMiddleware');
const { isLogout } = require('../middlewares/authMiddleware');

// Route to view all users
router.get('/users', isLogin, isAdmin, isLogout, userController.getAllUsers);

module.exports = router;
