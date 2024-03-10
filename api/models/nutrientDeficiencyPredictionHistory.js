const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const NutrientDeficiency = require('./nutrientDeficiency');

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
    nutrient_deficiency_id: {
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
    tableName: 'nutrient_deficiency_history',
  }
);

History.belongsTo(User, { foreignKey: 'userId' });
History.belongsTo(NutrientDeficiency, { foreignKey: 'nutrient_deficiency_id', as: 'nutrientDeficiency' });

module.exports = History;
