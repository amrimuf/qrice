const { Sequelize } = require('sequelize');
const config = require('./config');
const env = process.env.NODE_ENV;

const sequelizeConfig = config[env];

const sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, {
  host: sequelizeConfig.host,
  dialect: sequelizeConfig.dialect,
  // Additional configuration options
});

module.exports = sequelize;
