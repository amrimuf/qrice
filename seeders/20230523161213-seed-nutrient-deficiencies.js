'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('nutrient_deficiencies', [
      {
        name: 'Deficiency 1',
        symptoms: 'Symptoms for Deficiency 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Deficiency 2',
        symptoms: 'Symptoms for Deficiency 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more nutrient deficiency data objects as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('nutrient_deficiencies', null, {});
  }
};
