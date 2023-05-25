'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check the environment variable to determine if seeding should be performed
    const runSeed = process.env.RUN_SEED === 'true';

    if (runSeed) {
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
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Always perform the down migration to delete the seeded data
    await queryInterface.bulkDelete('rice_varieties', null, {});
  }
};
