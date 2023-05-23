const RiceDisease = require('../models/riceDisease');

// Get all rice diseases
exports.getAllRiceDiseases = async (req, res) => {
try {
const riceDiseases = await RiceDisease.findAll();
res.json(riceDiseases);
} catch (error) {
res.status(500).json({ error: 'Internal server error' });
}
};

// Create a new rice disease
exports.createRiceDisease = async (req, res) => {
try {
const { name, symptoms } = req.body;
const riceDisease = await RiceDisease.create({ name, symptoms });
res.json(riceDisease);
} catch (error) {
res.status(500).json({ error: 'Internal server error' });
}
};
