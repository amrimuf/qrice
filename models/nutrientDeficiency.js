const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NutrientDeficiency = sequelize.define('nutrient_deficiency', {
name: {
type: DataTypes.STRING,
allowNull: false,
},
symptoms: {
type: DataTypes.TEXT,
allowNull: false,
},
});

module.exports = NutrientDeficiency;
