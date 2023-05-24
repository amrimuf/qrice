const express = require('express');
const router = express.Router();

const nutrientDeficiencyController = require('../controllers/nutrientDeficiencyController');
const { isAdmin, isLogin, isLogout } = require('../middlewares/authMiddleware');

router.get('/nutrient-deficiencies', isLogin, isLogout, nutrientDeficiencyController.getAllNutrientDeficiencies);
router.post('/admin/nutrient-deficiencies', isLogin, isLogout, isAdmin, nutrientDeficiencyController.createNutrientDeficiency);

module.exports = router;