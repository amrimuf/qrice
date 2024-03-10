const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SeedQuality = sequelize.define('seed_quality', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = SeedQuality;
