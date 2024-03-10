const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const SeedQuality = require('./seedQuality');

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
    seed_quality_id: {
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
    tableName: 'seed_quality_history',
  }
);

History.belongsTo(User, { foreignKey: 'userId' });
History.belongsTo(SeedQuality, { foreignKey: 'seed_quality_id', as: 'seedQuality' });

module.exports = History;
