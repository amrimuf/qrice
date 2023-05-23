const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RiceVariety = sequelize.define('RiceVariety', {
name: {
type: DataTypes.STRING,
allowNull: false,
},
description: {
type: DataTypes.TEXT,
allowNull: false,
},
});

module.exports = RiceVariety;
