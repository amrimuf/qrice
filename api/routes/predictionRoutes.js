const express = require('express');
const router = express.Router();
const prediction = require('../controllers/predictionController')
const { isLogin, isLogout } = require('../middlewares/authMiddleware');

router.post('/predict', isLogin, isLogout, prediction.predict)
router.get('/predict', isLogin, isLogout, prediction.getPredictions)

module.exports = router;
