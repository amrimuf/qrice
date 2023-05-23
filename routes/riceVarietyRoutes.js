const express = require('express');
const router = express.Router();
const riceVarietyController = require('../controllers/riceVarietyController');
const { authorizeRole } = require('../middlewares/authMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/rice-varieties', riceVarietyController.getAllRiceVarieties);

// Routes that require admin role authorization
router.post('/rice-varieties', authenticateToken, authorizeRole, riceVarietyController.createRiceVariety);
// router.put('/rice-varieties/:id', authenticateToken, authorizeRole, riceVarietyController.updateRiceVariety);
// router.delete('/rice-varieties/:id', authenticateToken, authorizeRole, riceVarietyController.deleteRiceVariety);

module.exports = router;
