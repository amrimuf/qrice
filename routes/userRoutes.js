const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { isAdmin, isLogin, isLogout } = require('../middlewares/authMiddleware');

// Route to view all users
router.get('/admin/users', isLogin, isAdmin, isLogout, userController.getAllUsers);

module.exports = router;
