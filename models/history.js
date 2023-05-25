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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rice_variety_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nutrient_deficiency_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: 'histories',
  }
);

History.belongsTo(User, { foreignKey: 'userId' });
History.belongsTo(RiceVariety, { foreignKey: 'rice_variety_id', as: 'riceVariety' });
History.belongsTo(NutrientDeficiency, { foreignKey: 'nutrient_deficiency_id', as: 'nutrientDeficiency' });
History.belongsTo(RiceDisease, { foreignKey: 'rice_disease_id', as: 'riceDisease' });

module.exports = History;
