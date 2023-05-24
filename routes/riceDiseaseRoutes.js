const express = require('express');
const router = express.Router();

const riceDiseaseController = require('../controllers/riceDiseaseController');
const { isAdmin, isLogin, isLogout } = require('../middlewares/authMiddleware');

router.get('/rice-diseases', isLogin, isLogout, riceDiseaseController.getAllRiceDiseases);
router.post('/admin/rice-diseases', isLogin, isLogout, isAdmin, riceDiseaseController.createRiceDisease);

module.exports = router;
