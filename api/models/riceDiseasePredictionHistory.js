const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const RiceDisease = require('./riceDisease');

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
    rice_disease_id: {
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
    tableName: 'rice_disease_history',
  }
);

History.belongsTo(User, { foreignKey: 'userId' });
History.belongsTo(RiceDisease, { foreignKey: 'rice_disease_id', as: 'riceDisease' });

module.exports = History;
