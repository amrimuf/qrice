const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const RiceVariety = require('./riceVariety');

const History = sequelize.define(
  'History',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rice_variety_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imageFilename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    predictionResult: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'rice_variety_history',
  }
);

History.belongsTo(User, { foreignKey: 'userId' });
History.belongsTo(RiceVariety, { foreignKey: 'rice_variety_id', as: 'riceVariety' });

module.exports = History;
