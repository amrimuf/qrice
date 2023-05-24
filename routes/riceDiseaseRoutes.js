const express = require('express');
const router = express.Router();
const riceDiseaseController = require('../controllers/riceDiseaseController');

const { isAdmin } = require('../middlewares/authMiddleware');
const { isLogin } = require('../middlewares/authMiddleware');
const { isLogout } = require('../middlewares/authMiddleware');

router.get('/rice-diseases', isLogin, isLogout, riceDiseaseController.getAllRiceDiseases);
router.post('/rice-diseases', isLogin, isLogout, isAdmin, riceDiseaseController.createRiceDisease);

module.exports = router;
