const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RiceDisease = sequelize.define('rice_disease', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    symptoms: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});


module.exports = RiceDisease;
