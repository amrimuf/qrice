const express = require('express');
const router = express.Router();

const riceVarietyController = require('../controllers/riceVarietyController');
const { isAdmin, isLogin, isLogout } = require('../middlewares/authMiddleware');

router.get('/rice-varieties', isLogin, isLogout, riceVarietyController.getAllRiceVarieties);
router.post('/admin/rice-varieties', isLogin, isLogout, isAdmin, riceVarietyController.createRiceVariety);

module.exports = router;
