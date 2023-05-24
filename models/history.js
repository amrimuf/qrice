const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const RiceVariety = require('./riceVariety');
const NutrientDeficiency = require('./nutrientDeficiency');
const RiceDisease = require('./riceDisease');

const History = sequelize.define(
  'History',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'histories',
  }
);

History.belongsTo(User, { foreignKey: 'userId' });
History.belongsTo(RiceVariety, { foreignKey: 'categoryId', as: 'riceVariety' });
History.belongsTo(NutrientDeficiency, { foreignKey: 'categoryId', as: 'nutrientDeficiency' });
History.belongsTo(RiceDisease, { foreignKey: 'categoryId', as: 'riceDisease' });

module.exports = History;
