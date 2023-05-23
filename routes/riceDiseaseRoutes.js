const express = require('express');
const router = express.Router();
const riceDiseaseController = require('../controllers/riceDiseaseController');

router.get('/rice-diseases', riceDiseaseController.getAllRiceDiseases);
router.post('/rice-diseases', riceDiseaseController.createRiceDisease);

module.exports = router;
