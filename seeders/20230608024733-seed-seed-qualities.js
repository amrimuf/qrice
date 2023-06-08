'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check the environment variable to determine if seeding should be performed
    const runSeed = process.env.RUN_SEED ? process.env.RUN_SEED === 'true' : 'true';

    if (runSeed) {
      await queryInterface.bulkInsert('seed_qualities', [
        {
          name: 'Healthy',
          description: 'Description for Healthy seed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Unhealthy',
          description: 'Description for Unhealthy seed',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Always perform the down migration to delete the seeded data
    await queryInterface.bulkDelete('seed_qualities', null, {});
  }
};
