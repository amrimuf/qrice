'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RiceDiseases', [
      {
        name: 'Disease 1',
        symptoms: 'Symptoms for Disease 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Disease 2',
        symptoms: 'Symptoms for Disease 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more rice disease data objects as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RiceDiseases', null, {});
  }
};
