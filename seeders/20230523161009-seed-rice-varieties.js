'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('rice_varieties', [
      {
        name: 'Variety 1',
        description: 'Description for Variety 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Variety 2',
        description: 'Description for Variety 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more rice variety data objects as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rice_varieties', null, {});
  }
};
