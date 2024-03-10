const RiceVariety = require('../models/riceVariety');

// Get all rice varieties
exports.getAllRiceVarieties = async (req, res) => {
    try {
    const riceVarieties = await RiceVariety.findAll();
    res.json(riceVarieties);
    } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new rice variety
exports.createRiceVariety = async (req, res) => {
    try {
    const { name, description } = req.body;
    const riceVariety = await RiceVariety.create({ name, description });
    res.json(riceVariety);
    } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getRiceVariety = async (req, res) => {
    try {
        const { id } = req.params;
        const riceVariety = await RiceVariety.findByPk(id);
        if (riceVariety) {
        res.json(riceVariety);
        } else {
        res.status(404).json({ error: 'Rice variety not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}