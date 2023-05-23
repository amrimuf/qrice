const express = require('express');
const router = express.Router();
const nutrientDeficiencyController = require('../controllers/nutrientDeficiencyController');

router.get('/nutrient-deficiencies', nutrientDeficiencyController.getAllNutrientDeficiencies);
router.post('/nutrient-deficiencies', nutrientDeficiencyController.createNutrientDeficiency);

module.exports = router;
