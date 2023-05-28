const RiceDisease = require('../models/riceDisease');

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

// Get all rice diseases
exports.getAllRiceDiseases = async (req, res) => {
    try {
    const riceDiseases = await RiceDisease.findAll();
    res.json(riceDiseases);
    } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getRiceDisease = async (req, res) => {
    try {
        const { id } = req.params;
        const riceDisease = await RiceDisease.findByPk(id);
        if (riceDisease) {
        res.json(riceDisease);
        } else {
        res.status(404).json({ error: 'Rice disease not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
