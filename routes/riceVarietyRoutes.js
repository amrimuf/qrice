const express = require('express');
const router = express.Router();
const riceVarietyController = require('../controllers/riceVarietyController');

const { isAdmin } = require('../middlewares/authMiddleware');
const { isLogin } = require('../middlewares/authMiddleware');
const { isLogout } = require('../middlewares/authMiddleware');

router.get('/rice-varieties', isLogin, isLogout, riceVarietyController.getAllRiceVarieties);
router.post('/rice-varieties', isLogin, isLogout, isAdmin, riceVarietyController.createRiceVariety);

module.exports = router;
