const express = require('express');
const router = express.Router();
const nutrientDeficiencyController = require('../controllers/nutrientDeficiencyController');

const { isAdmin } = require('../middlewares/authMiddleware');
const { isLogin } = require('../middlewares/authMiddleware');
const { isLogout } = require('../middlewares/authMiddleware');

router.get('/nutrient-deficiencies', isLogin, isLogout, nutrientDeficiencyController.getAllNutrientDeficiencies);
router.post('/nutrient-deficiencies', isLogin, isLogout, isAdmin, nutrientDeficiencyController.createNutrientDeficiency);

module.exports = router;