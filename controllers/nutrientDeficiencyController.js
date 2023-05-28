const NutrientDeficiency = require('../models/nutrientDeficiency');

// Get all nutrient deficiencies
exports.getAllNutrientDeficiencies = async (req, res) => {
    try {
    const nutrientDeficiencies = await NutrientDeficiency.findAll();
    res.json(nutrientDeficiencies);
    } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new nutrient deficiency
exports.createNutrientDeficiency = async (req, res) => {
    try {
    const { name, symptoms } = req.body;
    const nutrientDeficiency = await NutrientDeficiency.create({ name, symptoms });
    res.json(nutrientDeficiency);
    } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getNutrientDeficiency = async (req, res) => {
    try {
        const { id } = req.params;
        const nutrientDeficiency = await NutrientDeficiency.findByPk(id);
        if (nutrientDeficiency) {
        res.json(nutrientDeficiency);
        } else {
        res.status(404).json({ error: 'Nutrient deficiency not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}